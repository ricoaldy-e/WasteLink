import * as React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 'default' – standard card; 'icon' – card with leading icon slot */
  variant?: 'default' | 'icon';
}

/**
 * Card component – DESIGN.md §4 Cards & Containers
 *
 * Default Card:
 *   bg white, border #E2E8F0, rounded 8px, padding 24px,
 *   shadow raised, hover shadow elevated
 *
 * Card with Icon:
 *   Same base + flex layout, gap 16px,
 *   icon slot 48×48, bg rgba(41,158,99,0.12), rounded 6px, color #299E63
 */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', variant = 'default', ...props }, ref) => {
    const base = [
      'bg-white',
      'border border-border',
      'rounded-[8px]',
      'shadow-sm',                        // raised shadow from tokens
      'hover:shadow-md',                  // elevated shadow on hover
      'transition-shadow duration-200',
    ].join(' ');

    const variants: Record<string, string> = {
      default: 'p-4 md:p-6',
      icon: 'p-4 md:p-5 flex gap-3 md:gap-4',
    };

    return (
      <div
        ref={ref}
        className={`${base} ${variants[variant]} ${className}`}
        {...props}
      />
    );
  }
);

Card.displayName = 'Card';

/**
 * CardIcon – Icon container for Card variant="icon"
 * DESIGN.md: 48×48px, bg rgba(41,158,99,0.12), rounded 6px, color #299E63
 */
export const CardIcon = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`flex-shrink-0 w-12 h-12 rounded-[6px] bg-brand-green-muted text-brand-green flex items-center justify-center ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardIcon.displayName = 'CardIcon';
