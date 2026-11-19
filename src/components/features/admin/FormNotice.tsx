/**
 * Banner hasil/kesalahan untuk form dan halaman admin. Tidak hanya berwarna: ikon dan label tersembunyi
 * ("Kesalahan:" / "Berhasil:") ikut membawa maknanya. Teks utama ink supaya kontrasnya aman (≥ 11:1).
 */
export function FormNotice({
  tone,
  children,
  className = '',
}: {
  tone: 'error' | 'success';
  children: React.ReactNode;
  className?: string;
}) {
  const error = tone === 'error';
  return (
    <div
      role={error ? 'alert' : 'status'}
      className={`flex items-start gap-3 rounded-lg border p-4 ${error ? 'border-error bg-error-bg' : 'border-primary bg-primary-subtle'} ${className}`}
    >
      <svg aria-hidden="true" viewBox="0 0 16 16" fill="currentColor" className={`mt-0.5 size-4 shrink-0 ${error ? 'text-error' : 'text-primary'}`}>
        {error ? (
          <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm.75 4.25a.75.75 0 0 0-1.5 0v3.5a.75.75 0 0 0 1.5 0v-3.5zM8 11a.875.875 0 1 1 0 1.75A.875.875 0 0 1 8 11z" />
        ) : (
          <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm3.03 5.03a.75.75 0 0 0-1.06-1.06L6.75 7.19 5.53 5.97a.75.75 0 0 0-1.06 1.06l1.75 1.75a.75.75 0 0 0 1.06 0l3.75-3.75z" />
        )}
      </svg>
      <p className="text-small font-medium text-ink">
        <span className="sr-only">{error ? 'Kesalahan: ' : 'Berhasil: '}</span>
        {children}
      </p>
    </div>
  );
}
