import * as React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'success' | 'neutral';
}

/**
 * Badge – DESIGN.md §4 Badges
 *
 * Success:
 *   bg rgba(41,158,99,0.12), text #1F7A4A, border 1px solid #299E63
 *   12px / 600, padding 4px 12px, radius 4px
 *
 * Neutral:
 *   bg #E2E8F0, text #464F54, no border
 *   12px / 600, padding 4px 12px, radius 4px
 */
export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className = '', variant = 'success', ...props }, ref) => {
    const base = [
      'inline-flex items-center',
      'text-caption font-semibold',       // 12px / 18px / 600
      'px-3 py-1',
      'rounded-[4px]',
    ].join(' ');

    const variants: Record<string, string> = {
      success: 'bg-brand-green-muted text-brand-green-hover border border-brand-green',
      neutral: 'bg-border text-text-secondary border-none',
    };

    return (
      <span
        ref={ref}
        className={`${base} ${variants[variant]} ${className}`}
        {...props}
      />
    );
  }
);

Badge.displayName = 'Badge';
