'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Container } from '@/components/ui/container';

/**
 * Header – docs/DESIGN.md §8.
 * Krem di puncak halaman; setelah discroll jadi surface + border bawah (tanpa shadow).
 * Desktop: satu garis indikator yang bergeser ke link aktif.
 * Mobile: <dialog> modal native = fokus terkunci, Esc menutup, latar inert, fokus kembali ke tombol.
 */

const navLinks = [
  { href: '/categories', label: 'Kategori' },
  { href: '/collectors', label: 'Pengepul' },
  { href: '/about', label: 'Tentang Kami' },
];

const isActive = (pathname: string | null, href: string) =>
  pathname === href || !!pathname?.startsWith(href + '/');

const Wordmark = () => (
  <span className="font-display text-2xl font-semibold leading-none tracking-[-0.01em]">
    <span className="text-primary">Waste</span>
    <span className="text-ink">Link</span>
  </span>
);

export const Header = () => {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [previousPathname, setPreviousPathname] = useState(pathname);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Tutup drawer saat pindah halaman (pola "adjust state during render", tanpa effect).
  if (previousPathname !== pathname) {
    setPreviousPathname(pathname);
    setMobileOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Posisikan garis indikator di bawah link aktif. Ditulis langsung ke DOM agar tidak re-render;
  // transisi baru diaktifkan setelah posisi pertama, supaya tidak "terbang" dari kiri saat load.
  useLayoutEffect(() => {
    const nav = navRef.current;
    const bar = barRef.current;
    if (!nav || !bar) return;
    const place = () => {
      const el = nav.querySelector<HTMLElement>('[aria-current="page"]');
      bar.style.opacity = el ? '1' : '0';
      if (el) {
        bar.style.translate = `${el.offsetLeft}px 0`;
        bar.style.width = `${el.offsetWidth}px`;
      }
    };
    place();
    const ro = new ResizeObserver(place); // lebar link berubah saat font selesai dimuat
    ro.observe(nav);
    const raf = requestAnimationFrame(() => bar.setAttribute('data-ready', ''));
    return () => {
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [pathname]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (mobileOpen && !dialog.open) dialog.showModal();
    if (!mobileOpen && dialog.open) dialog.close();
  }, [mobileOpen]);

  const scrollTopIfHome = (e: React.MouseEvent) => {
    if (pathname !== '/') return;
    e.preventDefault();
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  };

  return (
    <header
      className={`sticky top-0 z-50 h-16 border-b transition-colors duration-150 ${
        scrolled ? 'bg-surface border-border' : 'bg-bg border-transparent'
      }`}
    >
      <Container className="h-full flex items-center justify-between gap-6">
        <Link href="/" onClick={scrollTopIfHome} className="flex items-center gap-2 rounded-sm" aria-label="WasteLink, ke beranda">
          <Image src="/logo-mark.png" alt="" width={36} height={27} className="h-7 w-auto object-contain" />
          <Wordmark />
        </Link>

        <nav ref={navRef} aria-label="Utama" className="relative hidden md:flex h-full items-center gap-1">
          {navLinks.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? 'page' : undefined}
                className={`inline-flex h-11 items-center px-3 rounded-sm text-body font-medium transition-colors duration-150 ${
                  active ? 'text-ink' : 'text-muted hover:text-ink'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <span
            ref={barRef}
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-px left-0 h-0.5 w-0 bg-primary opacity-0 data-ready:motion-safe:transition-[translate,width,opacity] data-ready:duration-250 data-ready:ease-out"
          />
        </nav>

        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="md:hidden -mr-2 size-11 inline-flex items-center justify-center rounded-sm text-ink hover:bg-bg-alt transition-colors duration-150"
          aria-label="Buka menu"
          aria-haspopup="dialog"
          aria-expanded={mobileOpen}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>
      </Container>

      {/* Drawer mobile. Klik pada backdrop mengenai <dialog> itu sendiri (bukan isinya) → tutup. */}
      <dialog
        ref={dialogRef}
        aria-label="Menu"
        onClose={() => setMobileOpen(false)}
        onClick={(e) => e.target === e.currentTarget && setMobileOpen(false)}
        className="md:hidden fixed inset-y-0 right-0 left-auto m-0 h-dvh max-h-dvh w-[min(20rem,85vw)] max-w-none p-0 bg-bg text-ink border-l border-border overscroll-contain
          translate-x-full open:translate-x-0 starting:open:translate-x-full
          transition-[translate,display,overlay] transition-discrete duration-150 open:duration-200 ease-out
          backdrop:bg-ink/40"
      >
        <div className="flex h-full flex-col">
          <div className="flex h-16 shrink-0 items-center justify-between border-b border-border px-6">
            <Wordmark />
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="-mr-2 size-11 inline-flex items-center justify-center rounded-sm text-ink hover:bg-bg-alt transition-colors duration-150"
              aria-label="Tutup menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>

          <nav aria-label="Utama" className="flex flex-col p-3">
            {navLinks.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? 'page' : undefined}
                  onClick={() => setMobileOpen(false)}
                  className={`flex min-h-12 items-center rounded-sm border-l-2 px-4 text-h4 transition-colors duration-150 ${
                    active ? 'border-primary text-ink bg-bg-alt' : 'border-transparent text-muted hover:text-ink hover:bg-bg-alt'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </dialog>
    </header>
  );
};
