# AI Agent Rules

## Project Name

WasteLink

---

# General Rules

1. Selalu mengikuti seluruh file di folder docs.
2. Jangan membuat fitur di luar requirement.
3. Jangan membuat fitur transaksi.
4. Jangan membuat fitur booking penjemputan.
5. Jangan membuat fitur review.
6. Jangan membuat fitur chat internal.

---

# Technology Rules

Gunakan:

* Next.js 16 App Router
* TypeScript
* Tailwind CSS
* Supabase
* PostgreSQL

Jangan gunakan:

* Redux
* Express.js
* Firebase
* Bootstrap

---

# Architecture Rules

Gunakan struktur:

src/

app/
components/
lib/
types/
actions/

Pisahkan:

* UI Components
* Data Layer
* Business Logic

---

# UI Rules

Ikuti design.md.

Gunakan:

* Green Theme
* Clean Layout
* Mobile First
* Responsive Design

---

# Data Rules

Kategori:

* Dinamis
* Dikelola admin

Pengepul:

* Dinamis
* Dikelola admin

Jangan hardcode data.

Semua data harus berasal dari Supabase.

---

# User Pages

Wajib dibuat:

* Home
* Category Detail
* Collector Detail
* About

---

# Admin Pages

Wajib dibuat:

* Login
* Dashboard
* Category Management
* Collector Management

---

# Image Rules

Gunakan Supabase Storage.

Kategori:

* 1 gambar

Pengepul:

* 1 gambar

---

# Performance Rules

* Gunakan Server Components jika memungkinkan.
* Minimalkan Client Components.
* Gunakan Next Image.
* Gunakan Dynamic Routes.

---

# Coding Standards

* Gunakan TypeScript strict mode.
* Gunakan reusable components.
* Gunakan clean folder structure.
* Gunakan descriptive naming.

---

# Success Criteria

Aplikasi dianggap selesai jika:

1. User dapat melihat kategori.
2. User dapat membaca edukasi limbah.
3. User dapat melihat pengepul.
4. User dapat menghubungi pengepul.
5. Admin dapat login.
6. Admin dapat CRUD kategori.
7. Admin dapat CRUD pengepul.
8. Admin dapat upload gambar.
9. Admin dapat mengubah status pengepul.
10. Seluruh data berasal dari Supabase.
