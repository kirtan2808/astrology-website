const express = require("express");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const router = express.Router();
const { OLLAMA_URL, OLLAMA_MODEL } = require("../config/ollama");
const { setSSEHeaders } = require("../utils/sse");

async function streamFromOllama(res, prompt) {
  let response = "";

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
        if (json.response) response += json.response;
        if (json.done) {
          res.write(`data: ${response}\n\n`);
          res.end();
        }
      } catch {}
    });
  });
}

router.get("/remedies-stream", async (req, res) => {
  const { fullName, dob, problemArea } = req.query;
  if (!fullName || !dob || !problemArea) return res.end();

  setSSEHeaders(res);

  const prompt = `
Return ONLY JSON.

Schema:
{
  "luckyNumber": number,
  "luckyColor": string,
  "luckyDay": string,
  "mantra": string,
  "lifestyleAdvice": string[]
}

Name: ${fullName}
DOB: ${dob}
Problem Area: ${problemArea}
`;

  await streamFromOllama(res, prompt);
});

module.exports = router;
