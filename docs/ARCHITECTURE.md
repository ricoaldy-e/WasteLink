# WasteLink Architecture

## 1. Overview
WasteLink adalah platform berbasis web yang menghubungkan masyarakat dengan pengepul sampah/daur ulang, terinspirasi oleh platform seperti MallSampah. Sistem ini dibangun dengan arsitektur modern yang memisahkan antara public-facing website dan admin dashboard, dikelola secara terpusat.

## 2. Tech Stack
*   **Framework Utama**: Next.js dengan App Router (React 18+)
*   **Styling**: CSS murni (mengikuti `DESIGN.md`) atau Tailwind CSS yang dikonfigurasi ketat sesuai *Design System* (Warna Hijau Utama `#299E63`, Font *Red Hat Display/Text*).
*   **BaaS (Backend as a Service)**: Supabase
    *   **Database**: PostgreSQL
    *   **Authentication**: Supabase Auth (khusus Admin)
    *   **Storage**: Opsional (untuk fase selanjutnya)
*   **Deployment**: Vercel

## 3. Strategi Integrasi Supabase
1.  **Supabase Client**: Menggunakan `@supabase/ssr` untuk kompatibilitas penuh dengan Next.js App Router (Server Components, Client Components, Server Actions, Route Handlers).
2.  **Database**: Interaksi database utama dilakukan melalui Server Components untuk *read operations* (SEO friendly) dan Server Actions untuk *write/mutate operations*.
3.  **Row Level Security (RLS)**: **TIDAK DIAKTIFKAN** pada fase awal pengembangan (Initial Development) untuk mempermudah dan mempercepat proses *development*. Akses data ditangani sepenuhnya melalui *logic* di sisi *Server Actions* / API.

## 4. Strategi Autentikasi Admin
1.  **Supabase Auth**: Menggunakan fitur Email/Password dari Supabase Auth.
2.  **Middleware**: Next.js Middleware (`middleware.ts`) digunakan untuk memproteksi *route* `/(admin)/*`. Jika *session* tidak valid, *user* akan di-*redirect* ke rute login admin.

## 5. Strategi Upload Gambar
1.  **Implementasi Awal (Current)**:
    *   Menggunakan *direct URL link* (`image_url`) berupa *string* teks biasa.
    *   Admin dapat memasukkan URL gambar yang di-*host* di tempat lain atau URL aset statis sementara.
2.  **Implementasi Lanjutan (Optional)**:
    *   Integrasi dengan Supabase Storage.
    *   File akan diunggah melalui komponen uploader dan URL publik gambar akan disimpan ke database.
