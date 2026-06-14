# Software Requirements Specification (SRS)

## WasteLink

Sistem Informasi Pengelolaan Limbah dan Pencarian Pengepul Sampah

---

# 1. Pendahuluan

## 1.1 Tujuan

WasteLink dikembangkan untuk membantu masyarakat menemukan pengepul limbah berdasarkan jenis sampah yang dimiliki serta memberikan edukasi mengenai pengelolaan limbah.

---

## 1.2 Latar Belakang

Kurangnya informasi mengenai pengepul limbah menyebabkan banyak sampah yang masih memiliki nilai ekonomi berakhir di tempat pembuangan akhir.

WasteLink hadir sebagai media informasi yang menghubungkan masyarakat dengan pengepul limbah yang sesuai.

---

# 2. Aktor Sistem

## User

Pengunjung website tanpa login.

Hak akses:

* Melihat kategori limbah
* Membaca edukasi limbah
* Melihat daftar pengepul
* Melihat detail pengepul
* Menghubungi pengepul

---

## Admin

Pengelola sistem.

Hak akses:

* Login
* Kelola kategori
* Kelola pengepul

---

# 3. Functional Requirements

## FR-01 Melihat Home Page

User dapat melihat:

* Hero section
* Daftar kategori limbah
* Informasi website

---

## FR-02 Melihat Kategori Limbah

User dapat melihat:

* Nama kategori
* Deskripsi
* Edukasi limbah

---

## FR-03 Melihat Daftar Pengepul

User dapat melihat daftar pengepul berdasarkan kategori.

---

## FR-04 Melihat Detail Pengepul

User dapat melihat:

* Nama pengepul
* Nomor telepon
* WhatsApp
* Alamat
* Jam operasional
* Deskripsi

---

## FR-05 Login Admin

Admin dapat login menggunakan email dan password.

---

## FR-06 Kelola Kategori

Admin dapat:

* Tambah kategori
* Edit kategori
* Hapus kategori
* Upload gambar kategori

---

## FR-07 Kelola Pengepul

Admin dapat:

* Tambah pengepul
* Edit pengepul
* Hapus pengepul
* Upload gambar pengepul

---

## FR-08 Kelola Status Pengepul

Admin dapat mengubah status:

* Aktif
* Tidak Aktif

---

# 4. Non Functional Requirements

## Usability

Website mudah digunakan oleh masyarakat umum.

## Performance

Waktu muat halaman maksimal 3 detik.

## Compatibility

Mendukung:

* Chrome
* Edge
* Firefox
* Mobile Browser

## Security

Dashboard admin hanya dapat diakses oleh admin yang telah login.

---

# 5. Ruang Lingkup

## User Side

* Home
* Category Detail
* Collector Detail
* About

## Admin Side

* Login
* Dashboard
* Category Management
* Collector Management

---

# 6. Batasan Sistem

1. User tidak dapat melakukan transaksi.
2. User tidak dapat melakukan booking penjemputan.
3. User tidak dapat memberikan review.
4. Sistem hanya berfungsi sebagai media informasi.
5. Data pengepul dikelola sepenuhnya oleh admin.
