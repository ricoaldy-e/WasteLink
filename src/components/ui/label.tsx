import * as React from 'react';

export type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

/**
 * Label – docs/DESIGN.md §10. Jakarta 600 14px, sentence case.
 */
export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className = '', ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={`block text-small font-semibold text-ink mb-2 ${className}`}
        {...props}
      />
    );
  }
);

Label.displayName = 'Label';
