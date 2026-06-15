import { Card } from '@/components/ui/card';
import { Section } from '@/components/layout/Section';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import Image from 'next/image';

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

  return (
    <>
      <Section className="bg-surface" contained>
        {/* Header & Deskripsi */}
        <div className="text-center mb-10 lg:mb-16">
          <h1 className="text-display-lg text-text-primary mb-4">Kategori Limbah</h1>
          <p className="text-body-lg text-text-secondary max-w-3xl mx-auto">
            Pilih kategori limbah yang Anda miliki untuk menemukan informasi edukasi dan daftar pengepul terdekat yang menerima jenis sampah tersebut.
          </p>
        </div>

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

        {/* Grid Kategori */}
        {!error && categories && categories.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <Link 
                key={cat.id} 
                href={`/categories/${cat.id}`} 
                className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green rounded-[8px] group h-full"
              >
                <Card variant="default" className="h-full group-hover:shadow-elevated transition-all duration-300 group-hover:-translate-y-1 cursor-pointer flex flex-col">
                  <div className="relative aspect-video w-full bg-background rounded-[6px] mb-4 flex items-center justify-center overflow-hidden border border-border group-hover:border-brand-green transition-colors">
                    {cat.image_url ? (
                      <Image src={cat.image_url} alt={cat.name || "Kategori"} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw" className="object-cover" />
                    ) : (
                      <span className="text-text-muted text-sm">Tidak ada gambar</span>
                    )}
                  </div>
                  <h3 className="text-h3 text-text-primary mb-2 group-hover:text-brand-green transition-colors">{cat.name}</h3>
                  <p className="text-body-sm text-text-secondary line-clamp-2 mt-auto">{cat.description}</p>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
