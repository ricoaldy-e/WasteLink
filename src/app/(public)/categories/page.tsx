import type { Metadata } from "next";
import Container from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "Kategori Sampah",
  description: "Jelajahi kategori jenis sampah dan daur ulang yang tersedia di WasteLink.",
};

export default function CategoriesPage() {
  return (
    <Container style={{ paddingBlock: "80px" }}>
      <h1 className="heading-1">Kategori Sampah</h1>
      <p className="body-regular" style={{ color: "var(--color-text-secondary)", marginTop: "16px" }}>
        Daftar kategori akan ditampilkan di sini (Phase 4).
      </p>
    </Container>
  );
}
