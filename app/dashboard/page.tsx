"use client";
import Link from "next/link";
import { useRole } from "@/lib/roleContext";
import { titles } from "@/data/titles";

const allModules = [
  { href: "/leaderboard", icon: "🏆", label: "Leaderboard", desc: "Top-performing titles by NextHit Score", color: "#f59e0b" },
  { href: "/analytics", icon: "📊", label: "Analytics", desc: "Views, watch time, engagement trends", color: "#3b82f6" },
  { href: "/predictions", icon: "🤖", label: "AI Predictions", desc: "Predict future content performance", color: "#8b5cf6" },
  { href: "/reports", icon: "📄", label: "Reports", desc: "Generate and export performance reports", color: "#10b981" },
  { href: "/search", icon: "🔍", label: "Search", desc: "Find titles, actors, and genres fast", color: "#06b6d4" },
  { href: "/alerts", icon: "🔔", label: "Alerts", desc: "High-priority and watch-list signals", color: "#e50914" },
  { href: "/demographics", icon: "👥", label: "Demographics", desc: "Audience breakdown by age and region", color: "#ec4899" },
  { href: "/comparison", icon: "⚖️", label: "Comparison", desc: "Side-by-side title performance analysis", color: "#f97316" },
  { href: "/trends", icon: "📈", label: "Trends", desc: "Platform-wide performance over time", color: "#84cc16" },
];

export default function DashboardPage() {
  const { role } = useRole();

  const visibleModules = allModules.filter(m => {
    if (role === "Executive") return ["/leaderboard", "/reports", "/alerts", "/trends"].includes(m.href);
    if (role === "Marketing") return ["/leaderboard", "/analytics", "/alerts", "/demographics", "/comparison"].includes(m.href);
    return true;
  });

  const criticalAlerts = titles.filter(t => t.alertStatus === "critical").length;
  const avgScore = (titles.reduce((s, t) => s + t.currentScore, 0) / titles.length).toFixed(1);
  const totalViews = titles.reduce((s, t) => s + t.views, 0).toFixed(0);

  return (
    <div className="fade-in">
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ fontSize: 11, color: "var(--text-muted)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>
          Welcome back, {role === "Executive" ? "Alex" : role === "Analyst" ? "Sam" : role === "Marketing" ? "Jordan" : "Admin"}
        </div>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: 40, letterSpacing: 2, lineHeight: 1, marginBottom: 8 }}>
          NEXTHIT COMMAND CENTER
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: 14 }}>
          Internal content analytics • {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
        </p>
      </div>

      {/* Stats Bar */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 32 }}>
        {[
          { label: "Active Titles", value: titles.length, sub: "In tracking system", color: "var(--accent)" },
          { label: "Avg Score", value: avgScore, sub: "Platform average", color: "#3b82f6" },
          { label: "Total Views", value: `${totalViews}M`, sub: "Across all titles", color: "#10b981" },
          { label: "Critical Alerts", value: criticalAlerts, sub: "Require attention", color: "#f59e0b" },
        ].map(stat => (
          <div key={stat.label} className="card" style={{ padding: "20px 22px" }}>
            <div style={{ fontSize: 28, fontWeight: 800, color: stat.color, fontFamily: "var(--font-mono)", letterSpacing: -1 }}>{stat.value}</div>
            <div style={{ fontWeight: 600, fontSize: 13, marginTop: 4 }}>{stat.label}</div>
            <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 2 }}>{stat.sub}</div>
          </div>
        ))}
      </div>

      {/* Module Grid */}
      <div style={{ marginBottom: 16 }}>
        <h2 style={{ fontSize: 13, fontWeight: 600, color: "var(--text-muted)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>
          Navigation Modules
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
          {visibleModules.map(m => (
            <Link key={m.href} href={m.href} style={{
              display: "flex", alignItems: "flex-start", gap: 14,
              padding: "20px",
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              borderRadius: 14,
              cursor: "pointer",
              transition: "all 0.2s",
              textDecoration: "none",
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = m.color;
              el.style.transform = "translateY(-2px)";
              el.style.boxShadow = `0 8px 32px rgba(0,0,0,0.3)`;
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "var(--border)";
              el.style.transform = "translateY(0)";
              el.style.boxShadow = "none";
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: 10,
                background: `${m.color}18`,
                border: `1px solid ${m.color}30`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 20, flexShrink: 0,
              }}>{m.icon}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{m.label}</div>
                <div style={{ fontSize: 12, color: "var(--text-muted)", lineHeight: 1.4 }}>{m.desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Alerts */}
      <div style={{ marginTop: 28 }}>
        <h2 style={{ fontSize: 13, fontWeight: 600, color: "var(--text-muted)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>
          Recent Critical Alerts
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {titles.filter(t => t.alertStatus === "critical").slice(0, 3).map(t => (
            <div key={t.id} className="card" style={{ padding: "14px 18px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--accent)", boxShadow: "0 0 8px var(--accent-glow)", flexShrink: 0 }} />
                <div>
                  <span style={{ fontWeight: 600, fontSize: 13 }}>{t.title}</span>
                  <span style={{ color: "var(--text-muted)", fontSize: 12, marginLeft: 8 }}>{t.alertReason}</span>
                </div>
              </div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 14, fontWeight: 700, color: "var(--accent)" }}>{t.currentScore.toFixed(1)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
