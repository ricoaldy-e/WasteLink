import * as React from 'react';
import { Container } from '@/components/ui/container';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  /** Use Container wrapper inside section. Default true */
  contained?: boolean;
  /** HTML element tag to render. Default 'section' */
  as?: 'section' | 'div' | 'aside';
}

/**
 * Section wrapper – DESIGN.md §5 Layout Principles
 *
 * Default vertical padding: 60px–80px (py-15 desktop, py-12 mobile)
 * Content centered with max-width 1200px when contained
 */
export const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className = '', contained = true, as: Tag = 'section', children, ...props }, ref) => {
    return (
      <Tag
        ref={ref as any}
        className={`py-12 md:py-15 lg:py-20 ${className}`}
        {...props}
      >
        {contained ? <Container>{children}</Container> : children}
      </Tag>
    );
  }
);

Section.displayName = 'Section';
