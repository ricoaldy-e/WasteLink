import * as React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Tandai error: border + outline merah dan `aria-invalid`. Pesan error tetap ditulis pemanggil (teks + aria-describedby). */
  error?: boolean;
}

/**
 * Input – docs/DESIGN.md §7–8. Tinggi 44px, 16px (cegah zoom iOS), border-strong (3.54:1).
 * Fokus = border primary 1px + outline 1px (offset 0) = satu garis 2px, bukan tiga. Error = border + outline error.
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', error = false, ...props }, ref) => {
    const base = [
      'w-full h-11 rounded-sm border px-4',
      'text-body text-ink placeholder:text-subtle',
      'bg-surface',
      'transition-colors duration-150',
      'focus-visible:outline-1 focus-visible:outline-offset-0',
      'disabled:bg-bg-alt disabled:text-border-strong disabled:cursor-not-allowed',
    ].join(' ');

    const stateStyles = error
      ? 'border-error focus-visible:outline-error'
      : 'border-border-strong enabled:hover:border-ink focus:border-primary';

    return (
      <input
        ref={ref}
        aria-invalid={error || undefined}
        className={`${base} ${stateStyles} ${className}`}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
