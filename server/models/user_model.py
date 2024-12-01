from pydantic import BaseModel, EmailStr, HttpUrl, Field
from typing import Optional

class User(BaseModel):
    name: str
    email: EmailStr
    password: str
    profile_picture: str = None  # Profile picture as a URL
