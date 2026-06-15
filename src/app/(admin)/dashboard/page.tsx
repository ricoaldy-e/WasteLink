import { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Section } from "@/components/layout/Section";
import { Card, CardIcon } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Dashboard Admin — WasteLink",
  description: "Dashboard panel admin WasteLink",
};

export default async function DashboardPage() {
  const supabase = await createClient();

  // Ambil total data kategori dan pengepul dari Supabase
  // Menggunakan opsi { count: 'exact', head: true } agar hanya menghitung baris
  // tanpa harus menarik seluruh datanya ke server (lebih hemat resource)
  const { count: categoriesCount } = await supabase
    .from("categories")
    .select("*", { count: "exact", head: true });

  const { count: collectorsCount } = await supabase
    .from("collectors")
    .select("*", { count: "exact", head: true });

  return (
    <main className="min-h-screen bg-background">
      <Section className="pb-8 pt-8 lg:pt-12">
        {/* Header Dashboard */}
        <div className="mb-10">
          <h1 className="text-h2 text-text-primary">Dashboard</h1>
          <p className="text-body-md text-text-secondary mt-2">
            Selamat datang di panel admin WasteLink. Pantau statistik dan kelola
            data sistem Anda di sini.
          </p>
        </div>

        {/* Statistik */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Card className="flex flex-col">
            <h2 className="text-body-sm font-semibold text-text-secondary uppercase tracking-wider mb-2">
              Total Kategori
            </h2>
            <p className="text-display-xl text-brand-green font-bold leading-none">
              {categoriesCount ?? 0}
            </p>
          </Card>
          <Card className="flex flex-col">
            <h2 className="text-body-sm font-semibold text-text-secondary uppercase tracking-wider mb-2">
              Total Pengepul
            </h2>
            <p className="text-display-xl text-brand-green font-bold leading-none">
              {collectorsCount ?? 0}
            </p>
          </Card>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-h3 text-text-primary mb-6">Aksi Cepat</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Action: Kelola Kategori */}
            <Link href="/dashboard/categories" className="block outline-none group">
              <Card
                variant="icon"
                className="h-full transition-all duration-200 group-hover:shadow-md group-focus-visible:ring-2 group-focus-visible:ring-brand-green group-focus-visible:border-transparent group-hover:border-brand-green/30"
              >
                <CardIcon className="group-hover:bg-brand-green group-hover:text-white transition-colors duration-200">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="3" width="7" height="7" rx="1"></rect>
                    <rect x="14" y="3" width="7" height="7" rx="1"></rect>
                    <rect x="14" y="14" width="7" height="7" rx="1"></rect>
                    <rect x="3" y="14" width="7" height="7" rx="1"></rect>
                  </svg>
                </CardIcon>
                <div className="flex flex-col justify-center">
                  <h3 className="text-body-lg font-bold text-text-primary group-hover:text-brand-green transition-colors">
                    Kelola Kategori
                  </h3>
                  <p className="text-body-sm text-text-secondary mt-1">
                    Tambah, ubah, atau hapus kategori limbah
                  </p>
                </div>
              </Card>
            </Link>

            {/* Action: Kelola Pengepul */}
            <Link href="/dashboard/collectors" className="block outline-none group">
              <Card
                variant="icon"
                className="h-full transition-all duration-200 group-hover:shadow-md group-focus-visible:ring-2 group-focus-visible:ring-brand-green group-focus-visible:border-transparent group-hover:border-brand-green/30"
              >
                <CardIcon className="group-hover:bg-brand-green group-hover:text-white transition-colors duration-200">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </CardIcon>
                <div className="flex flex-col justify-center">
                  <h3 className="text-body-lg font-bold text-text-primary group-hover:text-brand-green transition-colors">
                    Kelola Pengepul
                  </h3>
                  <p className="text-body-sm text-text-secondary mt-1">
                    Tambah, ubah, atau hapus data pengepul limbah
                  </p>
                </div>
              </Card>
            </Link>
          </div>
        </div>
      </Section>
    </main>
  );
}
