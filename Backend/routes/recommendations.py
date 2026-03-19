from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database.db import get_db
from database.models import Recommendation
router = APIRouter()
@router.get("/latest")
def get_latest_recommendation(
    session_id: int,
    db: Session = Depends(get_db)
):
    recommendation = (
        db.query(Recommendation)
        .filter(Recommendation.session_id == session_id)
        .order_by(Recommendation.shown_at.desc())
        .first()
    )

    if not recommendation:
        raise HTTPException(
            status_code=404,
            detail="No recommendation found for this session"
        )

    return {
        "session_id": recommendation.session_id,
        "emotion": recommendation.emotion,
        "action": recommendation.recommendation_type,  # 🔥 renamed
        "clicked": recommendation.clicked
    }