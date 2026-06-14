# Urutan Implementasi Paling Efisien

Untuk memastikan progres yang stabil dan menghindari *blocker*, berikut adalah fase implementasi yang direkomendasikan. Konfigurasi ini disesuaikan untuk *rapid development* awal.

## Phase 1: Inisialisasi & Fondasi (Setup)
1.  Inisialisasi project Next.js App Router.
2.  Konfigurasi *Design System* global (Warna, Tipografi *Red Hat*, *Spacing*) di CSS/Tailwind sesuai `DESIGN.md`.
3.  Pembuatan komponen UI dasar (`Button`, `Input`, `Card`, `Badge`) agar siap dirangkai.
4.  Setup Supabase (Pembuatan Project dan Setup skema tabel awal untuk Kategori dan Pengepul).
5.  *Note*: **Jangan** mengaktifkan RLS (Row Level Security) pada database di fase ini.

## Phase 2: Autentikasi & Infrastruktur Backend
1.  Setup utilitas `@supabase/ssr` di dalam Next.js.
2.  Pembuatan halaman Login Admin.
3.  Implementasi Next.js Middleware untuk memproteksi rute `/(admin)/*`.

## Phase 3: Fitur Admin (CMS)
1.  Implementasi Layout Admin (Sidebar, Topbar).
2.  **Kategori**:
    *   Membuat halaman CRUD kategori (Tabel Daftar, Form Tambah, dan Form Edit di rute `[id]/edit`).
    *   Gunakan input teks sederhana untuk `image_url`.
3.  **Pengepul**:
    *   Membuat halaman CRUD pengepul (Tabel Daftar, Form Tambah, dan Form Edit di rute `[id]/edit`).
    *   Gunakan input teks sederhana untuk `image_url`.

## Phase 4: Fitur Publik (User-Facing)
1.  Implementasi Layout Publik (Header, Footer).
2.  Membuat halaman Landing Page dengan `HeroSection` dan `StatsContainer`.
3.  Membuat halaman About (Tentang Kami).
4.  Membuat halaman Daftar Kategori dan halaman Detail Kategori (`categories/[id]`).
5.  Membuat halaman Daftar Pengepul dan halaman Detail Pengepul (`collectors/[id]`).
6.  *Note*: Semua gambar akan di-*render* berdasarkan *string* URL yang ada di database.

## Phase 5: Peningkatan & Pengembangan Lanjutan (Opsional / Fase Berikutnya)
1.  Integrasi Supabase Storage untuk memfasilitasi unggahan file/gambar sesungguhnya, menggantikan input teks `image_url`.
2.  Mengaktifkan dan mengonfigurasi Row Level Security (RLS) di PostgreSQL Supabase sebelum rilis produksi.
3.  Pemeriksaan UI/UX secara menyeluruh dan *Deployment* ke Vercel.
