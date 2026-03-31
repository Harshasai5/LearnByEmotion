import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDashboard } from "../services/dashboardApi";
import "./css/home.css";
import logoutIcon from "../assets/logout.png";

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

        {/* TOP */}
        <div className="nav-top">
          <div></div>

          <h2 className="logo">LearnByEmotion</h2>

          <div className="logout-icon" onClick={logout}>
            <img src={logoutIcon} alt="logout" />
          </div>
        </div>

        {/* BOTTOM */}
        <div className="nav-bottom">
          <span className="welcome-text">
            Welcome, {data.student.name} 👋
          </span>
        </div>

      </nav>

      {/* 🔥 MAIN LAYOUT */}
      <div className="main-layout">

        {/* LEFT SIDE */}
        <div className="main-content">

          {/* REGISTERED COURSES */}
          <section>
            <h3>Your Courses</h3>
            {data.registered_courses.length === 0 ? (
              <p>No registered courses</p>
            ) : (
              <div className="course-scroll">
                {data.registered_courses.map(c => (
                  <div
                    key={c.course_id}
                    className="course-card"
                    onClick={() => navigate(`/courses/${c.course_id}`)}
                  >
                    <h4>{c.course_name}</h4>

                    <div className="progress-container">
                      <div
                        className="progress-bar"
                        style={{ width: `${c.progress}%` }}
                      ></div>
                    </div>

                    <p className="progress-text">{c.progress}% Completed</p>
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

        {/* RIGHT SIDE */}
        <div className="activity-panel">

          <h3>Activities</h3>
          {/* FULL WIDTH */}
          <button 
            className="full-btn"
            onClick={() => navigate("/chat")}
          >
            🤖 AI Tutor
          </button>
          
          {/* TWO BUTTONS ROW */}
          <div className="activity-row">
            <button onClick={() => navigate("/quiz")}>🧠 Quiz</button>
            <button
              onClick={() => navigate("/games", { state: { from: "home" } })}
            >
              🎮 Games
            </button>
          </div>

        </div>

      </div>

    </div>
    
  );
}