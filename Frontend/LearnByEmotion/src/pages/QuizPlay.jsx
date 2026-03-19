/* eslint-disable react-hooks/rules-of-hooks */
import { useLocation } from "react-router-dom";
import { useState } from "react";

export default function QuizPlay() {
  const { state } = useLocation();

  if (!state) return <p>No quiz selected ❌</p>;

  const questions = state.questions;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);

  const q = questions[current];

  const handleAnswer = (opt) => {
    if (opt === q.correct_answer) {
      setScore(prev => prev + 1);
    }

    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      alert(`🎉 Quiz Completed!\nScore: ${score + 1}/${questions.length}`);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>🧠 Quiz</h2>

      <h3>{q.question}</h3>

      <div style={{ marginTop: 15 }}>
        {q.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleAnswer(opt)}
            style={btnStyle}
          >
            {opt}
          </button>
        ))}
      </div>

      <p style={{ marginTop: 20 }}>Score: {score}</p>
    </div>
  );
}

const btnStyle = {
  display: "block",
  margin: "10px 0",
  padding: "10px 15px",
  width: "200px"
};