import { useNavigate } from "react-router-dom";

export default function Games() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: 20 }}>
      <h2>🎮 Games</h2>

      <div style={card} onClick={() => navigate("/games/match-flow")}>
        Match Flow
      </div>

      <div style={card} onClick={() => navigate("/games/select-set")}>
        Select Set
      </div>

      <div style={card} onClick={() => navigate("/games/fill-blanks")}>
        Fill Blanks
      </div>
    </div>
  );
}

const card = {
  padding: 20,
  marginBottom: 15,
  background: "#fff",
  cursor: "pointer"
};