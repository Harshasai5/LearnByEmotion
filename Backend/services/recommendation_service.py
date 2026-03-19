from sqlalchemy.orm import Session
from database.models import Recommendation, LearningSession


def get_recommendation_action(learning_emotion: str) -> str:
    mapping = {
        "Happy": "deepdive",    #happy
        "Neutral": "continue",  #neutral
        "Confused": "chatbot",  #disgust/surprise
        "Sad": "chatbot",   #sad
        "Frustrated": "break",  #angry
        "Bored": "games",   #nuteral*30
        "Anxiety": "quiz"   #fear
    }

    return mapping.get(learning_emotion, "continue")


def create_recommendation(
    db: Session,
    session: LearningSession
) -> Recommendation:
    action = get_recommendation_action(session.final_emotion)

    recommendation = Recommendation(
        session_id=session.session_id,
        student_id=session.student_id,
        emotion=session.final_emotion,
        recommendation_type=action,   # now stores action instead of text
        clicked=False
    )

    db.add(recommendation)
    db.commit()
    db.refresh(recommendation)

    return recommendation