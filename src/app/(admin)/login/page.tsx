import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login Admin",
};

export default function AdminLoginPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F8F9FA",
      }}
    >
      <div
        style={{
          backgroundColor: "var(--color-background)",
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-lg)",
          padding: "40px",
          width: "100%",
          maxWidth: "400px",
          boxShadow: "var(--shadow-elevated)",
        }}
      >
        <h1
          className="heading-2"
          style={{ marginBottom: "8px", color: "var(--color-brand-green)" }}
        >
          WasteLink Admin
        </h1>
        <p className="body-small" style={{ color: "var(--color-text-secondary)", marginBottom: "32px" }}>
          Form login akan diimplementasikan pada Phase 2.
        </p>
      </div>
    </div>
  );
}
