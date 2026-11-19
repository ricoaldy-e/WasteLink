'use client';

import { useLayoutEffect, ViewTransition } from 'react';
import { usePathname } from 'next/navigation';

// Back/Forward ditandai supaya tidak ikut dipaksa ke atas (posisi lama dibiarkan seperti biasa).
let lastPopstate = -Infinity;
let firstRender = true;
if (typeof window !== 'undefined') {
  window.addEventListener('popstate', () => {
    lastPopstate = performance.now();
  });
}

/**
 * Transisi antarhalaman publik. Kunci = pathname, jadi setiap navigasi = exit lama + enter baru
 * (perubahan ?q= lewat replaceState tidak memicu apa pun). Kelas animasi ada di globals.css;
 * `default="none"` mencegah animasi pada update biasa (mis. Suspense selesai memuat).
 *
 * Scroll: Next hanya menggulir ke atas kalau tepi atas halaman baru belum terlihat. Supaya pindah menu
 * selalu mulai dari atas (mis. dari dasar Kategori ke Pengepul), efek di bawah memaksanya secara eksplisit,
 * di dalam commit yang sama dengan transisi sehingga snapshot halaman baru sudah di posisi atas.
 */
export default function PublicTemplate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useLayoutEffect(() => {
    if (firstRender) {
      firstRender = false; // muat awal/reload: biarkan browser memulihkan posisinya
      return;
    }
    const viaHistory = performance.now() - lastPopstate < 3000;
    if (!viaHistory && !window.location.hash) window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <ViewTransition key={pathname} enter="page-in" exit="page-out" default="none">
      {children}
    </ViewTransition>
  );
}
