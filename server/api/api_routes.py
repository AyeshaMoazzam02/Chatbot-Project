from bson import ObjectId
from fastapi import APIRouter, File, UploadFile, HTTPException, Depends, Form
from typing import List, Optional
from auth.jwt_handler import verify_token
from database.db import files_collection
import base64
import requests

router = APIRouter()

@router.post("/api/upload")
async def upload_files(
    files: Optional[List[UploadFile]] = File(None),  # Accept multiple files
    file_urls: Optional[List[str]] = Form(None),     # Accept multiple URLs
    token: str = Depends(verify_token),       # Validate token
):
    if not files and not file_urls:
        raise HTTPException(status_code=400, detail="No files or URLs provided.")

    uploaded_files = []

    # Process uploaded files
    if files:
        for file in files:
            if file.content_type != "application/pdf":
                raise HTTPException(status_code=400, detail=f"{file.filename} is not a PDF.")
            
            file_content = await file.read()
            file_data = {
                "filename": file.filename,
                "content": base64.b64encode(file_content).decode("utf-8"),
                "user": token["email"],
            }
            result = files_collection.insert_one(file_data)
            file_data["_id"] = str(result.inserted_id)  # Convert ObjectId to string
            uploaded_files.append(file_data)

    # Process file URLs
    if file_urls:
        for url in file_urls:
            response = requests.get(url)
            if response.headers.get("Content-Type") != "application/pdf":
                raise HTTPException(status_code=400, detail=f"{url} is not a PDF URL.")
            
            file_data = {
                "filename": url.split("/")[-1],
                "content": base64.b64encode(response.content).decode("utf-8"),
                "user": token["email"],
            }
            result = files_collection.insert_one(file_data)
            file_data["_id"] = str(result.inserted_id)  # Convert ObjectId to string
            uploaded_files.append(file_data)

    return {"message": "Files uploaded successfully.", "files": uploaded_files}
