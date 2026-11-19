import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { Reveal } from '@/components/ui/reveal';
import { CONTACT_EMAIL, SITE_DESCRIPTION } from '@/lib/site';

/**
 * Footer - docs/DESIGN.md §3.4. Latar primary-pressed (#013D3C).
 * Kontras terukur: on-primary 11.02 · on-primary/80 7.63 · on-primary/70 6.19 · accent 6.71.
 * Outline fokus global (primary) hanya 1.66:1 di sini, jadi diganti accent.
 */

const groups = [
  {
    id: 'footer-jelajahi',
    title: 'Jelajahi',
    links: [
      { href: '/', label: 'Beranda' },
      { href: '/categories', label: 'Kategori sampah' },
      { href: '/collectors', label: 'Daftar pengepul' },
      { href: '/about', label: 'Tentang WasteLink' },
    ],
  },
  {
    id: 'footer-informasi',
    title: 'Informasi',
    links: [
      { href: '/contact', label: 'Kontak' },
      { href: '/privacy', label: 'Kebijakan privasi' },
      { href: '/terms', label: 'Ketentuan layanan' },
    ],
  },
];

// Hover seragam dengan tautan teks lain: warna naik + garis bawah tipis, bobot tetap.
const linkClass = 'link-ui rounded-sm text-on-primary/80 hover:text-on-primary';

export const Footer = () => (
  <footer className="mt-auto overflow-hidden bg-primary-pressed text-on-primary [&_:focus-visible]:outline-accent">
    <Container className="pt-16 md:pt-20">
      <div className="grid gap-10 md:grid-cols-12 md:gap-6">
        <div className="md:col-span-6">
          <p className="max-w-[38ch] text-body-lg text-on-primary">{SITE_DESCRIPTION}</p>
          {CONTACT_EMAIL && (
            <a href={`mailto:${CONTACT_EMAIL}`} className={`mt-6 inline-block break-all text-body ${linkClass}`}>
              {CONTACT_EMAIL}
            </a>
          )}
        </div>

        {groups.map((group) => (
          <nav key={group.id} aria-labelledby={group.id} className="md:col-span-3">
            <h2 id={group.id} className="text-eyebrow text-accent">
              {group.title}
            </h2>
            <ul className="mt-4 flex flex-col gap-1">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={`inline-flex min-h-11 items-center text-body ${linkClass}`}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      {/* Wordmark dekoratif; nama merek sudah ada di header dan copyright. Lebar font mengikuti lebar kolom (cqw), rata tengah. */}
      <Reveal className="mt-16 [container-type:inline-size]">
        <p
          aria-hidden="true"
          className="select-none whitespace-nowrap text-center font-display font-semibold leading-[0.9] tracking-[-0.02em] text-on-primary text-[length:21.2cqw]"
        >
          WasteLink
        </p>
      </Reveal>

      <div className="mt-8 flex flex-col gap-2 border-t border-on-primary/15 py-6 text-small text-on-primary/70 sm:flex-row sm:items-center sm:justify-between">
        <p>
          &copy; {new Date().getFullYear()} WasteLink. Seluruh hak cipta dilindungi.
        </p>
        <Link href="/login" className="link-ui inline-flex min-h-11 items-center rounded-sm text-on-primary/70 hover:text-on-primary">
          Masuk admin
        </Link>
      </div>
    </Container>
  </footer>
);
