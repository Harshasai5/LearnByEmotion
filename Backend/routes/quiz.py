from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database.db import get_db
from services.quiz_service import get_all_quizzes, get_quiz_by_student

router = APIRouter(prefix="/quiz", tags=["Quiz"])


# 🔹 HOME
@router.get("/all")
def all_quiz(db: Session = Depends(get_db)):
    return {"quizzes": get_all_quizzes(db)}


# 🔹 RECOMMENDATION
@router.post("/recommended")
def recommended_quiz(student_id: int, db: Session = Depends(get_db)):
    return {"quizzes": get_quiz_by_student(db, student_id)}