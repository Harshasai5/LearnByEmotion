from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database.db import get_db
from database.models import Article

router = APIRouter(prefix="/articles", tags=["Articles"])


# 🔹 Get single article
@router.get("/{article_id}")
def get_article(article_id: int, db: Session = Depends(get_db)):
    article = (
        db.query(Article)
        .filter(Article.article_id == article_id)
        .first()
    )

    if not article:
        raise HTTPException(status_code=404, detail="Article not found")

    return article
