"use client";
import { useState } from "react";
import { titles } from "@/data/titles";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

const COLORS = ["#e50914", "#f59e0b", "#3b82f6", "#10b981", "#8b5cf6"];
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload?.length) {
    return (
      <div style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)", borderRadius: 8, padding: "8px 12px" }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: payload[0].payload.region || payload[0].payload.group }}>{payload[0].name}</div>
        <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{payload[0].value}%</div>
      </div>
    );
  }
  return null;
};

export default function DemographicsPage() {
  const [selectedId, setSelectedId] = useState(titles[0].id);
  const title = titles.find(t => t.id === selectedId)!;

  const genrePrefs = titles.reduce((acc, t) => {
    acc[t.genre] = (acc[t.genre] || 0) + t.views;
    return acc;
  }, {} as Record<string, number>);
  const genreData = Object.entries(genrePrefs).map(([genre, views]) => ({ genre, views: parseFloat(views.toFixed(1)) })).sort((a, b) => b.views - a.views);

  return (
    <div className="fade-in">
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 11, color: "var(--text-muted)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>Audience Intelligence</div>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: 38, letterSpacing: 2 }}>DEMOGRAPHICS</h1>
      </div>

      <div style={{ marginBottom: 20 }}>
        <select value={selectedId} onChange={e => setSelectedId(e.target.value)} style={{
          padding: "9px 16px", background: "var(--bg-elevated)", border: "1px solid var(--border)",
          borderRadius: 8, color: "var(--text-primary)", fontSize: 13, fontFamily: "var(--font-body)",
        }}>
          {titles.map(t => <option key={t.id} value={t.id}>{t.title}</option>)}
        </select>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        {/* Age Distribution */}
        <div className="card" style={{ padding: "22px" }}>
          <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 16 }}>Age Group Distribution</div>
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <ResponsiveContainer width={160} height={160}>
              <PieChart>
                <Pie data={title.demographics.ageGroups} cx="50%" cy="50%" innerRadius={45} outerRadius={72} dataKey="percentage" nameKey="group">
                  {title.demographics.ageGroups.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
              {title.demographics.ageGroups.map((ag, i) => (
                <div key={ag.group} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 10, height: 10, borderRadius: 2, background: COLORS[i % COLORS.length], flexShrink: 0 }} />
                  <div style={{ flex: 1, fontSize: 12, color: "var(--text-secondary)" }}>{ag.group}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, fontFamily: "var(--font-mono)" }}>{ag.percentage}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Regional Distribution */}
        <div className="card" style={{ padding: "22px" }}>
          <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 16 }}>Regional Breakdown</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {title.demographics.regions.map((r, i) => (
              <div key={r.region}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: 12, color: "var(--text-secondary)" }}>{r.region}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, fontFamily: "var(--font-mono)" }}>{r.percentage}%</span>
                </div>
                <div style={{ height: 6, background: "var(--bg-elevated)", borderRadius: 3, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${r.percentage}%`, background: COLORS[i % COLORS.length], borderRadius: 3, transition: "width 0.6s ease" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Genre Preferences */}
      <div className="card" style={{ padding: "22px" }}>
        <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 16 }}>Platform-wide Genre Preferences (Total Views)</div>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={genreData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="genre" tick={{ fill: "var(--text-muted)", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "var(--text-muted)", fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip content={({ active, payload, label }) => active && payload?.length ? (
              <div style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)", borderRadius: 8, padding: "8px 12px" }}>
                <div style={{ fontSize: 12, fontWeight: 600 }}>{label}</div>
                <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{payload[0].value}M views</div>
              </div>
            ) : null} />
            <Bar dataKey="views" fill="var(--accent)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
