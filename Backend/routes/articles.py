from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from database.db import get_db
from database.models import Article

router = APIRouter(prefix="", tags=["Articles"])


# 🔹 Get all articles by section (WITH student progress + emotion)
@router.get("/sections/{section_id}/articles")
def get_articles_by_section(
    section_id: int,
    student_id: int = Query(...),
    db: Session = Depends(get_db)
):
    articles = db.query(Article)\
        .filter(Article.section_id == section_id)\
        .order_by(Article.article_order)\
        .all()

    if not articles:
        return []

    result = []

    for a in articles:
        result.append({
            "article_id": a.article_id,
            "article_title": a.article_title,
            "completed": False,   # 🔥 later connect progress table
            "emotion": None       # 🔥 later connect emotion_logs
        })

    return result


# 🔹 Get single article
@router.get("/articles/{article_id}")
def get_article(article_id: int, db: Session = Depends(get_db)):
    article = db.query(Article)\
        .filter(Article.article_id == article_id)\
        .first()

    if not article:
        raise HTTPException(status_code=404, detail="Article not found")

    return article