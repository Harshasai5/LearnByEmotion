// import { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import quizApi from "../api/quizApi";

// export default function Quiz() {
//   const [questions, setQuestions] = useState([]);
//   const [current, setCurrent] = useState(0);
//   const [score, setScore] = useState(0);
//   const [finished, setFinished] = useState(false);

//   const location = useLocation();

//   useEffect(() => {
//     const fromRecommendation = location.state?.recommended;

//     if (fromRecommendation) {
//       const completedArticles = [1, 2]; // TODO: fetch dynamically

//       quizApi.getQuizByArticles(completedArticles)
//         .then(res => setQuestions(res.data.questions))
//         .catch(err => console.log(err));
//     } else {
//       quizApi.getAllQuiz()
//         .then(res => setQuestions(res.data.questions))
//         .catch(err => console.log(err));
//     }
//   }, []);

//   const handleAnswer = (option) => {
//     if (option === questions[current].correct_answer) {
//       setScore(prev => prev + 1);
//     }

//     if (current + 1 < questions.length) {
//       setCurrent(prev => prev + 1);
//     } else {
//       setFinished(true);
//     }
//   };

//   if (questions.length === 0) return <p>Loading quiz...</p>;

//   if (finished) {
//     return (
//       <div style={{ padding: 20 }}>
//         <h2>🎉 Quiz Completed</h2>
//         <h3>Score: {score} / {questions.length}</h3>
//       </div>
//     );
//   }

//   const q = questions[current];

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>🧠 Quiz</h2>

//       <h3>{q.question}</h3>

//       <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
//         {q.options.map((opt, i) => (
//           <button key={i} onClick={() => handleAnswer(opt)}>
//             {opt}
//           </button>
//         ))}
//       </div>

//       <p style={{ marginTop: "20px" }}>
//         Question {current + 1} / {questions.length}
//       </p>

//       <p>Score: {score}</p>
//     </div>
//   );
// }