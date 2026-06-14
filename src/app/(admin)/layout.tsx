import AdminSidebar from "@/components/layout/AdminSidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | Admin WasteLink",
    default: "Admin WasteLink",
  },
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <AdminSidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Admin Topbar */}
        <header
          style={{
            height: "64px",
            backgroundColor: "var(--color-background)",
            borderBottom: "1px solid var(--color-border)",
            display: "flex",
            alignItems: "center",
            padding: "0 32px",
            boxShadow: "var(--shadow-raised)",
            position: "sticky",
            top: 0,
            zIndex: 50,
          }}
        >
          <p
            style={{
              fontSize: "14px",
              color: "var(--color-text-secondary)",
              fontWeight: 500,
            }}
          >
            Panel Administrasi
          </p>
        </header>

        {/* Page content */}
        <main
          style={{
            flex: 1,
            backgroundColor: "#F8F9FA",
            padding: "32px",
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
