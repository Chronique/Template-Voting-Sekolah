# # 🗳️ Template Voting Sekolah On-Chain (Base Network)

![GitHub repo size](https://img.shields.io/github/repo-size/Chronique/Template-Voting-Sekolah?color=blue)
![GitHub License](https://img.shields.io/github/license/Chronique/Template-Voting-Sekolah?color=green)
[![Follow on X](https://img.shields.io/twitter/follow/adhichronique?style=social)](https://x.com/adhichronique)

Template aplikasi **Farcaster Mini-App** yang dirancang khusus untuk pemilihan ketua kelas, OSIS, atau organisasi sekolah lainnya. Sistem ini berjalan sepenuhnya di atas blockchain Base, memastikan transparansi mutlak tanpa biaya gas (**Gasless**) bagi para pemilih.

## 🚀 Fitur Utama
* **Gasless Voting**: Murid dapat memilih tanpa saldo ETH (biaya transaksi disponsori melalui Paymaster).
* **Integrasi Farcaster dan Base App**: Berjalan sebagai Mini-App di Farcaster dan Base App lainnya.
* **Web browser**: Chrome,Mozilla,Safari (smartphone ataupun Desktop).
* **Admin Dashboard**: Fitur untuk menambah admin, mengelola whitelist murid, dan mengganti judul pemilihan.
* **Verifikasi Transparan**: Daftar Admin dan Murid ditampilkan secara publik di tab Verifikasi.
* **Hasil Real-Time**: Perolehan suara dihitung otomatis oleh Smart Contract.

---

## 🛠️ Persiapan Awal
Sebelum menjalankan aplikasi, pastikan Anda memiliki:
1.  **Node.js** (Versi 18 atau terbaru).
2.  **Akun GitHub** untuk hosting kode.
3.  **Akun Coinbase Developer Platform (CDP)** untuk mengaktifkan fitur Gasless (Paymaster).
4.  **Akun Vercel** untuk melakukan deployment aplikasi secara online.

---

## ⚙️ Langkah Instalasi

### 1. Clone Repositori
```bash
git clone [https://github.com/Chronique/Template-Voting-Sekolah.git](https://github.com/Chronique/Template-Voting-Sekolah.git)
cd Template-Voting-Sekolah
npm install
```

2. Install Paket Pendukung (Wajib)
Karena adanya migrasi ke OnchainKit dan penambahan fitur animasi, jalankan perintah ini untuk memastikan semua modul tersedia:
```bash
# Install SDK Onchain & Animasi
npm install @coinbase/onchainkit framer-motion canvas-confetti --legacy-peer-deps

# Install Icon & UI Material (MUI)
npm install @mui/icons-material @mui/material @emotion/react @emotion/styled --legacy-peer-deps

# Install Type Definitions (Menghilangkan error merah di VS Code)
npm install -D @types/canvas-confetti --legacy-peer-deps
```


### 3. Konfigurasi Environment
Buat file .env di folder utama dan isi dengan URL Paymaster Anda:
```bash
# Salin file ini ke .env dan isi nilainya

NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID= // isi dengan Wallet Connect Project ID Anda
NEXT_PUBLIC_ALCHEMY_RPC_URL= // isi dengan Alchemy RPC URL Anda
NEXT_PUBLIC_QUICKNODE_RPC_URL= // isi dengan QuickNode RPC URL Anda
NEXT_PUBLIC_ANKR_RPC_URL= // isi dengan Ankr RPC URL Anda
NEXT_PUBLIC_PAYMASTER_URL= // isi dengan Paymaster URL Anda

# Opsi: Jika Anda menggunakan layanan lain, tambahkan variabel lingkungan tambahan di sini
```

### 4. Setup Smart Contract
Deploy Smart Contract (Solidity) Anda terlebih dahulu. Setelah mendapatkan alamat kontrak, perbarui file src/app/constants.ts:
```bash
// src/app/constants.ts
// Isi dengan alamat smart contract yang sudah di deploy,pastikan sudah terverifikasi
export const CONTRACT_ADDRESS = "0x0000000000000000000000000000000000000000";

// Builder Code dari Base.dev (jika tidak ada hubungi saya)
export const BUILDER_CODE_HEX = "base kode here"; 

export const CLASS_VOTE_ABI = [
  // Masukkan ABI Lengkap dari Smart Contract 
] as const;
```

### 🎨 Kustomisasi Branding Sekolah
Untuk menyesuaikan tampilan dengan identitas sekolah Anda, ubah bagian berikut:

Ganti Nama & Lokasi Sekolah
Buka file src/components/top-bar.tsx dan ubah teks berikut:
```bash
// Ganti teks di dalam komponen TopBar
<h1 className="...">NAMA SEKOLAH ANDA</h1>
<p className="...">KOTA / PROVINSI</p>
```

### Ganti Logo
1. Simpan logo sekolah Anda di folder **public/logo-sekolah.png.**
2. Pastikan referensi gambar di **src/components/top-bar.tsx sudah mengarah ke file tersebut.**
---

📋 Struktur Smart Contract yang Dibutuhkan
Agar template ini berfungsi, Smart Contract Anda harus memiliki fungsi berikut:

* **vote(uint256):** Untuk memberikan suara.

* **addAdmin(address):** Untuk menambah akses admin baru.

* **addToWhitelist(address[]):** Untuk mendaftarkan alamat wallet murid.

* **getFullAdmins():** Untuk mengambil daftar semua admin.

* **getFullWhitelist():** Untuk mengambil daftar semua murid terdaftar.

---

 ### 🎨 Kustomisasi Identitas Sekolah

Gunakan panduan tabel di bawah ini untuk mengubah tampilan aplikasi sesuai identitas sekolah Anda:

| Komponen | Lokasi File | Cara Mengubah |
| :---: | :---: | :---: |
| **Nama Sekolah** | `src/components/top-bar.tsx` | Ganti teks `SMP NEGERI 21` |
| **Kota/Provinsi** | `src/components/top-bar.tsx` | Ganti teks `JAMBI` |
| **Logo Sekolah** | `public/logo-sekolah.png` | Timpa file dengan logo baru (format .png) |
| **Warna Tema** | `tailwind.config.ts` | Ubah kode warna pada bagian `primary` |
| **Daftar Kandidat** | Admin Dashboard | Tambahkan via menu **Create Poll** di aplikasi |

### 🚢 Deployment
Anda bisa melakukan deploy frontend ini menggunakan Vercel atau Netlify secara gratis. Pastikan untuk memasukkan NEXT_PUBLIC_PAYMASTER_URL di pengaturan Environment Variables pada platform hosting Anda.

### 📄 Lisensi
Distributed under the MIT License. See LICENSE for more information.








