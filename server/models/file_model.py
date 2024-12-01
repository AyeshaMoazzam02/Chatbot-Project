from pydantic import BaseModel, Field
from typing import Optional

class File(BaseModel):
    filename: str
    content: str  # Store as Base64-encoded string
    user: str  # Email of the user who uploaded the file
    uploaded_at: Optional[str] = Field(None, description="Upload timestamp")
