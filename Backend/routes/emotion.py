from fastapi import APIRouter, UploadFile, File, Depends
from sqlalchemy.orm import Session
import numpy as np
import cv2
from datetime import datetime

from database.db import get_db
from database.models import EmotionLog
from fer.emotion_service import predict_emotion

router = APIRouter(prefix="/emotion", tags=["Emotion"])


@router.post("/detect")
async def detect_emotion(
    file: UploadFile = File(...),
    session_id: int = None,
    student_id: int = None,
    db: Session = Depends(get_db)
):
    contents = await file.read()

    np_arr = np.frombuffer(contents, np.uint8)
    frame = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

    result = predict_emotion(frame)
    emotion = result["emotion"]

    # ✅ Store in DB
    log = EmotionLog(
        session_id=session_id,
        student_id=student_id,
        emotion=emotion,
        logged_at=datetime.utcnow()
    )

    db.add(log)
    db.commit()

    return {
        "emotion": emotion,
        "confidence": result["confidence"]
    }