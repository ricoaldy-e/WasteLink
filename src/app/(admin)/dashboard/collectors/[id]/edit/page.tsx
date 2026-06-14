import type { Metadata } from "next";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  return { title: `Edit Pengepul` };
}

export default async function AdminCollectorEditPage({ params }: Props) {
  const { id } = await params;
  return (
    <div>
      <h1 className="heading-2" style={{ marginBottom: "8px" }}>
        Edit Pengepul
      </h1>
      <p className="body-small" style={{ color: "var(--color-text-secondary)", marginBottom: "16px" }}>
        ID: {id}
      </p>
      <p className="body-regular" style={{ color: "var(--color-text-secondary)" }}>
        Form edit pengepul akan diimplementasikan pada Phase 3.
      </p>
    </div>
  );
}
