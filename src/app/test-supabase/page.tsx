import { createClient } from "@/lib/supabase/server";

// Memastikan route ini dirender secara dinamis di server
export const dynamic = "force-dynamic";

export default async function TestSupabasePage() {
  const supabase = await createClient();
  
  // Mengambil data dari tabel categories (hanya id dan name)
  const { data: categories, error } = await supabase
    .from("categories")
    .select("id, name")
    .limit(10);

  return (
    <div style={{ padding: "40px", fontFamily: "var(--font-body)", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "20px" }}>
        Verifikasi Koneksi Supabase
      </h1>
      
      {error ? (
        <div style={{ backgroundColor: "var(--color-error-bg)", border: "1px solid var(--color-error)", padding: "16px", borderRadius: "var(--radius-md)" }}>
          <h2 style={{ fontWeight: 700, color: "var(--color-error)", marginBottom: "8px" }}>
            ❌ Query Gagal
          </h2>
          <p style={{ color: "var(--color-text-primary)", marginBottom: "12px" }}>
            Pastikan environment variables sudah diisi dengan benar di `.env.local` dan tabel `categories` sudah dibuat di Supabase.
          </p>
          <div style={{ backgroundColor: "#ffffff", padding: "12px", borderRadius: "var(--radius-sm)", border: "1px solid var(--color-border)", overflowX: "auto" }}>
            <p style={{ fontWeight: 700, fontSize: "14px", color: "var(--color-error)" }}>Error Message:</p>
            <code style={{ fontSize: "14px" }}>{error.message}</code>
            
            <p style={{ fontWeight: 700, fontSize: "14px", color: "var(--color-text-secondary)", marginTop: "12px" }}>Error Details:</p>
            <pre style={{ fontSize: "12px", margin: 0, color: "var(--color-text-secondary)" }}>
              {JSON.stringify(error, null, 2)}
            </pre>
          </div>
        </div>
      ) : (
        <div style={{ backgroundColor: "var(--color-icon-bg)", border: "1px solid var(--color-brand-green)", padding: "16px", borderRadius: "var(--radius-md)" }}>
          <h2 style={{ fontWeight: 700, color: "var(--color-brand-green)", marginBottom: "8px" }}>
            ✅ Koneksi Berhasil
          </h2>
          <p style={{ color: "var(--color-text-primary)", marginBottom: "16px" }}>
            Berhasil terhubung ke Supabase dan mengakses tabel `categories`.
          </p>
          
          <div style={{ backgroundColor: "#ffffff", padding: "16px", borderRadius: "var(--radius-sm)", border: "1px solid var(--color-border)" }}>
            <h3 style={{ fontWeight: 700, fontSize: "16px", marginBottom: "12px" }}>Data Kategori:</h3>
            {categories && categories.length > 0 ? (
              <ul style={{ listStyleType: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
                {categories.map((cat: any) => (
                  <li key={cat.id} style={{ padding: "8px 12px", backgroundColor: "#f8f9fa", borderRadius: "var(--radius-sm)", border: "1px solid var(--color-divider)" }}>
                    <strong>ID:</strong> {cat.id} <span style={{ color: "var(--color-text-secondary)", marginInline: "8px" }}>|</span> <strong>Nama:</strong> {cat.name}
                  </li>
                ))}
              </ul>
            ) : (
              <p style={{ color: "var(--color-text-secondary)", fontStyle: "italic", margin: 0 }}>
                Tabel 'categories' kosong. Belum ada data yang ditambahkan.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
