import { useEffect, useState } from "react";
import { getMatchFlow } from "../api/gamesApi";

export default function MatchFlow() {
  const [game, setGame] = useState(null);
  const [items, setItems] = useState([]);
  const [result, setResult] = useState(null);

  useEffect(() => {
    getMatchFlow().then(res => {
      const g = res.data[0];
      setGame(g);
      setItems(shuffle(g.steps)); // random order
    });
  }, []);

  const handleDrop = (dragIndex, hoverIndex) => {
    const newItems = [...items];
    const temp = newItems[dragIndex];
    newItems[dragIndex] = newItems[hoverIndex];
    newItems[hoverIndex] = temp;
    setItems(newItems);
  };

    const checkAnswer = () => {
    // 🔹 Get index of each item in original steps
    const userOrderIndexes = items.map(item =>
        game.steps.indexOf(item)
    );

    console.log("USER INDEX ORDER:", userOrderIndexes);
    console.log("CORRECT ORDER:", game.correct_order);

    const isCorrect =
        JSON.stringify(userOrderIndexes) ===
        JSON.stringify(game.correct_order);

    setResult(isCorrect ? "✅ Correct!" : "❌ Wrong order");
    };

  if (!game) return <p>Loading...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>🔀 Match Flow</h2>

      {items.map((item, index) => (
        <div
          key={index}
          draggable
          onDragStart={(e) => e.dataTransfer.setData("index", index)}
          onDrop={(e) => {
            const dragIndex = e.dataTransfer.getData("index");
            handleDrop(dragIndex, index);
          }}
          onDragOver={(e) => e.preventDefault()}
          style={card}
        >
          {item}
        </div>
      ))}

      <button onClick={checkAnswer}>Check</button>

      {result && <p>{result}</p>}
    </div>
  );
}

const card = {
  padding: 10,
  margin: "10px 0",
  background: "#eee",
  cursor: "move"
};

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}