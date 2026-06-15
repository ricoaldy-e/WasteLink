import { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Section } from "@/components/layout/Section";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AdminCollectorsList } from "@/components/features/admin/AdminCollectorsList";

type CollectorListItem = {
  id: string;
  name: string;
  description: string | null;
  image_url: string | null;
  status: boolean;
  created_at: string;
  category_id: string | null;
  categories: { id: string; name: string } | null;
};

export const metadata: Metadata = {
  title: "Kelola Pengepul — WasteLink Admin",
};

export default async function CollectorsPage() {
  const supabase = await createClient();

  const { data: collectors, error } = await supabase
    .from("collectors")
    .select("id, name, description, image_url, status, created_at, category_id, categories(id, name)")
    .order("created_at", { ascending: false });

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <Section className="pt-8 pb-12 lg:pt-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 pb-6 border-b border-border">
          <div>
            <h1 className="text-h2 font-bold uppercase tracking-wider text-text-primary">Pengepul</h1>
            <p className="text-body-sm text-text-secondary mt-1">
              Kelola daftar pengepul limbah yang terdaftar di platform.
            </p>
          </div>
          <Link href="/dashboard/collectors/create">
            <Button id="add-collector-btn" variant="primary" className="shrink-0 text-xs font-bold uppercase tracking-wider h-[44px] rounded-[6px]">
              + Tambah Pengepul
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

        {!error && (!collectors || collectors.length === 0) && (
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
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <h2 className="text-h3 text-text-primary mb-2 uppercase tracking-wider font-bold">
              Belum Ada Pengepul
            </h2>
            <p className="text-body-sm text-text-secondary mb-6 max-w-xs">
              Mulai dengan menambahkan data pengepul pertama Anda.
            </p>
            <Link href="/dashboard/collectors/create">
              <Button variant="primary">Tambah Pengepul Pertama</Button>
            </Link>
          </Card>
        )}

        {!error && collectors && collectors.length > 0 && (
          <AdminCollectorsList initialCollectors={collectors as unknown as CollectorListItem[]} />
        )}
      </Section>
    </main>
  );
}
