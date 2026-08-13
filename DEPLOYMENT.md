# 🚀 Panduan Migrasi Database Supabase & Deploy ke Vercel

Dokumen ini berisi panduan langkah demi langkah untuk mengimpor basis data **No More Craft** ke **Supabase (PostgreSQL)** dan men-deploy aplikasi ke **Vercel**.

---

## 🗄️ Langkah 1: Migrasi Database ke Supabase

1. Buka **[Supabase Dashboard](https://supabase.com/dashboard)** dan masuk ke akun Anda.
2. Buat proyek baru (*New Project*) atau pilih proyek yang sudah ada.
3. Di menu bilah samping kiri, klik **SQL Editor**.
4. Buka file [`supabase_migration.sql`](./supabase_migration.sql) di dalam proyek ini, salin seluruh kodenya.
5. Tempel (*paste*) kode tersebut ke dalam SQL Editor Supabase, lalu klik tombol **Run** ▶️.
   > **Hasil**: 11 tabel lengkap (`users`, `works`, `categories`, `blog_posts`, `hero_banners`, `shop_products`, `settings`, dll) beserta data awal secara otomatis langsung terbuat dan terisi di Supabase!
6. Buka **Project Settings** ⚙️ -> **API**, lalu catat:
   - `Project URL` (misal: `https://xxxx.supabase.co`)
   - `anon public key` (misal: `eyJhbG...`)
   - Connection string di tab **Database** (misal: `postgres://...`)

---

## ☁️ Langkah 2: Deploy ke Vercel

### Opsi A: Deploy Langsung via CLI Terminal
Jalankan perintah berikut pada terminal Anda:
```bash
npx vercel
```
Ikuti petunjuk di layar:
1. Konfirmasi direktori proyek.
2. Tentukan nama proyek (misal: `nomorecraft`).
3. Vercel akan otomatis mendeteksi framework **Next.js** dan melakukan deployment!

### Opsi B: Deploy via Vercel Dashboard (GitHub)
1. Push repositori ini ke akun GitHub Anda.
2. Masuk ke **[Vercel Dashboard](https://vercel.com/new)**.
3. Klik **Import Project** dari repositori GitHub Anda.
4. Di bagian **Environment Variables**, tambahkan variabel berikut:
   - `NEXT_PUBLIC_SUPABASE_URL` = `https://<proyek-anda>.supabase.co`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = `<anon-key-anda>`
   - `DATABASE_URL` = `<connection-string-postgres-supabase>`
5. Klik **Deploy** 🚀.

---

## 🔑 Login Admin Produksi
- **URL Admin**: `https://<domain-vercel-anda>/admin/login`
- **Email**: `admin@nomorecraft.com`
- **Password**: `admin123`
