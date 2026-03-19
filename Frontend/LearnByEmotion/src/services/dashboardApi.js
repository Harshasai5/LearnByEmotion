export async function getDashboard(studentId) {
  const res = await fetch(`http://127.0.0.1:8000/dashboard/${studentId}`);
  return res.json();
}
