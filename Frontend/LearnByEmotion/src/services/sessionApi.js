const API_BASE = "http://127.0.0.1:8000";

export async function startSession(data) {
  try {
    const params = new URLSearchParams(data).toString();

    const res = await fetch(`${API_BASE}/sessions/start?${params}`, {
      method: "POST",
    });

    if (!res.ok) throw new Error("Failed to start session");

    const result = await res.json();

    console.log("✅ Session Started:", result);

    return result;

  } catch (err) {
    console.error("❌ startSession error:", err);
    return null;
  }
}


export async function endSession(sessionId) {
  try {
    const res = await fetch(
      `${API_BASE}/sessions/end?session_id=${sessionId}`,
      { method: "POST" }
    );

    if (!res.ok) throw new Error("Failed to end session");

    const result = await res.json();

    console.log("🔥 END SESSION RESPONSE:", result);

    // ✅ SAFE RETURN STRUCTURE
    return {
      final_emotion: result.final_emotion || "Neutral",
      recommendation: {
        emotion: result.recommendation?.emotion || "Neutral",
        action: result.recommendation?.action || "continue"
      }
    };

  } catch (err) {
    console.error("❌ endSession error:", err);

    // ✅ fallback
    return {
      final_emotion: "Neutral",
      recommendation: {
        emotion: "Neutral",
        action: "continue"
      }
    };
  }
}