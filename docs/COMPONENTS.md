# Struktur Komponen

Struktur komponen dirancang agar *reusable*, modular, dan mengikuti aturan *Design System* WasteLink (tercantum di `DESIGN.md`).

## Struktur Folder `components/`

```text
components/
├── ui/                 # Komponen dasar (Atomic) yang mengikuti DESIGN.md
│   ├── Button.tsx      # Primary, Secondary (Outline), Ghost
│   ├── Card.tsx        # Default Card, Card with Icon
│   ├── Input.tsx       # Text Input dengan Focus/Error states
│   ├── Label.tsx       # Form Label
│   ├── Badge.tsx       # Success Badge, Neutral Badge
│   └── Select.tsx      # Dropdown Select
│
├── layout/             # Komponen struktural halaman
│   ├── Header.tsx      # Navigasi publik
│   ├── Footer.tsx      # Footer publik
│   ├── AdminSidebar.tsx# Sidebar dashboard admin
│   └── Section.tsx     # Wrapper dengan spacing (padding 48px-80px)
│
├── features/           # Komponen kompleks gabungan dari UI components
│   ├── public/
│   │   ├── HeroSection.tsx
│   │   ├── StatsContainer.tsx
│   │   ├── CategoryCard.tsx
│   │   └── CollectorCard.tsx
│   └── admin/
│       ├── CategoryForm.tsx   # Form untuk input nama, deskripsi, gambar
│       ├── CollectorForm.tsx  # Form input detail pengepul & gambar
│       └── ImageUploader.tsx  # Komponen khusus untuk interaksi file upload
│
└── providers/          # Context Providers
    └── SupabaseProvider.tsx   # Pembungkus client Supabase (jika diperlukan)
```

## Prinsip Implementasi Komponen
1.  **Server vs Client Components**: Secara default semua komponen adalah *Server Components*. Gunakan `"use client"` hanya pada komponen interaktif (`Button`, `Input`, `ImageUploader`, `CategoryForm`, `CollectorForm`).
2.  **Styling**: Semua varian komponen (misal: `Button` tipe *primary* / *secondary*) diatur menggunakan *props* dan menerapkan CSS yang mematuhi pedoman `#299E63` dan tipografi *Red Hat*. Komponen harus memiliki status *hover*, *active*, dan *disabled* yang jelas sesuai spesifikasi.
3.  **Aksesibilitas**: Pastikan komponen input memiliki label yang tepat, dan elemen interaktif merespon navigasi keyboard (focus ring).
