from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database.db import get_db
from database.models import Student, Course, CourseProgress

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])


@router.get("/{student_id}")
def get_dashboard(student_id: int, db: Session = Depends(get_db)):
    student = db.query(Student).filter(Student.student_id == student_id).first()

    all_courses = db.query(Course).all()

    registered = (
        db.query(Course, CourseProgress.progress_percentage)
        .join(CourseProgress, Course.course_id == CourseProgress.course_id)
        .filter(CourseProgress.student_id == student_id)
        .all()
    )

    return {
        "student": {
            "id": student.student_id,
            "name": student.name,
            "email": student.email
        },
        "all_courses": [
            {
                "course_id": c.course_id,
                "course_name": c.course_name,
                "description": c.description
            } for c in all_courses
        ],
        "registered_courses": [
            {
                "course_id": c.course_id,
                "course_name": c.course_name,
                "progress": p
            } for c, p in registered
        ]
    }
