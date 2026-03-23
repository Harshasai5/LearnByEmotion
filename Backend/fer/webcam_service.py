import cv2
import threading
import time
from datetime import datetime

from fer.emotion_service import predict_emotion
from database.db import SessionLocal
from database.models import EmotionLog

webcam_running = False
webcam_thread = None

# 🔥 Load face detector ONCE
face_cascade = cv2.CascadeClassifier(
    cv2.data.haarcascades + "haarcascade_frontalface_default.xml"
)


def webcam_emotion_loop(session_id: int, student_id: int):
    global webcam_running

    cap = cv2.VideoCapture(0)

    if not cap.isOpened():
        print("❌ Webcam not accessible")
        return

    print(f"🎥 Webcam started | session={session_id}")

    while webcam_running:
        ret, frame = cap.read()
        if not ret:
            time.sleep(1)
            continue

        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

        # 🔥 Detect faces
        faces = face_cascade.detectMultiScale(
            gray, scaleFactor=1.3, minNeighbors=3
        )

        if len(faces) == 0:
            print("😐 No face detected")
            time.sleep(2)
            continue

        for (x, y, w, h) in faces:
            face = frame[y:y+h, x:x+w]

            try:
                result = predict_emotion(face)
                emotion = result["emotion"]

                db = SessionLocal()

                log = EmotionLog(
                    session_id=session_id,
                    student_id=student_id,
                    emotion=emotion,
                    logged_at=datetime.utcnow()
                )

                db.add(log)
                db.commit()
                db.close()

                print(f"🧠 Emotion: {emotion}")

            except Exception as e:
                print("❌ Emotion error:", e)

            break  # 🔥 only first face

        time.sleep(2)  # 🔥 faster sampling

    cap.release()
    print("🛑 Webcam stopped")


def start_webcam(session_id: int, student_id: int):
    global webcam_running, webcam_thread

    if webcam_running:
        return

    webcam_running = True

    webcam_thread = threading.Thread(
        target=webcam_emotion_loop,
        args=(session_id, student_id),
        daemon=True
    )
    webcam_thread.start()


def stop_webcam():
    global webcam_running
    webcam_running = False