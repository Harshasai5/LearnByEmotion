import os
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

# 🔐 Load API key safely
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

if not GROQ_API_KEY:
    print("❌ GROQ_API_KEY not found in .env file")

client = Groq(api_key=GROQ_API_KEY)


SYSTEM_PROMPT = """
You are an AI Educational Assistant and Emotional Support Tutor.

Rules:
1. Only answer educational or general polite conversation.
2. If question is unrelated → reply:
   "I'm here to help with educational topics 😊"
3. Always give positive, encouraging responses.
4. Adapt explanation based on user emotion:
   - Sad → motivating + simple
   - Confused → step-by-step
   - Happy → normal explanation
5. Never give harmful, negative, or discouraging answers.
6. Keep answers clear, concise, and student-friendly.
"""


def generate_response(user_message, emotion):
    user_prompt = f"""
User Emotion: {emotion}
User Question: {user_message}
"""

    try:
        # 🔥 Debug API key once
        if not GROQ_API_KEY:
            return "Error: GROQ API key is missing"

        response = client.chat.completions.create(
        model="llama-3.1-8b-instant"    ,       
        messages=[
                {"role": "system", "content": SYSTEM_PROMPT.strip()},
                {"role": "user", "content": user_prompt.strip()}
            ],
            temperature=0.7,
            max_tokens=500
        )

        result = response.choices[0].message.content

        # ✅ Ensure always string
        if not isinstance(result, str):
            result = str(result)

        return result

    except Exception as e:
        print("🔥 Groq API Error:", e)

        # 🔥 RETURN REAL ERROR FOR DEBUGGING
        return f"Groq Error: {str(e)}"