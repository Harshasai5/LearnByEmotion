import json
from database.models import MatchFlowGame, SelectSetGame, FillBlanksGame
import random


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
    # 1️⃣ Get all active questions
    games = db.query(FillBlanksGame).filter(FillBlanksGame.active == True).all()

    if not games:
        return {"questions": [], "options": []}

    # 2️⃣ Pick random 5 or 6 questions
    selected_games = random.sample(
        games,
        min(len(games), random.choice([5, 6]))
    )

    correct_options = []
    all_wrong_options = []

    # 3️⃣ Extract correct + wrong options
    for g in selected_games:
        correct_map = json.loads(g.correct_mapping_json)
        options = json.loads(g.options_json)

        # ✅ collect correct answers (handles multiple blanks)
        for key in correct_map:
            correct_options.append(correct_map[key])

        # ✅ collect wrong options
        for opt in options:
            if opt not in correct_map.values():
                all_wrong_options.append(opt)

    # 4️⃣ Remove duplicates
    correct_options = list(set(correct_options))
    all_wrong_options = list(set(all_wrong_options))

    # 5️⃣ Pick 1 or 2 wrong options randomly
    wrong_sample = []
    if all_wrong_options:
        wrong_sample = random.sample(
            all_wrong_options,
            min(len(all_wrong_options), random.choice([1, 2]))
        )

    # 6️⃣ Combine correct + wrong
    final_options = correct_options + wrong_sample

    # 7️⃣ Shuffle options
    random.shuffle(final_options)

    # 8️⃣ Prepare questions
    questions = [
        {
            "id": g.fill_blanks_game_id,
            "question": g.question,
            "correct_mapping": json.loads(g.correct_mapping_json)
        }
        for g in selected_games
    ]

    # 9️⃣ Final response
    return {
        "questions": questions,
        "options": final_options
    }