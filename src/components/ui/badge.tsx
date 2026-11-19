import * as React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'success' | 'neutral';
  showDot?: boolean;
}

/**
 * Badge – docs/DESIGN.md §10.
 * success: fill mint + teks ink (7.79:1). neutral: bg-alt + teks muted (4.59:1).
 * Sentence case; status selalu berupa teks, titik hanya penguat.
 */
export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className = '', variant = 'success', showDot = true, children, ...props }, ref) => {
    const hasBg = className.includes('bg-');
    const hasText = className.includes('text-');
    const hasBorder = className.includes('border-');

    const base = 'inline-flex items-center gap-1.5 whitespace-nowrap text-caption font-semibold px-2 py-0.5 rounded-sm border';

    const variants = {
      success: {
        container: `${hasBg ? '' : 'bg-accent'} ${hasBorder ? '' : 'border-transparent'} ${hasText ? '' : 'text-ink'}`,
        dot: 'size-1.5 rounded-full bg-ink shrink-0',
      },
      neutral: {
        container: `${hasBg ? '' : 'bg-bg-alt'} ${hasBorder ? '' : 'border-border'} ${hasText ? '' : 'text-muted'}`,
        dot: 'size-1.5 rounded-full bg-subtle shrink-0',
      },
    };

    const currentVariant = variants[variant] || variants.success;

    return (
      <span ref={ref} className={`${base} ${currentVariant.container} ${className}`} {...props}>
        {showDot && <span className={currentVariant.dot} aria-hidden="true" />}
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
