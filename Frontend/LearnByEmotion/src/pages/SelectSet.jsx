import { useEffect, useState } from "react";
import { getSelectSet } from "../api/gamesApi";

export default function SelectSet() {
  const [game, setGame] = useState(null);
  const [selected, setSelected] = useState([]);
  const [result, setResult] = useState(null);

  useEffect(() => {
    getSelectSet().then(res => setGame(res.data[0]));
  }, []);

  const toggleSelect = (item) => {
    setSelected(prev =>
      prev.includes(item)
        ? prev.filter(i => i !== item)
        : [...prev, item]
    );
  };

  const checkAnswer = () => {
    if (!game.correct_set) {
      alert("Data error");
      return;
    }

    const normalize = (arr) =>
      arr.map(i => i.trim().toLowerCase()).sort();

    const user = normalize(selected);
    const correct = normalize(game.correct_set);

    const isCorrect =
      JSON.stringify(user) === JSON.stringify(correct);

    setResult(isCorrect ? "✅ Correct!" : "❌ Try again");
  };

  if (!game) return <p>Loading...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>🎯 Select Set</h2>

      <p>{game.rule}</p>

      {game.items.map((item, i) => (
        <button
          key={i}
          onClick={() => toggleSelect(item)}
          style={{
            margin: 5,
            background: selected.includes(item) ? "green" : "lightgray"
          }}
        >
          {item}
        </button>
      ))}

      <br />
      <button onClick={checkAnswer}>Check</button>

      {result && <p>{result}</p>}
    </div>
  );
}