import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMatchFlow } from "../api/gamesApi";
import "./CSS/matchflow.css";

export default function MatchFlow() {
  const [game, setGame] = useState(null);
  const [slots, setSlots] = useState([]);
  const [options, setOptions] = useState([]);
  const [usedOptions, setUsedOptions] = useState([]);
  const [result, setResult] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    getMatchFlow().then(res => {
      const g = res.data[0];
      setGame(g);

      // empty slots
      setSlots(Array(g.steps.length).fill(null));

      // shuffled options
      setOptions(shuffle(g.steps));
    });
  }, []);

  // 🟢 DROP INTO SLOT
  const handleDrop = (e, index) => {
    const value = e.dataTransfer.getData("text");

    // prevent overwrite
    if (slots[index]) return;

    const newSlots = [...slots];
    newSlots[index] = value;
    setSlots(newSlots);

    // mark as used
    setUsedOptions(prev => [...prev, value]);
  };

  // 🟡 DRAG START
  const handleDrag = (e, item) => {
    if (usedOptions.includes(item)) return;
    e.dataTransfer.setData("text", item);
  };

  // 🔍 CHECK ANSWER
  const checkAnswer = () => {
    const userIndexes = slots.map(item =>
      game.steps.indexOf(item)
    );

    const isCorrect =
      JSON.stringify(userIndexes) ===
      JSON.stringify(game.correct_order);

    setResult(isCorrect ? "correct" : "wrong");
  };

  if (!game) return <p>Loading...</p>;

  return (
    <div className="matchflow-page">

      {/* 🔷 NAVBAR */}
      <div className="navbar">
        <div className="nav-top">
          <button className="back-btn" onClick={() => navigate("/games")}>
            ← Back to Learning
          </button>
          <div className="logo">LearnByEmotion</div>
        </div>
      </div>

      {/* 🎮 MAIN */}
      <div className="matchflow-main">

        {/* 🔹 LEFT: FLOW */}
        <div className="flow-panel">
          <h3>Flow</h3>

          {slots.map((item, index) => (
            <div key={index} className="flow-slot-wrapper">

              <div
                className="flow-slot"
                onDrop={(e) => handleDrop(e, index)}
                onDragOver={(e) => e.preventDefault()}
              >
                {item || "______"}
              </div>

              {index !== slots.length - 1 && (
                <div className="arrow">↓</div>
              )}
            </div>
          ))}
        </div>

        {/* 🔹 RIGHT: OPTIONS */}
        <div className="options-panel">
          <h3>Options</h3>

          <div className="options-grid">
            {options.map((item, index) => (
              <div
                key={index}
                className={`option-card ${
                  usedOptions.includes(item) ? "disabled" : ""
                }`}
                draggable={!usedOptions.includes(item)}
                onDragStart={(e) => handleDrag(e, item)}
              >
                {item}
              </div>
            ))}
          </div>

          {/* BUTTON */}
          <button className="check-btn" onClick={checkAnswer}>
            Check Answer
          </button>

          {/* RESULT */}
          {result === "correct" && (
            <div className="result-box correct">✅ Correct!</div>
          )}

          {result === "wrong" && (
            <div className="result-box wrong">❌ Wrong order</div>
          )}

          {/* ✅ CORRECT ORDER (ONLY WHEN CORRECT) */}
          {result === "correct" && (
            <div className="correct-order">
              <h4>Correct Order</h4>

              <div className="correct-flow">
                {game.correct_order.map((i, index) => (
                  <span key={index}>
                    {game.steps[i]}
                    {index !== game.correct_order.length - 1 && " → "}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* 🔀 SHUFFLE */
function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}