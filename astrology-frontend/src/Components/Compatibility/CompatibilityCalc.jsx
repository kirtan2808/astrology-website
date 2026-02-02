import { useState } from "react";
import MarkdownRenderer from "../MarkdownRenderer";
import "../../style/Compatibility/CompatibilityCalc.css";
import { API_BASE } from "../../utils/streamAI";

function CompatibilityCalc() {
  const [name1, setName1] = useState("");
  const [dob1, setDob1] = useState("");
  const [name2, setName2] = useState("");
  const [dob2, setDob2] = useState("");
  const [relationshipType, setRelationshipType] = useState("Love");

  const [details, setDetails] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // 🔥 Convert JSON to Markdown
  const jsonToMarkdown = (data) => {
    let md = "";

    if (data.mainHeading) {
      const cleanHeading = data.mainHeading.replace(/[:\s]*\d+/g, "").trim();
      md += `# ${cleanHeading}\n\n`;
    }

    if (data.description) {
      md += `${data.description}\n\n`;
    }

    md += `### 💞 Compatibility Score\n`;
    md += `**${data.compatibilityScore}%**\n\n`;

    md += `### 💚 Strength Areas\n`;
    data.strengthAreas?.forEach((p) => (md += `- ${p}\n`));

    md += `\n### ⚠️ Conflict Areas\n`;
    data.conflictAreas?.forEach((p) => (md += `- ${p}\n`));

    md += `\n### ✨ Advice\n`;
    data.advice?.forEach((p) => (md += `- ${p}\n`));

    return md;
  };

  // 🔥 SSE Streaming Function
  const streamAI = async (url) => {
    setDetails("");
    setIsLoading(true);

    let buffer = "";

    try {
      const response = await fetch(url);

      if (!response.body) {
        throw new Error("ReadableStream not supported");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
      }

      let clean = buffer
        .split("\n")
        .map((line) => line.replace(/^data:\s*/, ""))
        .join("")
        .trim();

      const jsonStart = clean.indexOf("{");
      const jsonEnd = clean.lastIndexOf("}");

      if (jsonStart === -1 || jsonEnd === -1) {
        throw new Error("No valid JSON found in response");
      }

      const jsonString = clean.substring(jsonStart, jsonEnd + 1);

      const json = JSON.parse(jsonString);

      const markdown = jsonToMarkdown(json);

      setDetails(markdown);
    } catch (err) {
      console.error("Streaming error:", err);

      setDetails(
        "⚠️ Unable to load compatibility analysis at the moment. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCalculate = () => {
    if (!name1 || !dob1 || !name2 || !dob2) return;

    setDetails("");

    const url = `${API_BASE}/api/compatibility-stream?name1=${encodeURIComponent(
      name1
    )}&dob1=${encodeURIComponent(dob1)}&name2=${encodeURIComponent(
      name2
    )}&dob2=${encodeURIComponent(
      dob2
    )}&relationshipType=${encodeURIComponent(relationshipType)}`;

    streamAI(url);
  };

  return (
    <div className="Compatibility-container">
      {/* LEFT SIDE - CALCULATOR */}
      <div className="calc compatibility">
        <div className="compatibility-card-ui">
          <h2>
            Compatibility <br /> Calculator
          </h2>

          <label>Person 1 Full Name</label>
          <input
            type="text"
            placeholder="Enter Person 1 Full Name"
            value={name1}
            onChange={(e) => setName1(e.target.value)}
          />

          <label>Person 1 Date of Birth</label>
          <input
            type="date"
            value={dob1}
            onChange={(e) => setDob1(e.target.value)}
          />

          <label>Person 2 Full Name</label>
          <input
            type="text"
            placeholder="Enter Person 2 Full Name"
            value={name2}
            onChange={(e) => setName2(e.target.value)}
          />

          <label>Person 2 Date of Birth</label>
          <input
            type="date"
            value={dob2}
            onChange={(e) => setDob2(e.target.value)}
          />

          <label>Relationship Type</label>
          <select
            value={relationshipType}
            onChange={(e) => setRelationshipType(e.target.value)}
          >
            <option value="Love">Love</option>
            <option value="Marriage">Marriage</option>
            <option value="Business">Business</option>
            <option value="Friendship">Friendship</option>
          </select>

          <button
            className="calculate-btn"
            onClick={handleCalculate}
            disabled={!name1 || !dob1 || !name2 || !dob2 || isLoading}
          >
            {isLoading ? "Analyzing..." : "Check Compatibility"}
          </button>

          <p className="result-title">Compatibility Result</p>
          <div className="result-box">{details ? "Ready" : "--"}</div>
        </div>
      </div>

      {/* RIGHT SIDE - OUTPUT BOX */}
      <div className="compatibility-output-ui">
        {isLoading && (
          <div className="ai-loader">
            <div className="ai-ring"></div>
            <div className="ai-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <p>Analyzing your relationship energy...</p>
          </div>
        )}

        {!isLoading && details && <MarkdownRenderer content={details} />}
      </div>
    </div>
  );
}

export default CompatibilityCalc;
