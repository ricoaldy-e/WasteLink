import { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/button";
import { CategoryForm } from "@/components/features/admin/CategoryForm";
import { createCategoryAction } from "@/actions/categories";

export const metadata: Metadata = {
  title: "Tambah Kategori — WasteLink Admin",
};

export default function CreateCategoryPage() {
  return (
    <main className="min-h-screen bg-background">
      <Section className="pt-8 pb-12 lg:pt-12">
        {/* Page Header */}
        <div className="mb-8">
          <Link href="/dashboard/categories">
            <Button variant="ghost" className="text-text-secondary hover:text-brand-green mb-4 -ml-3">
              ← Kembali ke Kategori
            </Button>
          </Link>
          <h1 className="text-h2 text-text-primary">Tambah Kategori</h1>
          <p className="text-body-sm text-text-secondary mt-1">
            Isi detail kategori limbah baru yang ingin ditambahkan ke platform.
          </p>
        </div>

        {/* Form */}
        <CategoryForm action={createCategoryAction} />
      </Section>
    </main>
  );
}
