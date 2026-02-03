import { useState } from "react";
import MarkdownRenderer from "../MarkdownRenderer";
import "../../style/Personality/personality_calc.css";
import { API_BASE } from "../../utils/streamAI";
import LanguageSelect from "../LanguageSelect";

function PersonalityCalc() {
  const [name, setName] = useState("");
  const [personality, setPersonality] = useState("--");
  const [meaning, setMeaning] = useState("");
  const [details, setDetails] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState("en"); // default English

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

  const vowels = ["A", "E", "I", "O", "U"];

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

  const jsonToMarkdown = (data) => {
    let md = "";

    if (data.mainHeading) {
      const cleanHeading = data.mainHeading.replace(/\d+/g, "").trim();
      md += `# ${cleanHeading}\n\n`;
    }

    if (data.description) {
      md += `${data.description}\n\n`;
    }

    md += `### 🌍 Public Image\n`;
    data.publicImage?.forEach(p => md += `- ${p}\n`);

    md += `\n### 🌱 Social Behavior\n`;
    data.socialBehavior?.forEach(p => md += `- ${p}\n`);

    md += `\n### 👀 First Impression\n`;
    data.firstImpression?.forEach(p => md += `- ${p}\n`);

    return md;
  };

  // 🔥 UPDATED STREAM FUNCTION – MADE COMPATIBLE WITH YOUR BACKEND
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

      // 🔥 Extract JSON from raw SSE text
      let clean = buffer
        .split("\n")
        .map(line => line.replace(/^data:\s*/, ""))
        .join("")
        .trim();

      // Find JSON block safely
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
        "⚠️ Unable to load personality analysis at the moment. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const calculatePersonality = () => {
    if (!name.trim()) return;

    let total = 0;

    name.toUpperCase().split("").forEach(ch => {
      if (letterValues[ch] && !vowels.includes(ch)) {
        total += letterValues[ch];
      }
    });

    let result = total;

    while (result > 9 && ![11, 22, 33].includes(result)) {
      result = reduce(result);
    }

    const meanings = {
      1: "Confident & Independent",
      2: "Gentle & Cooperative",
      3: "Friendly & Expressive",
      4: "Practical & Reliable",
      5: "Energetic & Dynamic",
      6: "Warm & Caring",
      7: "Reserved & Thoughtful",
      8: "Powerful & Authoritative",
      9: "Compassionate & Charismatic",
      11: "Highly Intuitive",
      22: "Strong Presence",
      33: "Inspiring Personality",
    };

    setPersonality(result);
    setMeaning(meanings[result]);
    setDetails("");

    const url = `${API_BASE}/api/personality-stream?fullName=${encodeURIComponent(
      name
    )}&personalityNumber=${result}`;

    streamAI(url);
  };

  return (
    <div className="Personality-container">
      <div className="calc">
        <div className="calculator-container">
          <h1>Personality Number Calculator</h1>

          <div className="input-group">
            <label>Enter Your Full Name</label>
            <input
              type="text"
              className="date-input"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <LanguageSelect
            language={language}
            setLanguage={setLanguage}
          />
          <button
            className="calculate-btn"
            onClick={calculatePersonality}
            disabled={!name || isLoading}
          >
            {isLoading ? "Calculating..." : "Calculate Personality Number"}
          </button>

          <div className="result-section">
            <div className="result-label">Your Personality Number</div>
            <div className="life-path-number">{personality}</div>

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
            <p>Reading your Personality energy...</p>
          </div>
        )}

        {!isLoading && details && (
          <MarkdownRenderer content={details} />
        )}
      </div>
    </div>
  );
}

export default PersonalityCalc;
