import { notFound } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Section } from '@/components/layout/Section';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import Image from 'next/image';

interface CategoryDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: CategoryDetailPageProps) {
  const resolvedParams = await params;
  const supabase = await createClient();
  const { data: category } = await supabase
    .from('categories')
    .select('name, description')
    .eq('id', resolvedParams.id)
    .single();

  if (!category) {
    return {
      title: 'Kategori Tidak Ditemukan | WasteLink',
    };
  }

  return {
    title: `${category.name} | WasteLink`,
    description: category.description,
  };
}

export default async function CategoryDetailPage({ params }: CategoryDetailPageProps) {
  const resolvedParams = await params;
  const supabase = await createClient();

  const { data: category, error: categoryError } = await supabase
    .from('categories')
    .select('id, name, description, education_content, image_url')
    .eq('id', resolvedParams.id)
    .single();

  if (categoryError || !category) {
    notFound();
  }

  const { data: collectors, error: collectorsError } = await supabase
    .from('collectors')
    .select('id, name, description, address, status, image_url')
    .eq('category_id', category.id)
    .eq('status', true)
    .order('name');

  return (
    <>
      <Section className="bg-surface pt-8 md:pt-12" contained>
        <div className="mb-8">
          <Link
            href="/categories"
            className="group inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-wider text-text-secondary hover:text-text-primary transition-all duration-200"
          >
            <span className="flex items-center justify-center w-7 h-7 rounded-full border border-border bg-white group-hover:border-text-secondary group-hover:bg-gray-50 transition-all duration-200 shadow-sm">
              <svg className="w-3.5 h-3.5 text-text-muted group-hover:text-text-primary transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </span>
            <span>Kembali ke Kategori</span>
          </Link>
        </div>
        <div className="flex flex-col md:flex-row gap-8 lg:gap-12 mb-12">
          <div className="w-full md:w-1/3">
            <div className="relative aspect-square w-full bg-background rounded-[8px] border border-border overflow-hidden shadow-sm">
              {category.image_url ? (
                <Image 
                  src={category.image_url} 
                  alt={category.name || "Kategori"} 
                  fill 
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                  className="object-contain p-4 bg-white" 
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-text-muted bg-border/20">
                  <svg className="w-16 h-16 mb-4 text-text-muted/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2-2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-body-md">Tanpa Gambar</span>
                </div>
              )}
            </div>
          </div>

          <div className="w-full md:w-2/3">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="neutral">Informasi Kategori</Badge>
              </div>
              <h1 className="text-h1 text-text-primary mb-2">{category.name}</h1>
              <p className="text-body-lg text-text-secondary">
                {category.description || "Deskripsi kategori belum tersedia."}
              </p>
            </div>

            {category.education_content && (
              <Card className="mb-6" variant="default">
                <h3 className="text-h3 text-text-primary mb-6 border-b border-border pb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Edukasi Pengelolaan
                </h3>
                <p className="text-body-md text-text-secondary whitespace-pre-wrap">
                  {category.education_content}
                </p>
              </Card>
            )}
          </div>
        </div>
      </Section>

      <Section className="bg-background border-t border-border" contained>
        <div className="mb-8">
          <h2 className="text-h1 text-text-primary mb-2">Pengepul {category.name}</h2>
          <p className="text-body-lg text-text-secondary">
            Daftar mitra pengepul yang menerima limbah dengan kategori {category.name}.
          </p>
        </div>

        {collectorsError && (
          <div className="bg-error-bg border border-error rounded-[8px] p-6 text-center max-w-2xl mx-auto my-12">
            <h3 className="text-h3 text-error mb-2">Gagal Memuat Data Pengepul</h3>
            <p className="text-body-md text-error/80">
              Terjadi kesalahan saat mengambil data. Silakan muat ulang halaman.
            </p>
          </div>
        )}

        {!collectorsError && (!collectors || collectors.length === 0) && (
          <div className="text-center py-16 bg-surface rounded-[8px] border border-border">
            <div className="w-16 h-16 bg-border rounded-[6px] mx-auto mb-4 flex items-center justify-center">
              <svg className="w-8 h-8 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-h3 text-text-primary mb-2">Belum Ada Pengepul</h3>
            <p className="text-body-md text-text-muted max-w-md mx-auto">
              Saat ini belum ada data pengepul yang menerima kategori {category.name}. Kami terus berusaha memperbarui direktori kami.
            </p>
          </div>
        )}

        {!collectorsError && collectors && collectors.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {collectors.map((collector) => (
              <Link key={collector.id} href={`/collectors/${collector.id}`} className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green rounded-2xl h-full">
                <Card className="h-full border border-border shadow-sm hover:border-brand-green/50 hover:shadow-md transition-all duration-200 overflow-hidden bg-white flex flex-col">
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-50 border-b border-border/50">
                    {collector.image_url ? (
                      <Image
                        src={collector.image_url}
                        alt={collector.name || "Pengepul"}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-contain p-4 bg-white"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                        <span className="text-text-muted text-sm font-medium">Tanpa Gambar</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-5 flex flex-col flex-1">
                    <Badge variant="neutral" className="mb-2.5 w-fit bg-gray-50 border-gray-200 text-text-secondary font-medium">
                      {category.name}
                    </Badge>
                    <h3 title={collector.name} className="text-lg font-semibold text-text-primary mb-2 line-clamp-2 min-h-[3.5rem]">{collector.name}</h3>
                    
                    <p className="text-sm text-text-muted line-clamp-2 mb-3 leading-relaxed">
                      {collector.description || "Mitra pengepul terpercaya di WasteLink."}
                    </p>
                    
                    <div className="flex items-start gap-2.5 text-text-secondary mt-auto">
                      <svg className="w-4 h-4 shrink-0 mt-0.5 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <p className="text-sm line-clamp-2 leading-relaxed text-text-secondary">
                        {collector.address ? "Tersedia lokasi Google Maps" : "Lokasi belum disediakan"}
                      </p>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
