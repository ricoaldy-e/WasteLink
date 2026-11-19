import * as React from 'react';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Tandai error: border + outline merah dan `aria-invalid`. */
  error?: boolean;
}

/** Textarea – mengikuti Input (docs/DESIGN.md §8). */
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = '', error = false, ...props }, ref) => {
    const base = [
      'w-full min-h-[120px] rounded-sm border px-4 py-3',
      'text-body text-ink placeholder:text-subtle',
      'bg-surface resize-none',
      'transition-colors duration-150',
      'focus-visible:outline-1 focus-visible:outline-offset-0',
      'disabled:bg-bg-alt disabled:text-border-strong disabled:cursor-not-allowed',
    ].join(' ');

    const stateStyles = error
      ? 'border-error focus-visible:outline-error'
      : 'border-border-strong enabled:hover:border-ink focus:border-primary';

    return (
      <textarea
        ref={ref}
        aria-invalid={error || undefined}
        className={`${base} ${stateStyles} ${className}`}
        {...props}
      />
    );
  }
);

Textarea.displayName = 'Textarea';
