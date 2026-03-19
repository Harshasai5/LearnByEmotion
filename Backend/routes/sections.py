from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database.db import get_db
from database.models import Article

router = APIRouter(prefix="/sections", tags=["Sections"])


@router.get("/{section_id}/articles")
def get_articles_by_section(section_id: int, db: Session = Depends(get_db)):
    articles = (
        db.query(Article)
        .filter(Article.section_id == section_id)
        .order_by(Article.article_order)
        .all()
    )

    return articles
