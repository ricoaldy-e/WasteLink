# WasteLink

## Deskripsi Proyek

WasteLink adalah platform berbasis web yang bertujuan membantu masyarakat menemukan pengepul sampah berdasarkan jenis limbah yang dimiliki.

Website ini juga menyediakan edukasi mengenai berbagai kategori limbah agar masyarakat dapat memahami cara pengelolaan limbah yang tepat dan meningkatkan kesadaran terhadap pentingnya daur ulang.

Sistem ini berfungsi sebagai penghubung antara masyarakat dan pengepul limbah tanpa melibatkan transaksi online ataupun sistem penjemputan.

---

# Tujuan

1. Membantu masyarakat menemukan pengepul limbah dengan mudah.
2. Menyediakan informasi edukatif mengenai pengelolaan limbah.
3. Mendukung upaya pengurangan sampah yang berakhir di TPA.
4. Meningkatkan kesadaran masyarakat terhadap ekonomi sirkular dan daur ulang.

---

# Target Pengguna

## User

Masyarakat umum yang ingin mencari informasi mengenai pengepul limbah.

User tidak perlu melakukan login.

## Admin

Pengelola sistem yang bertanggung jawab mengelola data kategori limbah dan data pengepul.

Admin harus login menggunakan Supabase Authentication.

---

# Teknologi

## Frontend

* Next.js 16
* TypeScript
* Tailwind CSS

## Backend

* Next.js App Router
* Server Actions

## Database

* Supabase PostgreSQL

## Authentication

* Supabase Auth

## Storage

* Supabase Storage

---

# Fitur User

* Melihat kategori limbah
* Membaca edukasi limbah
* Melihat daftar pengepul
* Melihat detail pengepul
* Menghubungi pengepul melalui WhatsApp

---

# Fitur Admin

* Login
* Kelola kategori limbah
* Upload gambar kategori
* Kelola pengepul
* Upload gambar pengepul
* Mengubah status pengepul

---

# Halaman User

1. Home
2. Category Detail
3. Collector Detail
4. About

---

# Halaman Admin

1. Login
2. Dashboard
3. Category Management
4. Collector Management

---

# Kategori Limbah Awal

* Plastik
* Kertas
* Logam
* Kaca
* E-Waste
* Organik
* Minyak Jelantah

Kategori dapat ditambah oleh admin.
