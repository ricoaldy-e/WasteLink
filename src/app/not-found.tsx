import Link from 'next/link';
import { Container } from '@/components/ui/container';

export const metadata = {
  title: 'Halaman Tidak Ditemukan | WasteLink',
  description: 'Halaman atau informasi yang Anda cari tidak tersedia di WasteLink.',
  robots: { index: false, follow: true },
};

export default function GlobalNotFound() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center py-16">
      <Container className="text-center">
        <div className="relative w-32 h-32 mx-auto mb-8 flex items-center justify-center select-none group">
          <div className="absolute inset-0 bg-brand-green/20 blur-2xl rounded-full pointer-events-none group-hover:bg-brand-green/30 transition-all duration-500" />
          <div className="relative w-24 h-24 bg-white border border-border shadow-xl shadow-brand-green/5 rounded-[24px] flex items-center justify-center transform -rotate-6 group-hover:rotate-0 group-hover:scale-105 transition-all duration-500 ease-out">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-green/5 to-transparent rounded-[24px]" />
            <span className="relative z-10 text-[2.5rem] leading-none font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-brand-green to-[#17663E] tracking-tighter drop-shadow-sm">
              404
            </span>
          </div>
        </div>
        <h1 className="text-display-md text-text-primary mb-4">404 - Tidak Ditemukan</h1>
        <p className="text-body-lg text-text-secondary max-w-lg mx-auto mb-8">
          Halaman atau data yang Anda cari tidak ada, sudah dihapus, atau belum tersedia saat ini.
        </p>
        <Link href="/" className="inline-flex items-center justify-center min-h-11 px-6 py-3 text-btn rounded-[6px] bg-brand-green text-white hover:bg-brand-green-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green">
          Kembali ke Beranda
        </Link>
      </Container>
    </main>
  );
}
