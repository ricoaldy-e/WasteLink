import { Section } from "@/components/layout/Section";
import { PageHeader } from "@/components/layout/PageHeader";
import { Skeleton } from "@/components/ui/skeleton";

// Ruang ilustrasi header dicadangkan (spacer seukuran), bukan digambar, supaya gambar hanya digambar sekali saat halaman asli tiba.
// Cermin categories/(list)/page.tsx + CategoriesList.tsx + CategoryCard.tsx: ubah bersamaan.
export default function PublicCategoriesLoading() {
  return (
    <>
      <PageHeader
        eyebrow="Direktori WasteLink"
        title="Kategori limbah"
        description="Pilih kategori limbah yang Anda miliki untuk menemukan pengepul yang menerimanya."
        art={<div className="aspect-[520/300]" />}
      />

      <Section className="pt-8 md:pt-10" contained>
        <Skeleton className="h-11 w-full max-w-md" />

        <div className="mt-8 flex min-h-11 items-center">
          <div className="w-28 text-small">
            <Skeleton className="h-[1lh]" />
          </div>
        </div>

        <ul className="mt-2 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }, (_, i) => (
            <li key={i}>
              <div className="flex h-full flex-col justify-between gap-10 rounded-lg border border-border bg-surface p-5 md:p-6">
                <div className="flex items-start justify-between gap-4">
                  <Skeleton className="h-[1.875rem] w-10" />
                  <Skeleton className="size-16 shrink-0" />
                </div>
                <div>
                  <div className="text-h2">
                    <Skeleton className="h-[1lh] w-3/4" />
                  </div>
                  <div className="mt-3 text-small">
                    <Skeleton className="h-[2lh]" />
                  </div>
                </div>
                <div className="border-t border-border pt-4 text-small">
                  <Skeleton className="h-[1lh] w-1/3" />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
