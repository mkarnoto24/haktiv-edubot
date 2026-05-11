import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { GoogleGenAI } from '@google/genai';

const app = express();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const GEMINI_MODEL = 'gemini-2.5-flash';

app.use(cors())
app.use(express.json())
app.use(express.static('public'))

app.post('/api/chat', async (req, res) => {
    const { conversation } = req.body;

    try {
        if (!Array.isArray(conversation)) throw new Error('Conversation must be an array!');

        const contents = conversation.map(({ role, text }) => ({
            role,
            parts: [{ text }]
        }))

        const response = await ai.models.generateContent({
            model: GEMINI_MODEL,
            contents,
            config: {
                temperature: 0.7,
                top_p: 0.9,
                top_k: 40,
                systemInstruction: `Kamu adalah EduBot, asisten belajar AI yang ramah dan sabar untuk pelajar Indonesia.
Tugasmu adalah membantu siswa memahami berbagai mata pelajaran seperti Matematika, IPA, IPS, Bahasa Indonesia, Bahasa Inggris, Sejarah, Fisika, Kimia, dan Biologi.

Aturan:
- Selalu jawab dalam Bahasa Indonesia yang jelas dan mudah dipahami.
- Jelaskan konsep secara bertahap dari yang mudah ke yang sulit.
- Gunakan contoh nyata dan analogi sederhana.
- Jika ada soal, tunjukkan cara penyelesaiannya langkah demi langkah.
- Berikan semangat dan motivasi kepada siswa.
- Jika pertanyaan di luar topik pendidikan, arahkan kembali ke topik belajar dengan sopan.
- Gunakan format yang rapi: poin-poin atau langkah bernomor jika diperlukan.`
            }
        })

        res.status(200).json({ result: response.text });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: e.message });
    }
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})