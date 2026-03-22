import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SuggestionBox from "../components/SuggestionBox";
import "./css/articleReader.css";

export default function ArticleReader() {
  const { articleId } = useParams();
  const navigate = useNavigate();

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
  <div className="reader-container">

    {/* 🔝 TOP BAR */}
    <div className="top-bar">

      <div className="nav-left">
        <button onClick={() => navigate(-1)} className="back-btn">
          ← Back
        </button>
      </div>

      <div className="nav-center user-name">
        👤 {studentName}
      </div>

      <div className="nav-right"></div>

    </div>

    {/* 📖 ARTICLE */}
    <div className="article-box">

      <h2 className="article-title">
        {article.article_title}
      </h2>

      <div className="article-content">
        {article.article_content.split("\n").map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>

      {!completed && (
        <button className="complete-btn" onClick={handleComplete}>
          ✔ Mark as Completed & Finish
        </button>
      )}

    </div>

    {/* 🔥 SUGGESTION */}
    {completed && (
      <div className="suggestion-wrapper">
        <SuggestionBox recommendation={recommendation} />
      </div>
    )}

  </div>
);
}