import { Section } from '@/components/layout/Section';
import { createClient } from '@/lib/supabase/server';
import { CollectorsList } from '@/components/features/CollectorsList';

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
      id, name, description, address, status, image_url,
      categories (
        name
      )
    `)
    .eq('status', true)
    .order('name');

  const sortedCollectors = collectors
    ? [...collectors].sort((a, b) => a.name.localeCompare(b.name, 'id', { sensitivity: 'base' }))
    : [];

  const formattedCollectors = sortedCollectors.map(collector => ({
    ...collector,
    categories: Array.isArray(collector.categories)
      ? (collector.categories[0] || null)
      : (collector.categories || null)
  }));

  return (
    <>
      {/* Page Header */}
      <div className="w-full bg-gradient-to-r from-[#24925A] to-[#1B6F3E] text-white py-16 md:py-20 border-b border-brand-green/10">
        <div className="max-w-[1200px] mx-auto w-full px-6 md:px-8 lg:px-10 text-center md:text-left flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold uppercase tracking-wider leading-tight text-white">
              Daftar Pengepul
            </h1>
            <p className="text-sm md:text-base text-emerald-50/90 max-w-2xl mt-4 leading-relaxed">
              Temukan jaringan pengepul tepercaya yang siap menerima berbagai jenis limbah daur ulang Anda.
            </p>
          </div>
          
          <div className="hidden md:flex items-center shrink-0">
            <div className="flex items-center gap-3 bg-white/10 border border-white/20 px-4 py-2.5 rounded-lg select-none">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="text-emerald-300">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              <span className="text-sm font-semibold text-white tracking-wide">
                {collectors?.length || 0} Pengepul Aktif
              </span>
            </div>
          </div>
        </div>
      </div>

      <Section className="bg-background !py-16" contained>

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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-h3 text-text-primary mb-2">Belum Ada Pengepul</h3>
            <p className="text-body-md text-text-muted max-w-md mx-auto">
              Saat ini belum ada data pengepul yang terdaftar di dalam sistem kami.
            </p>
          </div>
        )}

        {/* Collectors List with Search */}
        {!error && sortedCollectors && sortedCollectors.length > 0 && (
          <CollectorsList collectors={formattedCollectors} />
        )}
      </Section>
    </>
  );
}
