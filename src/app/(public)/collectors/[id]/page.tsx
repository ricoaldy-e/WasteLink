import type { Metadata } from "next";
import Container from "@/components/layout/Container";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Detail Pengepul`,
    description: `Profil lengkap pengepul sampah dengan ID ${id}.`,
  };
}

export default async function CollectorDetailPage({ params }: Props) {
  const { id } = await params;
  return (
    <Container style={{ paddingBlock: "80px" }}>
      <h1 className="heading-1">Detail Pengepul</h1>
      <p className="body-small" style={{ color: "var(--color-text-secondary)", marginTop: "8px" }}>
        ID: {id}
      </p>
      <p className="body-regular" style={{ color: "var(--color-text-secondary)", marginTop: "16px" }}>
        Konten detail pengepul akan diisi pada Phase 4.
      </p>
    </Container>
  );
}
