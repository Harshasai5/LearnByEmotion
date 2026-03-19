from sqlalchemy.orm import Session
from database.models import ArticleProgress, CourseProgress, Article


def mark_article_complete(db: Session, student_id, course_id, section_id, article_id):

    # ✅ Check if already completed
    existing = db.query(ArticleProgress).filter_by(
        student_id=student_id,
        article_id=article_id
    ).first()

    if existing:
        return {"message": "Already completed"}

    # ✅ Insert progress
    entry = ArticleProgress(
        student_id=student_id,
        course_id=course_id,
        section_id=section_id,
        article_id=article_id,
        completed=True
    )

    db.add(entry)
    db.commit()

    # 🔥 Update course progress
    total_articles = db.query(Article).filter_by(course_id=course_id).count()

    completed_articles = db.query(ArticleProgress).filter_by(
        student_id=student_id,
        course_id=course_id,
        completed=True
    ).count()

    percentage = (completed_articles / total_articles) * 100 if total_articles else 0

    course_progress = db.query(CourseProgress).filter_by(
        student_id=student_id,
        course_id=course_id
    ).first()

    if course_progress:
        course_progress.progress_percentage = percentage
        db.commit()

    return {"message": "Article marked as completed", "progress": percentage}