"use client";
import { useState } from "react";
import { titles } from "@/data/titles";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip } from "recharts";

export default function ComparisonPage() {
  const [idA, setIdA] = useState(titles[0].id);
  const [idB, setIdB] = useState(titles[1].id);

  const titleA = titles.find(t => t.id === idA)!;
  const titleB = titles.find(t => t.id === idB)!;

  const radarData = [
    { metric: "Score", A: titleA.currentScore * 10, B: titleB.currentScore * 10 },
    { metric: "Engagement", A: titleA.engagement * 10, B: titleB.engagement * 10 },
    { metric: "Completion", A: titleA.completionRate, B: titleB.completionRate },
    { metric: "Views", A: Math.min(100, titleA.views / 1.5), B: Math.min(100, titleB.views / 1.5) },
    { metric: "Confidence", A: titleA.confidence, B: titleB.confidence },
  ];

  const metrics = [
    { label: "Current Score", a: titleA.currentScore.toFixed(1), b: titleB.currentScore.toFixed(1), higherBetter: true, raw: [titleA.currentScore, titleB.currentScore] },
    { label: "Predicted Score", a: titleA.predictedScore.toFixed(1), b: titleB.predictedScore.toFixed(1), higherBetter: true, raw: [titleA.predictedScore, titleB.predictedScore] },
    { label: "Total Views", a: `${titleA.views}M`, b: `${titleB.views}M`, higherBetter: true, raw: [titleA.views, titleB.views] },
    { label: "Completion Rate", a: `${titleA.completionRate}%`, b: `${titleB.completionRate}%`, higherBetter: true, raw: [titleA.completionRate, titleB.completionRate] },
    { label: "Engagement", a: titleA.engagement.toFixed(1), b: titleB.engagement.toFixed(1), higherBetter: true, raw: [titleA.engagement, titleB.engagement] },
    { label: "Budget", a: `$${titleA.budget}M`, b: `$${titleB.budget}M`, higherBetter: false, raw: [titleA.budget, titleB.budget] },
    { label: "Confidence", a: `${titleA.confidence}%`, b: `${titleB.confidence}%`, higherBetter: true, raw: [titleA.confidence, titleB.confidence] },
    { label: "Watch Time", a: `${titleA.watchTime}m`, b: `${titleB.watchTime}m`, higherBetter: true, raw: [titleA.watchTime, titleB.watchTime] },
  ];

  const selectStyle = {
    padding: "9px 14px", background: "var(--bg-elevated)", border: "1px solid var(--border)",
    borderRadius: 8, color: "var(--text-primary)", fontSize: 13, fontFamily: "var(--font-body)",
    width: "100%",
  };

  return (
    <div className="fade-in">
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 11, color: "var(--text-muted)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>Side-by-Side Analysis</div>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: 38, letterSpacing: 2 }}>COMPARISON</h1>
      </div>

      {/* Selectors */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 14, alignItems: "center", marginBottom: 24 }}>
        <div>
          <label style={{ fontSize: 11, color: "var(--text-muted)", letterSpacing: "0.08em", textTransform: "uppercase", display: "block", marginBottom: 6 }}>Title A</label>
          <select value={idA} onChange={e => setIdA(e.target.value)} style={selectStyle as any}>
            {titles.filter(t => t.id !== idB).map(t => <option key={t.id} value={t.id}>{t.title}</option>)}
          </select>
        </div>
        <div style={{ fontFamily: "var(--font-display)", fontSize: 24, color: "var(--text-muted)", paddingTop: 20 }}>VS</div>
        <div>
          <label style={{ fontSize: 11, color: "var(--text-muted)", letterSpacing: "0.08em", textTransform: "uppercase", display: "block", marginBottom: 6 }}>Title B</label>
          <select value={idB} onChange={e => setIdB(e.target.value)} style={selectStyle as any}>
            {titles.filter(t => t.id !== idA).map(t => <option key={t.id} value={t.id}>{t.title}</option>)}
          </select>
        </div>
      </div>

      {/* Header Cards */}
<div
  style={{
    display: "grid",
    gridTemplateColumns: "1fr auto 1fr",
    gap: 14,
    marginBottom: 20,
    alignItems: "stretch",
  }}
>
  <div className="card" style={{ padding: "22px", textAlign: "left" }}>
    <div style={{ fontFamily: "var(--font-display)", fontSize: 22, letterSpacing: 1 }}>{titleA.title}</div>
    <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 4 }}>{titleA.genre} • {titleA.releaseYear}</div>
    <div style={{ fontFamily: "var(--font-mono)", fontSize: 40, fontWeight: 900, color: "var(--accent)", marginTop: 8, lineHeight: 1 }}>
      {titleA.currentScore.toFixed(1)}
    </div>
    <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 2 }}>NEXTHIT SCORE</div>
  </div>

  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "0 8px" }}>
    <div style={{ fontFamily: "var(--font-display)", fontSize: 32, color: "var(--border-hover)" }}>VS</div>
  </div>

  <div className="card" style={{ padding: "22px", textAlign: "right" }}>
    <div style={{ fontFamily: "var(--font-display)", fontSize: 22, letterSpacing: 1 }}>{titleB.title}</div>
    <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 4 }}>{titleB.genre} • {titleB.releaseYear}</div>
    <div style={{ fontFamily: "var(--font-mono)", fontSize: 40, fontWeight: 900, color: "var(--accent)", marginTop: 8, lineHeight: 1 }}>
      {titleB.currentScore.toFixed(1)}
    </div>
    <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 2 }}>NEXTHIT SCORE</div>
  </div>
</div>

      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 16 }}>
        {/* Metrics Table */}
        <div className="card" style={{ overflow: "hidden" }}>
          <div style={{ padding: "16px 22px", borderBottom: "1px solid var(--border)", display: "grid", gridTemplateColumns: "1fr 1fr 80px 1fr", gap: 8 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "var(--accent)" }}>{titleA.title.slice(0, 18)}</div>
            <div style={{ fontSize: 11, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", textAlign: "center" }}>Metric</div>
            <div />
            <div style={{ fontSize: 12, fontWeight: 700, color: "#3b82f6", textAlign: "right" }}>{titleB.title.slice(0, 18)}</div>
          </div>
          {metrics.map(m => {
            const aWins = m.higherBetter ? m.raw[0] > m.raw[1] : m.raw[0] < m.raw[1];
            const bWins = m.higherBetter ? m.raw[1] > m.raw[0] : m.raw[1] < m.raw[0];
            return (
              <div key={m.label} style={{
                display: "grid", gridTemplateColumns: "1fr 1fr 80px 1fr",
                gap: 8, padding: "13px 22px",
                borderBottom: "1px solid var(--border)",
                alignItems: "center",
              }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 15, fontWeight: 700, color: aWins ? "var(--accent)" : "var(--text-primary)" }}>{m.a}</div>
                <div style={{ fontSize: 11, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.04em" }}>{m.label}</div>
                <div style={{ textAlign: "center", fontSize: 14 }}>{aWins ? "←" : bWins ? "→" : "="}</div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 15, fontWeight: 700, textAlign: "right", color: bWins ? "#3b82f6" : "var(--text-primary)" }}>{m.b}</div>
              </div>
            );
          })}
        </div>

        {/* Radar */}
        <div className="card" style={{ padding: "22px" }}>
          <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 8 }}>Performance Radar</div>
          <div style={{ display: "flex", gap: 12, marginBottom: 8 }}>
            <div style={{ display: "flex", gap: 6, alignItems: "center" }}><div style={{ width: 10, height: 10, borderRadius: 2, background: "var(--accent)" }} /><span style={{ fontSize: 11 }}>{titleA.title.slice(0, 12)}</span></div>
            <div style={{ display: "flex", gap: 6, alignItems: "center" }}><div style={{ width: 10, height: 10, borderRadius: 2, background: "#3b82f6" }} /><span style={{ fontSize: 11 }}>{titleB.title.slice(0, 12)}</span></div>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="var(--border)" />
              <PolarAngleAxis dataKey="metric" tick={{ fill: "var(--text-muted)", fontSize: 11 }} />
              <Radar name={titleA.title} dataKey="A" stroke="var(--accent)" fill="var(--accent)" fillOpacity={0.15} strokeWidth={2} />
              <Radar name={titleB.title} dataKey="B" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.15} strokeWidth={2} />
              <Tooltip contentStyle={{ background: "var(--bg-elevated)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
