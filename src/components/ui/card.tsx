import * as React from 'react';

/**
 * Card - docs/DESIGN.md §8. Panel datar untuk mengelompokkan isian form: bg surface, border 1px,
 * radius-lg, tanpa shadow. Kartu yang bisa diklik (CategoryCard, CollectorCard) punya markup sendiri.
 */
export const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className = '', ...props }, ref) => (
    <div ref={ref} className={`rounded-lg border border-border bg-surface p-4 md:p-6 ${className}`} {...props} />
  )
);

Card.displayName = 'Card';
