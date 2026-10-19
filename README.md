# 💍 Website Undangan Pernikahan Digital (Siap Hosting)

Website undangan pernikahan digital (*online wedding invitation*) yang modern, elegan, responsif di HP/desktop, dan **siap dihosting 100% gratis**.

---

## ✨ Fitur-Fitur Utama

1. **Cover / Opening Amplop Interaktif**:
   - Menampilkan nama tamu personal secara otomatis lewat URL (`?to=Nama+Tamu`).
   - Tombol **"Buka Undangan"** dengan animasi transisi halus, pesta *confetti*, dan putar musik otomatis.
2. **Background Music Player**:
   - Pemutar musik instrumen romantis dengan tombol *floating* piringan hitam berputar (Play/Pause).
3. **Profil Kedua Mempelai**:
   - Foto mempelai pria & wanita, nama lengkap, gelar, nama orang tua, serta tautan Instagram.
4. **Countdown Timer (Hitung Mundur)**:
   - Hitung mundur waktu menuju hari pernikahan & tombol **"Simpan ke Google Calendar"**.
5. **Agenda Acara & Navigasi**:
   - Jadwal Akad Nikah & Resepsi lengkap dengan tombol langsung ke **Google Maps**.
6. **Our Love Story (Kisah Cinta)**:
   - Garis waktu (*timeline*) perjalanan cinta kedua mempelai.
7. **Galeri Foto Prewedding**:
   - Tampilan foto estetik dengan efek *lightbox* (popup layar penuh saat diklik).
8. **Buku Tamu & RSVP Interaktif**:
   - Form ucapan doa & konfirmasi kehadiran langsung muncul secara realtime (tersimpan di *LocalStorage*).
   - Tombol **"Konfirmasi ke WhatsApp"** yang otomatis memformat pesan ke nomor mempelai.
9. **Amplop Digital / Hadiah**:
   - Nomor rekening Bank BCA, Mandiri, dll. dengan tombol **"Salin No. Rekening"** 1-klik.
   - Alamat pengiriman kado fisik beserta tombol salin alamat.
10. **Efek Kelopak Bunga (Petals Animation)**:
    - Efek partikel bunga lembut berjatuhan di latar belakang.
11. **Floating Bottom Navigation Bar**:
    - Navigasi cepat antar section saat diakses di perangkat ponsel / smartphone.

---

## 🚀 Cara Melihat Website di Komputer Anda (Preview Lokal)

Anda dapat langsung membukanya dengan salah satu cara berikut:

### Cara 1: Buka File Langsung
Cukup buka folder `wedding-website` di File Explorer, lalu klik dua kali file **`index.html`** untuk membukanya di browser (Chrome, Edge, Firefox).

### Cara 2: Menjalankan Server Lokal (Node.js)
Buka terminal / PowerShell di folder ini, lalu jalankan:
```bash
npx serve -l 3000 .
```
Lalu buka browser di `http://localhost:3000`.

---

## 🌐 Cara Hosting Online Gratis (Bisa Diakses Siapa Saja)

Website ini murni berbasis HTML, CSS, dan JavaScript statis tanpa perlu database backend yang rumit, sehingga **sangat mudah dihosting secara gratis seumur hidup**.

Pilih salah satu cara tercepat di bawah ini:

### 🌟 Opsi A: Netlify Drop (Paling Mudah — Tanpa Koding, 1 Menit Selesai!)
1. Buka browser dan kunjungi: **[https://app.netlify.com/drop](https://app.netlify.com/drop)**
2. Seret (*drag & drop*) seluruh folder `wedding-website` ke halaman tersebut.
3. Tunggu 5-10 detik. Website Anda **langsung online**!
4. Anda akan mendapatkan tautan seperti `https://dimas-annisa.netlify.app`. Tautan ini sudah bisa langsung disebarkan ke keluarga dan teman.

---

### 🌟 Opsi B: Vercel (Gratis & Sangat Cepat)
1. Buka **[https://vercel.com](https://vercel.com)** dan login (bisa pakai akun Google/GitHub).
2. Klik **"Add New"** > **"Project"**.
3. Upload folder ini atau sambungkan lewat GitHub repository Anda.
4. Klik **"Deploy"**. Website langsung live dengan domain gratis `.vercel.app`.

---

### 🌟 Opsi C: GitHub Pages
1. Buat repository baru di GitHub (misal: `undangan-pernikahan`).
2. Upload semua file (`index.html`, `style.css`, `script.js`) ke repository tersebut.
3. Masuk ke tab **Settings** > **Pages**.
4. Pada bagian *Branch*, pilih `main` / `root`, lalu klik **Save**.
5. Tunggu 1 menit, website Anda aktif di `https://username.github.io/undangan-pernikahan`.

---

## 💌 Cara Membuat Link Khusus Nama Tamu

Untuk mengirim undangan dengan nama tamu yang dipersonalisasi di halaman depan, tambahkan parameter `?to=Nama+Tamu` di ujung tautan website Anda.

**Contoh:**
- `https://undangan-kamu.netlify.app/?to=Bapak+Joko+Widodo`
- `https://undangan-kamu.netlify.app/?to=Rian+dan+Keluarga`
- `https://undangan-kamu.netlify.app/?to=Sahabat+Kuliah`

Nama tamu otomatis tampil elegan di cover pembuka!

---

## ✏️ Panduan Kustomisasi Data

Buka file **`index.html`** dan **`script.js`** menggunakan teks editor (VS Code, Notepad, dll.):

1. **Mengganti Nama Mempelai**:
   - Cari kata `Dimas & Annisa` di `index.html`, ubah sesuai nama Anda dan pasangan.
2. **Mengganti Tanggal Pernikahan**:
   - Buka `script.js`, cari baris target tanggal:
     ```javascript
     const targetDate = new Date('2026-10-24T08:00:00+07:00').getTime();
     ```
     Ubah format tahun-bulan-tanggal sesuai hari pernikahan Anda.
3. **Mengganti Nomor Rekening & Nama Bank**:
   - Cari section `#gift` di `index.html`. Ubah nomor rekening dan nama pemilik rekening.
4. **Mengganti Nomor WhatsApp untuk Konfirmasi**:
   - Di `script.js`, cari `const waNumber = '6281234567890';` dan ganti dengan nomor WhatsApp aktif Anda (gunakan kode negara `62` tanpa tanda `+` atau `0` di depan).
5. **Mengganti Lagu / Musik Latar**:
   - Di `index.html`, cari tag `<audio id="wedding-music">`. Anda dapat mengganti atribut `src` dengan link file MP3 pilihan Anda.
6. **Mengganti Foto Galeri & Pasangan**:
   - Ganti link foto di tag `<img>` atau letakkan file foto Anda di dalam folder lalu panggil jalurnya (misal: `<img src="foto-mempelai.jpg">`).
