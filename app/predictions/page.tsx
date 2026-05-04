"use client";
import { useState } from "react";

type Inputs = {
  genre: string;
  budget: string;
  targetAudience: string;
  releaseType: string;
  region: string;
  castTier: string;
};

const scoreExplanations: Record<string, string[]> = {
  high: [
    "Strong genre performance historically in selected region",
    "Cast tier and budget indicate premium production value",
    "Target audience aligns with high-engagement demographic",
    "Release type maximizes initial viewership spike",
    "Content profile closely matches recent top performers",
  ],
  mid: [
    "Genre shows moderate performance trends",
    "Budget is sufficient but competition in this space is high",
    "Audience segment is competitive with existing catalog",
    "Regional engagement data is mixed for this content type",
    "Predicted trajectory is stable but without breakout potential",
  ],
  low: [
    "Genre is currently oversaturated in the catalog",
    "Budget constraints may impact production quality",
    "Target demographic shows declining engagement trends",
    "Limited regional reach for the selected content type",
    "Release type may limit organic discovery and virality",
  ],
};

export default function PredictionsPage() {
  const [inputs, setInputs] = useState<Inputs>({
    genre: "Thriller",
    budget: "50",
    targetAudience: "Adults 25–44",
    releaseType: "Global Premiere",
    region: "North America",
    castTier: "A-List",
  });
  const [result, setResult] = useState<{ score: number; confidence: number; tier: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePredict = () => {
    setLoading(true);
    setTimeout(() => {
      const base =
        (inputs.genre === "Thriller" || inputs.genre === "Action" ? 1.2 : inputs.genre === "Comedy" || inputs.genre === "Romance" ? 0.8 : 1.0) *
        (inputs.castTier === "A-List" ? 1.2 : inputs.castTier === "B-List" ? 1.0 : 0.85) *
        (Number(inputs.budget) > 80 ? 1.1 : Number(inputs.budget) > 40 ? 1.0 : 0.9) *
        (inputs.releaseType === "Global Premiere" ? 1.1 : 1.0);
      const score = Math.min(9.9, Math.max(4.0, base * 7.2 + (Math.random() * 1.2 - 0.6)));
      const confidence = Math.min(97, Math.round(70 + (score - 5) * 5 + Math.random() * 8));
      const tier = score >= 8.5 ? "high" : score >= 7.0 ? "mid" : "low";
      setResult({ score: parseFloat(score.toFixed(1)), confidence, tier });
      setLoading(false);
    }, 1400);
  };

  const inputStyle = {
    width: "100%", padding: "10px 14px",
    background: "var(--bg-elevated)", border: "1px solid var(--border)",
    borderRadius: 8, color: "var(--text-primary)", fontSize: 13,
    outline: "none", fontFamily: "var(--font-body)",
  };

  return (
    <div className="fade-in">
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 11, color: "var(--text-muted)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>Intelligent Forecasting</div>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: 38, letterSpacing: 2 }}>AI PREDICTIONS</h1>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {/* Inputs */}
        <div className="card" style={{ padding: "28px" }}>
          <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 20 }}>Content Attributes</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              { key: "genre", label: "Genre", options: ["Thriller", "Drama", "Action", "Sci-Fi", "Comedy", "Romance", "Horror", "Documentary"] },
              { key: "targetAudience", label: "Target Audience", options: ["Adults 18–24", "Adults 25–44", "Adults 35–55", "Teens 13–17", "Family"] },
              { key: "releaseType", label: "Release Type", options: ["Global Premiere", "Regional Rollout", "Limited Release", "Event Special"] },
              { key: "region", label: "Primary Region", options: ["North America", "Europe", "Asia Pacific", "Latin America", "Middle East"] },
              { key: "castTier", label: "Cast Tier", options: ["A-List", "B-List", "Emerging", "Unknown"] },
            ].map(({ key, label, options }) => (
              <div key={key}>
                <label style={{ fontSize: 11, color: "var(--text-muted)", letterSpacing: "0.08em", textTransform: "uppercase", display: "block", marginBottom: 6 }}>{label}</label>
                <select value={(inputs as any)[key]} onChange={e => setInputs({ ...inputs, [key]: e.target.value })} style={inputStyle as any}>
                  {options.map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
            ))}
            <div>
              <label style={{ fontSize: 11, color: "var(--text-muted)", letterSpacing: "0.08em", textTransform: "uppercase", display: "block", marginBottom: 6 }}>
                Budget: ${inputs.budget}M
              </label>
              <input type="range" min={5} max={200} value={inputs.budget}
                onChange={e => setInputs({ ...inputs, budget: e.target.value })}
                style={{ width: "100%", accentColor: "var(--accent)" }}
              />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--text-muted)", marginTop: 4 }}>
                <span>$5M</span><span>$200M</span>
              </div>
            </div>
          </div>
          <button onClick={handlePredict} disabled={loading} style={{
            marginTop: 24, width: "100%", padding: "13px",
            background: loading ? "var(--bg-elevated)" : "var(--accent)",
            color: "white", border: "none", borderRadius: 8,
            fontSize: 14, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer",
            letterSpacing: "0.06em",
          }}>
            {loading ? "Analyzing Content Profile…" : "🤖 Generate Prediction"}
          </button>
        </div>

        {/* Result */}
        <div className="card" style={{ padding: "28px", display: "flex", flexDirection: "column" }}>
          <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 20 }}>Prediction Results</div>
          {!result && !loading && (
            <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "var(--text-muted)", textAlign: "center", gap: 12 }}>
              <div style={{ fontSize: 48 }}>🤖</div>
              <div style={{ fontSize: 14 }}>Configure your content attributes and click <strong>Generate Prediction</strong> to see an AI-powered NextHit score forecast.</div>
            </div>
          )}
          {loading && (
            <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16 }}>
              <div style={{ fontSize: 40, animation: "pulse 1.2s ease infinite" }}>🧠</div>
              <div style={{ color: "var(--text-muted)", fontSize: 13 }}>Analyzing content profile…</div>
              <div style={{ width: "60%", height: 4, background: "var(--bg-elevated)", borderRadius: 2, overflow: "hidden" }}>
                <div style={{ height: "100%", background: "var(--accent)", width: "60%", borderRadius: 2, animation: "shimmer 1.5s infinite", backgroundImage: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)", backgroundSize: "200% 100%" }} />
              </div>
            </div>
          )}
          {result && !loading && (
            <div className="fade-in" style={{ flex: 1, display: "flex", flexDirection: "column", gap: 20 }}>
              {/* Score */}
              <div style={{ textAlign: "center", padding: "24px", background: "var(--bg-elevated)", borderRadius: 12 }}>
                <div style={{ fontSize: 11, color: "var(--text-muted)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>NextHit Predicted Score</div>
                <div className="score-count" style={{
                  fontSize: 72, fontFamily: "var(--font-mono)", fontWeight: 900, lineHeight: 1,
                  color: result.score >= 8.5 ? "var(--accent)" : result.score >= 7 ? "#f59e0b" : "#6b7280",
                }}>{result.score}</div>
                <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 4 }}>out of 10.0</div>
              </div>

              {/* Confidence */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "var(--text-muted)", marginBottom: 6 }}>
                  <span>Confidence Level</span>
                  <span style={{ fontWeight: 700, color: "var(--text-primary)", fontFamily: "var(--font-mono)" }}>{result.confidence}%</span>
                </div>
                <div style={{ height: 8, background: "var(--bg-elevated)", borderRadius: 4, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${result.confidence}%`, background: "linear-gradient(90deg, #3b82f6, var(--accent))", borderRadius: 4, transition: "width 0.8s ease" }} />
                </div>
              </div>

              {/* Explanation */}
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: "var(--text-muted)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>AI Analysis</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {scoreExplanations[result.tier].map((reason, i) => (
                    <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                      <div style={{ width: 16, height: 16, borderRadius: "50%", flexShrink: 0, marginTop: 1,
                        background: result.tier === "high" ? "rgba(16,185,84,0.2)" : result.tier === "mid" ? "rgba(245,158,11,0.2)" : "rgba(107,114,128,0.2)",
                        display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9,
                        color: result.tier === "high" ? "#10b981" : result.tier === "mid" ? "#f59e0b" : "#6b7280",
                      }}>✓</div>
                      <div style={{ fontSize: 12, color: "var(--text-secondary)", lineHeight: 1.5 }}>{reason}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
