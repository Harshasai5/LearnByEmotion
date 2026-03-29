import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFillBlanks } from "../api/gamesApi";
import "./css/fill.css";

export default function FillBlanks() {
  const [games, setGames] = useState([]);
  const [options, setOptions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [dragItem, setDragItem] = useState(null);
  const [result, setResult] = useState(null);
  const [validation, setValidation] = useState({});

  const navigate = useNavigate();

  // 🔹 Load data
  useEffect(() => {
    getFillBlanks().then(res => {
      setGames(res.data.questions);
      setOptions(res.data.options);
    });
  }, []);

  // 🔹 Handle drop
  const handleDrop = (key) => {
    if (!dragItem) return;

    setAnswers(prev => ({
      ...prev,
      [key]: dragItem
    }));
  };

  // 🔹 Check answers
  const checkAnswer = () => {
    let resultMap = {};
    let correct = true;

    games.forEach((game, qIndex) => {
      Object.keys(game.correct_mapping).forEach((k) => {
        const key = `${qIndex}-${k}`;

        const userAns = (answers[key] || "").trim().toLowerCase();
        const correctAns = game.correct_mapping[k].trim().toLowerCase();

        if (userAns === correctAns) {
          resultMap[key] = "correct";
        } else {
          resultMap[key] = "wrong";
          correct = false;
        }
      });
    });

    setValidation(resultMap);

    if (correct) {
      setResult("🎉 All answers correct!");
    } else {
      setResult("❌ Some answers are wrong. Try again!");
    }
  };

  if (games.length === 0) return <p>Loading...</p>;

  return (
    <div className="fill-container">

      {/* 🔝 NAVBAR */}
      <div className="fill-navbar">
        <div className="nav-left">
          <button
            className="back-btn"
            onClick={() => navigate(-1)}
          >
            ← Back to Learning
          </button>
        </div>

        <h2 className="course-logo">LearnByEmotion</h2>

        <div className="nav-right"></div>
      </div>

      <div className="fill-main">

        {/* 🔹 LEFT PANEL - QUESTIONS */}
        <div className="questions-panel">

          {games.map((game, qIndex) => (
            <div key={qIndex} className="question-block">

              <p className="question-line">
                <b>{qIndex + 1}.</b>{" "}

                {game.question.split("____").map((part, i) => {
                  const key = `${qIndex}-${i}`;

                  return (
                    <span key={i}>
                      {part}

                      {i < Object.keys(game.correct_mapping).length && (
                        <span
                          className={`inline-blank 
                            ${answers[key] ? "filled" : ""} 
                            ${validation[key] === "correct" ? "correct" : ""} 
                            ${validation[key] === "wrong" ? "wrong" : ""}
                          `}
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={() => handleDrop(key)}
                        >
                          {answers[key] || "______"}
                        </span>
                      )}
                    </span>
                  );
                })}
              </p>

            </div>
          ))}

        </div>

        {/* 🔹 RIGHT PANEL - OPTIONS */}
        <div className="options-panel">

          <h3>Answers</h3>

          <div className="options-grid">
            {options.map((opt, i) => (
              <div
                key={i}
                draggable
                onDragStart={() => setDragItem(opt)}
                className="option-box"
              >
                {opt}
              </div>
            ))}
          </div>

          <button onClick={checkAnswer} className="check-btn">
            Check Answer
          </button>

          {result && <p className="result">{result}</p>}

        </div>

      </div>
    </div>
  );
}