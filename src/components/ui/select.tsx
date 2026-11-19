import * as React from 'react';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  /** Tandai error: border + outline merah dan `aria-invalid`. */
  error?: boolean;
}

/** Select – mengikuti Input (docs/DESIGN.md §8). Panah memakai warna muted. */
export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className = '', error = false, children, ...props }, ref) => {
    const base = [
      'w-full appearance-none h-11 rounded-sm border px-4 pr-10',
      'text-body text-ink bg-surface',
      'transition-colors duration-150',
      'focus-visible:outline-1 focus-visible:outline-offset-0',
      'disabled:bg-bg-alt disabled:text-border-strong disabled:cursor-not-allowed',
    ].join(' ');

    const stateStyles = error
      ? 'border-error focus-visible:outline-error'
      : 'border-border-strong enabled:hover:border-ink focus:border-primary';

    return (
      <div className="relative">
        <select
          ref={ref}
          aria-invalid={error || undefined}
          className={`${base} ${stateStyles} ${className}`}
          {...props}
        >
          {children}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <svg className="size-5 text-muted" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path
              fillRule="evenodd"
              d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    );
  }
);

Select.displayName = 'Select';
