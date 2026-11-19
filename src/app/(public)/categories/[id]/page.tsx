import { ViewTransition } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Section } from '@/components/layout/Section';
import { BackLink } from '@/components/ui/back-link';
import { CollectorCard, collectorListClass } from '@/components/features/CollectorCard';
import { StateMessage } from '@/components/features/StateMessage';
import { createClient } from '@/lib/supabase/server';
import { publicMetadata } from '@/lib/site';

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
    notFound();
  }

  return publicMetadata(`${category.name} | WasteLink`, `Informasi kategori ${category.name}, materi pengelolaan yang tersedia, dan daftar pengepul yang menerimanya.`, `/categories/${encodeURIComponent(resolvedParams.id)}`);
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
    .select('id, name, description, address, status, image_url, whatsapp, operational_hours')
    .eq('category_id', category.id)
    .eq('status', true)
    .order('name');

  return (
    <>
      {/* Sengaja tanpa loading.tsx: navigasi menunggu data agar gambar kartu bisa ber-morph ke hero. */}
      <Section className="pt-8 md:pt-10" contained>
        <BackLink href="/categories">Semua kategori</BackLink>

        <div className="mt-6 grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <p className="text-eyebrow text-muted">Kategori limbah</p>
            <h1 className="mt-3 break-words text-h1 text-ink">{category.name}</h1>
            <p className="mt-4 max-w-[56ch] text-body-lg text-muted">{category.description || 'Deskripsi kategori belum tersedia.'}</p>

            {category.education_content && (
              <section aria-labelledby="edu-heading" className="mt-10">
                <h2 id="edu-heading" className="text-h4 text-ink">Cara mengelola</h2>
                <div className="mt-4 border-t-2 border-ink pt-4">
                  <p className="max-w-[65ch] whitespace-pre-line text-body text-muted">{category.education_content}</p>
                </div>
              </section>
            )}
          </div>

          <div className="lg:col-span-5">
            <ViewTransition name={`category-image-${category.id}`} share="morph">
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-border bg-surface">
                {category.image_url ? (
                  <Image
                    src={category.image_url}
                    alt={`Contoh limbah kategori ${category.name}`}
                    fill
                    priority
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="object-contain p-4"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-small text-subtle">Tanpa gambar</div>
                )}
              </div>
            </ViewTransition>
          </div>
        </div>
      </Section>

      <Section className="border-t border-border bg-bg-alt" contained>
        <h2 className="break-words text-h2 text-ink">Pengepul {category.name}</h2>
        <p role="status" className="mt-4 text-body-lg text-muted tabular-nums">
          {collectorsError ? 'Data pengepul gagal dimuat.' : `${collectors?.length ?? 0} pengepul menerima limbah kategori ini.`}
        </p>

        <div className="mt-8">
          {collectorsError && (
            <StateMessage tone="error" title="Data pengepul gagal dimuat">
              Muat ulang halaman ini. Kalau masih gagal, coba lagi beberapa menit lagi.
            </StateMessage>
          )}

          {!collectorsError && (!collectors || collectors.length === 0) && (
            <StateMessage title="Belum ada pengepul untuk kategori ini">
              Belum ada pengepul terdaftar yang menerima {category.name}. Silakan lihat kategori lain atau kembali lagi nanti.
            </StateMessage>
          )}

          {!collectorsError && collectors && collectors.length > 0 && (
            <ul className={collectorListClass()}>
              {collectors.map((collector) => (
                <li key={collector.id}>
                  <CollectorCard collector={collector} showCategory={false} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </Section>
    </>
  );
}
