const express = require("express");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const router = express.Router();
const { OLLAMA_URL, OLLAMA_MODEL } = require("../config/ollama");
const { setSSEHeaders } = require("../utils/sse");

async function streamFromOllama(res, prompt) {
  let fullText = "";

  const ollamaRes = await fetch(OLLAMA_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: OLLAMA_MODEL,
      prompt,
      stream: true
    })
  });

  if (!ollamaRes.body) return res.end();
  setInterval(() => res.write(":\n\n"), 15000);

  ollamaRes.body.on("data", chunk => {
    chunk.toString().split("\n").forEach(line => {
      if (!line.trim()) return;
      try {
        const json = JSON.parse(line);
        if (json.response) fullText += json.response;
        if (json.done) {
          res.write(`data: ${fullText}\n\n`);
          res.end();
        }
      } catch {}
    });
  });
}

router.get("/personality-stream", async (req, res) => {
  const { fullName, personalityNumber } = req.query;
  if (!fullName || !personalityNumber) return res.end();

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
  "publicImage": string[],
  "socialBehavior": string[],
  "firstImpression": string[]
}

Instructions:

- mainHeading MUST be exactly in this format:
  "Personality Number"

- description MUST contain 3 to 4 sentences explaining:
  What a Personality Number is and how it reveals an individual's natural tendencies,
  dominant character traits, inner motivations, and the way they interact with
  the world and others.

Then generate all remaining sections normally.


Personality Number: ${personalityNumber}
Full Name: ${fullName}
`;

  await streamFromOllama(res, prompt);
});

module.exports = router;
