import { Section } from '@/components/layout/Section';
import { createClient } from '@/lib/supabase/server';
import { CategoriesList } from '@/components/features/CategoriesList';

export const metadata = {
  title: 'Kategori Limbah | WasteLink',
  description: 'Jelajahi berbagai kategori limbah dan temukan pengepul yang tepat untuk sampah Anda.',
};

export default async function CategoriesPage() {
  const supabase = await createClient();
  
  // Fetch categories, handling potential errors
  const { data: categories, error } = await supabase
    .from('categories')
    .select('id, name, description, image_url')
    .order('name');

  const sortedCategories = categories
    ? [...categories].sort((a, b) => a.name.localeCompare(b.name, 'id', { sensitivity: 'base' }))
    : [];

  return (
    <>
      {/* Page Header */}
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
            <div className="flex items-center gap-3 bg-white/10 border border-white/20 px-4 py-2.5 rounded-lg select-none">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="text-emerald-300">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
              <span className="text-sm font-semibold text-white tracking-wide">
                {categories?.length || 0} Kategori Limbah
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
              Terjadi kesalahan saat mengambil data kategori. Silakan muat ulang halaman atau coba lagi nanti.
            </p>
          </div>
        )}

        {/* Empty State */}
        {!error && (!categories || categories.length === 0) && (
          <div className="text-center py-16 bg-background rounded-[8px] border border-border">
            <div className="w-16 h-16 bg-border rounded-[6px] mx-auto mb-4 flex items-center justify-center">
              <svg className="w-8 h-8 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </div>
            <h3 className="text-h3 text-text-primary mb-2">Belum Ada Kategori</h3>
            <p className="text-body-md text-text-muted max-w-md mx-auto">
              Saat ini belum ada kategori limbah yang tersedia. Kategori baru akan segera ditambahkan.
            </p>
          </div>
        )}

        {/* Categories List with Search */}
        {!error && sortedCategories && sortedCategories.length > 0 && (
          <CategoriesList categories={sortedCategories} />
        )}
      </Section>
    </>
  );
}
