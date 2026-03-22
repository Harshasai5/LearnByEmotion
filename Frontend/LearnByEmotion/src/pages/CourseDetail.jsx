import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./css/course.css";
import logoutIcon from "../assets/logout.png";

export default function CourseDetail() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const logout = () => {
  localStorage.clear();
  navigate("/login");
};

  const studentId = localStorage.getItem("student_id");

  const [sections, setSections] = useState([]);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [loading, setLoading] = useState(true);

  // 🔥 Check enrollment first
  useEffect(() => {
    fetch("http://127.0.0.1:8000/courses/check-enrollment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        student_id: studentId,
        course_id: parseInt(courseId)
      })
    })
      .then(res => res.json())
      .then(data => {
        setIsEnrolled(data.enrolled);
        setLoading(false);
      })
      .catch(err => console.log(err));
  }, [courseId]);

  // 🔥 Fetch sections ONLY if enrolled
  useEffect(() => {
    if (!isEnrolled) return;

    fetch(`http://127.0.0.1:8000/courses/${courseId}/sections`)
      .then(res => res.json())
      .then(data => setSections(data))
      .catch(err => console.log(err));
  }, [courseId, isEnrolled]);

  // 🔥 Enroll function
  const handleEnroll = async () => {
    await fetch("http://127.0.0.1:8000/courses/enroll", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        student_id: studentId,
        course_id: parseInt(courseId)
      })
    });

    alert("Successfully enrolled 🎉");
    setIsEnrolled(true);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="course-container">

      {/* NAVBAR */}
      <div className="course-navbar">
        <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
        <h2 className="course-logo">LearnByEmotion</h2>
        <div className="logout-icon" onClick={logout}>
          <img src={logoutIcon} alt="logout" />
        </div>
      </div>

      {!isEnrolled ? (
        <div className="enroll-box">
          <p>You are not enrolled in this course.</p>
          <button className="start-btn" onClick={handleEnroll}>
            Register for Course
          </button>
        </div>
      ) : (
        <>
          {/* HEADER */}
          <div className="course-header">
            <h2>Course Sections</h2>

            <div className="progress-container">
              <div className="progress-bar" style={{ width: "40%" }}></div>
            </div>
          </div>

          {/* TOPICS */}
          <div className="topics-list">
            {sections.length === 0 ? (
              <p>No sections available</p>
            ) : (
              sections.map(section => (
                <div key={section.section_id} className="topic-item">

                  <span>○</span>

                  <span className="topic-name">
                    {section.section_name}
                  </span>

                  <button
                    className="start-btn"
                    onClick={() =>
                      navigate(`/sections/${section.section_id}/articles`)
                    }
                  >
                    Start →
                  </button>

                </div>
              ))
            )}
          </div>
        </>
      )}

    </div>
  );
}
