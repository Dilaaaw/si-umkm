# 💼 Si-UMKM – Sistem Informasi Layanan UMKM

Sistem Informasi Layanan UMKM (Si-UMKM) adalah platform berbasis web yang dibangun untuk memfasilitasi pelaku Usaha Mikro, Kecil, dan Menengah (UMKM) dalam mempromosikan produk, mengikuti pelatihan, serta mendapatkan pembinaan dari pemerintah.

Proyek ini dibangun sebagai bagian dari kolaborasi antara pemerintah kota dan startup teknologi.

---

## 🚀 Fitur Utama

### 🔐 Autentikasi & Otorisasi
- Login UMKM via Firebase Authentication
- Login Admin via JWT
- OAuth Login Google

### 🛍️ Manajemen Produk
- Tambah, edit, hapus produk (khusus UMKM)
- Unggah gambar produk via Imgbb / Cloudinary
- Lihat daftar produk publik
- Detail produk + ulasan & rating

### 🗣️ Ulasan & Rating
- Pengunjung bisa beri ulasan & rating

### 🎓 Pelatihan & Pembinaan
- Daftar pelatihan online
- Lihat detail program
- Dashboard admin kelola pelatihan

### 📊 Dashboard Admin
- Statistik grafik produk, pelatihan, ulasan
- CRUD data pelatihan dan verifikasi konten

### 🌐 Rendering & Security
- Rendering: CSR, SSR, ISR
- Proteksi XSS & CSRF
- Middleware route protection

### ⚙️ Teknologi
- Next.js App Router
- MongoDB + Mongoose
- Firebase Admin SDK
- GraphQL (Apollo)
- REST API Routes
- Tailwind CSS + SweetAlert2
- Testing: Jest + Testing Library

---

## ⚒️ Instalasi & Jalankan Lokal

### 1. Clone Repo
```bash
git clone https://github.com/Dilaaaw/si-umkm.git
cd si-umkm
