import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRecommendedQuiz } from "../api/quizApi";

export default function RecommendedQuiz() {
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const studentId = localStorage.getItem("student_id");

    getRecommendedQuiz(studentId)
      .then(res => setQuizzes(res.data.quizzes))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>🎯 Recommended Quizzes</h2>

      {quizzes.length === 0 ? (
        <p>No recommended quizzes</p>
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
  borderRadius: 8
};