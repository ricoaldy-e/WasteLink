import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Section } from '@/components/layout/Section';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';

export const metadata = {
  title: 'Daftar Pengepul | WasteLink',
  description: 'Temukan jaringan pengepul limbah terdekat dan mulai berkontribusi pada lingkungan.',
};

export default async function CollectorsPage() {
  const supabase = await createClient();
  
  // Fetch all active collectors, joining with categories to display the category name
  const { data: collectors, error } = await supabase
    .from('collectors')
    .select(`
      id, name, address, status,
      categories (
        name
      )
    `)
    .eq('status', true)
    .order('name');

  return (
    <>
      <Section className="bg-surface" contained>
        {/* Header & Deskripsi */}
        <div className="text-center mb-10 lg:mb-16">
          <h1 className="text-display-lg text-text-primary mb-4">Daftar Pengepul</h1>
          <p className="text-body-lg text-text-secondary max-w-3xl mx-auto">
            Temukan jaringan pengepul tepercaya yang siap menerima berbagai jenis limbah daur ulang Anda.
          </p>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-error-bg border border-error rounded-[8px] p-6 text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-h3 text-error mb-2">Gagal Memuat Data</h2>
            <p className="text-body-md text-error/80">
              Terjadi kesalahan saat mengambil data pengepul. Silakan muat ulang halaman atau coba lagi nanti.
            </p>
          </div>
        )}

        {/* Empty State */}
        {!error && (!collectors || collectors.length === 0) && (
          <div className="text-center py-16 bg-background rounded-[8px] border border-border">
            <div className="w-16 h-16 bg-border rounded-[6px] mx-auto mb-4 flex items-center justify-center">
              <svg className="w-8 h-8 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-h3 text-text-primary mb-2">Belum Ada Pengepul</h3>
            <p className="text-body-md text-text-muted max-w-md mx-auto">
              Saat ini belum ada data pengepul yang terdaftar di dalam sistem kami.
            </p>
          </div>
        )}

        {/* Grid Pengepul */}
        {!error && collectors && collectors.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {collectors.map((collector) => (
              <Card key={collector.id} variant="default" className="flex flex-col h-full hover:shadow-elevated transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1 pr-4">
                    <h3 className="text-h3 text-text-primary line-clamp-1" title={collector.name}>
                      {collector.name}
                    </h3>
                    {(collector.categories as any)?.name && (
                      <span className="text-body-sm text-brand-green font-semibold inline-block mt-1">
                        Kategori: {(collector.categories as any).name}
                      </span>
                    )}
                  </div>
                  <Badge variant="success" className="shrink-0 whitespace-nowrap">Aktif</Badge>
                </div>
                
                <div className="flex items-start gap-2 mb-6 text-text-secondary">
                  <svg className="w-5 h-5 shrink-0 mt-0.5 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p className="text-body-sm line-clamp-2" title={collector.address}>
                    {collector.address || "Alamat belum disediakan"}
                  </p>
                </div>
                
                <div className="mt-auto pt-4 border-t border-border">
                  <Link href={`/collectors/${collector.id}`}>
                    <Button tabIndex={-1} variant="secondary" className="w-full">
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
