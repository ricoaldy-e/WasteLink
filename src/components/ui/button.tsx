'use client';

import * as React from 'react';
import { buttonClass, type ButtonSize, type ButtonVariant } from '@/components/ui/button-styles';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  /** `sm` (40px) untuk aksi di dalam baris daftar/tabel; default `md` (44px). */
  size?: ButtonSize;
}

/**
 * Button – docs/DESIGN.md §7–8. Gaya ada di button-styles.ts (dipakai juga ButtonLink).
 * Hover = warna; `<ArrowIcon />` di dalamnya bergeser 2px; tombolnya tidak di-scale. Active = turun 1px.
 * Satu `primary` per tampilan.
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', ...props }, ref) => (
    <button ref={ref} className={buttonClass(variant, size, className)} {...props} />
  )
);

Button.displayName = 'Button';
