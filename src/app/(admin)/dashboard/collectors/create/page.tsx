import { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Section } from "@/components/layout/Section";
import { CollectorForm } from "@/components/features/admin/CollectorForm";
import { createCollectorAction } from "@/actions/collectors";
import { Category } from "@/types/category";

export const metadata: Metadata = {
  title: "Tambah Pengepul — WasteLink Admin",
};

export default async function CreateCollectorPage() {
  const supabase = await createClient();

  const { data: categories, error: categoriesError } = await supabase
    .from("categories")
    .select("id, name")
    .order("name", { ascending: true });

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <Section className="pt-8 pb-12 lg:pt-12">
        <div className="mb-8">
          <Link
            href="/dashboard/collectors"
            className="group inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-text-secondary hover:text-text-primary transition-all duration-200 mb-4"
          >
            <span className="flex items-center justify-center w-7 h-7 rounded-full border border-border bg-white group-hover:border-text-secondary group-hover:bg-gray-50 transition-all duration-200 shadow-sm">
              <svg className="w-3.5 h-3.5 text-text-muted group-hover:text-text-primary transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </span>
            <span>Kembali ke Pengepul</span>
          </Link>
          <h1 className="text-h2 font-bold uppercase tracking-wider text-text-primary">
            Tambah Pengepul
          </h1>
          <p className="text-body-sm text-text-secondary mt-1">
            Isi data pengepul limbah baru yang ingin ditambahkan ke platform.
          </p>
        </div>

        {categoriesError && (
          <div className="mb-6 rounded-[4px] border border-border border-l-4 border-red-600 bg-white p-4 shadow-sm text-red-800 max-w-2xl text-xs font-semibold leading-relaxed">
            Gagal memuat daftar kategori: {categoriesError.message}
          </div>
        )}

        <CollectorForm
          categories={(categories as Category[]) ?? []}
          action={createCollectorAction}
        />
      </Section>
    </main>
  );
}
