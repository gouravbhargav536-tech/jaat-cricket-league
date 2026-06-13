import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Gemini API client initialization
  const ai = process.env.GEMINI_API_KEY 
    ? new GoogleGenAI({ 
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      })
    : null;

  // In-memory cache for bios
  const bioCache = new Map<string, string>();

  // API route for generating player bio
  app.post("/api/generate-bio", async (req, res) => {
    if (!ai) {
      return res.status(500).json({ error: "Gemini API key is not configured." });
    }

    const { playerName, teamName, role } = req.body;

    if (!playerName || !teamName || !role) {
      return res.status(400).json({ error: "Missing required player information." });
    }

    // Check cache first
    const cacheKey = `${playerName}-${teamName}`;
    if (bioCache.has(cacheKey)) {
      return res.json({ bio: bioCache.get(cacheKey) });
    }

    try {
      const prompt = `Generate a short, exciting, and professional cricket player bio (max 3 sentences) for a spotlight card. 
      Player: ${playerName}
      Team: ${teamName}
      Role: ${role}
      The league is the Jaat Cricket League (JCL). Keep it inspiring and focus on their contribution to the team.`;

      const result = await ai.models.generateContent({
        model: "gemini-1.5-flash",
        contents: prompt
      });

      const bio = result.text || "An elite athlete representing their community with pride and skill in the JCL.";
      
      // Store in cache
      bioCache.set(cacheKey, bio);
      
      res.json({ bio });
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      
      // Check for rate limit specifically
      if (error?.status === 429 || error?.code === 429) {
        return res.status(429).json({ error: "Rate limit reached. Please try again in 30 seconds." });
      }
      
      res.status(500).json({ error: "Failed to generate bio." });
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
