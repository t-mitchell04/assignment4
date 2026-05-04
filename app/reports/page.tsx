"use client";
import { useState } from "react";
import { titles, savedReports } from "@/data/titles";

export default function ReportsPage() {
  const [selectedId, setSelectedId] = useState(titles[0].id);
  const [reportType, setReportType] = useState<"performance" | "prediction">("performance");
  const [generated, setGenerated] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = titles.find(t => t.id === selectedId)!;

  const handleGenerate = () => {
    setLoading(true);
    setGenerated(false);
    setTimeout(() => { setLoading(false); setGenerated(true); }, 1200);
  };

  const handleExport = (format: string) => {
    alert(`Exporting report as ${format} — (mocked for prototype demo)`);
  };

  return (
    <div className="fade-in">
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 11, color: "var(--text-muted)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>Documents</div>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: 38, letterSpacing: 2 }}>REPORTS</h1>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: 20 }}>
        {/* Left Panel */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Generator */}
          <div className="card" style={{ padding: "20px" }}>
            <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 16 }}>Generate Report</div>
            <div style={{ marginBottom: 12 }}>
              <label style={{ fontSize: 11, color: "var(--text-muted)", letterSpacing: "0.08em", textTransform: "uppercase", display: "block", marginBottom: 6 }}>Title</label>
              <select value={selectedId} onChange={e => { setSelectedId(e.target.value); setGenerated(false); }} style={{
                width: "100%", padding: "9px 12px", background: "var(--bg-elevated)", border: "1px solid var(--border)",
                borderRadius: 8, color: "var(--text-primary)", fontSize: 12, fontFamily: "var(--font-body)",
              }}>
                {titles.map(t => <option key={t.id} value={t.id}>{t.title}</option>)}
              </select>
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 11, color: "var(--text-muted)", letterSpacing: "0.08em", textTransform: "uppercase", display: "block", marginBottom: 6 }}>Report Type</label>
              <div style={{ display: "flex", gap: 6 }}>
                {(["performance", "prediction"] as const).map(type => (
                  <button key={type} onClick={() => { setReportType(type); setGenerated(false); }} style={{
                    flex: 1, padding: "8px",
                    background: reportType === type ? "var(--accent)" : "var(--bg-elevated)",
                    border: "1px solid var(--border)", borderRadius: 7,
                    color: "var(--text-primary)", fontSize: 12, cursor: "pointer",
                    fontWeight: reportType === type ? 600 : 400, textTransform: "capitalize",
                  }}>{type}</button>
                ))}
              </div>
            </div>
            <button onClick={handleGenerate} disabled={loading} style={{
              width: "100%", padding: "11px",
              background: loading ? "var(--bg-elevated)" : "var(--accent)",
              color: "white", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer",
            }}>
              {loading ? "Generating…" : "Generate Report"}
            </button>
          </div>

          {/* Saved Reports */}
          <div className="card" style={{ padding: "20px" }}>
            <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 14 }}>Saved Reports</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {savedReports.map(r => (
                <div key={r.id} style={{
                  padding: "10px 12px", background: "var(--bg-elevated)", borderRadius: 8,
                  cursor: "pointer", border: "1px solid var(--border)",
                }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = "var(--border-hover)"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"}
                >
                  <div style={{ fontSize: 12, fontWeight: 600, lineHeight: 1.3 }}>{r.title}</div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: 5 }}>
                    <span style={{ fontSize: 10, color: "var(--accent)" }}>{r.type}</span>
                    <span style={{ fontSize: 10, color: "var(--text-muted)" }}>{r.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Report Preview */}
        <div className="card" style={{ padding: "28px", minHeight: 500 }}>
          {!generated && !loading && (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: 12, color: "var(--text-muted)", textAlign: "center" }}>
              <div style={{ fontSize: 48 }}>📄</div>
              <div>Select a title and report type, then click <strong>Generate Report</strong>.</div>
            </div>
          )}
          {loading && (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: 12, color: "var(--text-muted)" }}>
              <div style={{ fontSize: 40, animation: "pulse 1s infinite" }}>⚙️</div>
              <div>Generating report…</div>
            </div>
          )}
          {generated && (
            <div className="fade-in">
              {/* Header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
                <div>
                  <div style={{ fontSize: 11, color: "var(--text-muted)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>
                    {reportType === "performance" ? "Performance Report" : "AI Prediction Report"}
                  </div>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: 26, letterSpacing: 1 }}>{title.title}</div>
                  <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 4 }}>
                    Generated {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })} • NextHit Internal Analytics
                  </div>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  {["PDF", "CSV", "Excel"].map(fmt => (
                    <button key={fmt} onClick={() => handleExport(fmt)} style={{
                      padding: "7px 13px",
                      background: "var(--bg-elevated)", border: "1px solid var(--border)",
                      borderRadius: 7, color: "var(--text-primary)", fontSize: 12, cursor: "pointer", fontWeight: 600,
                    }}>↓ {fmt}</button>
                  ))}
                </div>
              </div>

              <div style={{ height: 1, background: "var(--border)", marginBottom: 24 }} />

                            {(
                reportType === "performance"
                  ? [
                      { label: "Total Views", val: `${title.views}M` },
                      { label: "Avg Watch Time", val: `${title.watchTime}m` },
                      { label: "Completion Rate", val: `${title.completionRate}%` },
                      { label: "NextHit Score", val: title.currentScore.toFixed(1) },
                    ]
                  : [
                      { label: "Predicted Score", val: title.predictedScore.toFixed(1) },
                      { label: "Confidence", val: `${title.confidence}%` },
                      { label: "Budget", val: `$${title.budget}M` },
                      { label: "Target Audience", val: title.targetAudience },
                    ]
              ).map(s => (
                <div key={s.label} style={{ padding: "14px 16px", background: "var(--bg-elevated)", borderRadius: 10 }}>
                  <div style={{ fontSize: 20, fontWeight: 800, fontFamily: "var(--font-mono)", color: "var(--accent)" }}>
                    {s.val}
                  </div>
                  <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 4, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                    {s.label}
                  </div>
                </div>
              ))}

              <div style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.7 }}>
                <strong style={{ color: "var(--text-primary)" }}>Executive Summary:</strong> {title.description} {reportType === "performance"
                  ? `The title has achieved ${title.views}M total views with a ${title.completionRate}% completion rate and an engagement score of ${title.engagement.toFixed(1)}/10. Current NextHit Score stands at ${title.currentScore.toFixed(1)}, indicating ${title.currentScore >= 8.5 ? "exceptional" : title.currentScore >= 7 ? "strong" : "moderate"} performance.`
                  : `AI model predicts a NextHit score of ${title.predictedScore.toFixed(1)} with ${title.confidence}% confidence based on genre trends, cast tier, budget allocation, and regional audience data.`
                }
              </div>

              <div style={{ marginTop: 20, padding: "14px 18px", background: "var(--accent-dim)", border: "1px solid var(--accent-glow)", borderRadius: 10 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "var(--accent)", marginBottom: 4 }}>Alert Status: {title.alertStatus.toUpperCase()}</div>
                {title.alertReason && <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>{title.alertReason}</div>}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
