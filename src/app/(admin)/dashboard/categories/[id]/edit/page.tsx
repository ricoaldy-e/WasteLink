import { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Section } from "@/components/layout/Section";
import { AdminPageHeader } from "@/components/layout/AdminPageHeader";
import { CategoryForm } from "@/components/features/admin/CategoryForm";
import { updateCategoryAction } from "@/actions/categories";
import { Category } from "@/types/category";

export const metadata: Metadata = {
  title: "Edit Kategori | WasteLink Admin",
};

interface EditCategoryPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditCategoryPage({ params }: EditCategoryPageProps) {
  const { id } = await params;

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) {
    notFound();
  }

  const category = data as Category;

  const boundUpdateAction = updateCategoryAction.bind(null, id);

  return (
    <Section className="pt-8 pb-12 lg:pt-12">
      <AdminPageHeader
        back={{ href: "/dashboard/categories", label: "Semua kategori" }}
        title="Edit kategori"
        description={
          <>
            Perbarui informasi kategori <span className="font-semibold text-ink">&ldquo;{category.name}&rdquo;</span>.
          </>
        }
      />

      <CategoryForm category={category} action={boundUpdateAction} />
    </Section>
  );
}
