"use client";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/layout/Sidebar";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/";

  if (isLoginPage) return <>{children}</>;

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <main style={{
        flex: 1,
        marginLeft: 220,
        minHeight: "100vh",
        background: "var(--bg-primary)",
        padding: "32px 36px",
        maxWidth: "calc(100vw - 220px)",
      }}>
        {children}
      </main>
    </div>
  );
}
