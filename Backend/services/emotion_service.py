import cv2
import numpy as np
from collections import Counter
from datetime import datetime
from sqlalchemy.orm import Session
from keras.layers import TFSMLayer


from database.models import EmotionLog, LearningSession

# 🔥 Load model once (VERY IMPORTANT)

model = TFSMLayer(
    "fer/emotion_model_v2_tf",
    call_endpoint="serving_default"
)
emotion_labels = ["angry", "disgust", "fear", "happy", "sad", "surprise", "neutral"]


# =========================================================
# 🔥 1. PREDICT EMOTION (MODEL)
# =========================================================
def predict_emotion(face):
    try:
        # 🔹 Ensure grayscale
        if len(face.shape) == 3:
            face = cv2.cvtColor(face, cv2.COLOR_BGR2GRAY)

        # 🔹 Resize (model input size)
        face = cv2.resize(face, (48, 48))

        # 🔹 Normalize
        face = face / 255.0

        # 🔹 Reshape for model
        face = np.reshape(face, (1, 48, 48, 1))

        # 🔹 Predict
        preds = model.predict(face, verbose=0)

        confidence = float(np.max(preds))
        emotion = emotion_labels[np.argmax(preds)]

        return {
            "emotion": emotion,
            "confidence": confidence
        }

    except Exception as e:
        print("❌ MODEL ERROR:", e)
        return None


# =========================================================
# 🔥 2. AGGREGATE EMOTIONS (DB)
# =========================================================
def aggregate_emotions(db: Session, session_id: int) -> str:
    emotion_logs = (
        db.query(EmotionLog)
        .filter(EmotionLog.session_id == session_id)
        .all()
    )

    if not emotion_logs:
        return "neutral"

    emotions = [log.emotion.lower() for log in emotion_logs]

    # 🔥 Remove noise
    filtered = [
        e for e in emotions
        if e not in ["neutral", "no_face", "low_confidence"]
    ]

    if not filtered:
        return "neutral"

    # 🔥 Priority emotions
    priority = ["angry", "sad", "fear"]

    for p in priority:
        if p in filtered:
            print("🔥 PRIORITY:", p)
            return p

    dominant = Counter(filtered).most_common(1)[0][0]
    print("📊 DOMINANT:", dominant)

    return dominant


# =========================================================
# 🔥 3. MAP TO LEARNING EMOTION
# =========================================================
def map_to_learning_emotion(fer_emotion: str, duration_seconds: int) -> str:
    fer_emotion = fer_emotion.lower()

    if fer_emotion == "happy":
        return "Happy"
    elif fer_emotion == "angry":
        return "Frustrated"
    elif fer_emotion == "fear":
        return "Anxiety"
    elif fer_emotion == "sad":
        return "Sad"
    elif fer_emotion in ["disgust", "surprise"]:
        return "Confused"
    elif fer_emotion == "neutral":
        if duration_seconds > 300:
            return "Bored"
        return "Neutral"

    return "Neutral"


# =========================================================
# 🔥 4. FINAL EMOTION COMPUTATION
# =========================================================
def compute_final_emotion(db: Session, session: LearningSession) -> str:
    fer_emotion = aggregate_emotions(db, session.session_id)

    if session.end_time:
        duration = (session.end_time - session.start_time).seconds
    else:
        duration = 0

    learning_emotion = map_to_learning_emotion(fer_emotion, duration)

    print("🔥 FINAL FER:", fer_emotion)
    print("🎯 FINAL LEARNING:", learning_emotion)

    return learning_emotion