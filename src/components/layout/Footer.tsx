"use client";

import Link from "next/link";
import Container from "./Container";

const FOOTER_LINKS = [
  { href: "/categories", label: "Kategori" },
  { href: "/collectors", label: "Pengepul" },
  { href: "/about", label: "Tentang Kami" },
];

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "var(--color-text-primary)",
        color: "#ffffff",
        marginTop: "auto",
      }}
    >
      <Container
        style={{
          paddingBlock: "48px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "32px",
        }}
      >
        {/* Brand Column */}
        <div>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "24px",
              fontWeight: 700,
              color: "var(--color-brand-green)",
              marginBottom: "12px",
            }}
          >
            WasteLink
          </p>
          <p
            style={{
              fontSize: "14px",
              fontWeight: 500,
              lineHeight: "21px",
              color: "rgba(255,255,255,0.7)",
              maxWidth: "280px",
            }}
          >
            Menghubungkan masyarakat dengan pengepul sampah dan daur ulang
            terpercaya di seluruh Indonesia.
          </p>
        </div>

        {/* Navigation Column */}
        <div>
          <p
            style={{
              fontSize: "14px",
              fontWeight: 700,
              color: "#ffffff",
              marginBottom: "16px",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            Navigasi
          </p>
          <nav
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            {FOOTER_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                style={{
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "rgba(255,255,255,0.7)",
                  textDecoration: "none",
                  transition: "color 0.15s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--color-brand-green)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(255,255,255,0.7)")
                }
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </Container>

      {/* Bottom Bar */}
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <Container
          style={{
            paddingBlock: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p
            style={{
              fontSize: "12px",
              fontWeight: 400,
              color: "rgba(255,255,255,0.5)",
            }}
          >
            © {new Date().getFullYear()} WasteLink. Hak cipta dilindungi.
          </p>
        </Container>
      </div>
    </footer>
  );
}
