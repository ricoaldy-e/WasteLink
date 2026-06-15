import * as React from "react";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Show error styling (red border + pink background) */
  error?: boolean;
}

/**
 * Textarea – mirrors Input styling from DESIGN.md §4 Inputs & Forms
 *
 * Border: 1px solid #E2E8F0, Radius: 6px
 * Padding: 12px 16px, Font: 16px Red Hat Text, Color: #1A202C
 * Focus: border #299E63, ring rgba(41,158,99,0.1)
 * Error: border #DC2626, bg #FEE2E2
 */
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = "", error = false, ...props }, ref) => {
    const base = [
      "w-full",
      "min-h-[120px]",
      "rounded-[6px]",
      "border",
      "px-4 py-3",
      "text-body-md text-text-primary",
      "placeholder:text-text-secondary",
      "bg-white",
      "resize-y",
      "transition-all duration-200",
      "focus:outline-none focus:ring-[3px]",
      "disabled:opacity-50 disabled:cursor-not-allowed",
    ].join(" ");

    const stateStyles = error
      ? "border-error bg-error-bg focus:border-error focus:ring-error/10"
      : "border-border focus:border-brand-green focus:ring-brand-green/10";

    return (
      <textarea
        ref={ref}
        className={`${base} ${stateStyles} ${className}`}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";
