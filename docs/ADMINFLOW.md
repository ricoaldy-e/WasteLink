# Admin Flow

## Deskripsi

Admin bertugas mengelola seluruh data yang ditampilkan kepada user.

---

# Flow Utama

Login
↓
Dashboard
↓
Kelola Kategori
atau
Kelola Pengepul

---

# 1. Login

Admin memasukkan:

* Email
* Password

Sistem menggunakan Supabase Auth.

Jika berhasil:

Masuk ke Dashboard.

---

# 2. Dashboard

Menampilkan ringkasan:

* Total kategori
* Total pengepul
* Total pengepul aktif

Menu:

* Kelola Kategori
* Kelola Pengepul

---

# 3. Kelola Kategori

Admin dapat:

* Melihat kategori
* Menambah kategori
* Mengubah kategori
* Menghapus kategori

Field:

* Nama kategori
* Deskripsi
* Edukasi limbah
* Gambar kategori

---

# 4. Kelola Pengepul

Admin dapat:

* Melihat pengepul
* Menambah pengepul
* Mengubah pengepul
* Menghapus pengepul

Field:

* Nama
* Kategori
* Nomor telepon
* WhatsApp
* Alamat
* Jam operasional
* Deskripsi
* Gambar
* Status

---

# 5. Publish Data

Setelah data disimpan:

Kategori dan pengepul langsung tersedia pada website user.

Jika status pengepul tidak aktif:

Data tidak ditampilkan kepada user.

---

# Use Cases Admin

## AC-01 Login

Admin masuk ke sistem.

---

## AC-02 Kelola Kategori

CRUD kategori limbah.

---

## AC-03 Kelola Pengepul

CRUD pengepul.

---

## AC-04 Upload Gambar

Upload gambar kategori dan pengepul.

---

## AC-05 Mengubah Status

Mengaktifkan atau menonaktifkan pengepul.
