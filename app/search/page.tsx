"use client";
import { useState, useMemo } from "react";
import { titles } from "@/data/titles";

const recentSearches = ["Neon Requiem", "Thriller", "Oscar Isaac", "Sci-Fi", "t001"];

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return titles.filter(t =>
      t.title.toLowerCase().includes(q) ||
      t.genre.toLowerCase().includes(q) ||
      t.cast.some(c => c.toLowerCase().includes(q)) ||
      t.id.toLowerCase().includes(q)
    );
  }, [query]);

  const suggestions = useMemo(() => {
    if (!query.trim() || query.length < 2) return [];
    const q = query.toLowerCase();
    return titles.filter(t => t.title.toLowerCase().startsWith(q)).slice(0, 4);
  }, [query]);

  return (
    <div className="fade-in">
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 11, color: "var(--text-muted)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>Catalog</div>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: 38, letterSpacing: 2 }}>SEARCH</h1>
      </div>

      {/* Search Bar */}
      <div style={{ position: "relative", marginBottom: 28 }}>
        <div style={{
          display: "flex", alignItems: "center", gap: 12,
          background: "var(--bg-card)", border: `1px solid ${focused ? "var(--accent)" : "var(--border)"}`,
          borderRadius: 12, padding: "14px 18px",
          transition: "border-color 0.2s",
        }}>
          <span style={{ fontSize: 18, color: "var(--text-muted)" }}>🔍</span>
          <input
            type="text"
            placeholder="Search by title, actor, genre, or internal ID…"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setTimeout(() => setFocused(false), 150)}
            style={{
              flex: 1, background: "none", border: "none", outline: "none",
              color: "var(--text-primary)", fontSize: 16, fontFamily: "var(--font-body)",
            }}
          />
          {query && (
            <button onClick={() => setQuery("")} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", fontSize: 18 }}>×</button>
          )}
        </div>

        {/* Suggestions Dropdown */}
        {suggestions.length > 0 && focused && (
          <div style={{
            position: "absolute", top: "calc(100% + 6px)", left: 0, right: 0,
            background: "var(--bg-card)", border: "1px solid var(--border)",
            borderRadius: 10, overflow: "hidden", zIndex: 50,
            boxShadow: "var(--shadow-lg)",
          }}>
            {suggestions.map(s => (
              <div key={s.id} onMouseDown={() => setQuery(s.title)} style={{
                padding: "12px 18px", cursor: "pointer", display: "flex", alignItems: "center", gap: 12,
              }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "var(--bg-elevated)"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "transparent"}
              >
                <span style={{ color: "var(--text-muted)", fontSize: 13 }}>🔍</span>
                <span style={{ fontSize: 13 }}>{s.title}</span>
                <span style={{ fontSize: 11, color: "var(--text-muted)", marginLeft: "auto" }}>{s.genre}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent Searches */}
      {!query && (
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 12, color: "var(--text-muted)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>Recent Searches</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {recentSearches.map(s => (
              <button key={s} onClick={() => setQuery(s)} style={{
                padding: "7px 14px", background: "var(--bg-elevated)", border: "1px solid var(--border)",
                borderRadius: 20, fontSize: 13, color: "var(--text-secondary)", cursor: "pointer",
              }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = "var(--border-hover)"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"}
              >🕐 {s}</button>
            ))}
          </div>
        </div>
      )}

      {/* Results */}
      {query && results.length === 0 && (
        <div style={{ textAlign: "center", padding: "60px 0", color: "var(--text-muted)" }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
          <div>No results found for &quot;{query}&quot;</div>
        </div>
      )}

      {results.length > 0 && (
        <div>
          <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 14 }}>{results.length} result{results.length !== 1 ? "s" : ""} for &quot;{query}&quot;</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {results.map(t => (
              <div key={t.id} className="card" style={{ padding: "18px 22px", display: "flex", gap: 16, alignItems: "flex-start", cursor: "pointer" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = "var(--border-hover)"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"}
              >
                <div style={{
                  width: 44, height: 44, borderRadius: 8, flexShrink: 0,
                  background: "linear-gradient(135deg, var(--accent), #ff6b6b)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "var(--font-display)", fontSize: 18, color: "white",
                }}>{t.title.charAt(0)}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{t.title}</div>
                  <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 3 }}>
                    {t.genre} • {t.releaseYear} • {t.cast.slice(0, 3).join(", ")}
                  </div>
                  <div style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 4, lineHeight: 1.4 }}>{t.description.slice(0, 120)}…</div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 20, fontWeight: 800, color: t.currentScore >= 8.5 ? "var(--accent)" : "var(--text-primary)" }}>{t.currentScore.toFixed(1)}</div>
                  <div style={{ fontSize: 10, color: "var(--text-muted)", marginTop: 2 }}>SCORE</div>
                  <div style={{ marginTop: 6 }}><span className={`badge badge-${t.alertStatus}`}>{t.alertStatus}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!query && (
        <div>
          <div style={{ fontSize: 12, color: "var(--text-muted)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 14 }}>All Titles</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10 }}>
            {titles.map(t => (
              <div key={t.id} className="card" style={{ padding: "14px 18px", display: "flex", gap: 12, alignItems: "center", cursor: "pointer" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = "var(--border-hover)"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"}
                onClick={() => setQuery(t.title)}
              >
                <div style={{
                  width: 36, height: 36, borderRadius: 6, flexShrink: 0,
                  background: "var(--bg-elevated)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "var(--font-display)", fontSize: 16, color: "var(--accent)",
                }}>{t.title.charAt(0)}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: 13, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{t.title}</div>
                  <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{t.genre} • ID: {t.id}</div>
                </div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 14, fontWeight: 700, color: t.currentScore >= 8.5 ? "var(--accent)" : "var(--text-secondary)" }}>{t.currentScore.toFixed(1)}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
