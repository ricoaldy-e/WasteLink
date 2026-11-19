'use client';

import { useEffect, useId, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';

/**
 * Dialog konfirmasi berbasis <dialog> native: fokus terkunci, latar inert, Esc menutup, fokus kembali
 * ke pemicu. Selama `busy`, Esc/klik latar/Batal tidak menutupnya. Pemanggil tetap memegang `open`
 * dan logika aksinya (onConfirm).
 */
export function ConfirmDialog({
  open,
  onClose,
  title,
  children,
  confirmLabel,
  busyLabel,
  confirmId,
  busy = false,
  tone = 'danger',
  onConfirm,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  confirmLabel: string;
  busyLabel: string;
  confirmId?: string;
  busy?: boolean;
  tone?: 'danger' | 'primary';
  onConfirm: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      onCancel={(e) => busy && e.preventDefault()}
      onClose={onClose}
      onClick={(e) => e.target === e.currentTarget && !busy && onClose()}
      className="m-auto w-[min(26rem,calc(100vw-2rem))] rounded-lg border border-border bg-surface p-0 text-ink shadow-lg backdrop:bg-ink/40
        opacity-0 transition-[opacity,display,overlay] transition-discrete duration-150 ease-out open:opacity-100 starting:open:opacity-0"
    >
      <div className="p-6">
        <h2 id={titleId} className="text-h4 text-ink">{title}</h2>
        <div className="mt-2 text-body text-muted">{children}</div>
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button variant="secondary" onClick={onClose} disabled={busy}>
            Batal
          </Button>
          <Button id={confirmId} variant={tone} onClick={onConfirm} disabled={busy} aria-busy={busy}>
            {busy ? (
              <>
                <Spinner />
                {busyLabel}
              </>
            ) : (
              confirmLabel
            )}
          </Button>
        </div>
      </div>
    </dialog>
  );
}
