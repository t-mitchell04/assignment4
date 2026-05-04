"use client";
import { useState } from "react";
import { titles } from "@/data/titles";

export default function LeaderboardPage() {
  const [view, setView] = useState<"current" | "predicted">("current");

  const sorted = [...titles].sort((a, b) =>
    view === "current" ? b.currentScore - a.currentScore : b.predictedScore - a.predictedScore
  );

  const medalColors = ["#FFD700", "#C0C0C0", "#CD7F32"];

  return (
    <div className="fade-in">
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 28 }}>
        <div>
          <div style={{ fontSize: 11, color: "var(--text-muted)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>Rankings</div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: 38, letterSpacing: 2 }}>LEADERBOARD</h1>
        </div>
        <div style={{ display: "flex", gap: 4, background: "var(--bg-elevated)", borderRadius: 10, padding: 4 }}>
          {(["current", "predicted"] as const).map(v => (
            <button key={v} onClick={() => setView(v)} style={{
              padding: "7px 16px",
              borderRadius: 7,
              border: "none",
              background: view === v ? "var(--accent)" : "transparent",
              color: view === v ? "white" : "var(--text-secondary)",
              fontWeight: 600, fontSize: 12, cursor: "pointer",
              textTransform: "capitalize", letterSpacing: "0.04em",
            }}>{v === "current" ? "Current Score" : "Predicted Score"}</button>
          ))}
        </div>
      </div>

      {/* Full Rankings Table */}
      <div className="card" style={{ overflow: "hidden" }}>
        <div style={{ padding: "16px 22px", borderBottom: "1px solid var(--border)", display: "flex", gap: 20 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: "var(--text-muted)", letterSpacing: "0.08em", textTransform: "uppercase", width: 32 }}>#</span>
          <span style={{ fontSize: 11, fontWeight: 700, color: "var(--text-muted)", letterSpacing: "0.08em", textTransform: "uppercase", flex: 1 }}>Title</span>
          <span style={{ fontSize: 11, fontWeight: 700, color: "var(--text-muted)", letterSpacing: "0.08em", textTransform: "uppercase", width: 80 }}>Genre</span>
          <span style={{ fontSize: 11, fontWeight: 700, color: "var(--text-muted)", letterSpacing: "0.08em", textTransform: "uppercase", width: 80 }}>Views</span>
          <span style={{ fontSize: 11, fontWeight: 700, color: "var(--text-muted)", letterSpacing: "0.08em", textTransform: "uppercase", width: 70 }}>Score</span>
        </div>
        {sorted.map((t, idx) => {
          const score = view === "current" ? t.currentScore : t.predictedScore;
          const barWidth = (score / 10) * 100;
          return (
            <div key={t.id} style={{
              display: "flex", alignItems: "center", gap: 20,
              padding: "14px 22px",
              borderBottom: idx < sorted.length - 1 ? "1px solid var(--border)" : "none",
              transition: "background 0.15s",
              cursor: "pointer",
            }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "var(--bg-elevated)"}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "transparent"}
            >
              <div style={{
                width: 32, fontSize: 13, fontWeight: 700,
                color: idx < 3 ? medalColors[idx] : "var(--text-muted)",
                fontFamily: "var(--font-mono)",
              }}>{String(idx + 1).padStart(2, "0")}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 13 }}>{t.title}</div>
                <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 2 }}>{t.releaseYear} • {t.cast.slice(0, 2).join(", ")}</div>
              </div>
              <div style={{ width: 80, fontSize: 12, color: "var(--text-secondary)" }}>{t.genre}</div>
              <div style={{ width: 80, fontSize: 12, fontFamily: "var(--font-mono)", color: "var(--text-secondary)" }}>{t.views}M</div>
              <div style={{ width: 70 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ flex: 1, height: 4, background: "var(--bg-elevated)", borderRadius: 2, overflow: "hidden" }}>
                    <div style={{ width: `${barWidth}%`, height: "100%", background: score >= 8.5 ? "var(--accent)" : score >= 7 ? "#f59e0b" : "#6b7280", borderRadius: 2 }} />
                  </div>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 700, color: score >= 8.5 ? "var(--accent)" : "var(--text-primary)" }}>{score.toFixed(1)}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
