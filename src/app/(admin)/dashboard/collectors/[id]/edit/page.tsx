import { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Section } from "@/components/layout/Section";
import { AdminPageHeader } from "@/components/layout/AdminPageHeader";
import { FormNotice } from "@/components/features/admin/FormNotice";
import { CollectorForm } from "@/components/features/admin/CollectorForm";
import { updateCollectorAction } from "@/actions/collectors";
import { Collector } from "@/types/collector";
import { Category } from "@/types/category";

export const metadata: Metadata = {
  title: "Edit Pengepul | WasteLink Admin",
};

interface EditCollectorPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditCollectorPage({ params }: EditCollectorPageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const [{ data: collectorData, error: collectorError }, { data: categories, error: categoriesError }] =
    await Promise.all([
      supabase.from("collectors").select("*").eq("id", id).single(),
      supabase.from("categories").select("id, name").order("name", { ascending: true }),
    ]);

  if (collectorError || !collectorData) {
    notFound();
  }

  const collector = collectorData as Collector;

  const boundUpdateAction = updateCollectorAction.bind(null, id);

  return (
    <Section className="pt-8 pb-12 lg:pt-12">
      <AdminPageHeader
        back={{ href: "/dashboard/collectors", label: "Semua pengepul" }}
        title="Edit pengepul"
        description={
          <>
            Perbarui informasi pengepul <span className="font-semibold text-ink">&ldquo;{collector.name}&rdquo;</span>.
          </>
        }
      />

      {categoriesError && (
        <FormNotice tone="error" className="mb-6">
          Daftar kategori gagal dimuat: {categoriesError.message}
        </FormNotice>
      )}

      <CollectorForm
        collector={collector}
        categories={(categories as Category[]) ?? []}
        action={boundUpdateAction}
      />
    </Section>
  );
}
