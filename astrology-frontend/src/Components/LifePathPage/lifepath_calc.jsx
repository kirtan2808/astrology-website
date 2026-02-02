import { useState, useEffect } from "react";
import MarkdownRenderer from "../MarkdownRenderer";
import "../../style/LifePathPage/Lifepath_calc.css";
import { API_BASE } from "../../utils/streamAI";

function Lifepath_calc() {
  const [birthDate, setBirthDate] = useState("");
  const [lifePath, setLifePath] = useState("--");
  const [meaning, setMeaning] = useState("");
  const [details, setDetails] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const d = new Date();
    d.setFullYear(d.getFullYear() - 30);
    setBirthDate(d.toISOString().split("T")[0]);
  }, []);

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

    // Dynamic heading but remove digits (translator friendly)
    if (data.mainHeading) {
      const cleanHeading = data.mainHeading.replace(/\d+/g, "").trim();
      md += `# ${cleanHeading}\n\n`;
    }

    // Dynamic description
    if (data.description) {
      md += `${data.description}\n\n`;
    }

    md += `### 🌱 Life Purpose\n`;
    data.lifePurpose.forEach(p => md += `- ${p}\n`);

    md += `\n### 💼 Career & Work\n`;
    data.career.suitable.forEach(c => md += `- ${c}\n`);

    md += `\n**Work Style:** ${data.career.workStyle}\n`;
    md += `\n**Growth Advice:** ${data.career.growthAdvice}\n`;

    md += `\n### 💪 Strengths\n`;
    data.strengths.forEach(s => md += `- ${s}\n`);

    md += `\n### ⚠️ Challenges\n`;
    data.challenges.forEach(c => md += `- ${c}\n`);

    md += `\n### 💰 Money & Stability\n`;
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

  const calculateLifePath = () => {
    if (!birthDate) return;

    const date = new Date(birthDate);
    const d = reduce(date.getDate());
    const m = reduce(date.getMonth() + 1);
    const y = reduce(date.getFullYear());

    let result = d + m + y;
    while (result > 9 && ![11, 22, 33].includes(result)) {
      result = reduce(result);
    }

    const meanings = {
      1: "Leader",
      2: "Peacemaker",
      3: "Communicator",
      4: "Builder",
      5: "Adventurer",
      6: "Nurturer",
      7: "Seeker",
      8: "Achiever",
      9: "Humanitarian",
      11: "Master Intuitive",
      22: "Master Builder",
      33: "Master Teacher",
    };

    setLifePath(result);
    setMeaning(meanings[result]);
    setDetails("");

    const url = `${API_BASE}/api/lifepath-stream?birthdate=${birthDate}&lifePath=${result}`;
    streamAI(url);
  };

  return (
    <div className="Mulank-container">
      <div className="calc">
        <div className="calculator-container">
          <h1>Life Path Number Calculator</h1>

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
            onClick={calculateLifePath}
            disabled={!birthDate || isLoading}
          >
            {isLoading ? "Calculating..." : "Calculate Life Path Number"}
          </button>

          <div className="result-section">
            <div className="result-label">Your Life Path Number</div>
            <div className="life-path-number">{lifePath}</div>
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

export default Lifepath_calc;
