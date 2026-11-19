import { Button } from '@/components/ui/button';
import { ButtonLink } from '@/components/ui/button-link';
import { Spinner } from '@/components/ui/spinner';

/**
 * Baris aksi di dasar form admin: Batal (link) + kirim. Saat `busy` keduanya tidak bisa dipakai
 * (Batal tidak bisa difokus/diklik) dan tombol kirim menampilkan `busyLabel`.
 */
export function FormActions({
  cancelHref,
  submitId,
  submitLabel,
  busyLabel,
  busy,
}: {
  cancelHref: string;
  submitId: string;
  submitLabel: string;
  busyLabel: string;
  busy: boolean;
}) {
  return (
    <div className="flex flex-col-reverse gap-3 border-t border-border pt-6 sm:flex-row sm:justify-end">
      <ButtonLink
        href={cancelHref}
        variant="secondary"
        aria-disabled={busy || undefined}
        tabIndex={busy ? -1 : undefined}
        className={`sm:w-44 ${busy ? 'pointer-events-none opacity-50' : ''}`}
      >
        Batal
      </ButtonLink>
      <Button id={submitId} type="submit" className="sm:w-44" disabled={busy} aria-busy={busy}>
        {busy ? (
          <>
            <Spinner />
            {busyLabel}
          </>
        ) : (
          submitLabel
        )}
      </Button>
    </div>
  );
}
