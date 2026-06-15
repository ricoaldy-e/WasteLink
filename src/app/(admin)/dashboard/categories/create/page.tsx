import { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/layout/Section";
import { CategoryForm } from "@/components/features/admin/CategoryForm";
import { createCategoryAction } from "@/actions/categories";

export const metadata: Metadata = {
  title: "Tambah Kategori — WasteLink Admin",
};

export default function CreateCategoryPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <Section className="pt-8 pb-12 lg:pt-12">
        <div className="mb-8">
          <Link
            href="/dashboard/categories"
            className="group inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-text-secondary hover:text-text-primary transition-all duration-200 mb-4"
          >
            <span className="flex items-center justify-center w-7 h-7 rounded-full border border-border bg-white group-hover:border-text-secondary group-hover:bg-gray-50 transition-all duration-200 shadow-sm">
              <svg className="w-3.5 h-3.5 text-text-muted group-hover:text-text-primary transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </span>
            <span>Kembali ke Kategori</span>
          </Link>
          <h1 className="text-h2 font-bold uppercase tracking-wider text-text-primary">
            Tambah Kategori
          </h1>
          <p className="text-body-sm text-text-secondary mt-1">
            Isi detail kategori limbah baru yang ingin ditambahkan ke platform.
          </p>
        </div>

        <CategoryForm action={createCategoryAction} />
      </Section>
    </main>
  );
}
