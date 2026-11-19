'use client';

import { useEffect, useRef } from 'react';

type RevealProps = {
  children: React.ReactNode;
  /** Tunda (ms) supaya anggota satu grup muncul berurutan. */
  delay?: number;
  as?: 'div' | 'li' | 'section' | 'article';
  className?: string;
};

/**
 * Elemen muncul (fade + naik 18px) saat masuk layar. Progressive enhancement:
 * - tanpa JS atau di prefers-reduced-motion, elemen langsung terlihat;
 * - elemen yang sudah terlihat saat halaman dimuat tidak disembunyikan (tidak ada kedipan);
 * - hanya menyembunyikan elemen di bawah lipatan, lalu menampilkannya sekali (observer dilepas).
 * Gaya ada di globals.css ([data-reveal]).
 */
export function Reveal({ children, delay = 0, as = 'div', className }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return;

    el.dataset.reveal = 'hidden';
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.dataset.reveal = 'shown';
        io.disconnect();
      },
      { rootMargin: '0px 0px -8% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Tag = as as React.ElementType;
  return (
    <Tag
      ref={ref}
      className={className}
      style={{ '--reveal-delay': `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </Tag>
  );
}
