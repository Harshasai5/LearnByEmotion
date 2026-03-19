from collections import Counter
from sqlalchemy.orm import Session
from datetime import datetime

from database.models import EmotionLog, LearningSession


def aggregate_emotions(db: Session, session_id: int) -> str:
    emotion_logs = (
        db.query(EmotionLog)
        .filter(EmotionLog.session_id == session_id)
        .all()
    )

    if not emotion_logs:
        return "Neutral"

    emotions = [log.emotion for log in emotion_logs]
    dominant_emotion = Counter(emotions).most_common(1)[0][0]

    return dominant_emotion


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
        if duration_seconds > 300:  # 5 minutes
            return "Bored"
        else:
            return "Neutral"

    return "Neutral"


def compute_final_emotion(db: Session, session: LearningSession) -> str:
    fer_emotion = aggregate_emotions(db, session.session_id)

    if session.end_time:
        duration = (session.end_time - session.start_time).seconds
    else:
        duration = 0

    learning_emotion = map_to_learning_emotion(fer_emotion, duration)
    return learning_emotion
