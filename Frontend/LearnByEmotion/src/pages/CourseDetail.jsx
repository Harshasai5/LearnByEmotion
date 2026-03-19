import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function CourseDetail() {
  const { courseId } = useParams();
  const navigate = useNavigate();

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
    <div style={{ padding: 30 }}>
      <h2>Course Details</h2>

      {!isEnrolled ? (
        // ❌ NOT ENROLLED
        <div>
          <p>You are not enrolled in this course.</p>
          <button onClick={handleEnroll}>
            Register for Course
          </button>
        </div>
      ) : (
        // ✅ ENROLLED
        <div>
          <h3>Course Sections</h3>

          {sections.length === 0 ? (
            <p>No sections available</p>
          ) : (
            sections.map(section => (
              <div key={section.section_id} style={cardStyle}>
                <h3>{section.section_name}</h3>

                <button
                  onClick={() =>
                    navigate(`/sections/${section.section_id}/articles`)
                  }
                >
                  View Articles
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

const cardStyle = {
  background: "#fff",
  padding: 20,
  marginBottom: 15,
  borderRadius: 8,
  boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
};