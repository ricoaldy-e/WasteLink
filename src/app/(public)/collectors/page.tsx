import type { Metadata } from "next";
import Container from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "Daftar Pengepul",
  description: "Temukan pengepul sampah dan daur ulang terpercaya di WasteLink.",
};

export default function CollectorsPage() {
  return (
    <Container style={{ paddingBlock: "80px" }}>
      <h1 className="heading-1">Daftar Pengepul</h1>
      <p className="body-regular" style={{ color: "var(--color-text-secondary)", marginTop: "16px" }}>
        Daftar pengepul akan ditampilkan di sini (Phase 4).
      </p>
    </Container>
  );
}
