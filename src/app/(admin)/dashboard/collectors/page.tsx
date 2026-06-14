import type { Metadata } from "next";

export const metadata: Metadata = { title: "Manajemen Pengepul" };

export default function AdminCollectorsPage() {
  return (
    <div>
      <h1 className="heading-2" style={{ marginBottom: "8px" }}>
        Manajemen Pengepul
      </h1>
      <p className="body-regular" style={{ color: "var(--color-text-secondary)" }}>
        Tabel daftar pengepul akan diimplementasikan pada Phase 3.
      </p>
    </div>
  );
}
