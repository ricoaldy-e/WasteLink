import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CollectorForm } from "@/components/features/admin/CollectorForm";
import { updateCollectorAction } from "@/actions/collectors";
import { Collector } from "@/types/collector";
import { Category } from "@/types/category";

export const metadata: Metadata = {
  title: "Edit Pengepul — WasteLink Admin",
};

interface EditCollectorPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditCollectorPage({ params }: EditCollectorPageProps) {
  const { id } = await params;
  const supabase = await createClient();

  // Fetch collector dan categories secara paralel
  const [{ data: collectorData, error: collectorError }, { data: categories, error: categoriesError }] =
    await Promise.all([
      supabase.from("collectors").select("*").eq("id", id).single(),
      supabase.from("categories").select("id, name").order("name", { ascending: true }),
    ]);

  if (collectorError || !collectorData) {
    notFound();
  }

  const collector = collectorData as Collector;

  // Bind id ke updateCollectorAction agar signature cocok dengan (prevState, formData)
  const boundUpdateAction = updateCollectorAction.bind(null, id);

  return (
    <main className="min-h-screen bg-background">
      <Section className="pt-8 pb-12 lg:pt-12">
        {/* Page Header */}
        <div className="mb-8">
          <Link href="/dashboard/collectors">
            <Button variant="ghost" className="text-text-secondary hover:text-brand-green mb-4 -ml-3">
              ← Kembali ke Pengepul
            </Button>
          </Link>
          <h1 className="text-h2 text-text-primary">Edit Pengepul</h1>
          <p className="text-body-sm text-text-secondary mt-1">
            Perbarui informasi pengepul{" "}
            <span className="font-semibold text-text-primary">
              &ldquo;{collector.name}&rdquo;
            </span>
            .
          </p>
        </div>

        {/* Categories load error (non-fatal — form still renders with empty dropdown) */}
        {categoriesError && (
          <Card className="border-error/30 bg-error-bg mb-6 max-w-2xl">
            <p className="text-body-sm text-error">
              Gagal memuat daftar kategori: {categoriesError.message}
            </p>
          </Card>
        )}

        {/* Pre-filled form */}
        <CollectorForm
          collector={collector}
          categories={(categories as Category[]) ?? []}
          action={boundUpdateAction}
        />
      </Section>
    </main>
  );
}
