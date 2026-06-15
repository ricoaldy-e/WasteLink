import { Section } from "@/components/layout/Section";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export default function PublicCategoriesLoading() {
  return (
    <>
      <div className="w-full bg-gradient-to-r from-[#24925A] to-[#1B6F3E] text-white py-16 md:py-20 border-b border-brand-green/10">
        <div className="max-w-[1200px] mx-auto w-full px-6 md:px-8 lg:px-10 text-center md:text-left flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold uppercase tracking-wider leading-tight text-white">
              Kategori Limbah
            </h1>
            <p className="text-sm md:text-base text-emerald-50/90 max-w-2xl mt-4 leading-relaxed">
              Pilih kategori limbah yang Anda miliki untuk menemukan informasi edukasi dan daftar pengepul terdekat yang menerima jenis sampah tersebut.
            </p>
          </div>
          
          <div className="hidden md:flex items-center shrink-0">
            <Skeleton className="h-10 w-44 bg-white/20 border border-white/10 rounded-lg animate-pulse" />
          </div>
        </div>
      </div>

      <Section className="bg-background !py-16" contained>
        <div className="w-full max-w-md mb-8">
          <Skeleton className="h-12 w-full rounded-xl animate-pulse" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} variant="default" className="flex flex-col h-full border border-border shadow-sm bg-white overflow-hidden">
              <Skeleton className="w-full aspect-[4/3] animate-pulse rounded-none" />
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <Skeleton className="h-6 w-1/2 mb-3 animate-pulse" />
                  <Skeleton className="h-4 w-full mb-2 animate-pulse" />
                  <Skeleton className="h-4 w-5/6 animate-pulse" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
