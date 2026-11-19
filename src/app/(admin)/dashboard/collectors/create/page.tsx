import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { Section } from "@/components/layout/Section";
import { AdminPageHeader } from "@/components/layout/AdminPageHeader";
import { FormNotice } from "@/components/features/admin/FormNotice";
import { CollectorForm } from "@/components/features/admin/CollectorForm";
import { createCollectorAction } from "@/actions/collectors";
import { Category } from "@/types/category";

export const metadata: Metadata = {
  title: "Tambah Pengepul | WasteLink Admin",
};

export default async function CreateCollectorPage() {
  const supabase = await createClient();

  const { data: categories, error: categoriesError } = await supabase
    .from("categories")
    .select("id, name")
    .order("name", { ascending: true });

  return (
    <Section className="pt-8 pb-12 lg:pt-12">
      <AdminPageHeader
        back={{ href: "/dashboard/collectors", label: "Semua pengepul" }}
        title="Tambah pengepul"
        description="Isi data pengepul limbah baru untuk direktori."
      />

      {categoriesError && (
        <FormNotice tone="error" className="mb-6">
          Daftar kategori gagal dimuat: {categoriesError.message}
        </FormNotice>
      )}

      <CollectorForm
        categories={(categories as Category[]) ?? []}
        action={createCollectorAction}
      />
    </Section>
  );
}
