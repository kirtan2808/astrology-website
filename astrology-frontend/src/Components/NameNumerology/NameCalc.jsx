import { useState } from "react";
import MarkdownRenderer from "../MarkdownRenderer";
import "../../style/NameNumerology/NameCalc.css";
import { API_BASE } from "../../utils/streamAI";


function NameCalc() {
  const [fullName, setFullName] = useState("");
  const [nickname, setNickname] = useState("");
  const [nameNumber, setNameNumber] = useState("--");
  const [details, setDetails] = useState("");
  const [isLoading, setIsLoading] = useState(false);
    // const [language, setLanguage] = useState("en");  default English?

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

  const isMasterNumber = (n) => n === 11 || n === 22 || n === 33;

  const reduceNumber = (num) => {
    let n = num;
    while (n > 9 && !isMasterNumber(n)) {
      n = String(n)
        .split("")
        .reduce((acc, d) => acc + Number(d), 0);
    }
    return n;
  };

  const calculateNameNumber = (name) => {
    if (!name) return 0;

    const letters = name
      .toUpperCase()
      .replace(/[^A-Z]/g, "")
      .split("");

    const total = letters.reduce(
      (sum, ch) => sum + (letterValues[ch] || 0),
      0
    );

    return reduceNumber(total);
  };

  const jsonToMarkdown = (data) => {
    let md = "";

    if (data.mainHeading) {
      // 🔥 REMOVE NUMBER FROM HEADING COMPLETELY
      const cleanHeading = data.mainHeading.replace(/[:\s]*\d+/g, "").trim();
      md += `# ${cleanHeading}\n\n`;
    }

    if (data.description) {
      md += `${data.description}\n\n`;
    }

    md += `### 🔮 Overall Vibration\n`;
    data.overallVibration?.forEach(p => md += `- ${p}\n`);

    md += `\n### ✅ Positive Effects\n`;
    data.positiveEffects?.forEach(p => md += `- ${p}\n`);

    md += `\n### ⚠️ Negative Effects\n`;
    data.negativeEffects?.forEach(p => md += `- ${p}\n`);

    md += `\n### ✨ Name Correction Advice\n`;
    data.nameCorrectionAdvice?.forEach(p => md += `- ${p}\n`);

    return md;
  };

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
        .map(line => line.replace(/^data:\s*/, ""))
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
        "⚠️ Unable to load name numerology analysis at the moment. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCalculate = () => {
    if (!fullName.trim()) return;

    const baseName = nickname.trim() ? nickname : fullName;

    const result = calculateNameNumber(baseName);

    setNameNumber(result);
    setDetails("");

    const url = `${API_BASE}/api/name-analysis-stream?fullName=${encodeURIComponent(
      fullName
    )}&nickName=${encodeURIComponent(nickname)}&nameNumber=${result}`;

    streamAI(url);
  };

  return (
    <div className="Name-container">
      <div className="calc">
        <div className="calculator-container">
          <h1>Name Numerology Calculator</h1>

          <div className="input-group">
            <label>Enter Full Name</label>
            <input
              type="text"
              className="date-input"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Nickname (Optional)</label>
            <input
              type="text"
              className="date-input"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          </div>

          {/* <LanguageSelect
            language={language}
            setLanguage={setLanguage}
          /> */}
          <button
            className="calculate-btn"
            onClick={handleCalculate}
            disabled={!fullName || isLoading}
          >
            {isLoading ? "Calculating..." : "Calculate Name Number"}
          </button>

          <div className="result-section">
            <div className="result-label">Your Name Number</div>
            <div className="life-path-number">{nameNumber}</div>
          </div>
        </div>
      </div>

      <div className="lp-explain-ai">
        {isLoading && (
          <div className="ai-loader">
            <p>Reading your Name Numerology energy...</p>
          </div>
        )}

        {!isLoading && details && (
          <MarkdownRenderer content={details} />
        )}
      </div>
    </div>
  );
}

export default NameCalc;
