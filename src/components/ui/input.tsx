import * as React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Show error styling (red border + pink background) */
  error?: boolean;
}

/**
 * Text Input – DESIGN.md §4 Inputs & Forms
 *
 * Height: 44px, Border: 1px solid #E2E8F0, Radius: 6px
 * Padding: 12px 16px, Font: 16px Red Hat Text, Color: #1A202C
 * Focus: border #299E63, ring rgba(41,158,99,0.1)
 * Error: border #DC2626, bg #FEE2E2
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', error = false, ...props }, ref) => {
    const base = [
      'w-full',
      'h-[44px]',
      'rounded-[6px]',
      'border',
      'px-4 py-3',
      'text-body-md text-text-primary',
      'placeholder:text-text-secondary',
      'bg-white',
      'transition-all duration-200',
      'focus:outline-none focus:ring-[3px]',
      'disabled:opacity-50 disabled:cursor-not-allowed',
    ].join(' ');

    const stateStyles = error
      ? 'border-error bg-error-bg focus:border-error focus:ring-error/10'
      : 'border-border focus:border-brand-green focus:ring-brand-green/10';

    return (
      <input
        ref={ref}
        className={`${base} ${stateStyles} ${className}`}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
