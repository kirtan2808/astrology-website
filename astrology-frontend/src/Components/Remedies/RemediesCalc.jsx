import React, { useState } from "react";
import "../../style/Remedies/RemediesCalc.css";

const RemediesCalc = () => {
     const [fullName, setFullName] = useState("");
     const [dob, setDob] = useState("");
     const [problemArea, setProblemArea] = useState("Career");

     const [result, setResult] = useState(null);

     const handleCalculate = () => {
          // ❌ No API call here (backend person will add)
          setResult({
               luckyNumber: "--",
               luckyColor: "--",
               luckyDay: "--",
               mantra: "--",
               guidance: "--",
               lifestyleTip: "--",
          });
     };

     return (
          <div className="Remedies-container">
               {/* LEFT SIDE - CALCULATOR */}
               <div className="calc remedies">
                    <div className="remedies-card-ui">
                         <h2>
                              Remedies & <br /> Guidance
                         </h2>

                         <label>Full Name</label>
                         <input
                              type="text"
                              placeholder="Enter Full Name"
                              value={fullName}
                              onChange={(e) => setFullName(e.target.value)}
                         />

                         <label>Date of Birth</label>
                         <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} />

                         <label>Problem Area</label>
                         <select value={problemArea} onChange={(e) => setProblemArea(e.target.value)}>
                              <option value="Career">Career</option>
                              <option value="Health">Health</option>
                              <option value="Relationship">Relationship</option>
                              <option value="Finance">Finance</option>
                              <option value="Education">Education</option>
                         </select>

                         <button onClick={handleCalculate}>Get Remedies</button>

                         <p className="result-title">Your Remedies Output</p>
                         <div className="result-box">{result ? "Ready" : "--"}</div>
                    </div>
               </div>

               {/* RIGHT SIDE - OUTPUT BOX */}
               <div className="remedies-output-ui">
                    <h3>Remedies & Guidance Output</h3>

                    <p>
                         <strong>Lucky Number:</strong> {result ? result.luckyNumber : "--"}
                    </p>

                    <p>
                         <strong>Lucky Color:</strong> {result ? result.luckyColor : "--"}
                    </p>

                    <p>
                         <strong>Lucky Day:</strong> {result ? result.luckyDay : "--"}
                    </p>

                    <p>
                         <strong>Mantra:</strong> {result ? result.mantra : "--"}
                    </p>

                    <p>
                         <strong>Lifestyle advice:</strong> {result ? result.guidance : "--"}
                    </p>

                    <p>
                         <strong>Lifestyle Tip:</strong> {result ? result.lifestyleTip : "--"}
                    </p>

                    <p style={{ marginTop: "20px", opacity: "0.7" }}>
                         (Final remedies will come from API)
                    </p>
               </div>
          </div>
     );
};

export default RemediesCalc;
