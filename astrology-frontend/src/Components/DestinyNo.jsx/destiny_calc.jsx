import { useState } from "react";
import MarkdownRenderer from "../MarkdownRenderer";
import "../../style/DestinyNo/destiny_calc.css";
import { API_BASE } from "../../utils/streamAI";

function Destiny_calc() {
  const [name, setName] = useState("");
  const [destiny, setDestiny] = useState("--");
  const [meaning, setMeaning] = useState("");
  const [details, setDetails] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const letterValues = {
    A: 1, J: 1, S: 1,
    B: 2, K: 2, T: 2,
    C: 3, L: 3, U: 3,
    D: 4, M: 4, V: 4,
    E: 5, N: 5, W: 5,
    F: 6, O: 6, X: 6,
    G: 7, P: 7, Y: 7,
    H: 8, Q: 8, Z: 8,
    I: 9, R: 9,
  };

  const reduce = (num) => {
    let sum = 0;
    while (num > 9) {
      sum = 0;
      while (num > 0) {
        sum += num % 10;
        num = Math.floor(num / 10);
      }
      num = sum;
    }
    return num;
  };

  // 🔥 JSON ➜ MARKDOWN (LOGIC ONLY)
  const jsonToMarkdown = (data) => {
    let md = "";

    md += `### 🌟 Core Life Purpose\n`;
    if (Array.isArray(data.corePurpose))
      data.corePurpose.forEach(p => md += `- ${p}\n`);

    md += `\n### 💼 Career Direction\n`;
    if (data.career?.suitable)
      data.career.suitable.forEach(c => md += `- ${c}\n`);
    if (data.career?.workStyle)
      md += `\n**Work Style:** ${data.career.workStyle}\n`;
    if (data.career?.growthAdvice)
      md += `\n**Growth Advice:** ${data.career.growthAdvice}\n`;

    if (Array.isArray(data.strengths)) {
      md += `\n### 💪 Strengths\n`;
      data.strengths.forEach(s => md += `- ${s}\n`);
    }

    if (Array.isArray(data.weaknesses)) {
      md += `\n### ⚠️ Weaknesses\n`;
      data.weaknesses.forEach(w => md += `- ${w}\n`);
    }

    if (data.money) {
      md += `\n### 💰 Money Mindset\n`;
      md += `${data.money}\n`;
    }

    if (data.relationships) {
      md += `\n### ❤️ Relationships\n`;
      md += `${data.relationships}\n`;
    }

    return md;
  };

  // ✅ STREAM LOGIC (DESIGN SAFE)
  const streamAI = async (url) => {
    setDetails("");
    setIsLoading(true);

    let buffer = "";

    try {
      const response = await fetch(url);
      if (!response.body) throw new Error("ReadableStream not supported");

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
      }

      const clean = buffer
        .split("\n")
        .map(line => line.replace(/^data:\s*/, ""))
        .join("")
        .trim();

      const json = JSON.parse(clean);
      const markdown = jsonToMarkdown(json);

      setDetails(markdown);
    } catch (err) {
      console.error("Streaming error:", err);
      setDetails("⚠️ Error fetching Destiny data.");
    } finally {
      setIsLoading(false);
    }
  };

  const calculateDestiny = () => {
    if (!name.trim()) return;

    let total = 0;
    name.toUpperCase().split("").forEach(ch => {
      if (letterValues[ch]) total += letterValues[ch];
    });

    let result = total;
    while (result > 9 && ![11, 22, 33].includes(result)) {
      result = reduce(result);
    }

    const meanings = {
      1: "Leader – Independent and confident",
      2: "Diplomat – Peaceful and cooperative",
      3: "Creator – Expressive and joyful",
      4: "Builder – Practical and disciplined",
      5: "Explorer – Freedom loving and adaptable",
      6: "Caretaker – Responsible and loving",
      7: "Thinker – Spiritual and analytical",
      8: "Achiever – Powerful and ambitious",
      9: "Humanitarian – Compassionate and giving",
      11: "Master Intuitive – Visionary and inspirational",
      22: "Master Builder – Practical visionary",
      33: "Master Teacher – Spiritual healer",
    };

    setDestiny(result);
    setMeaning(meanings[result]);
    setDetails("");

    const url = `${API_BASE}/api/destiny-stream?name=${encodeURIComponent(
      name
    )}&destiny=${result}`;

    streamAI(url);
  };

  return (
    <div className="Mulank-container">
      {/* LEFT – CALCULATOR */}
      <div className="calc">
        <div className="calculator-container">
          <h1>Destiny Number Calculator</h1>

          <div className="input-group">
            <label>Enter Your First Name</label>
            <input
              type="text"
              className="date-input"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>

          <button
            className="calculate-btn"
            onClick={calculateDestiny}
            disabled={!name || isLoading}
          >
            {isLoading ? "Calculating..." : "Calculate Destiny Number"}
          </button>

          <div className="result-section">
            <div className="result-label">Your Destiny Number</div>
            <div className="life-path-number">{destiny}</div>
            <div className={`meaning-text ${meaning ? "show" : ""}`}>
              {meaning}
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT – AI RESULT */}
      <div className="lp-explain-ai">
        {isLoading && (
          <div className="ai-loader">
            <div className="ai-ring"></div>
            <div className="ai-dots">
              <span></span><span></span><span></span>
            </div>
            <p>Reading your Destiny energy...</p>
          </div>
        )}

        {!isLoading && details && <MarkdownRenderer content={details} />}
      </div>
    </div>
  );
}

export default Destiny_calc;
