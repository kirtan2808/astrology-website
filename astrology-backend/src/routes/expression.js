const express = require("express");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const router = express.Router();
const { OLLAMA_URL, OLLAMA_MODEL } = require("../config/ollama");
const { setSSEHeaders } = require("../utils/sse");

/* ================= STREAM FUNCTION ================= */
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
        options: { temperature: 0.6, top_p: 0.9, num_predict: 400 }
      })
    });

    if (!ollamaRes.body) return res.end();
    const heartbeat = setInterval(() => res.write(":\n\n"), 15000);

    ollamaRes.body.on("data", chunk => {
      chunk.toString().split("\n").forEach(line => {
        if (!line.trim()) return;
        try {
          const json = JSON.parse(line);
          if (json.response) fullText += json.response;
          if (json.done) {
            clearInterval(heartbeat);
            let parsed;
            try { parsed = JSON.parse(fullText); }
            catch { parsed = { error: "Invalid AI JSON" }; }
            res.write(`data: ${JSON.stringify(parsed)}\n\n`);
            res.end();
          }
        } catch {}
      });
    });

  } catch {
    res.end();
  }
}

/* ================= ROUTE ================= */
router.get("/expression-stream", async (req, res) => {
  const { fullName, expressionNumber } = req.query;
  if (!fullName || !expressionNumber) return res.end();

  setSSEHeaders(res);

  const prompt = `
You are a professional numerologist.

Return ONLY valid JSON.
NO markdown.
NO extra text.

Schema:
{
  "meaning": string[],
  "strengths": string[],
  "challenges": string[],
  "careerSuggestions": string[]
}

Rules:
- Each sentence minimum 12 words
- Professional language only

Expression Number: ${expressionNumber}
Full Name: ${fullName}
`;

  await streamFromOllama(res, prompt);
});

module.exports = router;
