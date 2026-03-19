import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllQuiz } from "../api/quizApi";

export default function QuizList() {
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllQuiz()
      .then(res => setQuizzes(res.data.quizzes))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>📚 All Quizzes</h2>

      {quizzes.length === 0 ? (
        <p>Loading quizzes...</p>
      ) : (
        quizzes.map((quiz, i) => (
          <div key={i} style={cardStyle}>
            <h3>{quiz.quiz_name}</h3>

            <button
              onClick={() =>
                navigate("/quiz/play", { state: quiz })
              }
            >
              Start Quiz →
            </button>
          </div>
        ))
      )}
    </div>
  );
}

const cardStyle = {
  background: "#fff",
  padding: 20,
  marginBottom: 15,
  borderRadius: 8,
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
};