/**
 * Gaya tombol bersama, dipakai <Button> dan <ButtonLink>. Berupa string (bukan komponen client),
 * jadi aman diimpor dari server component. docs/DESIGN.md §7–8.
 * Pakai `not-disabled:` (bukan `enabled:`) supaya juga berlaku pada <a>.
 */
export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'danger-ghost';
export type ButtonSize = 'md' | 'sm';

const base = [
  'inline-flex items-center justify-center gap-2',
  'transition-[color,background-color,border-color,translate] duration-150 ease-out',
  'not-disabled:active:translate-y-px',
  'not-disabled:motion-safe:hover:[&_[data-arrow]]:translate-x-0.5',
  'disabled:cursor-not-allowed',
].join(' ');

const color: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-on-primary hover:bg-primary-hover active:bg-primary-pressed disabled:bg-border disabled:text-border-strong',
  secondary:
    'border border-primary bg-transparent text-primary hover:bg-primary-subtle active:bg-primary-subtle disabled:border-border disabled:bg-transparent disabled:text-border-strong',
  ghost: 'bg-transparent text-primary underline decoration-transparent hover:text-primary-hover hover:decoration-current active:text-primary-pressed disabled:text-border-strong disabled:decoration-transparent',
  danger: 'bg-error text-white hover:bg-error-hover active:bg-error-pressed disabled:bg-border disabled:text-border-strong',
  'danger-ghost':
    'bg-transparent text-error underline decoration-transparent hover:text-error-hover hover:decoration-current active:text-error-pressed disabled:text-border-strong disabled:decoration-transparent',
};

const filled = { md: 'h-11 rounded-sm px-5 text-btn', sm: 'h-10 rounded-sm px-4 text-small font-semibold' };
const ghost = { md: 'px-3 py-2 text-btn font-medium', sm: 'min-h-10 rounded-sm px-3 text-small font-semibold' };

export function buttonClass(variant: ButtonVariant = 'primary', size: ButtonSize = 'md', extra = '') {
  const isGhost = variant === 'ghost' || variant === 'danger-ghost';
  return [base, color[variant], (isGhost ? ghost : filled)[size], extra].filter(Boolean).join(' ');
}
