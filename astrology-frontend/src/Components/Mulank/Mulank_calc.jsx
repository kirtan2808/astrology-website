import { useState } from "react";
import MarkdownRenderer from "../MarkdownRenderer";
import "../../style/Mulank/mulank_calc.css";
import { API_BASE } from "../../utils/streamAI";

function Mulank_calc() {
  const [birthDate, setBirthDate] = useState("");
  const [mulank, setMulank] = useState("--");
  const [meaning, setMeaning] = useState("");
  const [details, setDetails] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

  // 🛡 Defensive helper
  const toArray = (v) => {
    if (Array.isArray(v)) return v;
    if (typeof v === "string") return [v];
    return [];
  };

  // 🔥 JSON ➜ MARKDOWN (LOGIC ONLY)
  const jsonToMarkdown = (data) => {
    let md = "";

    md += `### 🔢 Core Personality\n`;
    toArray(data.corePersonality).forEach(i => md += `- ${i}\n`);

    md += `\n### 🧠 Thinking & Behavior\n`;
    toArray(data.thinkingBehavior).forEach(i => md += `- ${i}\n`);

    md += `\n### 💼 Work & Action Style\n`;
    toArray(data.workStyle).forEach(i => md += `- ${i}\n`);

    md += `\n### 💪 Strengths\n`;
    toArray(data.strengths).forEach(i => md += `- ${i}\n`);

    md += `\n### ⚠️ Challenges\n`;
    toArray(data.challenges).forEach(i => md += `- ${i}\n`);

    md += `\n### 🌱 Life Guidance\n`;
    toArray(data.lifeGuidance).forEach(i => md += `- ${i}\n`);

    return md;
  };

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
        .map(l => l.replace(/^data:\s*/, ""))
        .join("")
        .trim();

      const json = JSON.parse(clean);
      const markdown = jsonToMarkdown(json);
      setDetails(markdown);

    } catch (err) {
      console.error("Streaming error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateMulank = () => {
    if (!birthDate) return;

    const date = new Date(birthDate);
    const day = date.getDate();
    const result = day > 9 ? reduce(day) : day;

    const meanings = {
      1: "Leader, independent, confident",
      2: "Sensitive, cooperative, emotional",
      3: "Creative, expressive, joyful",
      4: "Practical, disciplined, hardworking",
      5: "Adventurous, flexible, energetic",
      6: "Caring, responsible, family-oriented",
      7: "Analytical, spiritual, introverted",
      8: "Ambitious, powerful, authoritative",
      9: "Compassionate, humanitarian, generous",
    };

    setMulank(result);
    setMeaning(meanings[result]);
    setDetails("");

    const url = `${API_BASE}/api/mulank-stream?birthdate=${birthDate}&mulank=${result}`;
    streamAI(url);
  };

  return (
    <div className="Mulank-container">
      {/* LEFT – CALCULATOR */}
      <div className="calc">
        <div className="calculator-container">
          <h1>Mulank Number Calculator</h1>

          <div className="input-group">
            <label>Select Your Birth Date</label>
            <input
              type="date"
              className="date-input"
              value={birthDate}
              max={new Date().toISOString().split("T")[0]}
              onChange={(e) => setBirthDate(e.target.value)}
            />
          </div>

          <button
            className="calculate-btn"
            onClick={calculateMulank}
            disabled={!birthDate || isLoading}
          >
            {isLoading ? "Calculating..." : "Calculate Mulank Number"}
          </button>

          <div className="result-section">
            <div className="result-label">Your Mulank Number</div>
            <div className="life-path-number">{mulank}</div>
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
              <span></span>
              <span></span>
              <span></span>
            </div>
            <p>Reading your Life Path energy...</p>
          </div>
        )}

        {!isLoading && details && <MarkdownRenderer content={details} />}
      </div>
    </div>
  );
}

export default Mulank_calc;
