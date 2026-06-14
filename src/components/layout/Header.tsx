"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Container from "./Container";

const NAV_LINKS = [
  { href: "/", label: "Beranda" },
  { href: "/categories", label: "Kategori" },
  { href: "/collectors", label: "Pengepul" },
  { href: "/about", label: "Tentang Kami" },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      style={{
        backgroundColor: "var(--color-background)",
        borderBottom: "1px solid var(--color-border)",
        height: "64px",
        boxShadow: "var(--shadow-raised)",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <Container
        style={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingBlock: "12px",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "24px",
            fontWeight: 700,
            color: "var(--color-brand-green)",
            textDecoration: "none",
          }}
        >
          WasteLink
        </Link>

        {/* Desktop Nav */}
        <nav
          style={{ display: "flex", gap: "4px", alignItems: "center" }}
          aria-label="Navigasi Utama"
          className="hidden-mobile"
        >
          {NAV_LINKS.map(({ href, label }) => {
            const isActive =
              href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "16px",
                  fontWeight: 400,
                  color: isActive
                    ? "var(--color-brand-green)"
                    : "var(--color-text-primary)",
                  textDecoration: "none",
                  padding: "8px 16px",
                  borderRadius: "var(--radius-sm)",
                  borderBottom: isActive
                    ? "2px solid var(--color-brand-green)"
                    : "2px solid transparent",
                  transition: "color 0.15s ease, background-color 0.15s ease",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = "var(--color-brand-green)";
                    e.currentTarget.style.backgroundColor =
                      "var(--color-hover-bg)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = "var(--color-text-primary)";
                    e.currentTarget.style.backgroundColor = "transparent";
                  }
                }}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Hamburger */}
        <button
          id="mobile-menu-toggle"
          aria-label="Buka menu navigasi"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          style={{
            display: "none",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "8px",
            color: "var(--color-text-primary)",
          }}
          className="show-mobile"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {menuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </Container>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div
          id="mobile-menu"
          style={{
            position: "absolute",
            top: "64px",
            left: 0,
            right: 0,
            backgroundColor: "var(--color-background)",
            borderBottom: "1px solid var(--color-border)",
            boxShadow: "var(--shadow-floating)",
            zIndex: 99,
            padding: "16px 24px",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
          }}
          className="show-mobile"
        >
          {NAV_LINKS.map(({ href, label }) => {
            const isActive =
              href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                style={{
                  color: isActive
                    ? "var(--color-brand-green)"
                    : "var(--color-text-primary)",
                  fontWeight: isActive ? 700 : 400,
                  padding: "12px 16px",
                  borderRadius: "var(--radius-md)",
                  textDecoration: "none",
                  backgroundColor: isActive
                    ? "var(--color-hover-bg)"
                    : "transparent",
                }}
              >
                {label}
              </Link>
            );
          })}
        </div>
      )}

      <style>{`
        @media (max-width: 767px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 768px) {
          .show-mobile { display: none !important; }
          .hidden-mobile { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
