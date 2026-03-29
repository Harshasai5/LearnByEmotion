import { useNavigate } from "react-router-dom";
import "./CSS/games.css";
import logoutIcon from "../assets/logout.png";

export default function Games() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const games = [
    {
      title: "Match Flow",
      emoji: "🔄",
      path: "/games/match-flow",
      color: "gradient-green",
    },
    {
      title: "Select Set",
      emoji: "🧠",
      path: "/games/select-set",
      color: "gradient-yellow",
    },
    {
      title: "Fill Blanks",
      emoji: "✏️",
      path: "/games/fill-blanks",
      color: "gradient-pink",
    },
  ];

  return (
    <div className="games-page">

      {/* 🔷 NAVBAR */}
      <div className="top-navbar">
        <h1 className="app-title">LearnByEmotion</h1>

        <div className="logout-icon" onClick={handleLogout}>
          <img src={logoutIcon} alt="logout" />
        </div>
      </div>

      {/* 🎮 CONTENT */}
      <div className="games-container">
        
        {/* 🎮 Styled Title */}
        <div className="games-header">
          <span className="games-emoji">🎮</span>
          <h2 className="games-title">Games</h2>
        </div>

        <div className="games-grid">
          {games.map((game, index) => (
            <div
              key={index}
              className={`game-card ${game.color}`}
              onClick={() => navigate(game.path)}
            >
              <div className="game-emoji">{game.emoji}</div>
              <h3>{game.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}