import { ViewTransition } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowIcon } from '@/components/ui/arrow-icon';
import { WhatsAppIcon } from '@/components/ui/whatsapp-icon';

export interface CollectorCardData {
  id: string;
  name: string;
  description: string | null;
  address: string | null;
  image_url: string | null;
  whatsapp?: string | null;
  operational_hours?: string | null;
}

/** Kelas daftar untuk CollectorCard: buku alamat berbaris, bukan grid kartu. Dua kolom di lg kecuali `single`. */
export const collectorListClass = (single = false) =>
  `grid border-t border-border [&>li]:border-b [&>li]:border-border ${single ? '' : 'lg:grid-cols-2 lg:gap-x-10'}`;

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();

const PinIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-4 shrink-0">
    <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <circle cx="12" cy="11" r="3" />
  </svg>
);

/**
 * Baris pengepul di daftar: foto kecil, kategori + jam operasional, nama (serif), dan kontak yang tersedia
 * (WhatsApp, peta) supaya orang bisa memilih tanpa membuka detail. Pasangan skeleton ada di bawah.
 */
export function CollectorCard({
  collector,
  categoryName,
  showCategory = true,
}: {
  collector: CollectorCardData;
  categoryName?: string | null;
  showCategory?: boolean;
}) {
  const hours = collector.operational_hours?.split('\n')[0]?.trim();
  const meta = [showCategory ? categoryName : null, hours ? `Buka ${hours}` : null].filter(Boolean).join(' · ');
  const hasWa = Boolean(collector.whatsapp);
  const hasMap = Boolean(collector.address);

  return (
    <Link
      href={`/collectors/${collector.id}`}
      className="group -mx-3 flex items-center gap-4 px-3 py-4 transition-colors duration-150 hover:bg-primary-subtle sm:gap-5"
    >
      {/* Nama sama dengan hero di collectors/[id] → morph saat navigasi */}
      <ViewTransition name={`collector-image-${collector.id}`} share="morph">
        <div className="relative size-20 shrink-0 overflow-hidden rounded-sm bg-bg-alt sm:size-24">
          {collector.image_url ? (
            // alt kosong: nama pengepul sudah dibaca dari judul baris
            <Image
              src={collector.image_url}
              alt=""
              fill
              sizes="96px"
              className="object-cover transition-[scale] duration-500 ease-out motion-safe:group-hover:scale-[1.06]"
            />
          ) : (
            <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center font-display text-3xl font-semibold text-border-strong">
              {initials(collector.name)}
            </div>
          )}
        </div>
      </ViewTransition>

      <div className="min-w-0 flex-1">
        {meta && <p className="truncate text-caption text-muted">{meta}</p>}
        <h3 title={collector.name} className="line-clamp-2 font-display text-[1.375rem] font-semibold leading-[1.15] tracking-[-0.01em] text-ink">
          {collector.name}
        </h3>
        <p className="mt-2 flex items-center gap-4 text-caption text-muted">
          {hasWa && (
            <span className="inline-flex items-center gap-1.5">
              <WhatsAppIcon className="size-4 text-primary" />
              WhatsApp
            </span>
          )}
          {hasMap && (
            <span className="inline-flex items-center gap-1.5">
              <span className="text-primary"><PinIcon /></span>
              Peta
            </span>
          )}
          {!hasWa && !hasMap && <span>Kontak belum dicantumkan</span>}
        </p>
      </div>

      <ArrowIcon className="shrink-0 text-primary motion-safe:group-hover:translate-x-1" />
    </Link>
  );
}

/** Pasangan CollectorCard untuk collectors/(list)/loading.tsx. Tinggi mengikuti baris dengan nama satu baris. */
export function CollectorCardSkeleton() {
  return (
    <div className="-mx-3 flex items-center gap-4 px-3 py-4 sm:gap-5">
      <Skeleton className="size-20 shrink-0 sm:size-24" />
      <div className="min-w-0 flex-1">
        <div className="text-caption"><Skeleton className="h-[1lh] w-1/2" /></div>
        <div className="mt-0.5 font-display text-[1.375rem] leading-[1.15]"><Skeleton className="h-[1lh] w-4/5" /></div>
        <div className="mt-2 text-caption"><Skeleton className="h-[1lh] w-1/3" /></div>
      </div>
    </div>
  );
}
