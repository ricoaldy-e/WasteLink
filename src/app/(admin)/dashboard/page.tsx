import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function DashboardPage() {
  return (
    <div>
      <h1 className="heading-2" style={{ marginBottom: "8px" }}>
        Dashboard
      </h1>
      <p className="body-regular" style={{ color: "var(--color-text-secondary)" }}>
        Ringkasan data (Total Kategori & Pengepul) akan ditampilkan di sini pada Phase 3.
      </p>
    </div>
  );
}
