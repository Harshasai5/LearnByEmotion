import { useNavigate } from "react-router-dom";

function SuggestionBox({ recommendation }) {
  const navigate = useNavigate();

  if (!recommendation) return null;

  const action = recommendation.action;

  const handleNavigate = () => {
    if (action === "games") navigate("/games");
    else if (action === "chatbot") navigate("/chat");
    else if (action === "quiz") navigate("/quiz");
    else if (action === "break") navigate("/break");
    else if (action === "deepdive") navigate("/deepdive");
  };

  const getMessage = () => {
    switch (action) {
      case "games":
        return "You seem bored 😴. Let's play a quick game!";
      case "chatbot":
        return "You're confused. Ask AI Tutor 🤖";
      case "quiz":
        return "Feeling anxious? Try a quick quiz 🧠";
      case "break":
        return "You're frustrated. Take a short break ☕";
      case "deepdive":
        return "You're doing great! Go deeper 🚀";
      default:
        return "Keep learning 👍";
    }
  };

  return (
    <div style={boxStyle}>
      <h3>💡 Suggested for You</h3>

      <p><strong>Emotion:</strong> {recommendation?.emotion || "N/A"}</p>
      <p><strong>Suggestion:</strong> {getMessage()}</p>

      {action !== "continue" && (
        <button onClick={handleNavigate}>Go Now →</button>
      )}
    </div>
  );
}

const boxStyle = {
  border: "2px solid #4CAF50",
  padding: "16px",
  marginTop: "20px",
  borderRadius: "8px",
  backgroundColor: "#f9fff9"
};

export default SuggestionBox;