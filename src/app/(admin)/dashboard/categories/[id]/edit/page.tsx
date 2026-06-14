import type { Metadata } from "next";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  return { title: `Edit Kategori` };
}

export default async function AdminCategoryEditPage({ params }: Props) {
  const { id } = await params;
  return (
    <div>
      <h1 className="heading-2" style={{ marginBottom: "8px" }}>
        Edit Kategori
      </h1>
      <p className="body-small" style={{ color: "var(--color-text-secondary)", marginBottom: "16px" }}>
        ID: {id}
      </p>
      <p className="body-regular" style={{ color: "var(--color-text-secondary)" }}>
        Form edit kategori akan diimplementasikan pada Phase 3.
      </p>
    </div>
  );
}
