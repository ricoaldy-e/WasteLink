import { Button } from '@/components/ui/button';
import { ArrowIcon } from '@/components/ui/arrow-icon';

function pageNumbers(current: number, total: number): (number | '…')[] {
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);
  const shown = [...new Set([1, total, current - 1, current, current + 1])].filter((n) => n >= 1 && n <= total).sort((a, b) => a - b);
  const out: (number | '…')[] = [];
  shown.forEach((n, i) => {
    if (i && n - shown[i - 1] > 1) out.push('…');
    out.push(n);
  });
  return out;
}

/** Pagination terkontrol (Pengepul publik, daftar admin). Di mobile nomor diganti "1 / 4". */
export function Pagination({ page, total, onChange }: { page: number; total: number; onChange: (page: number) => void }) {
  return (
    <nav aria-label="Halaman hasil" className="mt-10 flex items-center justify-between gap-2 border-t border-border pt-6 sm:justify-center sm:gap-4">
      <Button variant="secondary" disabled={page === 1} onClick={() => onChange(page - 1)} className="px-4">
        <ArrowIcon className="rotate-180" />
        Sebelumnya
      </Button>

      <p className="text-small text-muted tabular-nums sm:hidden">
        <span aria-hidden="true">{page} / {total}</span>
        <span className="sr-only">Halaman {page} dari {total}</span>
      </p>
      <ol className="hidden items-center gap-1 sm:flex">
        {pageNumbers(page, total).map((n, i) =>
          n === '…' ? (
            <li key={`gap-${i}`} aria-hidden="true" className="inline-flex size-11 items-center justify-center text-subtle">…</li>
          ) : (
            <li key={n}>
              <button
                type="button"
                onClick={() => onChange(n)}
                aria-label={`Halaman ${n}`}
                aria-current={n === page ? 'page' : undefined}
                className={`inline-flex size-11 items-center justify-center rounded-sm text-small font-semibold tabular-nums transition-colors duration-150 ${
                  n === page ? 'bg-primary text-on-primary' : 'text-ink hover:bg-bg-alt'
                }`}
              >
                {n}
              </button>
            </li>
          )
        )}
      </ol>

      <Button variant="secondary" disabled={page === total} onClick={() => onChange(page + 1)} className="px-4">
        Berikutnya
        <ArrowIcon />
      </Button>
    </nav>
  );
}
