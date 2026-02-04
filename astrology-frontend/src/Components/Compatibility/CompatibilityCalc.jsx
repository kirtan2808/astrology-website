import { useState } from "react";
import MarkdownRenderer from "../MarkdownRenderer";
import "../../style/DestinyNo/destiny_calc.css";
import { API_BASE } from "../../utils/streamAI";

function CompatibilityCalc() {
  const [name1, setName1] = useState("");
  const [dob1, setDob1] = useState("");
  const [name2, setName2] = useState("");
  const [dob2, setDob2] = useState("");
  const [relationshipType, setRelationshipType] = useState("Love");
  // const [language, setLanguage] = useState("en"); // default English

  const [details, setDetails] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Restrict calendar to today only
  const today = new Date().toISOString().split("T")[0];

  const jsonToMarkdown = (data) => {
    let md = "";

    md += `# Compatibility Analysis\n\n`;

    if (data.description) {
      md += `${data.description}\n\n`;
    }

    md += `### 💞 Compatibility Score\n`;
    md += `**${data.compatibilityScore || 0}%**\n\n`;

    md += `### 💚 Strength Areas\n`;

    if (Array.isArray(data.strengthAreas)) {
      data.strengthAreas.forEach((p) => (md += `- ${p}\n`));
    }

    md += `\n### ⚠️ Conflict Areas\n`;

    if (Array.isArray(data.conflictAreas)) {
      data.conflictAreas.forEach((p) => (md += `- ${p}\n`));
    }

    md += `\n### ✨ Advice\n`;

    if (Array.isArray(data.advice)) {
      data.advice.forEach((p) => (md += `- ${p}\n`));
    }

    return md;
  };

  const streamAI = async (url) => {
    setDetails("");
    setIsLoading(true);

    let buffer = "";

    try {
      const response = await fetch(url);
      if (!response.body) throw new Error("Stream not supported");

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
      }

      const clean = buffer
        .split("\n")
        .map((line) => line.replace(/^data:\s*/, ""))
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

  const handleCalculate = () => {
    if (!name1 || !dob1 || !name2 || !dob2) return;

    const url = `${API_BASE}/api/compatibility-stream?name1=${encodeURIComponent(
      name1
    )}&dob1=${encodeURIComponent(dob1)}&name2=${encodeURIComponent(
      name2
    )}&dob2=${encodeURIComponent(
      dob2
    )}&relationshipType=${encodeURIComponent(relationshipType)}&language=${language}`;

    streamAI(url);
  };

  return (
    <div className="Mulank-container">
      <div className="calc">
        <div className="calculator-container">
          <h1>Compatibility Calculator</h1>

          <div className="input-group">
            <label>Person 1 Name</label>
            <input
              type="text"
              className="date-input"
              value={name1}
              onChange={(e) => setName1(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Person 1 Date of Birth</label>
            <input
              type="date"
              className="date-input"
              value={dob1}
              max={today}
              onChange={(e) => setDob1(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Person 2 Name</label>
            <input
              type="text"
              className="date-input"
              value={name2}
              onChange={(e) => setName2(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Person 2 Date of Birth</label>
            <input
              type="date"
              className="date-input"
              value={dob2}
              max={today}
              onChange={(e) => setDob2(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Relationship Type</label>
            <select
              className="date-input"
              value={relationshipType}
              onChange={(e) => setRelationshipType(e.target.value)}
            >
              <option>Love</option>
              <option>Marriage</option>
              <option>Friendship</option>
              <option>Business</option>
            </select>
          </div>

          {/* <LanguageSelect
            language={language}
            setLanguage={setLanguage}
          /> */}
          <button
            className="calculate-btn"
            onClick={handleCalculate}
            disabled={isLoading}
          >
            {isLoading ? "Analyzing..." : "Check Compatibility"}
          </button>
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
            <p>Analyzing relationship compatibility...</p>
          </div>
        )}

        {!isLoading && details && (
          <MarkdownRenderer content={details} />
        )}
      </div>
    </div>
  );
}

export default CompatibilityCalc;
