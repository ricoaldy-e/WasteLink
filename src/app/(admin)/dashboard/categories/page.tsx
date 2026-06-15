import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { Section } from "@/components/layout/Section";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DeleteCategoryButton } from "@/components/features/admin/DeleteCategoryButton";
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
    <main className="min-h-screen bg-background">
      <Section className="pt-8 pb-12 lg:pt-12">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-h2 text-text-primary">Kategori</h1>
            <p className="text-body-sm text-text-secondary mt-1">
              Kelola daftar kategori limbah yang tersedia di platform.
            </p>
          </div>
          <Link href="/dashboard/categories/create">
            <Button id="add-category-btn" variant="primary" className="shrink-0">
              + Tambah Kategori
            </Button>
          </Link>
        </div>

        {/* Error state */}
        {error && (
          <Card className="border-error/30 bg-error-bg mb-6">
            <p className="text-body-sm text-error">
              Gagal memuat data: {error.message}
            </p>
          </Card>
        )}

        {/* Empty state */}
        {!error && (!categories || categories.length === 0) && (
          <Card className="flex flex-col items-center py-16 text-center">
            <div className="w-16 h-16 rounded-full bg-brand-green-muted flex items-center justify-center mb-4">
              <svg
                className="text-brand-green"
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
            <h2 className="text-h3 text-text-primary mb-2">
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

        {/* Category list */}
        {categories && categories.length > 0 && (
          <div className="grid grid-cols-1 gap-4">
            {(categories as Category[]).map((category) => (
              <Card
                key={category.id}
                className="flex flex-col sm:flex-row sm:items-center gap-4"
              >
                {/* Thumbnail */}
                <div className="shrink-0 w-16 h-16 rounded-[6px] bg-brand-green-muted overflow-hidden flex items-center justify-center">
                  {category.image_url ? (
                    <Image
                      src={category.image_url}
                      alt={category.name}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <svg
                      className="text-brand-green"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <path d="M3 9h18M9 21V9" />
                    </svg>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h2 className="text-body-lg font-bold text-text-primary truncate">
                    {category.name}
                  </h2>
                  {category.description && (
                    <p className="text-body-sm text-text-secondary line-clamp-1 mt-0.5">
                      {category.description}
                    </p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  <Link href={`/dashboard/categories/${category.id}/edit`}>
                    <Button
                      variant="secondary"
                      className="text-body-sm h-9 px-4"
                    >
                      Edit
                    </Button>
                  </Link>
                  <DeleteCategoryButton id={category.id} name={category.name} />
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Back to Dashboard */}
        <div className="mt-8">
          <Link href="/dashboard">
            <Button variant="ghost" className="text-text-secondary hover:text-brand-green">
              ← Kembali ke Dashboard
            </Button>
          </Link>
        </div>
      </Section>
    </main>
  );
}
