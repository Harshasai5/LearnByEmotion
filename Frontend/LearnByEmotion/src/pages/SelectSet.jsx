import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getSelectSet } from "../api/gamesApi";
import "./CSS/selectset.css";
import bg from "../assets/bg.png";

export default function SelectSet() {
  const [games, setGames] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState([]);
  const [result, setResult] = useState(null);
  const location = useLocation();
  const from = location.state?.from;

  const navigate = useNavigate();

  useEffect(() => {
    getSelectSet().then(res => setGames(res.data));
  }, []);

  const game = games[current];

  const toggleSelect = (item) => {
    setSelected(prev =>
      prev.includes(item)
        ? prev.filter(i => i !== item)
        : [...prev, item]
    );
  };

  const checkAnswer = () => {
    const normalize = (arr) =>
      arr.map(i => i.trim().toLowerCase()).sort();

    const user = normalize(selected);
    const correct = normalize(game.correct_set);

    const isCorrect =
      JSON.stringify(user) === JSON.stringify(correct);

    setResult(isCorrect ? "correct" : "wrong");
  };

  const nextQuestion = () => {
    setSelected([]);
    setResult(null);
    setCurrent(prev => prev + 1);
  };

  if (!game) return <p>Loading...</p>;

  return (
    <div  
      className="selectset-page"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >

      {/* NAVBAR */}
      <div className="navbar">
        <div className="nav-top">
          <button
            className="back-btn"
            onClick={() => {
              if (from === "article") navigate(-1);
              else if (from === "home") navigate("/home");
              else navigate("/home");
            }}
          >
            ← Back to Learning
          </button>
          <div className="logo">LearnByEmotion</div>
        </div>
      </div>

      {/* CARD */}
      <div className="card-container">

        {/* QUESTION */}
        <div className="question">
          {game.rule}
        </div>

        {/* OPTIONS */}
        <div className="options-grid">
          {game.items.map((item, i) => (
            <button
              key={i}
              className={`option-tile ${
                selected.includes(item) ? "selected" : ""
              }`}
              onClick={() => toggleSelect(item)}
            >
              {item}
            </button>
          ))}
        </div>

        {/* CHECK */}
        {!result && (
          <button className="check-btn" onClick={checkAnswer}>
            Check
          </button>
        )}

        {/* RESULT */}
        {result === "correct" && (
          <>
            <div className="result-box correct">✅ Correct!</div>

            {current < games.length - 1 && (
              <button className="next-btn" onClick={nextQuestion}>
                Next →
              </button>
            )}
          </>
        )}

        {result === "wrong" && (
          <div className="result-box wrong">❌ Try again</div>
        )}

        {/* 🔥 QUESTION PROGRESS */}
        <div className="progress-text">
          Question {current + 1} of {games.length}
        </div>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{
              width: `${((current + 1) / games.length) * 100}%`
            }}
          ></div>
        </div>

      </div>
    </div>
  );
}