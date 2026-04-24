from fastapi import FastAPI
from pydantic import BaseModel
from predict import predict_message

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow React
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Message(BaseModel):
    text: str


@app.get("/")
def home():
    return {"message": "Spam Detection API is running 🚀"}


@app.post("/predict")
def predict(data: Message):
    return predict_message(data.text)