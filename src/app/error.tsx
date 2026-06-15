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
    <main className="min-h-screen bg-background flex items-center justify-center py-16">
      <Container className="text-center">
        <div className="w-16 h-16 bg-error-bg text-error rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h1 className="text-h1 text-text-primary mb-4">Ups! Terjadi Kesalahan</h1>
        <p className="text-body-lg text-text-secondary max-w-lg mx-auto mb-8">
          Sistem kami mengalami kendala teknis saat memproses permintaan Anda.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button variant="primary" onClick={() => reset()}>
            Coba Lagi
          </Button>
          <Link href="/">
            <Button variant="secondary">Kembali ke Beranda</Button>
          </Link>
        </div>
      </Container>
    </main>
  );
}
