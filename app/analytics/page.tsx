"use client";
import { useState } from "react";
import { titles, Genre } from "@/data/titles";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend,
} from "recharts";

const genres: Genre[] = ["Drama", "Thriller", "Comedy", "Sci-Fi", "Documentary", "Horror", "Action", "Romance"];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)", borderRadius: 8, padding: "10px 14px" }}>
        <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 4 }}>{label}</div>
        {payload.map((p: any) => (
          <div key={p.name} style={{ fontSize: 13, fontWeight: 600, color: p.color }}>{p.name}: {p.value}{typeof p.value === "number" && p.value < 100 ? "" : ""}</div>
        ))}
      </div>
    );
  }
  return null;
};

export default function AnalyticsPage() {
  const [selectedId, setSelectedId] = useState(titles[0].id);
  const [genreFilter, setGenreFilter] = useState<Genre | "All">("All");

  const title = titles.find(t => t.id === selectedId)!;
  const filtered = genreFilter === "All" ? titles : titles.filter(t => t.genre === genreFilter);

  const metricsData = filtered.map(t => ({
    name: t.title.length > 14 ? t.title.slice(0, 14) + "…" : t.title,
    Views: t.views,
    Engagement: t.engagement,
    Completion: t.completionRate,
  }));

  return (
    <div className="fade-in">
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 11, color: "var(--text-muted)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>Performance</div>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: 38, letterSpacing: 2 }}>ANALYTICS</h1>
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: 10, marginBottom: 24, flexWrap: "wrap" }}>
        <select value={selectedId} onChange={e => setSelectedId(e.target.value)} style={{
          padding: "8px 14px", background: "var(--bg-elevated)", border: "1px solid var(--border)",
          borderRadius: 8, color: "var(--text-primary)", fontSize: 13, cursor: "pointer",
          fontFamily: "var(--font-body)",
        }}>
          {titles.map(t => <option key={t.id} value={t.id}>{t.title}</option>)}
        </select>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {(["All", ...genres] as const).map(g => (
            <button key={g} onClick={() => setGenreFilter(g as Genre | "All")} style={{
              padding: "7px 13px",
              background: genreFilter === g ? "var(--accent)" : "var(--bg-elevated)",
              border: "1px solid var(--border)",
              borderRadius: 7, fontSize: 12, color: "var(--text-primary)",
              cursor: "pointer", fontWeight: genreFilter === g ? 600 : 400,
            }}>{g}</button>
          ))}
        </div>
      </div>

      {/* Selected Title Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12, marginBottom: 24 }}>
        {[
          { label: "Views", value: `${title.views}M`, color: "#3b82f6" },
          { label: "Watch Time", value: `${title.watchTime}m`, color: "#8b5cf6" },
          { label: "Completion", value: `${title.completionRate}%`, color: "#10b981" },
          { label: "Engagement", value: title.engagement.toFixed(1), color: "#f59e0b" },
          { label: "Current Score", value: title.currentScore.toFixed(1), color: "var(--accent)" },
        ].map(s => (
          <div key={s.label} className="card" style={{ padding: "16px 18px", textAlign: "center" }}>
            <div style={{ fontSize: 26, fontWeight: 800, fontFamily: "var(--font-mono)", color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 4, textTransform: "uppercase", letterSpacing: "0.06em" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Weekly Views Chart */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <div className="card" style={{ padding: "22px" }}>
          <div style={{ fontWeight: 700, marginBottom: 16, fontSize: 13 }}>Weekly Views — {title.title}</div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={title.weeklyViews}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="week" tick={{ fill: "var(--text-muted)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "var(--text-muted)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="views" stroke="#e50914" strokeWidth={2} dot={{ fill: "#e50914", r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="card" style={{ padding: "22px" }}>
          <div style={{ fontWeight: 700, marginBottom: 16, fontSize: 13 }}>Views by Title ({genreFilter === "All" ? "All Genres" : genreFilter})</div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={metricsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="name" tick={{ fill: "var(--text-muted)", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "var(--text-muted)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="Views" fill="#e50914" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Data Table */}
      <div className="card" style={{ overflow: "hidden" }}>
        <div style={{ padding: "16px 22px", borderBottom: "1px solid var(--border)" }}>
          <span style={{ fontWeight: 700, fontSize: 13 }}>Content Metrics Table</span>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "var(--bg-elevated)" }}>
                {["Title", "Genre", "Views", "Watch Time", "Completion %", "Engagement", "Score"].map(h => (
                  <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontSize: 11, color: "var(--text-muted)", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((t, i) => (
                <tr key={t.id} style={{ borderTop: "1px solid var(--border)", cursor: "pointer" }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "var(--bg-elevated)"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "transparent"}
                  onClick={() => setSelectedId(t.id)}
                >
                  <td style={{ padding: "12px 16px", fontWeight: 600, fontSize: 13 }}>{t.title}</td>
                  <td style={{ padding: "12px 16px", fontSize: 12, color: "var(--text-secondary)" }}>{t.genre}</td>
                  <td style={{ padding: "12px 16px", fontSize: 12, fontFamily: "var(--font-mono)" }}>{t.views}M</td>
                  <td style={{ padding: "12px 16px", fontSize: 12, fontFamily: "var(--font-mono)" }}>{t.watchTime}m</td>
                  <td style={{ padding: "12px 16px", fontSize: 12, fontFamily: "var(--font-mono)", color: t.completionRate >= 80 ? "#10b981" : t.completionRate >= 70 ? "#f59e0b" : "#e50914" }}>{t.completionRate}%</td>
                  <td style={{ padding: "12px 16px", fontSize: 12, fontFamily: "var(--font-mono)" }}>{t.engagement.toFixed(1)}</td>
                  <td style={{ padding: "12px 16px", fontSize: 13, fontFamily: "var(--font-mono)", fontWeight: 700, color: t.currentScore >= 8.5 ? "var(--accent)" : "var(--text-primary)" }}>{t.currentScore.toFixed(1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
