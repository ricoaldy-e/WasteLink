import type { ReactNode } from 'react';
import { Container } from '@/components/ui/container';

/**
 * Kepala halaman daftar (Kategori, Pengepul, Tentang). Teks statis, jadi loading.tsx memakai komponen
 * yang sama persis dan tidak ada layout shift saat data tiba. `art` = ilustrasi garis statis di kanan (lg ke atas);
 * sengaja tanpa animasi masuk karena ini bagian pertama halaman.
 */
export function PageHeader({ eyebrow, title, description, art }: { eyebrow: string; title: string; description: string; art?: ReactNode }) {
  return (
    <div className="border-b border-border bg-bg-alt">
      <Container className="py-10 md:py-14 lg:grid lg:grid-cols-12 lg:items-end lg:gap-6">
        <div className="lg:col-span-7">
          <p className="text-eyebrow text-muted">{eyebrow}</p>
          <h1 className="mt-3 text-h1 text-ink">{title}</h1>
          <p className="mt-4 max-w-[52ch] text-body-lg text-muted">{description}</p>
        </div>
        {art && <div className="hidden lg:col-span-5 lg:block">{art}</div>}
      </Container>
    </div>
  );
}
