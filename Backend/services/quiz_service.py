import json
from database.models import QuizGame, ArticleProgress


# 🔹 ALL QUIZZES (HOME)
def get_all_quizzes(db):
    quizzes = db.query(QuizGame).filter(QuizGame.active == True).all()

    grouped = {}

    for q in quizzes:
        key = q.quiz_title

        if key not in grouped:
            grouped[key] = []

        grouped[key].append({
            "id": q.quiz_game_id,
            "question": q.question,
            "options": json.loads(q.options_json),
            "correct_answer": q.correct_answer
        })

    return [{"quiz_name": k, "questions": v} for k, v in grouped.items()]


# 🔹 RECOMMENDED QUIZZES
def get_quiz_by_student(db, student_id):
    completed = db.query(ArticleProgress.article_id)\
        .filter(ArticleProgress.student_id == student_id).all()

    article_ids = [a[0] for a in completed]

    quizzes = db.query(QuizGame)\
        .filter(QuizGame.article_id.in_(article_ids))\
        .filter(QuizGame.active == True)\
        .all()

    grouped = {}

    for q in quizzes:
        key = q.quiz_title

        if key not in grouped:
            grouped[key] = []

        grouped[key].append({
            "id": q.quiz_game_id,
            "question": q.question,
            "options": json.loads(q.options_json),
            "correct_answer": q.correct_answer
        })

    return [{"quiz_name": k, "questions": v} for k, v in grouped.items()]