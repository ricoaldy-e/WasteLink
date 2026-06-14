import * as React from 'react';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className = '', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`max-w-[1200px] mx-auto w-full px-6 md:px-8 lg:px-10 ${className}`}
        {...props}
      />
    );
  }
);

Container.displayName = 'Container';
