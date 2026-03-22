import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import CourseDetail from "./pages/CourseDetail";
import SectionArticles from "./pages/SectionArticles";
import ArticleReader from "./pages/ArticleReader";

// Activities
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

// 🔒 Protected Route
const ProtectedRoute = ({ children }) => {
  const studentId = localStorage.getItem("student_id");
  return studentId ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Routes>

      {/* 🔓 PUBLIC ROUTES */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* 🔒 PROTECTED ROUTES */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      {/* 📘 LEARNING FLOW */}
      <Route
        path="/courses/:courseId"
        element={
          <ProtectedRoute>
            <CourseDetail />
          </ProtectedRoute>
        }
      />

      <Route
        path="/sections/:sectionId/articles"
        element={
          <ProtectedRoute>
            <SectionArticles />
          </ProtectedRoute>
        }
      />

      <Route
        path="/articles/:articleId"
        element={
          <ProtectedRoute>
            <ArticleReader />
          </ProtectedRoute>
        }
      />

      {/* 🎮 ACTIVITIES */}
      <Route
        path="/games"
        element={
          <ProtectedRoute>
            <Games />
          </ProtectedRoute>
        }
      />

      <Route
        path="/games/match-flow"
        element={
          <ProtectedRoute>
            <MatchFlow />
          </ProtectedRoute>
        }
      />

      <Route
        path="/games/fill-blanks"
        element={
          <ProtectedRoute>
            <FillBlanks />
          </ProtectedRoute>
        }
      />

      <Route
        path="/games/select-set"
        element={
          <ProtectedRoute>
            <SelectSet />
          </ProtectedRoute>
        }
      />

      {/* 🧠 QUIZ */}
      <Route
        path="/quiz"
        element={
          <ProtectedRoute>
            <QuizList />
          </ProtectedRoute>
        }
      />

      <Route
        path="/quiz/play"
        element={
          <ProtectedRoute>
            <QuizPlay />
          </ProtectedRoute>
        }
      />

      <Route
        path="/quiz/recommended"
        element={
          <ProtectedRoute>
            <RecommendedQuiz />
          </ProtectedRoute>
        }
      />

      {/* 🧘 EXTRA */}
      <Route
        path="/break"
        element={
          <ProtectedRoute>
            <Break />
          </ProtectedRoute>
        }
      />

      <Route
        path="/deepdive"
        element={
          <ProtectedRoute>
            <DeepDive />
          </ProtectedRoute>
        }
      />

      <Route
        path="/chat"
        element={
          <ProtectedRoute>
            <Chat />
          </ProtectedRoute>
        }
      />

      {/* 🔁 FALLBACK */}
      <Route path="*" element={<Navigate to="/" />} />

    </Routes>
  );
}

export default App;