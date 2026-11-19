import * as React from 'react';

/**
 * Panah dekoratif. `data-arrow` dipakai Button dan Card[interactive] untuk menggesernya saat hover;
 * teks di sampingnya yang membawa makna, jadi ikon disembunyikan dari screen reader.
 */
export function ArrowIcon({ className = '', ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      data-arrow
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`size-4 shrink-0 transition-[translate] duration-150 ease-out ${className}`}
      {...props}
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
