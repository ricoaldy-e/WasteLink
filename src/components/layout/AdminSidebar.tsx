"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
      </svg>
    ),
  },
  {
    href: "/dashboard/categories",
    label: "Kategori",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 6h16M4 12h16M4 18h7" />
      </svg>
    ),
  },
  {
    href: "/dashboard/collectors",
    label: "Pengepul",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside
      style={{
        width: "240px",
        minHeight: "100vh",
        backgroundColor: "var(--color-text-primary)",
        borderRight: "1px solid rgba(255,255,255,0.08)",
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
      }}
    >
      {/* Logo Area */}
      <div
        style={{
          height: "64px",
          display: "flex",
          alignItems: "center",
          padding: "0 24px",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <Link
          href="/dashboard"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "20px",
            fontWeight: 700,
            color: "var(--color-brand-green)",
            textDecoration: "none",
          }}
        >
          WasteLink
        </Link>
        <span
          style={{
            marginLeft: "8px",
            fontSize: "10px",
            fontWeight: 700,
            color: "rgba(255,255,255,0.4)",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
          }}
        >
          Admin
        </span>
      </div>

      {/* Navigation */}
      <nav
        style={{ flex: 1, padding: "16px 12px", display: "flex", flexDirection: "column", gap: "4px" }}
        aria-label="Navigasi Admin"
      >
        {NAV_ITEMS.map(({ href, label, icon }) => {
          const isActive =
            href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(href);

          return (
            <Link
              key={href}
              href={href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "10px 12px",
                borderRadius: "var(--radius-md)",
                textDecoration: "none",
                fontSize: "14px",
                fontWeight: isActive ? 700 : 500,
                color: isActive ? "#ffffff" : "rgba(255,255,255,0.6)",
                backgroundColor: isActive
                  ? "rgba(41, 158, 99, 0.2)"
                  : "transparent",
                borderLeft: isActive
                  ? "3px solid var(--color-brand-green)"
                  : "3px solid transparent",
                transition: "background-color 0.15s ease, color 0.15s ease",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.06)";
                  e.currentTarget.style.color = "#ffffff";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "rgba(255,255,255,0.6)";
                }
              }}
            >
              <span style={{ color: isActive ? "var(--color-brand-green)" : "inherit", display: "flex" }}>
                {icon}
              </span>
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom: Back to site */}
      <div style={{ padding: "16px 12px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "13px",
            fontWeight: 400,
            color: "rgba(255,255,255,0.4)",
            textDecoration: "none",
            padding: "8px 12px",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.8)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Kembali ke Website
        </Link>
      </div>
    </aside>
  );
}
