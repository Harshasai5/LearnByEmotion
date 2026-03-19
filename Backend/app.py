from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.courses import router as course_router
from routes.sections import router as section_router
from routes.articles import router as article_router
from routes.sessions import router as session_router
from routes.recommendations import router as recommendation_router
from routes.emotion import router as emotion_router
from routes.dashboard import router as dashboard_router
from routes.auth import router as auth_router
from routes import progress
from routes import quiz
from routes import games
from routes import emotion
from routes import chat

app = FastAPI(title="LearnByEmotion Backend")

# 🔹 CORS (required for React)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 🔹 Routers
app.include_router(auth_router)
app.include_router(course_router)
app.include_router(section_router)
app.include_router(article_router)
app.include_router(session_router)
app.include_router(recommendation_router)
app.include_router(emotion_router)
app.include_router(dashboard_router)
app.include_router(progress.router)
app.include_router(quiz.router)
app.include_router(games.router)
app.include_router(emotion.router)
app.include_router(chat.router, prefix="/chat", tags=["Chat"])


@app.get("/")
def root():
    return {"message": "Backend running successfully"}
