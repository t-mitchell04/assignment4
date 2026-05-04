"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRole } from "@/lib/roleContext";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: "⊞" },
  { href: "/leaderboard", label: "Leaderboard", icon: "🏆" },
  { href: "/analytics", label: "Analytics", icon: "📊" },
  { href: "/predictions", label: "AI Predictions", icon: "🤖" },
  { href: "/reports", label: "Reports", icon: "📄" },
  { href: "/search", label: "Search", icon: "🔍" },
  { href: "/alerts", label: "Alerts", icon: "🔔" },
  { href: "/demographics", label: "Demographics", icon: "👥" },
  { href: "/comparison", label: "Comparison", icon: "⚖️" },
  { href: "/trends", label: "Trends", icon: "📈" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { role } = useRole();

  const visibleItems = navItems.filter((item) => {
    if (role === "Executive") return ["/dashboard", "/leaderboard", "/reports", "/alerts", "/trends"].includes(item.href);
    if (role === "Marketing") return ["/dashboard", "/leaderboard", "/analytics", "/alerts", "/demographics", "/comparison"].includes(item.href);
    return true; // Analyst and Admin see all
  });

  return (
    <aside style={{
      width: 220,
      minHeight: "100vh",
      background: "var(--bg-secondary)",
      borderRight: "1px solid var(--border)",
      display: "flex",
      flexDirection: "column",
      position: "fixed",
      left: 0,
      top: 0,
      bottom: 0,
      zIndex: 100,
      padding: "0 0 24px 0",
    }}>
      {/* Logo */}
      <div style={{ padding: "24px 20px 20px", borderBottom: "1px solid var(--border)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 32, height: 32,
            background: "var(--accent)",
            borderRadius: 6,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 16, fontWeight: 800, color: "white",
          }}>N</div>
          <div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 20, letterSpacing: 2, color: "var(--text-primary)", lineHeight: 1 }}>NEXTHIT</div>
            <div style={{ fontSize: 10, color: "var(--text-muted)", letterSpacing: 1, textTransform: "uppercase" }}>Internal Analytics</div>
          </div>
        </div>
      </div>

      {/* Role Badge */}
      <div style={{ padding: "12px 20px", borderBottom: "1px solid var(--border)" }}>
        <div style={{
          padding: "6px 12px",
          background: "var(--accent-dim)",
          border: "1px solid var(--accent-glow)",
          borderRadius: 6,
          fontSize: 11,
          fontWeight: 600,
          color: "var(--accent)",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          display: "inline-block",
        }}>{role}</div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "12px 12px", overflowY: "auto" }}>
        {visibleItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "9px 12px",
              borderRadius: 8,
              marginBottom: 2,
              color: active ? "var(--text-primary)" : "var(--text-secondary)",
              background: active ? "var(--bg-hover)" : "transparent",
              borderLeft: active ? "2px solid var(--accent)" : "2px solid transparent",
              fontWeight: active ? 600 : 400,
              fontSize: 13,
              transition: "all 0.15s",
            }}
            onMouseEnter={e => { if (!active) (e.currentTarget as HTMLElement).style.background = "var(--bg-elevated)"; }}
            onMouseLeave={e => { if (!active) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
            >
              <span style={{ fontSize: 14 }}>{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* User */}
      <div style={{ padding: "16px 20px", borderTop: "1px solid var(--border)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: "50%",
            background: "linear-gradient(135deg, var(--accent), #ff6b6b)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 13, fontWeight: 700, color: "white",
          }}>
            {role.charAt(0)}
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600 }}>
              {role === "Executive" ? "Alex Morgan" :
               role === "Analyst" ? "Sam Rivera" :
               role === "Marketing" ? "Jordan Lee" : "Admin User"}
            </div>
            <Link href="/" style={{ fontSize: 10, color: "var(--accent)", cursor: "pointer" }}>Sign out</Link>
          </div>
        </div>
      </div>
    </aside>
  );
}
