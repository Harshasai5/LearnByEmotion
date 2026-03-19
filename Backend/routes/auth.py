from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database.db import get_db
from database.models import Student

router = APIRouter(prefix="/auth", tags=["Authentication"])


# 🔐 REGISTER
@router.post("/register")
def register(
    name: str,
    email: str,
    password: str,
    db: Session = Depends(get_db)
):
    existing = db.query(Student).filter(Student.email == email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    student = Student(
        name=name,
        email=email,
        password=password  # (plain for now, OK for academic project)
    )
    db.add(student)
    db.commit()
    db.refresh(student)

    return {
        "message": "Registration successful",
        "student_id": student.student_id
    }


# 🔐 LOGIN
@router.post("/login")
def login(
    email: str,
    password: str,
    db: Session = Depends(get_db)
):
    student = db.query(Student).filter(
        Student.email == email,
        Student.password == password
    ).first()

    if not student:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    return {
        "message": "Login successful",
        "student_id": student.student_id,
        "name": student.name
    }
