from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from typing import Optional
from database.db import users_collection
from auth.jwt_handler import verify_token
from bson import ObjectId
import shutil

profile_router = APIRouter()

@profile_router.get("/me")
async def get_user_profile(token: str = Depends(verify_token)):
    user = users_collection.find_one({"email": token["email"]})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    user["_id"] = str(user["_id"])  # Convert ObjectId to string
    return {"user": user}

@profile_router.patch("/me")
async def update_user_profile(
    name: Optional[str] = None,
    email: Optional[str] = None,
    password: Optional[str] = None,
    profile_picture: Optional[str] = None,
    token: str = Depends(verify_token),
):
    update_data = {}
    if name:
        update_data["name"] = name
    if email:
        update_data["email"] = email
    if password:
        update_data["password"] = password  # Hash in production
    if profile_picture:
        update_data["profile_picture"] = profile_picture

    result = users_collection.update_one(
        {"email": token["email"]}, {"$set": update_data}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="User not found")

    # Return the updated user data
    updated_user = users_collection.find_one({"email": token["email"]})
    updated_user["_id"] = str(updated_user["_id"])  # Convert ObjectId to string

    return {"message": "Profile updated successfully", "user": updated_user}


@profile_router.post("/upload-profile-picture")
async def upload_profile_picture(
    file: UploadFile = File(...), token: str = Depends(verify_token)
):
    if file.content_type not in ["image/png", "image/jpeg"]:
        raise HTTPException(status_code=400, detail="Only PNG and JPEG files are allowed")

    file_location = f"./uploads/{file.filename}"
    with open(file_location, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    users_collection.update_one(
        {"email": token["email"]}, {"$set": {"profile_picture": file_location}}
    )
    return {"message": "Profile picture uploaded successfully", "url": file_location}

