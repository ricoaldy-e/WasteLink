import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { Section } from "@/components/layout/Section";
import { AdminPageHeader } from "@/components/layout/AdminPageHeader";
import { ButtonLink } from "@/components/ui/button-link";
import { StateMessage } from "@/components/features/StateMessage";
import { FormNotice } from "@/components/features/admin/FormNotice";
import { AdminCategoriesList } from "@/components/features/admin/AdminCategoriesList";
import { Category } from "@/types/category";

export const metadata: Metadata = {
  title: "Kelola Kategori | WasteLink Admin",
};

export default async function CategoriesPage() {
  const supabase = await createClient();

  const { data: categories, error } = await supabase
    .from("categories")
    .select("id, name, description, image_url, created_at")
    .order("created_at", { ascending: false });

  return (
    <Section className="pt-8 pb-12 lg:pt-12">
      <AdminPageHeader
        title="Kategori"
        description="Kategori limbah yang tersedia di direktori publik."
        action={
          <ButtonLink id="add-category-btn" href="/dashboard/categories/create">
            Tambah kategori
          </ButtonLink>
        }
      />

      {error && <FormNotice tone="error">Data kategori gagal dimuat: {error.message}</FormNotice>}

      {!error && (!categories || categories.length === 0) && (
        <StateMessage
          title="Belum ada kategori"
          action={<ButtonLink href="/dashboard/categories/create">Tambah kategori pertama</ButtonLink>}
        >
          Kategori mengelompokkan pengepul berdasarkan jenis limbah yang mereka terima.
        </StateMessage>
      )}

      {!error && categories && categories.length > 0 && (
        <AdminCategoriesList initialCategories={categories as Category[]} />
      )}
    </Section>
  );
}
