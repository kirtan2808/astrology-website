const express = require("express");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const router = express.Router();
const { OLLAMA_URL, OLLAMA_MODEL } = require("../config/ollama");
const { setSSEHeaders } = require("../utils/sse");

async function streamFromOllama(res, prompt) {
  let text = "";

  const ollamaRes = await fetch(OLLAMA_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model: OLLAMA_MODEL, prompt, stream: true })
  });

  ollamaRes.body.on("data", chunk => {
    chunk.toString().split("\n").forEach(line => {
      if (!line.trim()) return;
      try {
        const json = JSON.parse(line);
        if (json.response) text += json.response;
        if (json.done) {
          res.write(`data: ${text}\n\n`);
          res.end();
        }
      } catch {}
    });
  });
}

router.get("/compatibility-stream", async (req, res) => {
  const { name1, dob1, name2, dob2, relationshipType } = req.query;
  if (!name1 || !dob1 || !name2 || !dob2 || !relationshipType) return res.end();

  setSSEHeaders(res);

  const prompt = `
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

- mainHeading MUST be exactly in this format:
  "Compatibility Analysis"

- description MUST contain 3 to 4 sentences explaining:
  What is Compatibility Analysis and how it reveals relationship dynamics.

Then generate all remaining sections normally.

Relationship Type: ${relationshipType}
Person 1: ${name1}, ${dob1}
Person 2: ${name2}, ${dob2}
`;

  await streamFromOllama(res, prompt);
});

module.exports = router;
