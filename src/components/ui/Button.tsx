"use client";

import { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
}

const baseStyles: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: "var(--font-body)",
  fontSize: "16px",
  fontWeight: 700,
  lineHeight: "19px",
  borderRadius: "var(--radius-md)",
  border: "none",
  cursor: "pointer",
  transition: "background-color 0.15s ease, color 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease",
  textDecoration: "none",
  whiteSpace: "nowrap",
};

const variantStyles: Record<ButtonVariant, React.CSSProperties> = {
  primary: {
    backgroundColor: "var(--color-brand-green)",
    color: "#ffffff",
    border: "none",
    height: "44px",
    padding: "12px 24px",
  },
  secondary: {
    backgroundColor: "transparent",
    color: "var(--color-brand-green)",
    border: "1px solid var(--color-brand-green)",
    height: "44px",
    padding: "12px 24px",
  },
  ghost: {
    backgroundColor: "transparent",
    color: "var(--color-brand-green)",
    border: "none",
    borderRadius: "0px",
    height: "auto",
    padding: "8px 12px",
    fontWeight: 400,
  },
};

const sizeOverrides: Record<ButtonSize, React.CSSProperties> = {
  sm: { fontSize: "14px", padding: "8px 16px", height: "36px" },
  md: {},
  lg: { padding: "16px 32px", height: "52px" },
};

export default function Button({
  variant = "primary",
  size = "md",
  isLoading = false,
  disabled,
  children,
  style,
  onMouseEnter,
  onMouseLeave,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || isLoading;

  const computedStyle: React.CSSProperties = {
    ...baseStyles,
    ...variantStyles[variant],
    ...sizeOverrides[size],
    ...(isDisabled
      ? variant === "primary"
        ? { backgroundColor: "var(--color-disabled-green)", cursor: "not-allowed" }
        : variant === "secondary"
        ? { borderColor: "#D4E4DB", color: "#B0D4B8", cursor: "not-allowed" }
        : { color: "#B0D4B8", cursor: "not-allowed" }
      : {}),
    ...style,
  };

  return (
    <button
      disabled={isDisabled}
      style={computedStyle}
      onMouseEnter={(e) => {
        if (!isDisabled) {
          const el = e.currentTarget;
          if (variant === "primary") el.style.backgroundColor = "var(--color-hover-green)";
          if (variant === "secondary") {
            el.style.backgroundColor = "var(--color-hover-bg)";
            el.style.borderColor = "var(--color-hover-green)";
          }
          if (variant === "ghost") {
            el.style.color = "var(--color-hover-green)";
            el.style.textDecoration = "underline";
          }
        }
        onMouseEnter?.(e);
      }}
      onMouseLeave={(e) => {
        if (!isDisabled) {
          const el = e.currentTarget;
          if (variant === "primary") el.style.backgroundColor = "var(--color-brand-green)";
          if (variant === "secondary") {
            el.style.backgroundColor = "transparent";
            el.style.borderColor = "var(--color-brand-green)";
          }
          if (variant === "ghost") {
            el.style.color = "var(--color-brand-green)";
            el.style.textDecoration = "none";
          }
        }
        onMouseLeave?.(e);
      }}
      {...props}
    >
      {isLoading ? "Memuat..." : children}
    </button>
  );
}
