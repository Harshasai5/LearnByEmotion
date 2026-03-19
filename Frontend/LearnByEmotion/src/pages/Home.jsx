import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDashboard } from "../services/dashboardApi";
import "./css/home.css";

export default function Home() {
  const studentId = localStorage.getItem("student_id");
  const navigate = useNavigate();

  const [data, setData] = useState(null);

  useEffect(() => {
    if (!studentId) navigate("/login");
    getDashboard(studentId).then(setData);
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  if (!data) return <p>Loading dashboard...</p>;

  return (
    <div className="home-container">
      
      {/* 🔥 NAVBAR */}
      <nav className="navbar">
        <h2 className="logo">LearnByEmotion</h2>

        <div className="nav-links">
          <button onClick={() => navigate("/")}>Home</button>

          {/* Activities Dropdown */}
          <div className="dropdown">
            <button className="dropbtn">Activities ⬇</button>
            <div className="dropdown-content">
              <p onClick={() => navigate("/quiz")}>🧠 Quiz</p>
              <p onClick={() => navigate("/games")}>🎮 Games</p>
              <p onClick={() => navigate("/chat")}>🤖 AI Tutor</p>
            </div>
          </div>

          <button onClick={logout}>Logout</button>
        </div>
      </nav>

      {/* HEADER */}
      <header className="home-header">
        <h2>Welcome, {data.student.name} 👋</h2>
      </header>

      {/* REGISTERED COURSES */}
      <section>
        <h3>Your Courses</h3>
        {data.registered_courses.length === 0 ? (
          <p>No registered courses</p>
        ) : (
          <div className="course-grid">
            {data.registered_courses.map(c => (
              <div
                key={c.course_id}
                className="course-card"
                onClick={() => navigate(`/courses/${c.course_id}`)}
              >
                <h4>{c.course_name}</h4>
                <p>Progress: {c.progress}%</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ALL COURSES */}
      <section>
        <h3>All Courses</h3>
        <div className="course-grid">
          {data.all_courses.map(c => (
            <div key={c.course_id} className="course-card">
              <h4>{c.course_name}</h4>
              <p>{c.description}</p>
              <button onClick={() => navigate(`/courses/${c.course_id}`)}>
                View
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}