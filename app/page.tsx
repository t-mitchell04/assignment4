"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useRole, Role } from "@/lib/roleContext";

const roles: Role[] = ["Executive", "Analyst", "Marketing", "Admin"];

export default function LoginPage() {
  const [step, setStep] = useState<"login" | "mfa" | "role">("login");
  const [email, setEmail] = useState("analyst@nexthit.internal");
  const [mfaCode, setMfaCode] = useState("");
  const [selectedRole, setSelectedRole] = useState<Role>("Analyst");
  const [loading, setLoading] = useState(false);
  const { setRole } = useRole();
  const router = useRouter();

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); setStep("mfa"); }, 1000);
  };

  const handleMfa = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); setStep("role"); }, 800);
  };

  const handleRoleSelect = () => {
    setRole(selectedRole);
    router.push("/dashboard");
  };

  const roleColors: Record<Role, string> = {
    Executive: "#8b5cf6",
    Analyst: "#3b82f6",
    Marketing: "#f59e0b",
    Admin: "#e50914",
  };

  const roleDescriptions: Record<Role, string> = {
    Executive: "High-level summaries, trends, reports",
    Analyst: "Full analytics, predictions, deep metrics",
    Marketing: "Alerts, recommendations, demographics",
    Admin: "Full platform access and configuration",
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "var(--bg-primary)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Background */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "radial-gradient(ellipse at 20% 50%, rgba(229,9,20,0.08) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(229,9,20,0.05) 0%, transparent 50%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
        pointerEvents: "none",
      }} />

      <div className="fade-in" style={{
        width: 420,
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: 20,
        padding: "40px",
        boxShadow: "var(--shadow-lg)",
        position: "relative",
        zIndex: 1,
      }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{
            width: 52, height: 52,
            background: "var(--accent)",
            borderRadius: 12,
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 14px",
            fontSize: 26, fontWeight: 900, color: "white",
            boxShadow: "0 0 32px var(--accent-glow)",
          }}>N</div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 28, letterSpacing: 4 }}>NEXTHIT</div>
          <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 4, letterSpacing: 1 }}>INTERNAL ANALYTICS PLATFORM</div>
        </div>

        {/* Step: Login */}
        {step === "login" && (
          <div className="fade-in">
            <div style={{ marginBottom: 12 }}>
              <label style={{ fontSize: 11, color: "var(--text-muted)", letterSpacing: "0.08em", textTransform: "uppercase", display: "block", marginBottom: 6 }}>Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{
                  width: "100%", padding: "11px 14px",
                  background: "var(--bg-elevated)", border: "1px solid var(--border)",
                  borderRadius: 8, color: "var(--text-primary)", fontSize: 14,
                  outline: "none", fontFamily: "var(--font-body)",
                }}
              />
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 11, color: "var(--text-muted)", letterSpacing: "0.08em", textTransform: "uppercase", display: "block", marginBottom: 6 }}>Password</label>
              <input
                type="password"
                defaultValue="••••••••"
                style={{
                  width: "100%", padding: "11px 14px",
                  background: "var(--bg-elevated)", border: "1px solid var(--border)",
                  borderRadius: 8, color: "var(--text-primary)", fontSize: 14,
                  outline: "none", fontFamily: "var(--font-body)",
                }}
              />
            </div>
            <button onClick={handleLogin} disabled={loading} style={{
              width: "100%", padding: "12px",
              background: loading ? "var(--bg-elevated)" : "var(--accent)",
              color: "white", border: "none", borderRadius: 8,
              fontSize: 14, fontWeight: 600, cursor: loading ? "not-allowed" : "pointer",
              transition: "background 0.2s",
            }}>
              {loading ? "Authenticating..." : "Continue with SSO →"}
            </button>
            <div style={{ textAlign: "center", marginTop: 14, fontSize: 12, color: "var(--text-muted)" }}>
              Secured by Netflix SSO • Internal use only
            </div>
          </div>
        )}

        {/* Step: MFA */}
        {step === "mfa" && (
          <div className="fade-in">
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>🔐</div>
              <div style={{ fontWeight: 600, fontSize: 16 }}>MFA Verification</div>
              <div style={{ color: "var(--text-muted)", fontSize: 13, marginTop: 4 }}>Enter the 6-digit code from your authenticator app</div>
            </div>
            <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 20 }}>
              {[0,1,2,3,4,5].map(i => (
                <input key={i} type="text" maxLength={1} style={{
                  width: 44, height: 52,
                  background: "var(--bg-elevated)", border: "1px solid var(--border)",
                  borderRadius: 8, textAlign: "center",
                  color: "var(--text-primary)", fontSize: 20, fontWeight: 700,
                  outline: "none", fontFamily: "var(--font-mono)",
                }} defaultValue={["4","8","2","1","9","3"][i]} />
              ))}
            </div>
            <button onClick={handleMfa} disabled={loading} style={{
              width: "100%", padding: "12px",
              background: "var(--accent)", color: "white",
              border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600,
              cursor: "pointer",
            }}>
              {loading ? "Verifying..." : "Verify Code →"}
            </button>
          </div>
        )}

        {/* Step: Role */}
        {step === "role" && (
          <div className="fade-in">
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <div style={{ fontWeight: 600, fontSize: 16 }}>Select Your Role</div>
              <div style={{ color: "var(--text-muted)", fontSize: 13, marginTop: 4 }}>Choose the access level for this session</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
              {roles.map(r => (
                <button key={r} onClick={() => setSelectedRole(r)} style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "12px 16px",
                  background: selectedRole === r ? "rgba(229,9,20,0.08)" : "var(--bg-elevated)",
                  border: selectedRole === r ? "1px solid rgba(229,9,20,0.4)" : "1px solid var(--border)",
                  borderRadius: 10, cursor: "pointer", textAlign: "left",
                  transition: "all 0.15s",
                }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>{r}</div>
                    <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 2 }}>{roleDescriptions[r]}</div>
                  </div>
                  <div style={{
                    width: 10, height: 10, borderRadius: "50%",
                    background: selectedRole === r ? roleColors[r] : "var(--border-hover)",
                    boxShadow: selectedRole === r ? `0 0 8px ${roleColors[r]}` : "none",
                  }} />
                </button>
              ))}
            </div>
            <button onClick={handleRoleSelect} style={{
              width: "100%", padding: "12px",
              background: "var(--accent)", color: "white",
              border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer",
            }}>
              Enter Platform →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
