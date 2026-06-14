"use client";

import Link from "next/link";

interface CategoryCardProps {
  id: string | number;
  name: string;
  description?: string | null;
  imageUrl?: string | null;
}

export default function CategoryCard({ id, name, description, imageUrl }: CategoryCardProps) {
  return (
    <Link
      href={`/categories/${id}`}
      style={{ textDecoration: "none", display: "block" }}
      onMouseEnter={(e) => {
        const card = e.currentTarget.querySelector<HTMLDivElement>("[data-card]");
        if (card) card.style.boxShadow = "var(--shadow-elevated)";
        const title = e.currentTarget.querySelector<HTMLParagraphElement>("[data-title]");
        if (title) title.style.color = "var(--color-brand-green)";
      }}
      onMouseLeave={(e) => {
        const card = e.currentTarget.querySelector<HTMLDivElement>("[data-card]");
        if (card) card.style.boxShadow = "var(--shadow-raised)";
        const title = e.currentTarget.querySelector<HTMLParagraphElement>("[data-title]");
        if (title) title.style.color = "var(--color-text-primary)";
      }}
    >
      <div
        data-card
        style={{
          backgroundColor: "var(--color-card-bg)",
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-lg)",
          boxShadow: "var(--shadow-raised)",
          overflow: "hidden",
          transition: "box-shadow 0.2s ease",
        }}
      >
        {/* Image area */}
        <div
          style={{
            height: "120px",
            backgroundColor: "var(--color-icon-bg)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          {imageUrl ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={imageUrl}
              alt={name}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--color-brand-green)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M3 6h18M3 12h18M3 18h7" />
            </svg>
          )}
        </div>

        {/* Content area */}
        <div style={{ padding: "16px" }}>
          <p
            data-title
            style={{
              fontSize: "16px",
              fontWeight: 700,
              color: "var(--color-text-primary)",
              margin: 0,
              transition: "color 0.15s ease",
            }}
          >
            {name}
          </p>
          {description && (
            <p
              style={{
                fontSize: "14px",
                fontWeight: 500,
                color: "var(--color-text-secondary)",
                marginTop: "6px",
                marginBottom: 0,
                lineHeight: "21px",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {description}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
