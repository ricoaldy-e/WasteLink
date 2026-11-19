import { Section } from "@/components/layout/Section";
import { PageHeader } from "@/components/layout/PageHeader";
import { Skeleton } from "@/components/ui/skeleton";
import { CollectorCardSkeleton, collectorListClass } from "@/components/features/CollectorCard";

// Ruang ilustrasi header dicadangkan (spacer seukuran), bukan digambar, supaya gambar hanya digambar sekali saat halaman asli tiba.
// Cermin collectors/page.tsx + CollectorsList.tsx: ubah bersamaan.
export default function PublicCollectorsLoading() {
  return (
    <>
      <PageHeader
        eyebrow="Direktori WasteLink"
        title="Daftar pengepul"
        description="Cari berdasarkan nama atau jenis limbah, lalu lihat kontak dan lokasi yang tersedia."
        art={<div className="aspect-[520/300]" />}
      />

      <Section className="pt-8 md:pt-10" contained>
        <div className="flex flex-col gap-4">
          <Skeleton className="h-11 w-full max-w-md" />
          <div className="flex flex-wrap gap-2">
            {[24, 28, 24].map((w, i) => (
              <Skeleton key={i} className="h-11" style={{ width: `${w * 4}px` }} />
            ))}
          </div>
        </div>

        <div className="mt-8 flex min-h-11 items-center">
          <div className="w-28 text-small">
            <Skeleton className="h-[1lh]" />
          </div>
        </div>

        <ul className={`mt-2 ${collectorListClass()}`}>
          {Array.from({ length: 8 }, (_, i) => (
            <li key={i}>
              <CollectorCardSkeleton />
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
