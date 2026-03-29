import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllQuiz } from "../api/quizApi";
import "./CSS/quizlist.css";

export default function QuizList() {
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllQuiz()
      .then(res => setQuizzes(res.data.quizzes))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="quiz-page">

      {/* 🔷 NAVBAR */}
      <div className="navbar">
        <div className="nav-top">
          <button className="back-btn" onClick={() => navigate("/home")}>
            ← Back
          </button>

          <div className="logo">LearnByEmotion</div>
        </div>
      </div>

      {/* 🎮 CONTENT */}
      <div className="quiz-container">

        {quizzes.length === 0 ? (
          <p className="loading">Loading quizzes...</p>
        ) : (
          <div className="quiz-grid">
            {quizzes.map((quiz, i) => (
              <div key={i} className="quiz-card">

                <h3>{quiz.quiz_name}</h3>

                <button
                  className="start-btn"
                  onClick={() =>
                    navigate("/quiz/play", { state: quiz })
                  }
                >
                  Start Quiz →
                </button>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}