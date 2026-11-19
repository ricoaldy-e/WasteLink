/**
 * Pesan keadaan (kosong / error) rata kiri: apa yang terjadi, lalu apa yang bisa dilakukan.
 * Error tidak hanya berwarna merah; judulnya sendiri yang menyatakan kegagalan.
 */
export function StateMessage({
  title,
  children,
  action,
  tone = 'empty',
}: {
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
  tone?: 'empty' | 'error';
}) {
  const error = tone === 'error';
  return (
    <div className={`rounded-lg border px-6 py-10 md:py-12 ${error ? 'border-error bg-error-bg' : 'border-border bg-surface'}`}>
      <h2 className={`text-h4 ${error ? 'text-error' : 'text-ink'}`}>{title}</h2>
      <div className={`mt-2 max-w-[56ch] text-body ${error ? 'text-ink' : 'text-muted'}`}>{children}</div>
      {action && <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">{action}</div>}
    </div>
  );
}
