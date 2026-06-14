import type { Metadata } from "next";

export const metadata: Metadata = { title: "Tambah Pengepul" };

export default function AdminCollectorCreatePage() {
  return (
    <div>
      <h1 className="heading-2" style={{ marginBottom: "8px" }}>
        Tambah Pengepul
      </h1>
      <p className="body-regular" style={{ color: "var(--color-text-secondary)" }}>
        Form tambah pengepul akan diimplementasikan pada Phase 3.
      </p>
    </div>
  );
}
