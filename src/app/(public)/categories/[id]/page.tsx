import { notFound } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Section } from '@/components/layout/Section';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';

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

  // Fetch Category
  const { data: category, error: categoryError } = await supabase
    .from('categories')
    .select('*')
    .eq('id', resolvedParams.id)
    .single();

  if (categoryError || !category) {
    notFound();
  }

  // Fetch Collectors associated with this category that are active
  const { data: collectors, error: collectorsError } = await supabase
    .from('collectors')
    .select('*')
    .eq('category_id', category.id)
    .eq('status', true)
    .order('name');

  return (
    <>
      {/* Detail Kategori Section */}
      <Section className="bg-surface" contained>
        <div className="flex flex-col md:flex-row gap-8 lg:gap-12 mb-12">
          {/* Gambar Kategori */}
          <div className="w-full md:w-1/3">
            <div className="aspect-square w-full bg-background rounded-lg border border-border overflow-hidden shadow-sm">
              {category.image_url ? (
                <img 
                  src={category.image_url} 
                  alt={category.name} 
                  className="w-full h-full object-cover" 
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-text-muted">
                  <svg className="w-12 h-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2-2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-body-sm">Tanpa Gambar</span>
                </div>
              )}
            </div>
          </div>

          {/* Informasi & Edukasi Kategori */}
          <div className="w-full md:w-2/3 flex flex-col justify-center">
            <Badge variant="success" className="w-fit mb-4">Informasi Kategori</Badge>
            <h1 className="text-display-lg text-text-primary mb-4">{category.name}</h1>
            <p className="text-body-lg text-text-secondary mb-6 leading-relaxed">
              {category.description}
            </p>

            {category.education_content && (
              <div className="bg-brand-green-subtle rounded-lg p-6 border-l-4 border-brand-green">
                <h3 className="text-h3 text-text-primary mb-2 flex items-center gap-2">
                  <svg className="w-6 h-6 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Edukasi Pengelolaan
                </h3>
                <p className="text-body-md text-text-secondary whitespace-pre-wrap">
                  {category.education_content}
                </p>
              </div>
            )}
          </div>
        </div>
      </Section>

      {/* Daftar Pengepul Section */}
      <Section className="bg-background border-t border-border" contained>
        <div className="mb-8">
          <h2 className="text-h1 text-text-primary mb-2">Pengepul {category.name}</h2>
          <p className="text-body-lg text-text-secondary">
            Daftar mitra pengepul yang menerima limbah dengan kategori {category.name}.
          </p>
        </div>

        {/* Error State untuk Pengepul */}
        {collectorsError && (
          <div className="bg-error-bg border border-error rounded-[8px] p-6 text-center max-w-2xl mx-auto my-12">
            <h3 className="text-h3 text-error mb-2">Gagal Memuat Data Pengepul</h3>
            <p className="text-body-md text-error/80">
              Terjadi kesalahan saat mengambil data. Silakan muat ulang halaman.
            </p>
          </div>
        )}

        {/* Empty State untuk Pengepul */}
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

        {/* Grid Pengepul */}
        {!collectorsError && collectors && collectors.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {collectors.map((collector) => (
              <Card key={collector.id} variant="default" className="flex flex-col h-full hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-h3 text-text-primary line-clamp-1 flex-1 pr-4" title={collector.name}>
                    {collector.name}
                  </h3>
                  {/* Status Aktif selalu true dari query, tapi tetap dipastikan dengan Badge */}
                  {collector.status && (
                    <Badge variant="success" className="shrink-0 whitespace-nowrap">Aktif</Badge>
                  )}
                </div>
                
                <div className="flex items-start gap-2 mb-6 text-text-secondary">
                  <svg className="w-5 h-5 shrink-0 mt-0.5 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p className="text-body-sm line-clamp-2" title={collector.address}>
                    {collector.address}
                  </p>
                </div>
                
                <div className="mt-auto pt-4 border-t border-border">
                  <Link href={`/collectors/${collector.id}`} tabIndex={-1}>
                    <Button variant="secondary" className="w-full">
                      Lihat Detail Pengepul
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
