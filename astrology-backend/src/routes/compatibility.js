const express = require("express");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const router = express.Router();
const { OLLAMA_URL, OLLAMA_MODEL } = require("../config/ollama");
const { setSSEHeaders } = require("../utils/sse");

// ===== STREAM FUNCTION (SAME AS DESTINY) =====
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
        options: { temperature: 0.7, top_p: 0.9, num_predict: 500 },
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

          if (json.response) {
            fullText += json.response;
          }

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

// ============ ROUTE ============

router.get("/compatibility-stream", async (req, res) => {
  const { name1, dob1, name2, dob2, relationshipType } = req.query;

  if (!name1 || !dob1 || !name2 || !dob2 || !relationshipType) {
    return res.end();
  }

  setSSEHeaders(res);

  const prompt = `
You are a professional relationship numerologist.

Return ONLY valid JSON.
NO markdown.
NO extra text.

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
  "compatibilityScore": number,
  "strengthAreas": string[],
  "conflictAreas": string[],
  "advice": string[]
}

Instructions:

- mainHeading MUST be exactly:
  "Compatibility Analysis"

- description MUST contain 3 to 4 sentences explaining:
  What is Compatibility Analysis and how it helps understand relationship dynamics, emotional bonding, and long-term harmony.

- compatibilityScore must be realistic number between 40 and 98

Then generate all remaining sections normally.

Relationship Type: ${relationshipType}
Person 1: ${name1}, ${dob1}
Person 2: ${name2}, ${dob2}
`;

  await streamFromOllama(res, prompt);
});

module.exports = router;
