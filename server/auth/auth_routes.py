from fastapi import APIRouter, HTTPException, Depends
from models.user_model import User
from database.db import users_collection
from auth.jwt_handler import create_access_token
from auth.auth_utils import hash_password, verify_password

auth_router = APIRouter()

@auth_router.post("/signup")
async def signup(user: User):
    existing_user = users_collection.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already exists")
    
    user.password = hash_password(user.password)
    users_collection.insert_one(user.dict())
    return {"message": "User registered successfully"}

from pydantic import BaseModel

class SignInRequest(BaseModel):
    email: str
    password: str

@auth_router.post("/signin")
async def signin(request: SignInRequest):
    user = users_collection.find_one({"email": request.email})
    if not user or not verify_password(request.password, user["password"]):
        raise HTTPException(status_code=400, detail="Invalid credentials")
    
    token = create_access_token({"email": request.email})
    return {"access_token": token, "token_type": "bearer"}

@auth_router.post("/forgot-password")
async def forgot_password(email: str):
    user = users_collection.find_one({"email": email})
    if not user:
        raise HTTPException(status_code=400, detail="Email not found")
    # Logic for sending a reset link using Email.js (frontend integration)
    return {"message": "Password reset link sent"}

