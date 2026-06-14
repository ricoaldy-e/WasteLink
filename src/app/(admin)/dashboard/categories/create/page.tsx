import type { Metadata } from "next";

export const metadata: Metadata = { title: "Tambah Kategori" };

export default function AdminCategoryCreatePage() {
  return (
    <div>
      <h1 className="heading-2" style={{ marginBottom: "8px" }}>
        Tambah Kategori
      </h1>
      <p className="body-regular" style={{ color: "var(--color-text-secondary)" }}>
        Form tambah kategori akan diimplementasikan pada Phase 3.
      </p>
    </div>
  );
}
