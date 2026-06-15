'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';

/**
 * Header Navigation Bar – DESIGN.md §4 Navigation
 *
 * Height: 64px, bg white, border-bottom 1px solid #E2E8F0
 * Shadow: rgba(18,44,77,0.04) 0 1px 12px
 * Logo: 24px, bold, #299E63
 * Nav links: 16px, 400 weight, #1A202C, hover #299E63 + bg rgba(41,158,99,0.08)
 * Mobile: hamburger → slide-out drawer
 */

const navLinks = [
  { href: '/categories', label: 'Kategori' },
  { href: '/collectors', label: 'Pengepul' },
  { href: '/about', label: 'Tentang Kami' },
];

export const Header = () => {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
    // Memaksa scroll ke paling atas setiap kali pindah halaman
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <>
      <header className="bg-white border-b border-border shadow-sm h-16 sticky top-0 z-50">
        <Container className="h-full flex items-center justify-between">
          <Link
            href="/"
            onClick={(e) => {
              if (pathname === '/') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="text-h3 text-brand-green font-bold focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2 rounded-[4px] inline-block hover:scale-105 hover:-translate-y-0.5 hover:drop-shadow-sm transition-all duration-300"
          >
            Waste<span className="text-text-primary">Link</span>
          </Link>

          <nav className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || pathname?.startsWith(link.href + '/');
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`
                    relative text-body-md font-medium px-4 py-2 rounded-[6px]
                    transition-colors duration-300
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2
                    group
                    ${isActive
                      ? 'text-brand-green'
                      : 'text-text-secondary hover:text-brand-green'
                    }
                  `}
                >
                  {link.label}
                  <span 
                    className={`
                      absolute bottom-0 left-0 w-full h-0.5 bg-brand-green transform origin-left transition-transform duration-300 ease-out
                      ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}
                    `} 
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Link 
              href="/" 
              onClick={(e) => {
                if (pathname === '/') {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className="hidden md:flex items-center hover:scale-105 hover:-translate-y-0.5 hover:drop-shadow-sm transition-all duration-300"
            >
              <Image 
                src="/logo.png" 
                alt="WasteLink Icon" 
                width={40} 
                height={40} 
                className="object-contain"
              />
            </Link>

            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-11 h-11 flex items-center justify-center rounded-[6px] text-text-primary hover:bg-brand-green-subtle hover:text-brand-green transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
              aria-label={mobileOpen ? 'Tutup menu' : 'Buka menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? (
                /* X icon */
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                /* Hamburger icon */
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              )}
            </button>
          </div>
        </Container>
      </header>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 md:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      <div
        className={`
          fixed top-16 right-0 bottom-0 z-50 w-[280px]
          bg-white border-l border-border shadow-lg
          transform transition-transform duration-300 ease-in-out
          md:hidden
          ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        <nav className="flex flex-col p-6 gap-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || pathname?.startsWith(link.href + '/');
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`
                  relative text-body-md font-medium px-4 py-3 rounded-[6px]
                  transition-colors duration-300
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2
                  ${isActive
                    ? 'text-brand-green bg-brand-green/10'
                    : 'text-text-secondary hover:text-brand-green hover:bg-brand-green/5'
                  }
                `}
              >
                {link.label}
              </Link>
            );
          })}

        </nav>
      </div>
    </>
  );
};
