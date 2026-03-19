const API = "http://127.0.0.1:8000/courses";

export async function fetchCourses() {
  const res = await fetch(API);
  return res.json();
}
