// import { useState } from "react";
// import "../../style/Remedies/RemediesCalc.css";
// import { API_BASE } from "../../utils/streamAI";

// const RemediesCalc = () => {
//   const [fullName, setFullName] = useState("");
//   const [dob, setDob] = useState("");
//   const [problemArea, setProblemArea] = useState("Career");

//   const [output, setOutput] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   // const [language, setLanguage] = useState("en");  default English

//   // Restrict calendar to today
//   const today = new Date().toISOString().split("T")[0];

//   // Stream AI from backend
//   const streamAI = async (url) => {
//     setOutput(null);
//     setIsLoading(true);

//     let buffer = "";

//     try {
//       const response = await fetch(url);

//       if (!response.body) throw new Error("ReadableStream not supported");

//       const reader = response.body.getReader();
//       const decoder = new TextDecoder("utf-8");

//       while (true) {
//         const { value, done } = await reader.read();
//         if (done) break;
//         buffer += decoder.decode(value, { stream: true });
//       }

//       // Clean SSE formatting
//       const clean = buffer
//         .split("\n")
//         .map((line) => line.replace(/^data:\s*/, ""))
//         .join("")
//         .trim();

//       if (!clean) {
//         throw new Error("No valid JSON found in response");
//       }

//       const json = JSON.parse(clean); // ONLY parse what backend returns dynamically
//       setOutput(json);
//     } catch (err) {
//       console.error("Streaming error:", err);
//       setOutput(null); // do NOT show any static fallback
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleCalculate = () => {
//     if (!fullName || !dob || !problemArea) return;

//     const url = `${API_BASE}/api/remedies-stream?name=${encodeURIComponent(
//       fullName
//     )}&dob=${encodeURIComponent(dob)}&problemArea=${encodeURIComponent(
//       problemArea
//     )}&language=${language}`;

//     streamAI(url);
//   };

//   return (
//     <div className="Remedies-container">
//       {/* LEFT SIDE - CALCULATOR */}
//       <div className="calc remedies">
//         <div className="remedies-card-ui">
//           <h2>Remedies & Guidance</h2>

//           <label>Full Name</label>
//           <input
//             type="text"
//             value={fullName}
//             onChange={(e) => setFullName(e.target.value)}
//           />

//           <label>Date of Birth</label>
//           <input
//             type="date"
//             max={today}
//             value={dob}
//             onChange={(e) => setDob(e.target.value)}
//           />

//           <label>Problem Area</label>
//           <select
//             value={problemArea}
//             onChange={(e) => setProblemArea(e.target.value)}
//           >
//             <option value="Career">Career</option>
//             <option value="Health">Health</option>
//             <option value="Relationship">Relationship</option>
//             <option value="Finance">Finance</option>
//             <option value="Education">Education</option>
//           </select>

//           {/* <LanguageSelect
//             language={language}
//             setLanguage={setLanguage}
//           /> */}
//           <button
//             onClick={handleCalculate}
//             disabled={!fullName || !dob || isLoading}
//           >
//             {isLoading ? "Generating..." : "Get Remedies"}
//           </button>
//         </div>
//       </div>

//       {/* RIGHT SIDE - OUTPUT BOX */}
//       <div className="remedies-output-ui">

//         {isLoading && <p>Generating your personalized remedies...</p>}

//         {/* Display dynamic output only */}
//         {!isLoading && output && (
//           <div>
//             {/* Render all JSON keys dynamically */}
//             {Object.entries(output).map(([key, value]) => {
//               if (Array.isArray(value)) {
//                 return (
//                   <div key={key}>
//                     <strong>{key.replace(/([A-Z])/g, " $1")}:</strong>
//                     <ul>
//                       {value.map((item, index) => (
//                         <li key={index}>{item}</li>
//                       ))}
//                     </ul>
//                   </div>
//                 );
//               } else {
//                 return (
//                   <p key={key}>
//                     <strong>{key.replace(/([A-Z])/g, " $1")}:</strong> {value}
//                   </p>
//                 );
//               }
//             })}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default RemediesCalc;
