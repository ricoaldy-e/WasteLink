# Database Schema

Database menggunakan Supabase PostgreSQL.

---

# Table: categories

Menyimpan informasi kategori limbah.

| Field             | Type      |
| ----------------- | --------- |
| id                | uuid      |
| name              | varchar   |
| description       | text      |
| education_content | text      |
| image_url         | text      |
| created_at        | timestamp |

## Penjelasan

### name

Nama kategori limbah.

Contoh:

* Plastik
* Kertas
* Logam
* Kaca
* Organik

### description

Deskripsi singkat kategori.

### education_content

Konten edukasi mengenai limbah.

### image_url

URL gambar kategori dari Supabase Storage.

---

# Table: collectors

Menyimpan informasi pengepul limbah.

| Field             | Type      |
| ----------------- | --------- |
| id                | uuid      |
| category_id       | uuid      |
| name              | varchar   |
| phone             | varchar   |
| whatsapp          | varchar   |
| address           | text      |
| operational_hours | varchar   |
| description       | text      |
| image_url         | text      |
| status            | boolean   |
| created_at        | timestamp |

## Penjelasan

### category_id

Relasi ke tabel categories.

### name

Nama pengepul.

### phone

Nomor telepon.

### whatsapp

Nomor WhatsApp.

### address

Alamat pengepul.

### operational_hours

Jam operasional.

Contoh:

08.00 - 16.00

### description

Deskripsi tambahan.

### image_url

URL gambar pengepul.

### status

true = aktif

false = tidak aktif

Hanya pengepul aktif yang tampil ke user.

---

# Relasi Database

categories

1

↓

N

collectors

Satu kategori dapat memiliki banyak pengepul.

Satu pengepul hanya memiliki satu kategori utama.
