"use client";

import { HTMLAttributes, ReactNode } from "react";

type CardVariant = "default" | "icon";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  icon?: ReactNode;
  hover?: boolean;
}

export default function Card({
  variant = "default",
  icon,
  hover = true,
  children,
  style,
  ...props
}: CardProps) {
  const base: React.CSSProperties = {
    backgroundColor: "var(--color-card-bg)",
    border: "1px solid var(--color-border)",
    borderRadius: "var(--radius-lg)",
    boxShadow: "var(--shadow-raised)",
    transition: "box-shadow 0.2s ease",
    ...(variant === "default"
      ? { padding: "24px" }
      : {
          padding: "20px",
          display: "flex",
          gap: "16px",
          alignItems: "flex-start",
        }),
    ...style,
  };

  return (
    <div
      style={base}
      onMouseEnter={(e) => {
        if (hover) e.currentTarget.style.boxShadow = "var(--shadow-elevated)";
      }}
      onMouseLeave={(e) => {
        if (hover) e.currentTarget.style.boxShadow = "var(--shadow-raised)";
      }}
      {...props}
    >
      {variant === "icon" && icon && (
        <div
          style={{
            width: "48px",
            height: "48px",
            flexShrink: 0,
            backgroundColor: "var(--color-icon-bg)",
            borderRadius: "var(--radius-md)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--color-brand-green)",
          }}
        >
          {icon}
        </div>
      )}
      <div style={{ flex: 1 }}>{children}</div>
    </div>
  );
}
