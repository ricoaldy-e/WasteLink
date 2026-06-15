import * as React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'success' | 'neutral';
  showDot?: boolean;
}

/**
 * Premium Badge – Minimalist, Structured, and High-Contrast
 * Designed to feel bespoke and premium rather than generic/AI templates.
 */
export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className = '', variant = 'success', showDot = true, children, ...props }, ref) => {
    // Prevent style conflicts by checking for overrides
    const hasBg = className.includes('bg-');
    const hasText = className.includes('text-');
    const hasBorder = className.includes('border-');

    const base = [
      'inline-flex items-center gap-1.5',
      'text-[10px] font-semibold uppercase tracking-wider',
      'px-2.5 py-0.5',
      'rounded-full',
      'border transition-all duration-200 select-none shadow-[0_1px_1px_rgba(0,0,0,0.02)]',
    ].join(' ');

    const variants = {
      success: {
        container: `${hasBg ? '' : 'bg-brand-green-subtle/40'} ${hasBorder ? '' : 'border-brand-green/20'} ${hasText ? '' : 'text-brand-green-hover'}`,
        dot: 'w-1.5 h-1.5 rounded-full bg-brand-green shrink-0',
      },
      neutral: {
        container: `${hasBg ? '' : 'bg-gray-50'} ${hasBorder ? '' : 'border-border'} ${hasText ? '' : 'text-text-secondary'}`,
        dot: 'w-1.5 h-1.5 rounded-full bg-text-muted/60 shrink-0',
      },
    };

    const currentVariant = variants[variant] || variants.success;

    return (
      <span
        ref={ref}
        className={`${base} ${currentVariant.container} ${className}`}
        {...props}
      >
        {showDot && <span className={currentVariant.dot} aria-hidden="true" />}
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

