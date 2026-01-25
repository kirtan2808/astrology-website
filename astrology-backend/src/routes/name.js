const express = require("express");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const router = express.Router();
const { OLLAMA_URL, OLLAMA_MODEL } = require("../config/ollama");
const { setSSEHeaders } = require("../utils/sse");

async function streamFromOllama(res, prompt) {
  let result = "";

  const ollamaRes = await fetch(OLLAMA_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model: OLLAMA_MODEL, prompt, stream: true })
  });

  if (!ollamaRes.body) return res.end();

  ollamaRes.body.on("data", chunk => {
    chunk.toString().split("\n").forEach(line => {
      if (!line.trim()) return;
      try {
        const json = JSON.parse(line);
        if (json.response) result += json.response;
        if (json.done) {
          res.write(`data: ${result}\n\n`);
          res.end();
        }
      } catch {}
    });
  });
}

router.get("/name-analysis-stream", async (req, res) => {
  const { fullName, nameNumber, nickName } = req.query;
  if (!fullName || !nameNumber) return res.end();

  setSSEHeaders(res);

  const prompt = `
Return ONLY JSON.

Schema:
{
  "overallVibration": string[],
  "positiveEffects": string[],
  "negativeEffects": string[],
  "nameCorrectionAdvice": string[]
}

Rules:
- Clear, professional sentences
- Minimum 12 words

Name Number: ${nameNumber}
Full Name: ${fullName}
Nickname: ${nickName || "None"}
`;

  await streamFromOllama(res, prompt);
});

module.exports = router;
