"use client";
import { useState } from "react";
import { titles, AlertStatus } from "@/data/titles";

const filterOptions: (AlertStatus | "all")[] = ["all", "critical", "warning", "watch", "normal"];

export default function AlertsPage() {
  const [filter, setFilter] = useState<AlertStatus | "all">("all");

  const filtered = filter === "all" ? titles.filter(t => t.alertStatus !== "normal") : titles.filter(t => t.alertStatus === filter);
  const criticalCount = titles.filter(t => t.alertStatus === "critical").length;
  const warningCount = titles.filter(t => t.alertStatus === "warning").length;
  const watchCount = titles.filter(t => t.alertStatus === "watch").length;

  const alertIcons: Record<AlertStatus, string> = {
    critical: "🚨",
    warning: "⚠️",
    watch: "👁️",
    normal: "✅",
  };

  return (
    <div className="fade-in">
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 11, color: "var(--text-muted)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>Signal Center</div>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: 38, letterSpacing: 2 }}>ALERTS</h1>
      </div>

      {/* Stats Row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 24 }}>
        {[
          { label: "Critical", count: criticalCount, color: "#e50914", bg: "rgba(229,9,20,0.1)" },
          { label: "Warning", count: warningCount, color: "#f59e0b", bg: "rgba(245,158,11,0.1)" },
          { label: "Watch", count: watchCount, color: "#3b82f6", bg: "rgba(59,130,246,0.1)" },
        ].map(s => (
          <div key={s.label} className="card" style={{ padding: "18px 22px", borderColor: `${s.color}30` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 32, fontWeight: 900, fontFamily: "var(--font-mono)", color: s.color }}>{s.count}</div>
                <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>{s.label} alerts</div>
              </div>
              <div style={{ width: 44, height: 44, borderRadius: 10, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>
                {s.label === "Critical" ? "🚨" : s.label === "Warning" ? "⚠️" : "👁️"}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div style={{ display: "flex", gap: 6, marginBottom: 20 }}>
        {filterOptions.map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{
            padding: "7px 16px",
            background: filter === f ? (f === "critical" ? "var(--accent)" : f === "warning" ? "#f59e0b" : f === "watch" ? "#3b82f6" : "var(--bg-hover)") : "var(--bg-elevated)",
            border: "1px solid var(--border)", borderRadius: 7,
            color: "var(--text-primary)", fontSize: 12, fontWeight: filter === f ? 700 : 400,
            cursor: "pointer", textTransform: "capitalize",
          }}>{f === "all" ? "All Active" : f}</button>
        ))}
      </div>

      {/* Alert Cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {filtered.map(t => (
          <div key={t.id} className="card" style={{
            padding: "20px 24px",
            borderLeft: `3px solid ${t.alertStatus === "critical" ? "var(--accent)" : t.alertStatus === "warning" ? "#f59e0b" : "#3b82f6"}`,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
              <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                <div style={{ fontSize: 24, flexShrink: 0, marginTop: 2 }}>{alertIcons[t.alertStatus]}</div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                    <div style={{ fontWeight: 700, fontSize: 15 }}>{t.title}</div>
                    <span className={`badge badge-${t.alertStatus}`}>{t.alertStatus}</span>
                  </div>
                  <div style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5 }}>{t.alertReason}</div>
                  <div style={{ display: "flex", gap: 14, marginTop: 10 }}>
                    <span style={{ fontSize: 11, color: "var(--text-muted)" }}>Genre: <strong style={{ color: "var(--text-secondary)" }}>{t.genre}</strong></span>
                    <span style={{ fontSize: 11, color: "var(--text-muted)" }}>Views: <strong style={{ color: "var(--text-secondary)" }}>{t.views}M</strong></span>
                    <span style={{ fontSize: 11, color: "var(--text-muted)" }}>Completion: <strong style={{ color: "var(--text-secondary)" }}>{t.completionRate}%</strong></span>
                  </div>
                </div>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 28, fontWeight: 900, color: t.currentScore >= 8.5 ? "var(--accent)" : t.currentScore >= 7 ? "#f59e0b" : "#6b7280", lineHeight: 1 }}>{t.currentScore.toFixed(1)}</div>
                <div style={{ fontSize: 10, color: "var(--text-muted)", marginTop: 2 }}>CURRENT SCORE</div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--text-secondary)", marginTop: 4 }}>→ {t.predictedScore.toFixed(1)} predicted</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: "center", padding: "60px 0", color: "var(--text-muted)" }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>✅</div>
          <div>No alerts for this category.</div>
        </div>
      )}
    </div>
  );
}
