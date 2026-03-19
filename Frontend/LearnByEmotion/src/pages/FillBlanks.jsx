import { useEffect, useState } from "react";
import { getFillBlanks } from "../api/gamesApi";

export default function FillBlanks() {
  const [game, setGame] = useState(null);
  const [answers, setAnswers] = useState({});
  const [dragItem, setDragItem] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    getFillBlanks().then(res => setGame(res.data[0]));
  }, []);

  // 🔹 Handle drop into blank
  const handleDrop = (key) => {
    if (!dragItem) return;

    setAnswers(prev => ({
      ...prev,
      [key]: dragItem
    }));
  };

  // 🔹 Check answer
  const checkAnswer = () => {
    let correct = true;

    for (let key in game.correct_mapping) {
      if (
        (answers[key] || "").trim().toLowerCase() !==
        game.correct_mapping[key].trim().toLowerCase()
      ) {
        correct = false;
      }
    }

    setResult(correct ? "✅ Correct!" : "❌ Try again");
  };

  if (!game) return <p>Loading...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>✏️ Fill Blanks</h2>

      {/* 🔥 QUESTION WITH BLANKS */}
      <p style={{ fontSize: 18 }}>
        {game.question.split("____").map((part, i) => (
          <span key={i}>
            {part}

            {/* Blank box */}
            {i < Object.keys(game.correct_mapping).length && (
              <span
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDrop(i)}
                style={blankBox}
              >
                {answers[i] || "____"}
              </span>
            )}
          </span>
        ))}
      </p>

      {/* 🔥 OPTIONS */}
      <div style={{ marginTop: 20 }}>
        <h4>Options:</h4>

        {game.options.map((opt, i) => (
          <div
            key={i}
            draggable
            onDragStart={() => setDragItem(opt)}
            style={optionBox}
          >
            {opt}
          </div>
        ))}
      </div>

      {/* 🔥 CHECK BUTTON */}
      <button onClick={checkAnswer} style={{ marginTop: 20 }}>
        Check
      </button>

      {result && <p>{result}</p>}
    </div>
  );
}

const blankBox = {
  display: "inline-block",
  minWidth: 120,
  padding: "5px 10px",
  margin: "0 5px",
  border: "2px dashed #555",
  textAlign: "center"
};

const optionBox = {
  display: "inline-block",
  padding: "10px 15px",
  margin: "5px",
  background: "#ddd",
  cursor: "grab"
};