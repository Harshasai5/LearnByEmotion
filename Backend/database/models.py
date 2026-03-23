from sqlalchemy import (
    Column, Integer, String, Text, Boolean,
    ForeignKey, DateTime, Float, Enum
)
from sqlalchemy.orm import relationship
from datetime import datetime

from database.db import Base


# ================================
# 👤 STUDENT
# ================================
class Student(Base):
    __tablename__ = "students"

    student_id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100))
    email = Column(String(100), unique=True, index=True)
    password = Column(String(255))
    created_at = Column(DateTime, default=datetime.utcnow)

    sessions = relationship("LearningSession", back_populates="student")
    article_progress = relationship("ArticleProgress", back_populates="student")
    course_progress = relationship("CourseProgress", back_populates="student")


# ================================
# 📚 COURSE
# ================================
class Course(Base):
    __tablename__ = "courses"

    course_id = Column(Integer, primary_key=True, index=True)
    course_name = Column(String(150))
    description = Column(Text)

    sections = relationship("Section", back_populates="course")
    progress = relationship("CourseProgress", back_populates="course")


# ================================
# 📖 SECTION
# ================================
class Section(Base):
    __tablename__ = "sections"

    section_id = Column(Integer, primary_key=True, index=True)
    course_id = Column(Integer, ForeignKey("courses.course_id"))
    section_name = Column(String(150))
    section_order = Column(Integer)

    course = relationship("Course", back_populates="sections")
    articles = relationship("Article", back_populates="section")


# ================================
# 📝 ARTICLE
# ================================
class Article(Base):
    __tablename__ = "articles"

    article_id = Column(Integer, primary_key=True, index=True)
    course_id = Column(Integer, ForeignKey("courses.course_id"))
    section_id = Column(Integer, ForeignKey("sections.section_id"))
    article_title = Column(String(150))
    article_content = Column(Text)
    article_order = Column(Integer)

    section = relationship("Section", back_populates="articles")
    sessions = relationship("LearningSession", back_populates="article")
    progress = relationship("ArticleProgress", back_populates="article")


# ================================
# 🧠 LEARNING SESSION
# ================================
class LearningSession(Base):
    __tablename__ = "learning_sessions"

    session_id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("students.student_id"))
    course_id = Column(Integer, ForeignKey("courses.course_id"))
    section_id = Column(Integer, ForeignKey("sections.section_id"))
    article_id = Column(Integer, ForeignKey("articles.article_id"))

    start_time = Column(DateTime, default=datetime.utcnow)
    end_time = Column(DateTime, nullable=True)
    final_emotion = Column(String(50), nullable=True)

    student = relationship("Student", back_populates="sessions")
    article = relationship("Article", back_populates="sessions")
    emotion_logs = relationship("EmotionLog", back_populates="session")
    recommendations = relationship("Recommendation", back_populates="session")


# ================================
# 😊 EMOTION LOG
# ================================
class EmotionLog(Base):
    __tablename__ = "emotion_logs"

    emotion_log_id = Column(Integer, primary_key=True, index=True)
    session_id = Column(Integer, ForeignKey("learning_sessions.session_id"))
    student_id = Column(Integer, ForeignKey("students.student_id"))
    emotion = Column(String(50))
    logged_at = Column(DateTime, default=datetime.utcnow)

    session = relationship("LearningSession", back_populates="emotion_logs")


# ================================
# 💡 RECOMMENDATION
# ================================
class Recommendation(Base):
    __tablename__ = "recommendations"

    recommendation_id = Column(Integer, primary_key=True, index=True)
    session_id = Column(Integer, ForeignKey("learning_sessions.session_id"))
    student_id = Column(Integer, ForeignKey("students.student_id"))
    emotion = Column(String(50))
    recommendation_type = Column(String(50))  # games / quiz / chatbot / break
    recommendation_ref_id = Column(Integer, nullable=True)
    shown_at = Column(DateTime, default=datetime.utcnow)
    clicked = Column(Boolean, default=False)

    session = relationship("LearningSession", back_populates="recommendations")


# ================================
# 📊 COURSE PROGRESS
# ================================
class CourseProgress(Base):
    __tablename__ = "course_progress"

    course_progress_id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("students.student_id"))
    course_id = Column(Integer, ForeignKey("courses.course_id"))
    progress_percentage = Column(Float, default=0)
    last_updated = Column(DateTime, default=datetime.utcnow)

    student = relationship("Student", back_populates="course_progress")
    course = relationship("Course", back_populates="progress")


# ================================
# 📄 ARTICLE PROGRESS
# ================================
class ArticleProgress(Base):
    __tablename__ = "article_progress"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("students.student_id"))
    course_id = Column(Integer, ForeignKey("courses.course_id"))
    section_id = Column(Integer, ForeignKey("sections.section_id"))
    article_id = Column(Integer, ForeignKey("articles.article_id"))

    completed = Column(Boolean, default=True)
    completed_at = Column(DateTime, default=datetime.utcnow)

    # 🔥 NEW FIELDS
    final_emotion = Column(String(50), nullable=True)
    recommendation_type = Column(String(50), nullable=True)

    student = relationship("Student", back_populates="article_progress")
    article = relationship("Article", back_populates="progress")

# ================================
# 🧠 QUIZ GAME
# ================================
class QuizGame(Base):
    __tablename__ = "quiz_games"

    quiz_game_id = Column(Integer, primary_key=True, index=True)

    course_id = Column(Integer)
    section_id = Column(Integer)
    article_id = Column(Integer)

    quiz_title = Column(String(150))  # 🔥 IMPORTANT

    question = Column(Text)
    options_json = Column(Text)
    correct_answer = Column(String)

    difficulty = Column(String)
    active = Column(Boolean, default=True)

# ================================
# 🎮 FILL BLANKS GAME
# ================================
class FillBlanksGame(Base):
    __tablename__ = "fill_blanks_games"

    fill_blanks_game_id = Column(Integer, primary_key=True, index=True)
    course_id = Column(Integer, ForeignKey("courses.course_id"))
    section_id = Column(Integer, ForeignKey("sections.section_id"))

    question = Column(Text)
    options_json = Column(Text)
    correct_mapping_json = Column(Text)
    difficulty = Column(Enum("easy", "medium", "hard"))
    active = Column(Boolean, default=True)


# ================================
# 🔄 MATCH FLOW GAME
# ================================
class MatchFlowGame(Base):
    __tablename__ = "match_flow_games"

    match_flow_game_id = Column(Integer, primary_key=True, index=True)
    course_id = Column(Integer, ForeignKey("courses.course_id"))
    section_id = Column(Integer, ForeignKey("sections.section_id"))

    steps_json = Column(Text)
    correct_order_json = Column(Text)
    difficulty = Column(Enum("easy", "medium", "hard"))
    active = Column(Boolean, default=True)


# ================================
# 🧩 SELECT SET GAME
# ================================
class SelectSetGame(Base):
    __tablename__ = "select_set_games"

    select_set_game_id = Column(Integer, primary_key=True, index=True)
    course_id = Column(Integer, ForeignKey("courses.course_id"))
    section_id = Column(Integer, ForeignKey("sections.section_id"))

    items_json = Column(Text)
    rule = Column(Text)
    correct_set_json = Column(Text)
    difficulty = Column(Enum("easy", "medium", "hard"))
    active = Column(Boolean, default=True)

class ChatMessage:
    def __init__(self, chat_id, student_id, session_id, message, response, emotion, is_useful, created_at):
        self.chat_id = chat_id
        self.student_id = student_id
        self.session_id = session_id
        self.message = message
        self.response = response
        self.emotion = emotion
        self.is_useful = is_useful
        self.created_at = created_at