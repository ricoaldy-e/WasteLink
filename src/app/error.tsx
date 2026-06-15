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
        <div className="relative w-32 h-32 mx-auto mb-8 flex items-center justify-center select-none group">
          <div className="absolute inset-0 bg-error/20 blur-2xl rounded-full pointer-events-none group-hover:bg-error/30 transition-all duration-500" />
          <div className="relative w-24 h-24 bg-white border border-error/20 shadow-xl shadow-error/10 rounded-[24px] flex items-center justify-center transform rotate-6 group-hover:rotate-0 group-hover:scale-105 transition-all duration-500 ease-out">
            <div className="absolute inset-0 bg-gradient-to-br from-error/5 to-transparent rounded-[24px]" />
            <svg className="relative z-10 w-11 h-11 text-error drop-shadow-sm" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
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
