import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./CSS/quizplay.css";
import bg from "../assets/bg.png";

export default function QuizPlay() {
  const { state } = useLocation();
  const navigate = useNavigate();

 

  const questions = state.questions;

  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  
   if (!state) return <p>No quiz selected ❌</p>;

  const q = questions[current];

  const handleAnswer = (opt) => {
    const isCorrect = opt === q.correct_answer;

    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      alert(
        `🎉 Quiz Completed!\nScore: ${
          score + (isCorrect ? 1 : 0)
        }/${questions.length}`
      );
      navigate("/quiz");
    }
  };

  return (
    <div
      className="quizplay-page"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      {/* 🔷 NAVBAR */}
      <div className="navbar">
        <div className="nav-top">
          <button className="back-btn" onClick={() => navigate("/quiz")}>
            ← Back
          </button>

          <div className="logo">LearnByEmotion</div>
        </div>
      </div>

      {/* 🎮 CONTENT */}
      <div className="quizplay-container">

        {/* 🧠 QUIZ CARD */}
        <div className="quiz-card">

          {/* QUESTION */}
          <div className="question-box">
            {q.question}
          </div>

          {/* OPTIONS */}
          <div className="options-container">
            {q.options.map((opt, i) => (
              <button
                key={i}
                className="option-btn"
                onClick={() => handleAnswer(opt)}
              >
                {opt}
              </button>
            ))}
          </div>

          {/* 📊 PROGRESS (INSIDE & BELOW OPTIONS) */}
          <div className="progress-wrapper">
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{
                  width: `${((current + 1) / questions.length) * 100}%`
                }}
              ></div>
            </div>

            <p className="progress-text">
              Question {current + 1} / {questions.length}
            </p>
          </div>

        </div>

        {/* SCORE */}
        <div className="score-box">
          Score: {score}
        </div>

      </div>
    </div>
  );
}