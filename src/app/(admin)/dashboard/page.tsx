import { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Section } from "@/components/layout/Section";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Dashboard Admin — WasteLink",
  description: "Dashboard panel admin WasteLink",
};

export default async function DashboardPage() {
  const supabase = await createClient();

  const { count: categoriesCount } = await supabase
    .from("categories")
    .select("*", { count: "exact", head: true });

  const { data: collectors } = await supabase
    .from("collectors")
    .select("id, name, status, categories(id, name)")
    .order("created_at", { ascending: false });

  const totalCollectors = collectors?.length ?? 0;

  const recentCollectors = collectors?.slice(0, 3) ?? [];

  const { data: recentCategories } = await supabase
    .from("categories")
    .select("id, name, description")
    .order("created_at", { ascending: false })
    .limit(3);

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <Section className="pb-12 pt-8 lg:pt-12">
        <div className="mb-8 pb-6 border-b border-border">
          <h1 className="text-h2 font-bold uppercase tracking-wider text-text-primary">
            Dashboard
          </h1>
          <p className="text-body-sm text-text-secondary mt-1">
            Selamat datang di panel admin WasteLink. Pantau statistik dan kelola data sistem Anda di sini.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="flex flex-col justify-between p-6 bg-white border border-border rounded-[8px]">
            <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">
              Total Kategori
            </span>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-3xl font-bold text-text-primary leading-none">
                {categoriesCount ?? 0}
              </span>
              <span className="text-xs text-text-secondary font-semibold uppercase tracking-wider">kategori limbah</span>
            </div>
          </Card>

          <Card className="flex flex-col justify-between p-6 bg-white border border-border rounded-[8px]">
            <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">
              Total Pengepul
            </span>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-3xl font-bold text-text-primary leading-none">
                {totalCollectors}
              </span>
              <span className="text-xs text-text-secondary font-semibold uppercase tracking-wider">pengepul terdaftar</span>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-white border border-border rounded-[8px] p-6 shadow-sm flex flex-col">
            <div className="flex items-center justify-between pb-4 border-b border-border mb-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-text-primary">
                Kategori Limbah
              </h2>
              <Link href="/dashboard/categories/create">
                <button className="text-[10px] font-bold uppercase tracking-wider text-brand-green hover:text-brand-green-hover border border-brand-green rounded-[6px] px-3 py-1.5 transition-colors bg-white">
                  + Tambah Kategori
                </button>
              </Link>
            </div>

            {recentCategories && recentCategories.length > 0 ? (
              <div className="divide-y divide-border flex-1">
                {recentCategories.map((category) => (
                  <div key={category.id} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
                    <div className="min-w-0 pr-4">
                      <p className="text-sm font-bold text-text-primary truncate">{category.name}</p>
                      {category.description && (
                        <p className="text-xs text-text-secondary mt-0.5 line-clamp-1">
                          {category.description}
                        </p>
                      )}
                    </div>
                    <Link href={`/dashboard/categories/${category.id}/edit`}>
                      <button className="text-[10px] font-bold uppercase tracking-wider text-text-secondary hover:text-brand-green border border-border hover:border-brand-green bg-white rounded-[6px] px-3 py-1.5 transition-colors">
                        Edit
                      </button>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-sm text-text-secondary flex-1 flex items-center justify-center">
                Belum ada data kategori.
              </div>
            )}
          </Card>

          <Card className="bg-white border border-border rounded-[8px] p-6 shadow-sm flex flex-col">
            <div className="flex items-center justify-between pb-4 border-b border-border mb-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-text-primary">
                Pengepul Terdaftar
              </h2>
              <Link href="/dashboard/collectors/create">
                <button className="text-[10px] font-bold uppercase tracking-wider text-brand-green hover:text-brand-green-hover border border-brand-green rounded-[6px] px-3 py-1.5 transition-colors bg-white">
                  + Tambah Pengepul
                </button>
              </Link>
            </div>

            {recentCollectors && recentCollectors.length > 0 ? (
              <div className="divide-y divide-border flex-1">
                {recentCollectors.map((collector) => (
                  <div key={collector.id} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
                    <div className="flex items-center gap-3 flex-1 min-w-0 pr-4">
                      <div className="w-8 h-8 rounded-full bg-brand-green flex items-center justify-center text-white text-xs font-bold uppercase shrink-0">
                        {collector.name.charAt(0)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-bold text-text-primary truncate">{collector.name}</p>
                        <p className="text-xs text-text-secondary mt-0.5 font-medium truncate">
                          {(collector.categories as any)?.name || "Kategori Umum"}
                        </p>
                      </div>
                    </div>
                    <Link href={`/dashboard/collectors/${collector.id}/edit`}>
                      <button className="text-[10px] font-bold uppercase tracking-wider text-text-secondary hover:text-brand-green border border-border hover:border-brand-green bg-white rounded-[6px] px-3 py-1.5 transition-colors shrink-0">
                        Edit
                      </button>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-sm text-text-secondary flex-1 flex items-center justify-center">
                Belum ada data pengepul.
              </div>
            )}
          </Card>
        </div>
      </Section>
    </main>
  );
}
