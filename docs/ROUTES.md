# Struktur Routing Next.js (App Router)

Aplikasi akan menggunakan fitur terbaru dari Next.js App Router (`app/` directory). Kita memisahkan rute menjadi dua grup: publik dan admin. Struktur ini telah disesuaikan dengan User Flow (Eksplorasi -> Detail) dan Admin Flow (Dashboard -> List -> Create/Edit).

## Struktur Direktori

```text
app/
├── (public)/                 # Route Group untuk halaman publik
│   ├── layout.tsx            # Layout publik (Header dengan Navigasi, Footer)
│   ├── page.tsx              # Landing Page (Hero, Stats, Cara Kerja)
│   ├── about/
│   │   └── page.tsx          # Halaman Tentang Kami (About)
│   ├── categories/
│   │   ├── page.tsx          # Daftar kategori sampah/daur ulang
│   │   └── [id]/
│   │       └── page.tsx      # Detail kategori
│   └── collectors/
│       ├── page.tsx          # Daftar pengepul
│       └── [id]/
│           └── page.tsx      # Detail pengepul
│
├── (admin)/                  # Route Group untuk halaman admin
│   ├── layout.tsx            # Layout admin (Sidebar, Topbar)
│   ├── login/
│   │   └── page.tsx          # Halaman login admin
│   └── dashboard/
│       ├── page.tsx          # Ringkasan data (Total Kategori, Pengepul)
│       ├── categories/
│       │   ├── page.tsx      # Tabel daftar kategori
│       │   ├── create/
│       │   │   └── page.tsx  # Form tambah kategori
│       │   └── [id]/
│       │       └── edit/
│       │           └── page.tsx # Form edit kategori
│       └── collectors/
│           ├── page.tsx      # Tabel daftar pengepul
│           ├── create/
│           │   └── page.tsx  # Form tambah pengepul
│           └── [id]/
│               └── edit/
│                   └── page.tsx # Form edit pengepul
│
├── api/                      # Route Handlers
│   └── auth/
│       └── callback/route.ts # Supabase Auth callback
│
├── layout.tsx                # Root layout (Provider, Font Red Hat)
└── global.css                # Global styles & token dari DESIGN.md
```

## Penjelasan Rute
*   **User Flow**: *User* masuk ke `/(public)/page.tsx`, bisa melihat halaman Tentang Kami di `/about`, lalu mengeksplorasi daftar kategori (`/categories`) dan detailnya (`/categories/[id]`), atau daftar pengepul (`/collectors`) dan detailnya (`/collectors/[id]`).
*   **Admin Flow**: Admin login di `/login`, diarahkan ke `/dashboard`, dan dapat mengelola Kategori dan Pengepul dengan fitur lengkap (List, Create, Edit).
