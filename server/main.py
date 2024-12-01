from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from auth.auth_routes import auth_router
from api.api_routes import router as api_router
from api.profile_routes import profile_router

app = FastAPI()

app.include_router(auth_router, prefix="/auth", tags=["Authentication"])

app.include_router(api_router, tags=["File Uploads"])

app.include_router(profile_router, prefix="/profile", tags=["Profile"])

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (adjust this in production)
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all HTTP headers
)
@app.get("/")
async def root():
    return {"message": "Welcome to Chatbot Backend!"}
