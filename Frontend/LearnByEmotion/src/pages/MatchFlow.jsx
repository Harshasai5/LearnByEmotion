import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getMatchFlow } from "../api/gamesApi";
import "./CSS/matchflow.css";

export default function MatchFlow() {
  const [game, setGame] = useState(null);
  const [slots, setSlots] = useState([]);
  const [options, setOptions] = useState([]);
  const [usedOptions, setUsedOptions] = useState([]);
  const [result, setResult] = useState(null);
  const location = useLocation();
  const from = location.state?.from; 

  const navigate = useNavigate();

  useEffect(() => {
    getMatchFlow().then(res => {
      const g = res.data[0];
      setGame(g);
      setSlots(Array(g.steps.length).fill(null));
      setOptions(shuffle(g.steps));
    });
  }, []);

  const handleDrop = (e, index) => {
    const value = e.dataTransfer.getData("text");
    if (slots[index]) return;

    const newSlots = [...slots];
    newSlots[index] = value;
    setSlots(newSlots);

    setUsedOptions(prev => [...prev, value]);
  };

  const handleDrag = (e, item) => {
    if (usedOptions.includes(item)) return;
    e.dataTransfer.setData("text", item);
  };

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

      <div className="matchflow-main">

        {/* LEFT FLOW */}
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

        {/* RIGHT SIDE (SPLIT INTO 2 BOXES) */}
        <div className="right-panel">

          {/* OPTIONS BOX */}
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

            <button className="check-btn" onClick={checkAnswer}>
              Check Answer
            </button>

            {result === "correct" && (
              <div className="result-box correct">✅ Correct!</div>
            )}

            {result === "wrong" && (
              <div className="result-box wrong">❌ Wrong order</div>
            )}
          </div>

          {/* ✅ CORRECT ORDER BOX (SEPARATE) */}
          <div className="correct-order-panel">
            <h4>Correct Order</h4>

            {result === "correct" ? (
              <div className="correct-flow">
                {game.correct_order.map((i, index) => (
                  <span key={index}>
                    {game.steps[i]}
                    {index !== game.correct_order.length - 1 && " → "}
                  </span>
                ))}
              </div>
            ) : (
              <div className="correct-placeholder">
                (Answer will be shown after correct attempt)
              </div>
            )}
          </div>
          </div>

        </div>
      </div>
  );
}

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}