import * as React from 'react';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}

/**
 * Select / Dropdown – DESIGN.md §4 Select / Dropdown
 *
 * Same sizing as Input: Height 44px, Border 1px solid #E2E8F0, Radius 6px
 * Padding: 12px 16px, Font: 16px
 * Focus: border #299E63
 * Arrow icon color: #299E63 (via SVG background)
 */
export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div className="relative">
        <select
          ref={ref}
          className={`
            w-full appearance-none
            h-[44px] rounded-[6px]
            border border-border
            px-4 py-3 pr-10
            text-body-md text-text-primary
            bg-white
            transition-all duration-200
            focus:outline-none focus:border-brand-green focus:ring-[3px] focus:ring-brand-green/10
            disabled:opacity-50 disabled:cursor-not-allowed
            ${className}
          `}
          {...props}
        >
          {children}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <svg
            className="h-5 w-5 text-brand-green"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
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
