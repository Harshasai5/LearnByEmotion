from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel

from database.db import get_db
from database.models import Course, Section, CourseProgress

router = APIRouter(prefix="/courses", tags=["Courses"])


# ================================
# 📌 SCHEMAS
# ================================

class EnrollRequest(BaseModel):
    student_id: int
    course_id: int


class CheckEnrollRequest(BaseModel):
    student_id: int
    course_id: int


# ================================
# 📚 GET ALL COURSES
# ================================

@router.get("/")
def get_all_courses(db: Session = Depends(get_db)):
    return db.query(Course).all()


# ================================
# 📖 GET COURSE SECTIONS
# ================================

@router.get("/{course_id}/sections")
def get_course_sections(course_id: int, db: Session = Depends(get_db)):
    return (
        db.query(Section)
        .filter(Section.course_id == course_id)
        .order_by(Section.section_order)
        .all()
    )


# ================================
# 📝 ENROLL COURSE
# ================================

@router.post("/enroll")
def enroll_course(req: EnrollRequest, db: Session = Depends(get_db)):
    existing = db.query(CourseProgress).filter_by(
        student_id=req.student_id,
        course_id=req.course_id
    ).first()

    if existing:
        return {"message": "Already enrolled"}

    new_entry = CourseProgress(
        student_id=req.student_id,
        course_id=req.course_id,
        progress_percentage=0
    )

    db.add(new_entry)
    db.commit()

    return {"message": "Enrolled successfully"}


# ================================
# 🔍 CHECK ENROLLMENT
# ================================

@router.post("/check-enrollment")
def check_enrollment(req: CheckEnrollRequest, db: Session = Depends(get_db)):
    existing = db.query(CourseProgress).filter_by(
        student_id=req.student_id,
        course_id=req.course_id
    ).first()

    return {"enrolled": bool(existing)}


# ================================
# 📊 GET ENROLLED COURSES (OPTIONAL)
# ================================

@router.get("/enrolled/{student_id}")
def get_enrolled_courses(student_id: int, db: Session = Depends(get_db)):
    enrolled = (
        db.query(Course, CourseProgress)
        .join(CourseProgress, Course.course_id == CourseProgress.course_id)
        .filter(CourseProgress.student_id == student_id)
        .all()
    )

    result = []
    for course, progress in enrolled:
        result.append({
            "course_id": course.course_id,
            "course_name": course.course_name,
            "progress": progress.progress_percentage
        })

    return result