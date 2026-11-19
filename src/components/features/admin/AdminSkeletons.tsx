import { Section } from "@/components/layout/Section";
import { AdminPageHeader } from "@/components/layout/AdminPageHeader";
import { ButtonLink } from "@/components/ui/button-link";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

/*
 * Skeleton halaman admin. Bagian statis (judul, deskripsi, tombol tambah) dirender ASLI memakai
 * komponen yang sama dengan halamannya, jadi hanya isi data yang berupa kerangka. Teks statis di sini
 * harus sama dengan page.tsx masing-masing: ubah bersamaan.
 */

function RowSkeleton({ avatar }: { avatar: "round" | "square" }) {
  return (
    <li className="flex items-center gap-3 px-4 py-3">
      <Skeleton className={`size-10 shrink-0 ${avatar === "round" ? "rounded-full" : ""}`} />
      <div className="min-w-0 flex-1 space-y-2">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-3 w-1/2" />
      </div>
      <Skeleton className="hidden h-6 w-16 sm:block" />
      <Skeleton className="h-10 w-16" />
    </li>
  );
}

export function AdminListSkeleton({
  title,
  description,
  addHref,
  addLabel,
  avatar,
}: {
  title: string;
  description: string;
  addHref: string;
  addLabel: string;
  avatar: "round" | "square";
}) {
  return (
    <Section className="pt-8 pb-12 lg:pt-12">
      <AdminPageHeader title={title} description={description} action={<ButtonLink href={addHref}>{addLabel}</ButtonLink>} />

      <Skeleton className="h-11 w-full max-w-md" />
      <div className="mt-6 w-24 text-small">
        <Skeleton className="h-[1lh]" />
      </div>

      <div className="mt-3 overflow-hidden rounded-lg border border-border bg-surface">
        <div className="border-b-2 border-ink px-4 py-3">
          <Skeleton className="h-3 w-24" />
        </div>
        <ul className="divide-y divide-border">
          {Array.from({ length: 5 }, (_, i) => (
            <RowSkeleton key={i} avatar={avatar} />
          ))}
        </ul>
      </div>
    </Section>
  );
}

function FieldSkeleton() {
  return (
    <div>
      <Skeleton className="mb-2 h-4 w-32" />
      <Skeleton className="h-11 w-full" />
    </div>
  );
}

export function AdminFormSkeleton({
  back,
  title,
  description,
  fields,
}: {
  back: { href: string; label: string };
  title: string;
  description: string;
  fields: number;
}) {
  return (
    <Section className="pt-8 pb-12 lg:pt-12">
      <AdminPageHeader back={back} title={title} description={description} />

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12 lg:gap-8">
        <Card className="flex flex-col gap-6 lg:col-span-8">
          {Array.from({ length: fields }, (_, i) => (
            <FieldSkeleton key={i} />
          ))}
          <div>
            <Skeleton className="mb-2 h-4 w-32" />
            <Skeleton className="h-28 w-full" />
          </div>
        </Card>

        <Card className="flex flex-col gap-6 lg:col-span-4">
          <div className="space-y-2 border-b border-border pb-6">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
          </div>
          <Skeleton className="aspect-video w-full max-w-xs" />
        </Card>
      </div>

      <div className="mt-6 flex flex-col-reverse gap-3 border-t border-border pt-6 sm:flex-row sm:justify-end">
        <Skeleton className="h-11 sm:w-44" />
        <Skeleton className="h-11 sm:w-44" />
      </div>
    </Section>
  );
}

export function AdminDashboardSkeleton() {
  const list = (heading: string, label: string, href: string) => (
    <section>
      <div className="flex items-center justify-between gap-4 border-b-2 border-ink pb-3">
        <h2 className="text-h4 text-ink">{heading}</h2>
        <ButtonLink href={href} variant="secondary" size="sm">
          {label}
        </ButtonLink>
      </div>
      <ul className="divide-y divide-border">
        {Array.from({ length: 3 }, (_, i) => (
          <li key={i} className="flex items-center justify-between gap-4 py-4">
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-3 w-2/3" />
            </div>
            <Skeleton className="h-10 w-16" />
          </li>
        ))}
      </ul>
    </section>
  );

  return (
    <Section className="pt-8 pb-12 lg:pt-12">
      <AdminPageHeader title="Dashboard" description="Pantau jumlah data dan kelola kategori serta pengepul di direktori WasteLink." />

      <div className="grid grid-cols-2 divide-x divide-border border-y border-border">
        {[0, 1].map((i) => (
          <div key={i} className="px-4 py-6 first:ps-0 sm:px-8">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="mt-3 h-12 w-20" />
          </div>
        ))}
      </div>

      <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-8">
        {list("Kategori terbaru", "Tambah kategori", "/dashboard/categories/create")}
        {list("Pengepul terbaru", "Tambah pengepul", "/dashboard/collectors/create")}
      </div>
    </Section>
  );
}
