import { BackLink } from '@/components/ui/back-link';

/** Kepala halaman admin: (tautan kembali) → judul + deskripsi di kiri, aksi utama di kanan. */
export function AdminPageHeader({
  title,
  description,
  back,
  action,
}: {
  title: string;
  description?: React.ReactNode;
  back?: { href: string; label: string };
  action?: React.ReactNode;
}) {
  return (
    <header className="mb-8 border-b border-border pb-6">
      {back && (
        <div className="-mt-2 mb-2">
          <BackLink href={back.href}>{back.label}</BackLink>
        </div>
      )}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-h2 text-ink">{title}</h1>
          {description && <p className="mt-2 max-w-[60ch] text-body text-muted">{description}</p>}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
    </header>
  );
}
