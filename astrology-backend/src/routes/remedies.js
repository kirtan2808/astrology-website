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
      stream: true,
    }),
  });

  ollamaRes.body.on("data", (chunk) => {
    chunk
      .toString()
      .split("\n")
      .forEach((line) => {
        if (!line.trim()) return;

        try {
          const json = JSON.parse(line);

          if (json.response) {
            fullText += json.response;
          }

          if (json.done) {
            // SEND ONLY PURE MODEL OUTPUT – NOTHING STATIC
            res.write(`data: ${fullText.trim()}\n\n`);
            res.end();
          }
        } catch {
          // Ignore parsing errors from partial chunks
        }
      });
  });
}

router.get("/remedies-stream", async (req, res) => {
  const { name, dob, problemArea } = req.query;

  if (!name || !dob || !problemArea) {
    return res.end();
  }

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
  "luckyNumber": number,
  "luckyColor": string,
  "luckyDay": string,
  "mantra": string,
  "lifestyleAdvice": string[]
}

Instructions:

- mainHeading MUST be exactly in this format:
  "Remedies Report"

- description MUST contain 3 to 4 sentences explaining:
  How personalized remedies are connected to Name and Birth Date, and how they help improve the selected problem area of life.

Then generate all remaining sections normally according to the schema.

Name: ${name}
DOB: ${dob}
Problem Area: ${problemArea}
`;

  await streamFromOllama(res, prompt);
});

module.exports = router;
