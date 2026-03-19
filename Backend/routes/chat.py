from fastapi import APIRouter
from services.chat_service import handle_chat, get_chat_history, mark_useful

router = APIRouter()

@router.post("/send")
def send_message(data: dict):
    student_id = data["student_id"]
    session_id = data.get("session_id")
    message = data["message"]

    result = handle_chat(student_id, session_id, message)

    return result   # ✅ FIXED

@router.get("/history/{student_id}")
def chat_history(student_id: int):
    history = get_chat_history(student_id)
    return {"history": history}


@router.post("/mark-useful")
def mark(data: dict):
    chat_id = data["chat_id"]
    mark_useful(chat_id)
    return {"message": "Marked as useful"}