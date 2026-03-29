# AGENTS.md

## 📌 Project Overview

Project ini adalah platform berbagi gambar (image sharing platform) mirip Pinterest, yang memungkinkan user untuk:

- Upload gambar berkualitas tinggi
- Menjelajah (explore) gambar
- Download gambar dalam kualitas asli
- Interaksi ringan (like, save, dll)

Stack utama:

- Next.js (App Router)
- TypeScript
- styled-components
- Firebase (Auth, Firestore, Storage)
- react-hot-toast
- js-cookie

---

## 🎯 Core Principles

### 1. Performance First

- Semua komponen harus dioptimalkan untuk **kecepatan render**
- Gunakan:
  - `React.memo` untuk komponen berat
  - `useCallback` & `useMemo` seperlunya

- Hindari re-render tidak perlu
- Gunakan dynamic import untuk komponen besar

### 2. Image Optimization (Paling Penting)

- Gunakan `next/image` untuk semua gambar
- Aktifkan:
  - lazy loading (default)
  - responsive sizes

- Simpan 2 versi gambar di Firebase Storage:
  - **Original (full quality)** → untuk download
  - **Compressed (web optimized)** → untuk display

#### Standar gambar:

- Display:
  - format: WebP / AVIF
  - ukuran max: 1080px (long side)

- Original:
  - tanpa kompresi berlebihan
  - tetap tersedia untuk download

---

## 🧠 Architecture Guidelines

### Folder Structure

```
/app
/components
/lib
/hooks
/services
/types
/utils
/styles
```

### Rules:

- `components/` → reusable UI
- `services/` → Firebase logic
- `lib/` → konfigurasi (firebase, auth, dll)
- `hooks/` → custom hooks
- `utils/` → helper functions

---

## 🔥 Firebase Usage Rules

### Storage

- Path:

```
/images/{userId}/{imageId}/
  - original.jpg
  - optimized.webp
```

### Firestore Schema (contoh)

```
images:
  id
  userId
  title
  description
  tags[]
  imageUrl (optimized)
  originalUrl
  createdAt
  likesCount
```

### Best Practices:

- Jangan fetch data berlebihan
- Gunakan pagination (limit + cursor)
- Cache data jika memungkinkan

---

## ⚡ Rendering Strategy

Gunakan strategi berikut:

- **Server Components (default)** → untuk data fetching
- **Client Components** → hanya jika butuh interaksi

### Contoh:

- Explore page → Server Component + infinite scroll client
- Upload page → Client Component

---

## 🚀 Performance Optimization

### Wajib:

- Infinite scroll (bukan pagination biasa)
- Virtualized list untuk banyak gambar
- Debounce pada search input
- Gunakan CDN Firebase Storage

### Optional (recommended):

- Image blur placeholder
- Skeleton loading
- Preload image di viewport

---

## 📦 State Management

- Gunakan React state + hooks (hindari overengineering)
- Untuk global state:
  - gunakan Context API secukupnya

---

## 🔐 Authentication

- Gunakan Firebase Auth
- Simpan token di cookie (`js-cookie`)
- Validasi user di server jika perlu

---

## 🎨 Styling Guidelines

- Gunakan styled-components
- Hindari inline styles
- Gunakan theme untuk warna & spacing

---

## 🔔 Notifications

- Gunakan `react-hot-toast`
- Semua feedback user harus jelas:
  - upload sukses
  - error upload
  - login gagal
  - dll

---

## 📥 Download Feature (Penting)

- Download harus menggunakan **original image**
- Jangan compress saat download
- Gunakan direct link dari Firebase Storage
- Pastikan:
  - filename jelas
  - tidak blur / tidak resize

---

## 🧪 Code Quality

- Gunakan TypeScript strict mode
- Hindari `any`
- Semua fungsi harus typed

---

## ⚠️ Anti-Patterns (Hindari)

- ❌ Load gambar original untuk display
- ❌ Fetch semua data sekaligus
- ❌ Banyak state tidak terkontrol
- ❌ Re-render berlebihan
- ❌ Hardcoded URL Firebase

---

## 📈 Future Improvements

- Image recommendation (AI-based)
- Lazy loading masonry layout
- Bookmark system
- User profile page
- Progressive Web App (PWA)

---

## 🧩 Developer Notes

- Fokus utama:

  > **Cepat saat dibuka, tapi tetap tajam saat dilihat & didownload**

- Rule sederhana:
  - Lihat → cepat & ringan
  - Download → full kualitas

---
