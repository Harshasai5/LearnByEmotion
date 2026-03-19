from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database.db import get_db
from services.game_service import (
    get_match_flow,
    get_select_set,
    get_fill_blanks
)

router = APIRouter(prefix="/games", tags=["Games"])


@router.get("/match-flow")
def match_flow(db: Session = Depends(get_db)):
    return get_match_flow(db)


@router.get("/select-set")
def select_set(db: Session = Depends(get_db)):
    return get_select_set(db)


@router.get("/fill-blanks")
def fill_blanks(db: Session = Depends(get_db)):
    return get_fill_blanks(db)