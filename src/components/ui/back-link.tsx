import Link from 'next/link';
import { ArrowIcon } from '@/components/ui/arrow-icon';

/** Link kembali di atas halaman detail (tinggi 44px). */
export function BackLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex min-h-11 items-center gap-2 rounded-sm text-small font-semibold text-muted transition-colors duration-150 hover:text-ink motion-safe:hover:[&_[data-arrow]]:-translate-x-0.5"
    >
      <ArrowIcon className="rotate-180" />
      {children}
    </Link>
  );
}
