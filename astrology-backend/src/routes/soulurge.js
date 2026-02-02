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
        options: {
          temperature: 0.6,
          top_p: 0.9,
          num_predict: 400,
        },
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
            } catch {
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

// ================= ROUTE =================
router.get("/soulurge-stream", async (req, res) => {
  const { name, soulUrge } = req.query;
  if (!name || !soulUrge) return res.end();

  setSSEHeaders(res);

  const prompt = `
You are a professional numerologist.

Return ONLY valid JSON.
NO markdown.
NO extra text.
NO explanations outside JSON.

IMPORTANT RULES:
- Every array item MUST be a complete sentence
- Minimum 12 words per sentence
- No single words
- No short phrases
- Professional, clear language

Schema:
{
  "mainHeading": string,
  "description": string,
  "innerDesire": string[],
  "emotionalNature": string[],
  "relationships": string[],
  "workSatisfaction": string[],
  "innerFulfillmentAdvice": string[]
}

Instructions:

- mainHeading MUST be exactly in this format:
  "Soul Urge Number"

- description MUST contain 3 to 4 sentences explaining:
  What Soul Urge Number is and how it reveals inner desires, emotional needs, and personal motivations.

Then generate all remaining sections normally.

Soul Urge Number: ${soulUrge}
Name: ${name}
`;

  await streamFromOllama(res, prompt);
});

module.exports = router;
