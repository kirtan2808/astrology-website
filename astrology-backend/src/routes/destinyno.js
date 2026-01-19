const express = require("express");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const router = express.Router();
const { OLLAMA_URL, OLLAMA_MODEL } = require("../config/ollama");
const { setSSEHeaders } = require("../utils/sse");

// ================= STREAM FUNCTION =================
async function streamFromOllama(res, prompt) {
  let fullText = "";

  try {
    const ollamaRes = await fetch(OLLAMA_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: OLLAMA_MODEL,
        prompt,
        stream: true,
        options: { temperature: 0.6, top_p: 0.9, num_predict: 400 },
      }),
    });

    if (!ollamaRes.body) return res.end();

    const heartbeat = setInterval(() => res.write(":\n\n"), 15000);

    ollamaRes.body.on("data", (chunk) => {
      const lines = chunk.toString().split("\n");
      for (const line of lines) {
        if (!line.trim()) continue;

        try {
          const json = JSON.parse(line);
          if (json.response) fullText += json.response;

          if (json.done === true) {
            clearInterval(heartbeat);

            let parsed;
            try {
              parsed = JSON.parse(fullText);
            } catch (err) {
              parsed = { error: "Invalid AI JSON response" };
            }

            res.write(`data: ${JSON.stringify(parsed)}\n\n`);
            res.end();
          }
        } catch {
          // ignore partial chunks
        }
      }
    });

    ollamaRes.body.on("error", () => {
      clearInterval(heartbeat);
      res.end();
    });
  } catch (err) {
    console.error("Ollama error:", err);
    res.end();
  }
}

// ================= DESTINY ROUTE =================
router.get("/destiny-stream", async (req, res) => {
  const { name, destiny } = req.query;
  if (!name || !destiny) return res.end();

  setSSEHeaders(res);

  // 🔴 Strict JSON prompt for AI
  const prompt = `
You are a professional numerologist.

Return ONLY valid JSON.
No markdown, no extra text.

IMPORTANT RULES:
- Every array item MUST be a complete sentence
- Minimum 12 words per sentence
- No single words
- No short phrases
- Professional, clear language

Schema:
{
  "destiny": number,
  "corePurpose": string[],
  "career": {
    "suitable": string[],
    "workStyle": string,
    "growthAdvice": string
  },
  "strengths": string[],
  "weaknesses": string[],
  "money": string,
  "relationships": string
}

Destiny Number: ${destiny}
Name: ${name}
`;

  await streamFromOllama(res, prompt);
});

module.exports = router;
