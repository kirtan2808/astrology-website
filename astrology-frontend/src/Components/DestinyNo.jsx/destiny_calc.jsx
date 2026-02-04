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
  // const [language, setLanguage] = useState("en"); // default English

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

  // 🔥 JSON ➜ MARKDOWN WITH DYNAMIC HEADING + DESCRIPTION
  const jsonToMarkdown = (data) => {
    let md = "";

    if (data.mainHeading) {
      const cleanHeading = data.mainHeading.replace(/\d+/g, "").trim();
      md += `# ${cleanHeading}\n\n`;
    }

    if (data.description) {
      md += `${data.description}\n\n`;
    }

    md += `### 🌟 Core Life Purpose\n`;
    data.corePurpose.forEach(p => md += `- ${p}\n`);

    md += `\n### 💼 Career Direction\n`;
    data.career.suitable.forEach(c => md += `- ${c}\n`);

    md += `\n**Work Style:** ${data.career.workStyle}\n`;
    md += `\n**Growth Advice:** ${data.career.growthAdvice}\n`;

    md += `\n### 💪 Strengths\n`;
    data.strengths.forEach(s => md += `- ${s}\n`);

    md += `\n### ⚠️ Weaknesses\n`;
    data.weaknesses.forEach(w => md += `- ${w}\n`);

    md += `\n### 💰 Money Mindset\n`;
    md += `${data.money}\n`;

    md += `\n### ❤️ Relationships\n`;
    md += `${data.relationships}\n`;

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
        .map(line => line.replace(/^data:\s*/, ""))
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
      1: "Leader",
      2: "Diplomat",
      3: "Creator",
      4: "Builder",
      5: "Explorer",
      6: "Caretaker",
      7: "Thinker",
      8: "Achiever",
      9: "Humanitarian",
      11: "Master Intuitive",
      22: "Master Builder",
      33: "Master Teacher",
    };

    setDestiny(result);
    setMeaning(meanings[result]);
    setDetails("");

    const url = `${API_BASE}/api/destiny-stream?name=${encodeURIComponent(
      name
    )}&destiny=${result}&language=${language}`;

    streamAI(url);
  };

  return (
    <div className="Mulank-container">
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

          {/* <LanguageSelect
            language={language}
            setLanguage={setLanguage}
          /> */}

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

        {!isLoading && details && (
          <MarkdownRenderer content={details} />
        )}
      </div>
    </div>
  );
}

export default Destiny_calc;
