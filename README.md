# 🎓 EduBot — Asisten Belajar AI

Chatbot edukasi berbasis **Google Gemini AI** yang membantu siswa memahami berbagai mata pelajaran. Dibangun dengan **Node.js + Express** (backend) dan **Vanilla JavaScript** (frontend).

---

## ✨ Fitur

- 💬 Chat multi-turn — bot mengingat konteks percakapan
- 📚 Fokus edukasi — Matematika, Fisika, Kimia, Biologi, Bahasa Indonesia, Sejarah
- ⚡ Tombol quick-topic untuk langsung mulai belajar
- 🌐 Frontend langsung disajikan dari server (tidak perlu setup terpisah)

---

## 🛠️ Tech Stack

| Layer    | Teknologi              |
|----------|------------------------|
| Backend  | Node.js, Express       |
| AI Model | Google Gemini 2.5 Flash |
| Frontend | HTML, CSS, Vanilla JS  |
| Config   | dotenv                 |

---

## 📁 Struktur Proyek

```
gemini-chatbot-api/
├── public/
│   ├── index.html     # UI chatbot
│   ├── scripts.js     # Logika frontend + fetch ke API
│   └── style.css      # Styling
├── index.js           # Server Express + endpoint Gemini
├── .env               # API key (tidak di-commit)
├── .gitignore
└── package.json
```

---

## 🚀 Cara Menjalankan

### 1. Clone & Install

```bash
git clone <url-repo-kamu>
cd gemini-chatbot-api
npm install
```

### 2. Buat file `.env`

```bash
GEMINI_API_KEY=isi_api_key_kamu_di_sini
```

> Dapatkan API key di [Google AI Studio](https://aistudio.google.com/app/apikey)

### 3. Jalankan server

```bash
node index.js
```

Atau mode development (auto-restart saat file berubah):

```bash
npm run dev
```

### 4. Buka di browser

```
http://localhost:3000
```

---

## 📡 API Endpoint

### `POST /api/chat`

Mengirim percakapan ke Gemini AI dan mengembalikan respons.

**Request Body:**

```json
{
  "conversation": [
    { "role": "user", "text": "Apa itu fotosintesis?" }
  ]
}
```

**Response:**

```json
{
  "result": "Fotosintesis adalah proses..."
}
```

**Error Response:**

```json
{
  "error": "pesan error"
}
```

---

## ⚙️ Konfigurasi Model Gemini

Parameter AI dapat diubah di `index.js`:

| Parameter          | Nilai | Keterangan                              |
|--------------------|-------|-----------------------------------------|
| `temperature`      | `0.7` | Keseimbangan kreatif vs akurat          |
| `top_p`            | `0.9` | Nucleus sampling                        |
| `top_k`            | `40`  | Batasan token kandidat                  |
| `systemInstruction`| —     | Persona & aturan perilaku EduBot        |

---

## 🔒 Keamanan

- File `.env` **tidak pernah** di-commit ke GitHub
- API key hanya ada di server (tidak terekspos ke frontend)
- `node_modules` dan `package-lock.json` dikecualikan via `.gitignore`

---

## 📸 Tampilan

```
┌─────────────────────────────────────┐
│  🎓 EduBot  •  Asisten Belajar AI   │
├─────────────────────────────────────┤
│  📐 Matematika  ⚛️ Fisika  🧪 Kimia  │
├─────────────────────────────────────┤
│                                     │
│  [Pesan bot]                        │
│                    [Pesan user]     │
│                                     │
├─────────────────────────────────────┤
│  Tanya sesuatu...          [Kirim]  │
└─────────────────────────────────────┘
```

---

## 📄 Lisensi

ISC
