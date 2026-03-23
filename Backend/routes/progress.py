from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel

from database.db import get_db
from services.progress_service import mark_article_complete

router = APIRouter(prefix="/progress", tags=["Progress"])


class ProgressRequest(BaseModel):
    student_id: int
    course_id: int
    section_id: int
    article_id: int


@router.post("/complete-article")
def complete_article(req: ProgressRequest, db: Session = Depends(get_db)):
    try:
        result = mark_article_complete(
            db,
            req.student_id,
            req.course_id,
            req.section_id,
            req.article_id
        )

        # ✅ Return full response (VERY IMPORTANT)
        return {
            "message": result["message"],
            "progress": result["progress"],
            "emotion": result["emotion"],
            "recommendation": result["recommendation"]
        }

    except Exception as e:
        print("❌ PROGRESS ERROR:", e)
        raise HTTPException(
            status_code=500,
            detail="Failed to save progress"
        )