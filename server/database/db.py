from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
client = MongoClient(MONGO_URI)
db = client['chatbot_db']  # Database name
users_collection = db['users']  # Users collection
files_collection = db['files']