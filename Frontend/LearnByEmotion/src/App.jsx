import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import CourseDetail from "./pages/CourseDetail";
import SectionArticles from "./pages/SectionArticles";
import ArticleReader from "./pages/ArticleReader";


// ✅ NEW IMPORTS
import Games from "./pages/Games";
import MatchFlow from "./pages/MatchFlow";
import SelectSet from "./pages/SelectSet";
import FillBlanks from "./pages/FillBlanks";
import QuizList from "./pages/QuizList";
import QuizPlay from "./pages/QuizPlay";
import RecommendedQuiz from "./pages/RecommendedQuiz";
import Break from "./pages/Break";
import DeepDive from "./pages/DeepDive";
import Chat from "./pages/Chat";


const ProtectedRoute = ({ children }) => {
  const studentId = localStorage.getItem("student_id");
  return studentId ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      {/* Learning Flow */}
      <Route path="/courses/:courseId" element={<CourseDetail />} />
      <Route path="/sections/:sectionId/articles" element={<SectionArticles />} />
      <Route path="/articles/:articleId" element={<ArticleReader />} />

      {/* ✅ NEW RECOMMENDATION ROUTES */}
      <Route path="/games" element={<Games />} />
      <Route path="/games/match-flow" element={<MatchFlow />} />
      <Route path="/games/select-set" element={<SelectSet />} />
      <Route path="/games/fill-blanks" element={<FillBlanks />} />      
      <Route path="/quiz" element={<QuizList />} />
      <Route path="/quiz/play" element={<QuizPlay />} />
      <Route path="/quiz/recommended" element={<RecommendedQuiz />} />   
      <Route path="/break" element={<Break />} />
      <Route path="/deepdive" element={<DeepDive />} />
      <Route path="/chat" element={<Chat />} />


      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;