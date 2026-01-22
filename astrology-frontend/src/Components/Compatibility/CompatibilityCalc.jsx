import React, { useState } from "react";
import "../../style/Compatibility/CompatibilityCalc.css";

const CompatibilityCalc = () => {
     const [name1, setName1] = useState("");
     const [dob1, setDob1] = useState("");
     const [name2, setName2] = useState("");
     const [dob2, setDob2] = useState("");
     const [relationshipType, setRelationshipType] = useState("Love");

     const [result, setResult] = useState(null);

     const handleCalculate = () => {
          // ❌ No API call here (backend person will add)
          // Only show basic output placeholders
          setResult({
               lifePath1: "--",
               lifePath2: "--",
               score: "--%",
               strengths: "--",
               conflicts: "--",
               advice: "--",
          });
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

                         <button onClick={handleCalculate}>Check Compatibility</button>

                         <p className="result-title">Compatibility Result</p>
                         <div className="result-box">{result ? "Ready" : "--"}</div>
                    </div>
               </div>

               {/* RIGHT SIDE - OUTPUT BOX */}
               <div className="compatibility-output-ui">
                    <h3>Compatibility Output</h3>

                    <p>
                         <strong>Life Path Number (Person 1) :</strong>{" "}
                         {result ? result.lifePath1 : "--"}
                    </p>

                    <p>
                         <strong>Life Path Number (Person 2) :</strong>{" "}
                         {result ? result.lifePath2 : "--"}
                    </p>

                    <p>
                         <strong>Compatibility Percentage :</strong>{" "}
                         {result ? result.score : "--%"}
                    </p>

                    <p>
                         <strong>Strength areas :</strong> {result ? result.strengths : "--"}
                    </p>

                    <p>
                         <strong>Conflict areas :</strong> {result ? result.conflicts : "--"}
                    </p>

                    <p>
                         <strong>Advice :</strong> {result ? result.advice : "--"}
                    </p>

                    <p style={{ marginTop: "20px", opacity: "0.7" }}>
                         (Final output will come from API)
                    </p>
               </div>
          </div>
     );
};

export default CompatibilityCalc;
