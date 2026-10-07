import { Section } from '@/components/layout/Section';
import { createClient } from '@/lib/supabase/server';
import { CategoriesList } from '@/components/features/CategoriesList';
import { publicMetadata } from '@/lib/site';

export const metadata = publicMetadata('Kategori Limbah | WasteLink', 'Jelajahi kategori limbah, informasi pengelolaan, dan daftar pengepul yang menerima jenis sampah Anda.', '/categories');

export default async function CategoriesPage() {
  const supabase = await createClient();
  
  const { data: categories, error } = await supabase
    .from('categories')
    .select('id, name, description, image_url')
    .order('name');

  const sortedCategories = categories
    ? [...categories].sort((a, b) => a.name.localeCompare(b.name, 'id', { sensitivity: 'base' }))
    : [];

  return (
    <>
      <div className="w-full border-b border-border bg-background py-10 md:py-14">
        <div className="max-w-[1280px] mx-auto w-full px-4 md:px-6 lg:px-8">
          <p className="mb-3 text-body-sm text-text-secondary">Direktori WasteLink</p>
          <h1 className="text-h1 text-text-primary">Kategori Limbah</h1>
          <p className="mt-4 max-w-[52ch] text-body-lg text-text-secondary">
            Pilih kategori limbah yang Anda miliki untuk menemukan pengepul yang menerimanya.
          </p>
        </div>
      </div>

      <Section className="bg-background !py-16" contained>

        {error && (
          <div className="bg-error-bg border border-error rounded-[8px] p-6 text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-h3 text-error mb-2">Gagal Memuat Data</h2>
            <p className="text-body-md text-error/80">
              Terjadi kesalahan saat mengambil data kategori. Silakan muat ulang halaman atau coba lagi nanti.
            </p>
          </div>
        )}

        {!error && (!categories || categories.length === 0) && (
          <div className="text-center py-16 bg-background rounded-[8px] border border-border">
            <div className="w-16 h-16 bg-border rounded-[6px] mx-auto mb-4 flex items-center justify-center">
              <svg className="w-8 h-8 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </div>
            <h3 className="text-h3 text-text-primary mb-2">Belum Ada Kategori</h3>
            <p className="text-body-md text-text-muted max-w-md mx-auto">
              Saat ini belum ada kategori limbah yang tersedia.
            </p>
          </div>
        )}

        {!error && sortedCategories && sortedCategories.length > 0 && (
          <CategoriesList categories={sortedCategories} />
        )}
      </Section>
    </>
  );
}
