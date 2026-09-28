import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(cors({ origin: ['http://localhost:3000', 'http://127.0.0.1:3000'] }));
app.use(express.json());

// Serve index.html at root
app.use(express.static(__dirname));

// ── /api/swing-tip  ──────────────────────────────────────────────────────────
// Accepts: { spineAngle, hipRotation, balance, phase, spinePass, hipPass, balPass }
// Returns: { tip: "..." }
// ─────────────────────────────────────────────────────────────────────────────
app.post('/api/swing-tip', async (req, res) => {
  const key = process.env.OPENAI_API_KEY;
  if (!key) {
    return res.status(500).json({ error: 'OPENAI_API_KEY is not set in .env' });
  }

  const { spineAngle, hipRotation, balance, phase, spinePass, hipPass, balPass } = req.body;

  const prompt = `You are an expert golf coach. A player just completed a swing. Here are the measured metrics:

- Swing phase detected: ${phase}
- Spine angle: ${spineAngle != null ? Number(spineAngle).toFixed(1) + '°' : 'not detected'} (ideal: 15°–50°)
- Hip rotation delta from address: ${hipRotation != null ? Number(hipRotation).toFixed(1) + '°' : 'not detected'} (ideal: ≥20°)
- Balance (left=0, right=1): ${Number(balance).toFixed(2)} (ideal: 0.35–0.65)
- Spine angle score: ${spinePass ? 'GOOD' : 'NEEDS WORK'}
- Hip rotation score: ${hipPass ? 'GOOD' : 'NEEDS WORK'}
- Balance score: ${balPass ? 'GOOD' : 'NEEDS WORK'}

Give 2–3 short, specific, actionable improvement tips based on these exact numbers. Be direct and practical. Use plain text, no markdown headers or bullet symbols — just numbered lines like "1. ..." on separate lines.`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${key}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 200,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      return res.status(response.status).json({ error: err.error?.message || `OpenAI error ${response.status}` });
    }

    const data = await response.json();
    const tip = data.choices?.[0]?.message?.content?.trim() || 'No tips returned.';
    res.json({ tip });
  } catch (err) {
    res.status(502).json({ error: err.message });
  }
});

// ── Start ─────────────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`⛳ Golf Swing Analyzer running at http://localhost:${PORT}`);
  console.log(`   OpenAI key loaded: ${process.env.OPENAI_API_KEY ? 'YES ✓' : 'NO — add it to .env'}`);
});
