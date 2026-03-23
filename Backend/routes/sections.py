from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database.db import get_db
from database.models import Article, ArticleProgress

router = APIRouter(prefix="/sections", tags=["Sections"])


@router.get("/{section_id}/articles")
def get_articles(
    section_id: int,
    student_id: int,   # 🔥 REQUIRED PARAM
    db: Session = Depends(get_db)
):
    articles = db.query(Article).filter(
        Article.section_id == section_id
    ).order_by(Article.article_order).all()

    result = []

    for article in articles:
        progress = db.query(ArticleProgress).filter(
            ArticleProgress.student_id == student_id,
            ArticleProgress.article_id == article.article_id
        ).first()

        result.append({
            "article_id": article.article_id,
            "article_title": article.article_title,
            "completed": True if progress else False,
            "emotion": progress.final_emotion if progress else None
        })

    return result