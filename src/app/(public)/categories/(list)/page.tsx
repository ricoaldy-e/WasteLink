import { Section } from '@/components/layout/Section';
import { CategoriesIllustration } from '@/components/features/Illustrations';
import { PageHeader } from '@/components/layout/PageHeader';
import { StateMessage } from '@/components/features/StateMessage';
import { createClient } from '@/lib/supabase/server';
import { getCategoryCounts } from '@/lib/category-counts';
import { CategoriesList } from '@/components/features/CategoriesList';
import { publicMetadata } from '@/lib/site';

export const metadata = publicMetadata('Kategori Limbah | WasteLink', 'Jelajahi kategori limbah, informasi pengelolaan, dan daftar pengepul yang menerima jenis sampah Anda.', '/categories');

export default async function CategoriesPage() {
  const supabase = await createClient();

  const [{ data: categories, error }, counts] = await Promise.all([
    supabase.from('categories').select('id, name, description, image_url').order('name'),
    getCategoryCounts(supabase),
  ]);

  const sortedCategories = categories
    ? [...categories].sort((a, b) => a.name.localeCompare(b.name, 'id', { sensitivity: 'base' }))
    : [];

  return (
    <>
      <PageHeader
        eyebrow="Direktori WasteLink"
        title="Kategori limbah"
        description="Pilih kategori limbah yang Anda miliki untuk menemukan pengepul yang menerimanya."
        art={<CategoriesIllustration />}
      />

      <Section className="pt-8 md:pt-10" contained>
        {error && (
          <StateMessage tone="error" title="Data kategori gagal dimuat">
            Muat ulang halaman ini. Kalau masih gagal, coba lagi beberapa menit lagi.
          </StateMessage>
        )}

        {!error && sortedCategories.length === 0 && (
          <StateMessage title="Belum ada kategori">
            Kategori limbah belum ditambahkan. Silakan kembali lagi nanti.
          </StateMessage>
        )}

        {!error && sortedCategories.length > 0 && <CategoriesList categories={sortedCategories} counts={counts} />}
      </Section>
    </>
  );
}
