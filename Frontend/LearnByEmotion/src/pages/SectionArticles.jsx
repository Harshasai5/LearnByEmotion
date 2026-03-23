import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./css/article.css";
import logoutIcon from "../assets/logout.png";

export default function SectionArticles() {
  const { sectionId } = useParams();
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);

  const studentId = localStorage.getItem("student_id"); // 🔥 NEW

  useEffect(() => {
    fetch(
      `http://127.0.0.1:8000/sections/${sectionId}/articles?student_id=${studentId}` // 🔥 UPDATED
    )
      .then(res => res.json())
      .then(data => {
        console.log("📘 Articles with emotion:", data); // 🔥 DEBUG
        setArticles(data);
      })
      .catch(err => console.error("❌ Fetch error:", err));
  }, [sectionId, studentId]);

  // 🔥 Logout
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="article-container">

      {/* 🔝 NAVBAR */}
      <div className="article-navbar">

        <div className="nav-left">
          <button onClick={() => navigate(-1)} className="back-btn">
            ← Back
          </button>
        </div>

        <h2 className="course-logo">LearnByEmotion</h2>

        <div className="nav-right">
          <div className="logout-icon" onClick={logout}>
            <img src={logoutIcon} alt="logout" />
          </div>
        </div>

      </div>

      <div className="article-main">

        {/* LEFT SIDE */}
        <div className="article-left">

          <div className="article-header">
            <span className="topic-badge">Topic</span>

            <button
              className="chat-btn"
              onClick={() => navigate("/chat")}
            >
              Chat
            </button>
          </div>

          {/* ARTICLES LIST */}
          {articles.length === 0 ? (
            <p>No articles available</p>
          ) : (
            articles.map(article => (
              <div key={article.article_id} className="article-item">

                {/* LEFT */}
                <div className="article-left-content">
                  <span className="tick">
                    {article.completed ? "✔" : "○"}
                  </span>

                  <span className="article-title">
                    {article.article_title}
                  </span>
                </div>

                {/* RIGHT */}
                <div className="article-right-content">

                  {/* 🔥 EMOTION FIX */}
                  {article.completed && (
                    <span
                      className={`emotion-text ${article.emotion || "neutral"}`}
                    >
                      {article.emotion || "Neutral"}
                    </span>
                  )}

                  <button
                    className="emotion-btn"
                    onClick={() =>
                      navigate(`/articles/${article.article_id}`)
                    }
                  >
                    →
                  </button>

                </div>

              </div>
            ))
          )}

        </div>

        {/* RIGHT SIDE PANEL */}
        <div className="article-right">

          <h3>Activities</h3>

          <div
            className="activity-card"
            onClick={() => navigate("/games/match-flow")}
          >
            🎮 Match Flow
          </div>

          <div
            className="activity-card"
            onClick={() => navigate("/games/fill-blanks")}
          >
            ✏️ Fill in the Blanks
          </div>

          <div
            className="activity-card"
            onClick={() => navigate("/games/select-set")}
          >
            🧩 Select Set
          </div>

          <div
            className="activity-card"
            onClick={() => navigate("/quiz")}
          >
            🧠 Quiz
          </div>

        </div>

      </div>
    </div>
  );
}