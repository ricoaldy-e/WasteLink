'use client';

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';

// Gaya bersama (art, at) ada di line-art-styles.ts: modul 'use client' tidak bisa diekspor nilainya ke komponen server.

// Ilustrasi yang sudah selesai digambar dalam sesi JS ini (hilang saat muat ulang halaman). Berpindah menu lewat
// klik tidak menggambar ulang; muat awal dan muat ulang tetap menggambar.
const drawn = new Set<string>();

type LineArtProps = {
  /** id unik per ilustrasi (kunci "sudah digambar") */
  id: string;
  viewBox: string;
  label: string;
  /** gambar di bawah lipatan: baru mulai digambar saat masuk layar (bukan saat halaman dimuat) */
  deferred?: boolean;
  /** tebal garis dasar (unit viewBox): ~3 untuk viewBox lebar 1040, ~2.4 untuk 520 */
  sw?: number;
  className?: string;
  children: ReactNode;
};

/** <svg> transparan (tanpa latar). Menggambar dirinya sekali per sesi, lalu tampil utuh. */
export function LineArt({ id, viewBox, label, sw = 2.4, deferred = false, className = '', children }: LineArtProps) {
  // Nilai awal dibaca sekali: render pertama di server/hidrasi selalu menganimasikan; mount berikutnya (navigasi klien) langsung utuh.
  const [animate] = useState(() => !drawn.has(id));
  const ref = useRef<SVGSVGElement>(null);

  // deferred: server merender gambar utuh (tanpa JS tetap terlihat). Di klien, bila masih di bawah lipatan, gambar
  // "dipersenjatai" (disembunyikan, animasi tertahan) lalu dilepas saat masuk layar, jadi animasinya mulai tepat saat dilihat.
  useEffect(() => {
    const el = ref.current;
    if (!deferred || !animate || !el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.85) {
      el.removeAttribute('data-defer');
      return;
    }
    el.setAttribute('data-defer', 'armed');
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.removeAttribute('data-defer');
        io.disconnect();
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [deferred, animate]);

  return (
    <svg
      ref={ref}
      data-defer={deferred && animate ? '' : undefined}
      viewBox={viewBox}
      role="img"
      aria-label={label}
      data-static={animate ? undefined : ''}
      onAnimationEnd={() => drawn.add(id)}
      className={`draw h-auto w-full ${className}`}
      style={{ '--sw': sw } as CSSProperties}
    >
      {children}
    </svg>
  );
}
