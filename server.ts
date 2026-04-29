import "dotenv/config";
import express from "express";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes FIRST
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.post("/api/chat", async (req, res) => {
    try {
      const { message, language } = req.body ?? {};
      if (!message || typeof message !== "string") {
        return res.status(400).json({ error: "Message is required." });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: "AI service is not configured." });
      }

      const genAI = new GoogleGenAI({ apiKey });
      const promptString = `You are a helpful assistant for the Smart Receipt Generator SaaS.
Language requested: ${language || "en"}.

CRITICAL INSTRUCTIONS:
- If language is 'ur', respond in standard Urdu script.
- If language is 'rur' or 'roman-urdu', respond in Roman Urdu (Urdu written in Latin/English characters).
- Otherwise, respond in the requested language.
- Maintain a professional, polite, and premium SaaS brand voice.
- Keep responses concise (max 3 sentences).

User message: ${message}`;

      const response = await genAI.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: promptString,
      });

      const reply = response.text || "I'm sorry, I couldn't process that.";
      return res.json({ reply });
    } catch (error) {
      return res.status(500).json({ error: "AI service temporarily unavailable." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
