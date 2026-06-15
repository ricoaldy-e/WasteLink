import { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CollectorForm } from "@/components/features/admin/CollectorForm";
import { createCollectorAction } from "@/actions/collectors";
import { Category } from "@/types/category";

export const metadata: Metadata = {
  title: "Tambah Pengepul — WasteLink Admin",
};

export default async function CreateCollectorPage() {
  const supabase = await createClient();

  // Fetch categories untuk dropdown Select
  const { data: categories, error: categoriesError } = await supabase
    .from("categories")
    .select("id, name")
    .order("name", { ascending: true });

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
          <h1 className="text-h2 text-text-primary">Tambah Pengepul</h1>
          <p className="text-body-sm text-text-secondary mt-1">
            Isi data pengepul limbah baru yang ingin ditambahkan ke platform.
          </p>
        </div>

        {/* Categories load error */}
        {categoriesError && (
          <Card className="border-error/30 bg-error-bg mb-6 max-w-2xl">
            <p className="text-body-sm text-error">
              Gagal memuat daftar kategori: {categoriesError.message}
            </p>
          </Card>
        )}

        {/* Form */}
        <CollectorForm
          categories={(categories as Category[]) ?? []}
          action={createCollectorAction}
        />
      </Section>
    </main>
  );
}
