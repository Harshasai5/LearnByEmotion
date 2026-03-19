from database.db import get_db
from services.ai_service import generate_response


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
    conn = None
    cursor = None

    try:
        conn = get_db()
        cursor = conn.cursor(dictionary=True)

        cursor.execute("""
            SELECT emotion FROM emotion_logs
            WHERE student_id = %s
            ORDER BY logged_at DESC LIMIT 1
        """, (student_id,))

        result = cursor.fetchone()
        return result["emotion"] if result else "Neutral"

    except Exception as e:
        print("Emotion Fetch Error:", e)
        return "Neutral"

    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()


# 💬 Main chat handler
def handle_chat(student_id: int, session_id: int, message: str):
    conn = None
    cursor = None

    try:
        # 🚫 Filter non-educational questions
        if not is_educational(message):
            return {
                "response": "I’m here to help with educational topics 😊",
                "chat_id": None
            }

        # 🧠 Get emotion
        emotion = get_latest_emotion(student_id)

        # 🤖 Generate AI response
        try:
            response = generate_response(message, emotion)

            # ✅ Ensure response is string
            if not isinstance(response, str):
                response = str(response)

        except Exception as e:
            print("AI Error:", e)
            response = f"AI Error: {str(e)}"

        # 💾 Save to DB
        conn = get_db()
        cursor = conn.cursor()

        cursor.execute("""
            INSERT INTO chat_message (student_id, session_id, message, response, emotion)
            VALUES (%s, %s, %s, %s, %s)
        """, (student_id, session_id, message, response, emotion))

        chat_id = cursor.lastrowid
        conn.commit()

        return {
            "response": response,
            "chat_id": chat_id
        }

    except Exception as e:
        print("Chat Error:", e)

        # 🔥 VERY IMPORTANT: expose real error temporarily
        return {
            "response": f"Server Error: {str(e)}",
            "chat_id": None
        }

    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()


# 📜 Get chat history
def get_chat_history(student_id: int):
    conn = None
    cursor = None

    try:
        conn = get_db()
        cursor = conn.cursor(dictionary=True)

        cursor.execute("""
            SELECT * FROM chat_message
            WHERE student_id = %s
            ORDER BY created_at DESC
        """, (student_id,))

        results = cursor.fetchall()

        # ✅ Ensure response is always string
        for row in results:
            if not isinstance(row["response"], str):
                row["response"] = str(row["response"])

        return results

    except Exception as e:
        print("History Error:", e)
        return []

    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()


# ⭐ Mark message as useful
def mark_useful(chat_id: int):
    conn = None
    cursor = None

    try:
        conn = get_db()
        cursor = conn.cursor()

        cursor.execute("""
            UPDATE chat_message
            SET is_useful = TRUE
            WHERE chat_id = %s
        """, (chat_id,))

        conn.commit()

        return {"message": "Marked as useful"}

    except Exception as e:
        print("Mark Useful Error:", e)
        return {"message": f"Error: {str(e)}"}

    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()