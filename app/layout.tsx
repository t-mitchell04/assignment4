import type { Metadata } from "next";
import "../styles/globals.css";
import { RoleProvider } from "@/lib/roleContext";
import ClientLayout from "./ClientLayout";

export const metadata: Metadata = {
  title: "NextHit — Internal Analytics Platform",
  description: "Netflix internal analytics and prediction system",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <RoleProvider>
          <ClientLayout>{children}</ClientLayout>
        </RoleProvider>
      </body>
    </html>
  );
}
