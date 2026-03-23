from database.db import get_db
from services.ai_service import generate_response
from sqlalchemy import text   # 🔥 IMPORTANT


# 🔍 Validate if question is allowed
def is_educational(question: str) -> bool:
    question = question.lower()

    keywords = [
        "what", "how", "why", "explain", "define",
        "example", "idea", "difference", "learn",
        "meaning", "concept", "topic"
    ]

    greetings = ["hi", "hello", "hey", "thanks", "thank you"]

    if any(greet in question for greet in greetings):
        return True

    return any(word in question for word in keywords)


# 🧠 Get latest emotion
def get_latest_emotion(student_id: int) -> str:
    db = next(get_db())

    try:
        result = db.execute(text("""
            SELECT emotion FROM emotion_logs
            WHERE student_id = :student_id
            ORDER BY logged_at DESC LIMIT 1
        """), {"student_id": student_id})

        row = result.fetchone()
        return row[0] if row else "Neutral"

    except Exception as e:
        print("Emotion Fetch Error:", e)
        return "Neutral"

    finally:
        db.close()


# 💬 Main chat handler
def handle_chat(student_id: int, session_id: int, message: str):

    if not is_educational(message):
        return {
            "response": "I’m here to help with educational topics 😊",
            "chat_id": None
        }

    db = next(get_db())

    try:
        emotion = get_latest_emotion(student_id)

        try:
            response = generate_response(message, emotion)
            if not isinstance(response, str):
                response = str(response)
        except Exception as e:
            print("AI Error:", e)
            response = f"AI Error: {str(e)}"

        result = db.execute(text("""
            INSERT INTO chat_message (student_id, session_id, message, response, emotion)
            VALUES (:student_id, :session_id, :message, :response, :emotion)
        """), {
            "student_id": student_id,
            "session_id": session_id,
            "message": message,
            "response": response,
            "emotion": emotion
        })

        db.commit()

        # ⚠️ SQLAlchemy doesn't guarantee lastrowid always
        chat_id = result.lastrowid if hasattr(result, "lastrowid") else None

        return {
            "response": response,
            "chat_id": chat_id
        }

    except Exception as e:
        print("Chat Error:", e)
        return {
            "response": f"Server Error: {str(e)}",
            "chat_id": None
        }

    finally:
        db.close()


# 📜 Get chat history
def get_chat_history(student_id: int):
    db = next(get_db())

    try:
        result = db.execute(text("""
            SELECT * FROM chat_message
            WHERE student_id = :student_id
            ORDER BY created_at DESC
        """), {"student_id": student_id})

        rows = result.fetchall()

        # Convert rows to dict
        history = [dict(row._mapping) for row in rows]

        return history

    except Exception as e:
        print("History Error:", e)
        return []

    finally:
        db.close()


# ⭐ Mark message as useful
def mark_useful(chat_id: int):
    db = next(get_db())

    try:
        db.execute(text("""
            UPDATE chat_message
            SET is_useful = TRUE
            WHERE chat_id = :chat_id
        """), {"chat_id": chat_id})

        db.commit()

        return {"message": "Marked as useful"}

    except Exception as e:
        print("Mark Useful Error:", e)
        return {"message": f"Error: {str(e)}"}

    finally:
        db.close()