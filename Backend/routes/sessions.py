from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime

from database.db import get_db
from database.models import LearningSession, EmotionLog
from services.emotion_service import compute_final_emotion
from services.recommendation_service import create_recommendation

router = APIRouter(prefix="/sessions", tags=["Sessions"])


# 🔹 START SESSION
@router.post("/start")
def start_session(
    student_id: int,
    course_id: int,
    section_id: int,
    article_id: int,
    db: Session = Depends(get_db)
):
    try:
        session = LearningSession(
            student_id=student_id,
            course_id=course_id,
            section_id=section_id,
            article_id=article_id,
            start_time=datetime.utcnow()
        )

        db.add(session)
        db.commit()
        db.refresh(session)

        return {
            "message": "Session started successfully",
            "session_id": session.session_id
        }

    except Exception as e:
        print("❌ START SESSION ERROR:", e)
        raise HTTPException(status_code=500, detail="Failed to start session")


# 🔹 OPTIONAL: Manual Emotion Log
@router.post("/log-emotion")
def log_emotion(
    session_id: int,
    student_id: int,
    emotion: str,
    db: Session = Depends(get_db)
):
    session = db.query(LearningSession).filter(
        LearningSession.session_id == session_id
    ).first()

    if not session:
        raise HTTPException(status_code=404, detail="Session not found")

    emotion_log = EmotionLog(
        session_id=session_id,
        student_id=student_id,
        emotion=emotion,
        logged_at=datetime.utcnow()
    )

    db.add(emotion_log)
    db.commit()

    return {
        "message": "Emotion logged successfully",
        "emotion": emotion
    }


# 🔥 END SESSION
@router.post("/end")
def end_session(
    session_id: int,
    db: Session = Depends(get_db)
):
    session = db.query(LearningSession).filter(
        LearningSession.session_id == session_id
    ).first()

    if not session:
        raise HTTPException(status_code=404, detail="Session not found")

    # 1️⃣ End session
    session.end_time = datetime.utcnow()

    # 2️⃣ Compute final emotion
    final_emotion = compute_final_emotion(db, session)

    if not final_emotion:
        final_emotion = "Neutral"

    session.final_emotion = final_emotion

    db.commit()
    db.refresh(session)

    print("🔥 FINAL EMOTION:", final_emotion)

    # 3️⃣ Create recommendation
    recommendation = create_recommendation(db, session)

    action = "continue"
    if recommendation:
        action = recommendation.recommendation_type

    print("🔥 ACTION:", action)

    return {
        "message": "Session ended successfully",
        "final_emotion": final_emotion,
        "recommendation": {
            "emotion": final_emotion,
            "action": action
        }
    }