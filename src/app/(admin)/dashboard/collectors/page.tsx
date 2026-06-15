import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { Section } from "@/components/layout/Section";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DeleteCollectorButton } from "@/components/features/admin/DeleteCollectorButton";

/** Partial shape returned by the list query (only selected columns) */
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

  // Join collectors → categories untuk tampilkan nama kategori di list
  const { data: collectors, error } = await supabase
    .from("collectors")
    .select("id, name, description, image_url, status, created_at, category_id, categories(id, name)")
    .order("created_at", { ascending: false });

  return (
    <main className="min-h-screen bg-background">
      <Section className="pt-8 pb-12 lg:pt-12">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-h2 text-text-primary">Pengepul</h1>
            <p className="text-body-sm text-text-secondary mt-1">
              Kelola daftar pengepul limbah yang terdaftar di platform.
            </p>
          </div>
          <Link href="/dashboard/collectors/create">
            <Button id="add-collector-btn" variant="primary" className="shrink-0">
              + Tambah Pengepul
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
        {!error && (!collectors || collectors.length === 0) && (
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
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <h2 className="text-h3 text-text-primary mb-2">
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

        {/* Collectors list */}
        {collectors && collectors.length > 0 && (
          <div className="grid grid-cols-1 gap-4">
            {(collectors as unknown as CollectorListItem[]).map((collector) => (
              <Card
                key={collector.id}
                className="flex flex-col sm:flex-row sm:items-center gap-4"
              >
                {/* Thumbnail */}
                <div className="shrink-0 w-16 h-16 rounded-[6px] bg-brand-green-muted overflow-hidden flex items-center justify-center">
                  {collector.image_url ? (
                    <Image
                      src={collector.image_url}
                      alt={collector.name}
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
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                    </svg>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-body-lg font-bold text-text-primary truncate">
                      {collector.name}
                    </h2>
                    {/* Status badge */}
                    <span
                      className={`inline-flex items-center text-caption font-semibold px-3 py-0.5 rounded-[4px] border ${
                        collector.status
                          ? "bg-brand-green-muted text-brand-green-hover border-brand-green"
                          : "bg-border text-text-secondary border-transparent"
                      }`}
                    >
                      {collector.status ? "Aktif" : "Tidak Aktif"}
                    </span>
                  </div>
                  {/* Category name */}
                  {collector.categories?.name && (
                    <p className="text-body-sm text-brand-green mt-0.5">
                      {collector.categories.name}
                    </p>
                  )}
                  {collector.description && (
                    <p className="text-body-sm text-text-secondary line-clamp-1 mt-0.5">
                      {collector.description}
                    </p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  <Link href={`/dashboard/collectors/${collector.id}/edit`}>
                    <Button
                      variant="secondary"
                      className="text-body-sm h-9 px-4"
                    >
                      Edit
                    </Button>
                  </Link>
                  <DeleteCollectorButton id={collector.id} name={collector.name} />
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
