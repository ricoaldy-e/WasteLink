import { ViewTransition } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowIcon } from '@/components/ui/arrow-icon';

export interface CategoryCardData {
  id: string;
  name: string;
  description: string | null;
  image_url: string | null;
}

/**
 * Kartu kategori: gambar penanda, nama serif, jumlah pengepul sebagai fakta utama.
 * Hover: border + latar menghangat ke teal muda, panah bergeser. Dipakai Beranda dan daftar kategori.
 */
export function CategoryCard({ category, count }: { category: CategoryCardData; count: number }) {
  return (
    <Link
      href={`/categories/${category.id}`}
      className="group flex h-full flex-col justify-between gap-10 rounded-lg border border-border bg-surface p-5 transition-colors duration-150 hover:border-primary hover:bg-primary-subtle md:p-6"
    >
      <div className="flex items-start justify-between gap-4">
        <ViewTransition name={`category-image-${category.id}`} share="morph">
          <div className="relative size-16 shrink-0 overflow-hidden rounded-sm border border-border bg-white">
            {category.image_url && (
              // alt kosong: nama kategori sudah dibaca dari judul kartu
              <Image src={category.image_url} alt="" fill sizes="64px" className="object-contain p-1" />
            )}
          </div>
        </ViewTransition>
      </div>

      <div>
        <h3 className="text-h2 text-ink">{category.name}</h3>
        <p className="mt-3 line-clamp-2 min-h-[2lh] text-small text-muted">{category.description}</p>
      </div>

      <div className="flex items-center justify-between border-t border-border pt-4 text-small transition-colors duration-150 group-hover:border-primary/30">
        <span className="font-medium tabular-nums text-ink">{count > 0 ? `${count} pengepul` : 'Belum ada pengepul'}</span>
        <ArrowIcon className="text-primary motion-safe:group-hover:translate-x-1" />
      </div>
    </Link>
  );
}
