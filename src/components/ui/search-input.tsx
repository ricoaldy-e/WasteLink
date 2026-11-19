import * as React from 'react';
import { Input } from '@/components/ui/input';

interface SearchInputProps {
  value: string;
  onValueChange: (value: string) => void;
  /** Nama aksesibel (tidak ada label visual; placeholder bukan label). */
  label: string;
  placeholder?: string;
  className?: string;
}

/** Kotak pencarian: Input + ikon kaca pembesar + tombol hapus (44px). Terkontrol penuh oleh pemanggil. */
export function SearchInput({ value, onValueChange, label, placeholder, className = '' }: SearchInputProps) {
  return (
    <div className={`relative w-full max-w-md ${className}`}>
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        className="pointer-events-none absolute start-4 top-1/2 size-5 -translate-y-1/2 text-muted"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="M20 20l-3.5-3.5" />
      </svg>
      <Input
        type="search"
        aria-label={label}
        placeholder={placeholder}
        enterKeyHint="search"
        autoComplete="off"
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        // ikon "x" bawaan Chrome disembunyikan; tombol hapus sendiri di bawah
        className="ps-11 pe-11 [&::-webkit-search-cancel-button]:appearance-none"
      />
      {value && (
        <button
          type="button"
          onClick={() => onValueChange('')}
          aria-label="Bersihkan pencarian"
          className="absolute end-0 top-0 inline-flex size-11 items-center justify-center rounded-sm text-muted transition-colors duration-150 hover:text-ink"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="size-4">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      )}
    </div>
  );
}
