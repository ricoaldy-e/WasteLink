import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';

export default function GlobalNotFound() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center py-16">
      <Container className="text-center">
        <div className="w-16 h-16 bg-brand-green-subtle text-brand-green rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 className="text-display-md text-text-primary mb-4">404 - Tidak Ditemukan</h1>
        <p className="text-body-lg text-text-secondary max-w-lg mx-auto mb-8">
          Halaman atau data yang Anda cari tidak ada, sudah dihapus, atau belum tersedia saat ini.
        </p>
        <Link href="/">
          <Button variant="primary">Kembali ke Beranda</Button>
        </Link>
      </Container>
    </main>
  );
}
