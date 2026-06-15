'use client';

import * as React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
}

/**
 * Button component – DESIGN.md §4 Buttons
 * 
 * Primary:   Solid green (#299E63), white text, 44px height, 6px radius
 * Secondary: Green outline, transparent bg, green text
 * Ghost:     Text-only, no border, underline on hover
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', disabled, ...props }, ref) => {
    const base = [
      'inline-flex items-center justify-center',
      'text-btn',                         // 16px / 19px / 700 from globals.css
      'transition-all duration-300',
      'focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2',
      'disabled:cursor-not-allowed',
    ].join(' ');

    const variants: Record<string, string> = {
      primary: [
        'bg-brand-green text-white',
        'h-[44px] rounded-[6px] px-6 py-3',
        'border-none',
        'hover:bg-brand-green-hover',
        'active:bg-brand-green-active',
        'disabled:bg-brand-green-disabled disabled:text-white',
      ].join(' '),
      secondary: [
        'bg-transparent text-brand-green',
        'h-[44px] rounded-[6px] px-6 py-3',
        'border border-brand-green',
        'hover:bg-brand-green-subtle hover:border-brand-green-hover',
        'active:bg-brand-green-muted',
        'disabled:border-[#D4E4DB] disabled:text-brand-green-disabled',
      ].join(' '),
      ghost: [
        'bg-transparent text-brand-green',
        'rounded-none px-3 py-2',
        'border-none',
        'font-normal',                    // Ghost uses weight 400
        'hover:text-brand-green-hover hover:underline',
        'active:text-brand-green-active',
        'disabled:text-brand-green-disabled',
      ].join(' '),
    };

    // Pisahkan children dari props agar bisa dibungkus
    const { children, ...restProps } = props;

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={`${base} ${variants[variant]} ${className}`}
        {...restProps}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
