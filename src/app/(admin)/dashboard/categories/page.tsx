import type { Metadata } from "next";

export const metadata: Metadata = { title: "Manajemen Kategori" };

export default function AdminCategoriesPage() {
  return (
    <div>
      <h1 className="heading-2" style={{ marginBottom: "8px" }}>
        Manajemen Kategori
      </h1>
      <p className="body-regular" style={{ color: "var(--color-text-secondary)" }}>
        Tabel daftar kategori akan diimplementasikan pada Phase 3.
      </p>
    </div>
  );
}
