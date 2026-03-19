import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SuggestionBox from "../components/SuggestionBox";

export default function ArticleReader() {
  const { articleId } = useParams();

  const studentId = Number(localStorage.getItem("student_id"));
  const studentName = localStorage.getItem("student_name");

  const [article, setArticle] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [recommendation, setRecommendation] = useState(null);
  const [completed, setCompleted] = useState(false);

  // 🔹 Fetch article
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/articles/${articleId}`)
      .then(res => res.json())
      .then(setArticle)
      .catch(err => console.error(err));
  }, [articleId]);

  // 🔹 Start session
  useEffect(() => {
    if (!article || !studentId) return;

    fetch(
      `http://127.0.0.1:8000/sessions/start?student_id=${studentId}&course_id=${article.course_id}&section_id=${article.section_id}&article_id=${article.article_id}`,
      { method: "POST" }
    )
      .then(res => res.json())
      .then(data => setSessionId(data.session_id))
      .catch(err => console.error(err));
  }, [article]);

  // 🔥 COMPLETE FLOW
  const handleComplete = async () => {
    try {
      // ✅ Save progress
      await fetch("http://127.0.0.1:8000/progress/complete-article", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          student_id: studentId,
          course_id: article.course_id,
          section_id: article.section_id,
          article_id: article.article_id
        })
      });

      // ✅ End session
      const res = await fetch(
        `http://127.0.0.1:8000/sessions/end?session_id=${sessionId}`,
        { method: "POST" }
      );

      const data = await res.json();

      setRecommendation(data.recommendation);
      setCompleted(true);

    } catch (err) {
      console.error(err);
    }
  };

  if (!article) return <p>Loading...</p>;

  return (
    <div style={{ padding: 30 }}>
      <h3>👤 {studentName}</h3>

      <h2>{article.article_title}</h2>

      <p style={{ whiteSpace: "pre-line" }}>
        {article.article_content}
      </p>

      {!completed && (
        <button onClick={handleComplete} style={btnStyle}>
          ✅ Mark as Completed & Finish
        </button>
      )}

      <SuggestionBox recommendation={recommendation} />
    </div>
  );
}

const btnStyle = {
  marginTop: 30,
  padding: "10px 15px",
  background: "#4CAF50",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer"
};