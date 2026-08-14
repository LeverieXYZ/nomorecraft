# 🚀 Panduan Migrasi Database Supabase & Deploy ke Vercel

Dokumen ini berisi panduan langkah demi langkah untuk mengimpor basis data **No More Craft** ke **Supabase (PostgreSQL)** dan men-deploy aplikasi ke **Vercel**.

---

## 🗄️ Langkah 1: Migrasi Database ke Supabase

1. Buka **[Supabase Dashboard](https://supabase.com/dashboard)** dan masuk ke akun Anda.
2. Buat proyek baru (*New Project*) atau pilih proyek yang sudah ada.
3. Di menu bilah samping kiri, klik **SQL Editor**.
4. Buka file [`supabase_migration.sql`](./supabase_migration.sql) di dalam proyek ini, salin seluruh kodenya.
5. Tempel (*paste*) kode tersebut ke dalam SQL Editor Supabase, lalu klik tombol **Run** ▶️.
   > **Hasil**: 11 tabel lengkap (`users`, `works`, `categories`, `blog_posts`, `hero_banners`, `shop_products`, `settings`, dll) beserta reset urutan ID (*primary key sequence*) dan izin RLS (*Row Level Security*) otomatis terkonfigurasi di Supabase!
6. Buka **Project Settings** ⚙️ -> **API**, lalu catat:
   - `Project URL` (misal: `https://xxxx.supabase.co`)
   - `anon public key` (misal: `eyJhbG...`)
   - `service_role secret key` (misal: `eyJhbG...`)

---

## ☁️ Langkah 2: Variabel Lingkungan di Vercel (Environment Variables)

Masuk ke proyek Anda di **[Vercel Dashboard](https://vercel.com)** -> **Settings** -> **Environment Variables**, pastikan variabel berikut terpasang:

| Key Variable | Value Contoh | Keterangan |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xxxx.supabase.co` | URL Proyek Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGciOi...` | Public Kunci Anon |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJhbGciOi...` | Secret Service Role (Rekomendasi untuk penulisan server) |
| `SUPABASE_URL` | `https://xxxx.supabase.co` | Opsi tambahan URL Supabase |
| `SUPABASE_ANON_KEY` | `eyJhbGciOi...` | Opsi tambahan Anon Key |

> **Catatan Penting**: Memasang `SUPABASE_SERVICE_ROLE_KEY` memastikan semua operasi penulisan (INSERT, UPDATE, DELETE) dari Panel Admin CMS berjalan sukses 100% tanpa terhalang kebijakan RLS.

---

## 🔑 Login Admin Produksi
- **URL Admin**: `https://<domain-vercel-anda>/admin/login`
- **Email**: `admin@nomorecraft.com`
- **Password**: `admin123`
