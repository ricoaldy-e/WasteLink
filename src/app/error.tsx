'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global Error Caught:', error);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center bg-bg py-16">
      <Container>
        <p className="text-eyebrow text-error">Kesalahan sistem</p>
        <h1 className="mt-3 text-h1 text-ink">Halaman gagal dimuat</h1>
        <p className="mt-4 max-w-[48ch] text-body-lg text-muted">
          Sistem mengalami kendala teknis saat memproses permintaan Anda. Coba muat ulang; kalau masih gagal, kembali ke beranda atau coba lagi nanti.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Button variant="primary" onClick={() => reset()}>
            Coba lagi
          </Button>
          <Link
            href="/"
            className="inline-flex h-11 items-center rounded-sm border border-primary px-5 text-btn text-primary transition-colors duration-150 hover:bg-primary-subtle"
          >
            Kembali ke beranda
          </Link>
        </div>
      </Container>
    </main>
  );
}
