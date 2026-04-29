from fastapi import FastAPI, HTTPException
from motor.motor_asyncio import AsyncIOMotorClient
from starlette.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# Frontend-in serverə qoşula bilməsi üçün icazə
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB bağlantısı
client = AsyncIOMotorClient(os.getenv("MONGO_URL"))
db = client[os.getenv("DB_NAME")]

@app.get("/")
async def status():
    return {"status": "Grand Life API is active"}

# İstifadəçi məlumatlarını gətir və ya yeni istifadəçi yarat
@app.get("/api/user/{user_id}")
async def get_user(user_id: int):
    user = await db.users.find_one({"telegram_id": user_id})
    if not user:
        new_user = {
            "telegram_id": user_id,
            "balance": 10000, # Başlanğıc pulu
            "energy": 100,
            "level": 1,
            "experience": 0,
            "assets": []
        }
        await db.users.insert_one(new_user)
        return new_user
    
    user["_id"] = str(user["_id"])
    return user

# Enerji yeniləmə və ya pul qazanma üçün təməl mexanika
@app.post("/api/user/{user_id}/work")
async def work(user_id: int):
    user = await db.users.find_one({"telegram_id": user_id})
    if user and user["energy"] >= 10:
        await db.users.update_one(
            {"telegram_id": user_id},
            {"$inc": {"balance": 500, "energy": -10}}
        )
        return {"success": True}
    return {"error": "Enerji yetərsizdir"}
