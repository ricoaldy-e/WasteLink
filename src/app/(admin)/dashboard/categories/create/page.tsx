import { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { AdminPageHeader } from "@/components/layout/AdminPageHeader";
import { CategoryForm } from "@/components/features/admin/CategoryForm";
import { createCategoryAction } from "@/actions/categories";

export const metadata: Metadata = {
  title: "Tambah Kategori | WasteLink Admin",
};

export default function CreateCategoryPage() {
  return (
    <Section className="pt-8 pb-12 lg:pt-12">
      <AdminPageHeader
        back={{ href: "/dashboard/categories", label: "Semua kategori" }}
        title="Tambah kategori"
        description="Isi detail kategori limbah baru untuk direktori."
      />

      <CategoryForm action={createCategoryAction} />
    </Section>
  );
}
