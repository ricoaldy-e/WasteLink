import * as React from 'react';
import { Container } from '@/components/ui/container';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  /** Use Container wrapper inside section. Default true */
  contained?: boolean;
  /** HTML element tag to render. Default 'section' */
  as?: 'section' | 'div' | 'aside';
}

/**
 * Section – docs/DESIGN.md §4. Padding vertikal fluid 48 → 96px dalam satu utility (bukan
 * `md:py-*`), supaya `pt-*`/`pb-*`/`!py-*` dari pemanggil tidak ditimpa variant breakpoint.
 */
export const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className = '', contained = true, as: Tag = 'section', children, ...props }, ref) => {
    return (
      <Tag
        ref={ref as React.Ref<HTMLDivElement>}
        className={`py-[clamp(3rem,2rem_+_4vw,6rem)] ${className}`}
        {...props}
      >
        {contained ? <Container>{children}</Container> : children}
      </Tag>
    );
  }
);

Section.displayName = 'Section';
