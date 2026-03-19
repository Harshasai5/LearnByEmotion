import json
from database.models import MatchFlowGame, SelectSetGame, FillBlanksGame


# 🔹 MATCH FLOW
def get_match_flow(db):
    games = db.query(MatchFlowGame).filter(MatchFlowGame.active == True).all()

    return [
        {
            "id": g.match_flow_game_id,
            "steps": json.loads(g.steps_json),
            "correct_order": json.loads(g.correct_order_json)
        }
        for g in games
    ]


# 🔹 SELECT SET
def get_select_set(db):
    games = db.query(SelectSetGame).filter(SelectSetGame.active == True).all()

    return [
        {
            "id": g.select_set_game_id,
            "items": json.loads(g.items_json),
            "rule": g.rule,
            "correct_set": json.loads(g.correct_set_json)
        }
        for g in games
    ]


# 🔹 FILL BLANKS
def get_fill_blanks(db):
    games = db.query(FillBlanksGame).filter(FillBlanksGame.active == True).all()

    return [
        {
            "id": g.fill_blanks_game_id,
            "question": g.question,
            "options": json.loads(g.options_json),
            "correct_mapping": json.loads(g.correct_mapping_json)
        }
        for g in games
    ]