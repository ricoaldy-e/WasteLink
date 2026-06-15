import * as React from 'react';

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

/**
 * Form Label – DESIGN.md §4 Form Label
 *
 * Font: 14px / 600 weight, Color: #1A202C
 * Margin bottom: 8px, Display: block
 */
export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className = '', ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={`block text-xs font-semibold uppercase tracking-wider text-text-primary mb-2 ${className}`}
        {...props}
      />
    );
  }
);

Label.displayName = 'Label';
