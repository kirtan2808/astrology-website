import { useState } from "react";
import MarkdownRenderer from "../MarkdownRenderer";
import "../../style/Soul_urge/Soul_urge_calc.css";
import { API_BASE } from "../../utils/streamAI";

function SoulUrge_calc() {
  const [name, setName] = useState("");
  const [soulUrge, setSoulUrge] = useState("--");
  const [meaning, setMeaning] = useState("");
  const [details, setDetails] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // const [language, setLanguage] = useState("en"); default English
  
  const vowelValues = { A: 1, E: 5, I: 9, O: 6, U: 3 };

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

  const toArray = (v) => {
    if (Array.isArray(v)) return v;
    if (typeof v === "string") return [v];
    return [];
  };

  // 🔥 UPDATED JSON ➜ MARKDOWN WITH HEADING + DESCRIPTION
  const jsonToMarkdown = (data) => {
    let md = "";

    if (data.mainHeading) {
      const cleanHeading = data.mainHeading.replace(/\d+/g, "").trim();
      md += `# ${cleanHeading}\n\n`;
    }

    if (data.description) {
      md += `${data.description}\n\n`;
    }

    md += `### 🌟 Inner Desire\n`;
    toArray(data.innerDesire).forEach((i) => (md += `- ${i}\n`));

    md += `\n### 🧠 Emotional Nature\n`;
    toArray(data.emotionalNature).forEach((i) => (md += `- ${i}\n`));

    md += `\n### 💞 Relationships\n`;
    toArray(data.relationships).forEach((i) => (md += `- ${i}\n`));

    md += `\n### 💼 Work Satisfaction\n`;
    toArray(data.workSatisfaction).forEach((i) => (md += `- ${i}\n`));

    md += `\n### 🌱 Inner Fulfillment Advice\n`;
    toArray(data.innerFulfillmentAdvice).forEach((i) => (md += `- ${i}\n`));

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
        .map((l) => l.replace(/^data:\s*/, ""))
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

  const calculateSoulUrge = () => {
    if (!name.trim()) return;

    let total = 0;
    name.toUpperCase().split("").forEach((ch) => {
      if (vowelValues[ch]) total += vowelValues[ch];
    });

    let result = total;
    while (result > 9 && ![11, 22, 33].includes(result)) {
      result = reduce(result);
    }

    const meanings = {
      1: "Desire for independence and leadership",
      2: "Desire for harmony and emotional balance",
      3: "Desire for self-expression and joy",
      4: "Desire for stability and security",
      5: "Desire for freedom and adventure",
      6: "Desire for love, care, and responsibility",
      7: "Desire for wisdom and inner truth",
      8: "Desire for success and recognition",
      9: "Desire to serve humanity",
      11: "Spiritual insight and intuition",
      22: "Inner drive to build something meaningful",
      33: "Deep desire to heal and uplift others",
    };

    setSoulUrge(result);
    setMeaning(meanings[result]);
    setDetails("");

    const url = `${API_BASE}/api/soulurge-stream?name=${encodeURIComponent(
      name
    )}&soulUrge=${result}&language=${language}`;

    streamAI(url);
  };

  return (
    <div className="soulurge-container">
      <div className="soulurge-calc">
        <div className="soulurge-calculator-box">
          <h1>Soul Urge Number Calculator</h1>

          <div className="soulurge-input-group">
            <label>Enter Your First Name</label>
            <input
              type="text"
              className="soulurge-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

{/* <LanguageSelect
  language={language}
  setLanguage={setLanguage}
/> */}
          <button
            className="soulurge-calc-btn"
            onClick={calculateSoulUrge}
            disabled={!name || isLoading}
          >
            {isLoading ? "Calculating..." : "Calculate Soul Urge Number"}
          </button>

          <div className="soulurge-result">
            <div className="soulurge-result-label">Your Soul Urge Number</div>
            <div className="soulurge-number">{soulUrge}</div>
            <div className={`soulurge-meaning ${meaning ? "show" : ""}`}>
              {meaning}
            </div>
          </div>
        </div>
      </div>

      <div className="soulurge-ai-output">
        {isLoading && (
          <div className="soulurge-ai-loader">
            <div className="soulurge-ring"></div>
            <div className="soulurge-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <p>Reading your inner desires...</p>
          </div>
        )}

        {!isLoading && details && <MarkdownRenderer content={details} />}
      </div>
    </div>
  );
}

export default SoulUrge_calc;
