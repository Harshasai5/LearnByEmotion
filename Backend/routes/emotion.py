from fastapi import APIRouter, UploadFile, File, Depends, Form
from sqlalchemy.orm import Session
import numpy as np
import cv2
from datetime import datetime

from database.db import get_db
from database.models import EmotionLog
from fer.emotion_service import predict_emotion

router = APIRouter(prefix="/emotion", tags=["Emotion"])

# 🔥 Load face detector once
face_cascade = cv2.CascadeClassifier(
    cv2.data.haarcascades + "haarcascade_frontalface_default.xml"
)


@router.post("/detect")
async def detect_emotion(
    file: UploadFile = File(...),
    session_id: int = Form(...),
    student_id: int = Form(...),
    db: Session = Depends(get_db)
):
    try:
        print("🔥 RECEIVED:", session_id, student_id)

        contents = await file.read()

        # 🔹 Decode image
        np_arr = np.frombuffer(contents, np.uint8)
        frame = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)  # 🔥 force 3-channel

        if frame is None:
            emotion = "neutral"
            confidence = 0

        else:
            # 🔹 Convert to grayscale ONLY for face detection
            gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

            # 🔹 Detect face
            faces = face_cascade.detectMultiScale(gray, 1.3, 5)

            if len(faces) == 0:
                emotion = "neutral"
                confidence = 0
                print("⚠️ No face detected → storing neutral")

            else:
                (x, y, w, h) = faces[0]

                # 🔥 IMPORTANT FIX: take face from ORIGINAL COLOR image
                face = frame[y:y+h, x:x+w]

                if face is None or face.size == 0:
                    emotion = "neutral"
                    confidence = 0
                else:
                    face = cv2.resize(face, (48, 48))

                    # 🔹 Predict emotion
                    result = predict_emotion(face)

                    if result is None:
                        emotion = "neutral"
                        confidence = 0
                    else:
                        emotion = result.get("emotion", "neutral").lower()
                        confidence = result.get("confidence", 0)

        # 🔥 ALWAYS STORE
        print(f"🧠 FINAL: {emotion} ({confidence:.2f})")

        log = EmotionLog(
            session_id=session_id,
            student_id=student_id,
            emotion=emotion,
            logged_at=datetime.utcnow()
        )

        db.add(log)
        db.commit()

        print("✅ SAVED TO DB")

        return {
            "emotion": emotion,
            "confidence": confidence
        }

    except Exception as e:
        print("❌ Emotion Detection Error:", e)
        return {"error": str(e)}