import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import CategoryCard from "@/components/features/public/CategoryCard";

export const metadata: Metadata = {
  title: "WasteLink — Temukan Pengepul Sampah di Sekitar Anda",
  description:
    "WasteLink adalah direktori pengepul sampah dan daur ulang yang menghubungkan masyarakat dengan pengepul terpercaya berdasarkan jenis limbah yang dimiliki.",
};

// Define the type based on what we select from DB
interface Category {
  id: string;
  name: string;
  description: string | null;
  image_url: string | null;
}

export default async function HomePage() {
  const supabase = await createClient();

  // Fetch categories — max 8 for homepage preview
  const { data: categories, error } = await supabase
    .from("categories")
    .select("id, name, description, image_url")
    .order("name", { ascending: true })
    .limit(8);

  return (
    <>
      {/* ================================================================
          HERO SECTION
          Per DESIGN.md: gradient #299E63 → #1F7A4A, min-height 500px,
          padding 80px 64px. Per UI_PRINCIPLES: no generic AI hero,
          no fake stats, no excessive decoration.
      ================================================================ */}
      <section
        aria-labelledby="hero-heading"
        style={{
          background: "linear-gradient(to right, #299E63, #1F7A4A)",
          minHeight: "500px",
          display: "flex",
          alignItems: "center",
          padding: "80px 0",
        }}
      >
        <Container>
          <div style={{ maxWidth: "680px" }}>
            {/* Label chip */}
            <span
              style={{
                display: "inline-block",
                backgroundColor: "rgba(255,255,255,0.15)",
                color: "#ffffff",
                fontSize: "13px",
                fontWeight: 600,
                padding: "4px 12px",
                borderRadius: "var(--radius-sm)",
                marginBottom: "24px",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}
            >
              Direktori Pengepul Sampah
            </span>

            <h1
              id="hero-heading"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(36px, 5vw, 56px)",
                fontWeight: 700,
                lineHeight: 1.2,
                color: "#ffffff",
                margin: 0,
                marginBottom: "20px",
              }}
            >
              Temukan Pengepul Sampah
              <br />
              yang Tepat untuk Anda
            </h1>

            <p
              style={{
                fontSize: "18px",
                fontWeight: 500,
                lineHeight: "28px",
                color: "rgba(255,255,255,0.88)",
                margin: 0,
                marginBottom: "36px",
                maxWidth: "540px",
              }}
            >
              WasteLink membantu Anda menemukan pengepul limbah berdasarkan
              jenis sampah yang dimiliki. Mudah, cepat, dan terpercaya.
            </p>

            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <Link href="/categories" style={{ textDecoration: "none" }}>
                <Button
                  variant="primary"
                  size="lg"
                  style={{
                    backgroundColor: "#ffffff",
                    color: "var(--color-brand-green)",
                  }}
                >
                  Lihat Kategori
                </Button>
              </Link>
              <Link href="/collectors" style={{ textDecoration: "none" }}>
                <Button
                  variant="secondary"
                  size="lg"
                  style={{
                    borderColor: "rgba(255,255,255,0.7)",
                    color: "#ffffff",
                  }}
                >
                  Cari Pengepul
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* ================================================================
          ABOUT SECTION — "Apa itu WasteLink?"
          Clean, informative, no buzzwords (UI_PRINCIPLES)
      ================================================================ */}
      <section
        aria-labelledby="about-heading"
        style={{ paddingBlock: "80px", backgroundColor: "#ffffff" }}
      >
        <Container>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "48px",
              alignItems: "start",
            }}
          >
            {/* Left: heading + description */}
            <div>
              <p
                style={{
                  fontSize: "13px",
                  fontWeight: 700,
                  color: "var(--color-brand-green)",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginBottom: "12px",
                }}
              >
                Tentang WasteLink
              </p>
              <h2
                id="about-heading"
                style={{
                  fontSize: "32px",
                  fontWeight: 700,
                  lineHeight: "40px",
                  color: "var(--color-text-primary)",
                  marginBottom: "20px",
                }}
              >
                Jembatan antara Masyarakat dan Pengepul Limbah
              </h2>
              <p
                style={{
                  fontSize: "16px",
                  fontWeight: 500,
                  lineHeight: "24px",
                  color: "var(--color-text-secondary)",
                  marginBottom: "16px",
                }}
              >
                Banyak sampah yang masih memiliki nilai ekonomi — mulai dari
                kertas, plastik, logam, hingga elektronik bekas — berakhir di
                tempat pembuangan akhir karena masyarakat tidak tahu harus
                membawa ke mana.
              </p>
              <p
                style={{
                  fontSize: "16px",
                  fontWeight: 500,
                  lineHeight: "24px",
                  color: "var(--color-text-secondary)",
                }}
              >
                WasteLink hadir sebagai direktori informasi yang memudahkan
                Anda menemukan pengepul limbah yang sesuai berdasarkan jenis
                sampah yang dimiliki.
              </p>
            </div>

            {/* Right: feature list */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              {[
                {
                  title: "Direktori Terorganisir",
                  desc: "Pengepul dikelompokkan berdasarkan jenis limbah yang mereka terima.",
                },
                {
                  title: "Informasi Lengkap",
                  desc: "Temukan alamat, kontak, dan jenis sampah yang diterima setiap pengepul.",
                },
                {
                  title: "Selalu Diperbarui",
                  desc: "Data pengepul dikelola dan diverifikasi secara berkala oleh tim WasteLink.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}
                >
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      flexShrink: 0,
                      backgroundColor: "var(--color-icon-bg)",
                      borderRadius: "var(--radius-md)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M13.5 4.5L6.5 11.5L2.5 7.5"
                        stroke="var(--color-brand-green)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <p
                      style={{
                        fontWeight: 700,
                        fontSize: "16px",
                        color: "var(--color-text-primary)",
                        marginBottom: "4px",
                      }}
                    >
                      {item.title}
                    </p>
                    <p
                      style={{
                        fontSize: "14px",
                        fontWeight: 500,
                        lineHeight: "21px",
                        color: "var(--color-text-secondary)",
                        margin: 0,
                      }}
                    >
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ================================================================
          CATEGORIES SECTION
          Real data from Supabase. No fake cards. Shows error state clearly.
      ================================================================ */}
      <section
        aria-labelledby="categories-heading"
        style={{ paddingBlock: "80px", backgroundColor: "#F8F9FA" }}
      >
        <Container>
          {/* Section header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginBottom: "40px",
              gap: "16px",
              flexWrap: "wrap",
            }}
          >
            <div>
              <p
                style={{
                  fontSize: "13px",
                  fontWeight: 700,
                  color: "var(--color-brand-green)",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginBottom: "8px",
                }}
              >
                Jenis Limbah
              </p>
              <h2
                id="categories-heading"
                style={{
                  fontSize: "32px",
                  fontWeight: 700,
                  lineHeight: "40px",
                  color: "var(--color-text-primary)",
                  margin: 0,
                }}
              >
                Kategori Sampah
              </h2>
            </div>
            <Link
              href="/categories"
              style={{
                fontSize: "16px",
                fontWeight: 700,
                color: "var(--color-brand-green)",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                flexShrink: 0,
              }}
            >
              Lihat Semua
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M3 8h10M8.5 3.5L13 8l-4.5 4.5"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>

          {/* Error state */}
          {error && (
            <div
              role="alert"
              style={{
                backgroundColor: "var(--color-error-bg)",
                border: "1px solid var(--color-error)",
                borderRadius: "var(--radius-md)",
                padding: "20px 24px",
              }}
            >
              <p
                style={{
                  fontWeight: 700,
                  color: "var(--color-error)",
                  marginBottom: "4px",
                }}
              >
                Gagal memuat kategori
              </p>
              <p
                style={{
                  fontSize: "14px",
                  color: "var(--color-text-secondary)",
                  margin: 0,
                }}
              >
                {error.message}
              </p>
            </div>
          )}

          {/* Empty state */}
          {!error && (!categories || categories.length === 0) && (
            <div
              style={{
                textAlign: "center",
                padding: "60px 24px",
                border: "1px dashed var(--color-border)",
                borderRadius: "var(--radius-lg)",
                color: "var(--color-text-secondary)",
              }}
            >
              <p style={{ fontSize: "16px", fontWeight: 500, margin: 0 }}>
                Belum ada kategori yang tersedia saat ini.
              </p>
            </div>
          )}

          {/* Categories grid — real data from Supabase */}
          {!error && categories && categories.length > 0 && (
            <>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                  gap: "24px",
                }}
              >
                {categories.map((cat: Category) => (
                  <CategoryCard
                    key={cat.id}
                    id={cat.id}
                    name={cat.name}
                    description={cat.description}
                    imageUrl={cat.image_url}
                  />
                ))}
              </div>

              {/* CTA — only show if there's data */}
              <div
                style={{
                  marginTop: "48px",
                  textAlign: "center",
                  paddingTop: "48px",
                  borderTop: "1px solid var(--color-border)",
                }}
              >
                <p
                  style={{
                    fontSize: "18px",
                    fontWeight: 500,
                    color: "var(--color-text-secondary)",
                    marginBottom: "20px",
                  }}
                >
                  Tidak menemukan kategori yang sesuai?
                </p>
                <Link href="/categories" style={{ textDecoration: "none" }}>
                  <Button variant="primary">
                    Jelajahi Semua Kategori
                  </Button>
                </Link>
              </div>
            </>
          )}
        </Container>
      </section>
    </>
  );
}
