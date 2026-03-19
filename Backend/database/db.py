from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
import pymysql


DATABASE_URL = "mysql+pymysql://root@localhost:3306/emotion_learning"

engine = create_engine(
    DATABASE_URL,
    echo=True
)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base = declarative_base()


def get_db():
    return pymysql.connect(
        host="localhost",
        user="root",
        password="",
        database="emotion_learning",
        cursorclass=pymysql.cursors.DictCursor
    )
