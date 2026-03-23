from sqlalchemy.orm import Session
from datetime import datetime

from database.models import (
    ArticleProgress,
    CourseProgress,
    Article,
    LearningSession,
    Recommendation
)


def mark_article_complete(db: Session, student_id, course_id, section_id, article_id):

    # 🔥 STEP 1: Get latest session for this article
    session = (
        db.query(LearningSession)
        .filter(
            LearningSession.student_id == student_id,
            LearningSession.article_id == article_id
        )
        .order_by(LearningSession.session_id.desc())
        .first()
    )

    # 🔥 Default values (fallback)
    final_emotion = "Neutral"
    recommendation_type = "continue"

    if session:
        final_emotion = session.final_emotion or "Neutral"

        # 🔥 Get latest recommendation
        recommendation = (
            db.query(Recommendation)
            .filter(Recommendation.session_id == session.session_id)
            .order_by(Recommendation.shown_at.desc())
            .first()
        )

        if recommendation:
            recommendation_type = recommendation.recommendation_type

    # 🔥 STEP 2: Check if already exists
    existing = db.query(ArticleProgress).filter_by(
        student_id=student_id,
        article_id=article_id
    ).first()

    if existing:
        # ✅ UPDATE existing row
        existing.completed = True
        existing.completed_at = datetime.utcnow()
        existing.final_emotion = final_emotion
        existing.recommendation_type = recommendation_type

    else:
        # ✅ INSERT new row
        entry = ArticleProgress(
            student_id=student_id,
            course_id=course_id,
            section_id=section_id,
            article_id=article_id,
            completed=True,
            completed_at=datetime.utcnow(),
            final_emotion=final_emotion,
            recommendation_type=recommendation_type
        )
        db.add(entry)

    db.commit()

    # 🔥 STEP 3: Update course progress
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
    else:
        course_progress = CourseProgress(
            student_id=student_id,
            course_id=course_id,
            progress_percentage=percentage
        )
        db.add(course_progress)

    db.commit()

    return {
        "message": "Article marked as completed",
        "progress": percentage,
        "emotion": final_emotion,
        "recommendation": recommendation_type
    }