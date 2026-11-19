import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { Section } from "@/components/layout/Section";
import { AdminPageHeader } from "@/components/layout/AdminPageHeader";
import { ButtonLink } from "@/components/ui/button-link";

export const metadata: Metadata = {
  title: "Dashboard Admin | WasteLink",
  description: "Dashboard panel admin WasteLink",
};

const formatNumber = new Intl.NumberFormat("id-ID");

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

  const stats = [
    { label: "Total kategori", value: categoriesCount ?? 0, unit: "kategori limbah" },
    { label: "Total pengepul", value: totalCollectors, unit: "pengepul terdaftar" },
  ];

  return (
    <Section className="pt-8 pb-12 lg:pt-12">
      <AdminPageHeader title="Dashboard" description="Pantau jumlah data dan kelola kategori serta pengepul di direktori WasteLink." />

      <dl className="grid grid-cols-2 divide-x divide-border border-y border-border">
        {stats.map((stat) => (
          <div key={stat.label} className="px-4 py-6 first:ps-0 sm:px-8">
            <dt className="text-small font-semibold text-muted">{stat.label}</dt>
            <dd className="mt-2 flex flex-wrap items-baseline gap-x-2">
              <span className="font-display font-semibold leading-none lining-nums tabular-nums text-ink text-[length:clamp(3rem,2rem_+_4vw,5rem)]">
                {formatNumber.format(stat.value)}
              </span>
              <span className="text-small text-muted">{stat.unit}</span>
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-8">
        <section aria-labelledby="recent-categories">
          <div className="flex items-center justify-between gap-4 border-b-2 border-ink pb-3">
            <h2 id="recent-categories" className="text-h4 text-ink">Kategori terbaru</h2>
            <ButtonLink href="/dashboard/categories/create" variant="secondary" size="sm">Tambah kategori</ButtonLink>
          </div>

          {recentCategories && recentCategories.length > 0 ? (
            <ul className="divide-y divide-border">
              {recentCategories.map((category) => (
                <li key={category.id} className="flex items-center justify-between gap-4 py-4">
                  <div className="min-w-0">
                    <p className="truncate text-small font-semibold text-ink">{category.name}</p>
                    {category.description && <p className="line-clamp-1 text-caption text-muted">{category.description}</p>}
                  </div>
                  <ButtonLink href={`/dashboard/categories/${category.id}/edit`} variant="secondary" size="sm" className="shrink-0">
                    Edit<span className="sr-only"> kategori {category.name}</span>
                  </ButtonLink>
                </li>
              ))}
            </ul>
          ) : (
            <p className="py-6 text-small text-muted">Belum ada kategori. Tambahkan kategori pertama untuk mulai mengisi direktori.</p>
          )}
        </section>

        <section aria-labelledby="recent-collectors">
          <div className="flex items-center justify-between gap-4 border-b-2 border-ink pb-3">
            <h2 id="recent-collectors" className="text-h4 text-ink">Pengepul terbaru</h2>
            <ButtonLink href="/dashboard/collectors/create" variant="secondary" size="sm">Tambah pengepul</ButtonLink>
          </div>

          {recentCollectors && recentCollectors.length > 0 ? (
            <ul className="divide-y divide-border">
              {recentCollectors.map((collector) => (
                <li key={collector.id} className="flex items-center justify-between gap-4 py-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <div aria-hidden="true" className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-small font-semibold text-on-primary">
                      {collector.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-small font-semibold text-ink">{collector.name}</p>
                      <p className="truncate text-caption text-muted">
                        {(Array.isArray(collector.categories) ? collector.categories[0] : collector.categories)?.name || "Tanpa kategori"}
                      </p>
                    </div>
                  </div>
                  <ButtonLink href={`/dashboard/collectors/${collector.id}/edit`} variant="secondary" size="sm" className="shrink-0">
                    Edit<span className="sr-only"> pengepul {collector.name}</span>
                  </ButtonLink>
                </li>
              ))}
            </ul>
          ) : (
            <p className="py-6 text-small text-muted">Belum ada pengepul. Tambahkan pengepul pertama untuk mulai mengisi direktori.</p>
          )}
        </section>
      </div>
    </Section>
  );
}
