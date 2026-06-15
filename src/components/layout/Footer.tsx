import Link from 'next/link';
import { Container } from '@/components/ui/container';

/**
 * Footer – Public layout footer
 * Follows DESIGN.md spacing (48px–80px), typography, and color tokens
 */
export const Footer = () => {
  return (
    <footer className="bg-white border-t border-border py-12 md:py-16 mt-auto">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6">
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-2">
            <Link
              href="/"
              className="text-h3 text-brand-green font-bold block mb-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green rounded-[4px]"
            >
              WasteLink
            </Link>
            <p className="text-body-md text-text-secondary max-w-sm">
              Platform direktori pengepul limbah untuk membantu masyarakat menemukan pengepul berdasarkan kategori sampah secara mudah dan efisien.
            </p>
          </div>

          {/* Navigasi Column */}
          <div>
            <h3 className="text-body-lg font-bold text-text-primary mb-4">Navigasi</h3>
            <ul className="flex flex-col gap-3">
              <li>
                <Link
                  href="/"
                  className="text-body-md text-text-secondary hover:text-brand-green transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green rounded-[4px]"
                >
                  Beranda
                </Link>
              </li>
              <li>
                <Link
                  href="/categories"
                  className="text-body-md text-text-secondary hover:text-brand-green transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green rounded-[4px]"
                >
                  Kategori Sampah
                </Link>
              </li>
              <li>
                <Link
                  href="/collectors"
                  className="text-body-md text-text-secondary hover:text-brand-green transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green rounded-[4px]"
                >
                  Daftar Pengepul
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-body-md text-text-secondary hover:text-brand-green transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green rounded-[4px]"
                >
                  Tentang Kami
                </Link>
              </li>
            </ul>
          </div>

          {/* Kontak Column */}
          <div>
            <h3 className="text-body-lg font-bold text-text-primary mb-4">Kontak</h3>
            <ul className="flex flex-col gap-3">
              <li className="text-body-md text-text-secondary">
                Email: <a href="mailto:halo@wastelink.id" className="hover:text-brand-green hover:underline">halo@wastelink.id</a>
              </li>
              <li className="text-body-md text-text-secondary">
                WhatsApp: <a href="https://wa.me/6281234567890" target="_blank" rel="noreferrer" className="hover:text-brand-green hover:underline">+62 812 3456 7890</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-body-sm text-text-muted">
            &copy; {new Date().getFullYear()} WasteLink. Seluruh Hak Cipta Dilindungi.
          </p>
          <div className="flex gap-4">
            <Link
              href="/login"
              className="text-body-sm text-text-muted hover:text-brand-green transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green rounded-[4px]"
            >
              Admin Login
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};
