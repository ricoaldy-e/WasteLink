import type { Metadata } from "next";
import Container from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "Tentang Kami",
  description: "Pelajari lebih lanjut tentang misi dan visi WasteLink dalam menghubungkan masyarakat dengan pengepul sampah.",
};

export default function AboutPage() {
  return (
    <Container style={{ paddingBlock: "80px" }}>
      <h1 className="heading-1">Tentang Kami</h1>
      <p className="body-regular" style={{ color: "var(--color-text-secondary)", marginTop: "16px" }}>
        Konten halaman About akan diisi pada Phase 4.
      </p>
    </Container>
  );
}
