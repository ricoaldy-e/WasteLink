import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { Section } from "@/components/layout/Section";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DeleteCategoryButton } from "@/components/features/admin/DeleteCategoryButton";
import { AdminCategoriesList } from "@/components/features/admin/AdminCategoriesList";
import { Category } from "@/types/category";

export const metadata: Metadata = {
  title: "Kelola Kategori — WasteLink Admin",
};

export default async function CategoriesPage() {
  const supabase = await createClient();

  const { data: categories, error } = await supabase
    .from("categories")
    .select("id, name, description, image_url, created_at")
    .order("created_at", { ascending: false });

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <Section className="pt-8 pb-12 lg:pt-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 pb-6 border-b border-border">
          <div>
            <h1 className="text-h2 font-bold uppercase tracking-wider text-text-primary">Kategori</h1>
            <p className="text-body-sm text-text-secondary mt-1">
              Kelola daftar kategori limbah yang tersedia di platform.
            </p>
          </div>
          <Link href="/dashboard/categories/create">
            <Button id="add-category-btn" variant="primary" className="shrink-0 text-xs font-bold uppercase tracking-wider h-[44px] rounded-[6px]">
              + Tambah Kategori
            </Button>
          </Link>
        </div>

        {error && (
          <Card className="border-error/30 bg-error-bg mb-6">
            <p className="text-body-sm text-error">
              Gagal memuat data: {error.message}
            </p>
          </Card>
        )}

        {!error && (!categories || categories.length === 0) && (
          <Card className="flex flex-col items-center py-16 text-center bg-white border border-border rounded-[8px] p-6 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-brand-green flex items-center justify-center mb-4 text-white">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
              </svg>
            </div>
            <h2 className="text-h3 text-text-primary mb-2 uppercase tracking-wider font-bold">
              Belum Ada Kategori
            </h2>
            <p className="text-body-sm text-text-secondary mb-6 max-w-xs">
              Mulai dengan menambahkan kategori limbah pertama Anda.
            </p>
            <Link href="/dashboard/categories/create">
              <Button variant="primary">Tambah Kategori Pertama</Button>
            </Link>
          </Card>
        )}

        {!error && categories && categories.length > 0 && (
          <AdminCategoriesList initialCategories={categories as Category[]} />
        )}
      </Section>
    </main>
  );
}
