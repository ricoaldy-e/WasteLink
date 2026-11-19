import { Section } from '@/components/layout/Section';
import { CartIllustration } from '@/components/features/Illustrations';
import { PageHeader } from '@/components/layout/PageHeader';
import { StateMessage } from '@/components/features/StateMessage';
import { createClient } from '@/lib/supabase/server';
import { CollectorsList } from '@/components/features/CollectorsList';
import { publicMetadata } from '@/lib/site';

export const metadata = publicMetadata('Daftar Pengepul | WasteLink', 'Cari informasi pengepul limbah berdasarkan kategori sampah, lalu lihat kontak dan lokasi yang tersedia.', '/collectors');

const first = (v: string | string[] | undefined) => (typeof v === 'string' ? v.trim().slice(0, 100) : '');

export default async function CollectorsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string | string[]; kategori?: string | string[] }>;
}) {
  const params = await searchParams;
  // Hanya dipakai sebagai nilai awal filter di klien; dibatasi panjangnya.
  const initialQuery = first(params.q);
  const initialCategory = first(params.kategori);
  const supabase = await createClient();

  const { data: collectors, error } = await supabase
    .from('collectors')
    .select(`
      id, name, description, address, status, image_url, whatsapp, operational_hours,
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
      <PageHeader
        eyebrow="Direktori WasteLink"
        title="Daftar pengepul"
        description="Cari berdasarkan nama atau jenis limbah, lalu lihat kontak dan lokasi yang tersedia."
        art={<CartIllustration />}
      />

      <Section className="pt-8 md:pt-10" contained>
        {error && (
          <StateMessage tone="error" title="Data pengepul gagal dimuat">
            Muat ulang halaman ini. Kalau masih gagal, coba lagi beberapa menit lagi.
          </StateMessage>
        )}

        {!error && formattedCollectors.length === 0 && (
          <StateMessage
            title="Belum ada pengepul terdaftar"
          >
            Direktori ini belum memiliki pengepul. Silakan kembali lagi nanti.
          </StateMessage>
        )}

        {!error && formattedCollectors.length > 0 && (
          // key: navigasi klien ke ?q= / ?kategori= lain me-reset state filter
          <CollectorsList
            key={`${initialQuery}|${initialCategory}`}
            collectors={formattedCollectors}
            initialQuery={initialQuery}
            initialCategory={initialCategory}
          />
        )}
      </Section>
    </>
  );
}
