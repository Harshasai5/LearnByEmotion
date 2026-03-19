import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function SectionArticles() {
  const { sectionId } = useParams();
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/sections/${sectionId}/articles`)
      .then(res => res.json())
      .then(data => setArticles(data));
  }, [sectionId]);

  return (
    <div style={{ padding: 30 }}>
      <h2>Articles</h2>

      {articles.map(article => (
        <div key={article.article_id} style={cardStyle}>
          <h3>{article.article_title}</h3>
          <button
            onClick={() =>
              navigate(`/articles/${article.article_id}`)
            }
          >
            Read Article
          </button>
        </div>
      ))}
    </div>
  );
}

const cardStyle = {
  background: "#fff",
  padding: 20,
  marginBottom: 15,
  borderRadius: 8,
  boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
};
