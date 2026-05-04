"use client";
import { titles } from "@/data/titles";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

// Build combined trend data from all titles
const weeks = ["W1", "W2", "W3", "W4", "W5", "W6"];
const trendData = weeks.map(week => {
  const row: any = { week };
  titles.slice(0, 5).forEach(t => {
    const entry = t.weeklyViews.find(w => w.week === week);
    row[t.title.split(" ")[0]] = entry?.views ?? null;
  });
  return row;
});

const COLORS = ["#e50914", "#f59e0b", "#3b82f6", "#10b981", "#8b5cf6"];
const topTitles = [...titles].sort((a, b) => b.currentScore - a.currentScore).slice(0, 5);

const insights = [
  "Thriller genre dominates top scoring titles this quarter with an average score of 9.0+",
  "Action titles show highest raw viewership with 120M+ total views combined",
  "Documentary content outperforms budget ratio — highest ROI signal in the catalog",
  "Completion rates above 85% correlate strongly with predicted score breakout",
  "Asia Pacific and Europe regions show fastest audience growth month-over-month",
];

export default function TrendsPage() {
  return (
    <div className="fade-in">
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 11, color: "var(--text-muted)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>Platform Intelligence</div>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: 38, letterSpacing: 2 }}>PERFORMANCE TRENDS</h1>
      </div>

      {/* Platform Summary */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 24 }}>
        {[
          { label: "Avg Views/Title", value: `${(titles.reduce((s, t) => s + t.views, 0) / titles.length).toFixed(0)}M`, delta: "+12%", color: "#3b82f6" },
          { label: "Avg Completion", value: `${(titles.reduce((s, t) => s + t.completionRate, 0) / titles.length).toFixed(0)}%`, delta: "+5%", color: "#10b981" },
          { label: "Avg Engagement", value: (titles.reduce((s, t) => s + t.engagement, 0) / titles.length).toFixed(1), delta: "+0.3", color: "#f59e0b" },
          { label: "Titles Scoring 8.5+", value: titles.filter(t => t.currentScore >= 8.5).length, delta: "↑ 2 this mo.", color: "var(--accent)" },
        ].map(s => (
          <div key={s.label} className="card" style={{ padding: "18px 20px" }}>
            <div style={{ fontSize: 28, fontWeight: 800, fontFamily: "var(--font-mono)", color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 4 }}>{s.label}</div>
            <div style={{ fontSize: 11, color: "#10b981", marginTop: 4, fontWeight: 600 }}>{s.delta} vs last period</div>
          </div>
        ))}
      </div>

      {/* Multi-line Chart */}
      <div className="card" style={{ padding: "24px", marginBottom: 16 }}>
        <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 16 }}>Weekly Views — Top 5 Titles</div>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="week" tick={{ fill: "var(--text-muted)", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "var(--text-muted)", fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ background: "var(--bg-elevated)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
            <Legend wrapperStyle={{ fontSize: 12, paddingTop: 12 }} />
            {titles.slice(0, 5).map((t, i) => (
              <Line key={t.id} type="monotone" dataKey={t.title.split(" ")[0]} stroke={COLORS[i]} strokeWidth={2} dot={{ r: 3 }} connectNulls />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {/* Top Performers */}
        <div className="card" style={{ padding: "22px" }}>
          <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 16 }}>Top Performing Titles</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {topTitles.map((t, i) => (
              <div key={t.id} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--text-muted)", width: 20, flexShrink: 0 }}>{i + 1}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{t.title}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 3 }}>
                    <div style={{ flex: 1, height: 4, background: "var(--bg-elevated)", borderRadius: 2 }}>
                      <div style={{ height: "100%", width: `${t.currentScore * 10}%`, background: i === 0 ? "var(--accent)" : COLORS[i], borderRadius: 2 }} />
                    </div>
                  </div>
                </div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 15, fontWeight: 800, color: i === 0 ? "var(--accent)" : COLORS[i], flexShrink: 0 }}>{t.currentScore.toFixed(1)}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Insights */}
        <div className="card" style={{ padding: "22px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div style={{ fontWeight: 700, fontSize: 13 }}>AI Summary Insights</div>
            <button onClick={() => alert("Trend report export — mocked for prototype")} style={{
              padding: "6px 12px", background: "var(--bg-elevated)", border: "1px solid var(--border)",
              borderRadius: 6, color: "var(--text-primary)", fontSize: 12, cursor: "pointer", fontWeight: 600,
            }}>↓ Export</button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {insights.map((ins, i) => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: COLORS[i % COLORS.length], flexShrink: 0, marginTop: 6 }} />
                <div style={{ fontSize: 12, color: "var(--text-secondary)", lineHeight: 1.5 }}>{ins}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
