import React, { useState } from "react";
import "../../style/NameNumerology/NameCalc.css";

const PYTHAGOREAN_MAP = {
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

     const total = letters.reduce((sum, ch) => sum + (PYTHAGOREAN_MAP[ch] || 0), 0);
     return reduceNumber(total);
};

const NameCalc = () => {
     const [fullName, setFullName] = useState("");
     const [nickname, setNickname] = useState("");
     const [nameNumber, setNameNumber] = useState(null);

     const handleCalculate = () => {
          const baseName = nickname.trim() ? nickname : fullName;
          const result = calculateNameNumber(baseName);
          setNameNumber(result);
     };

     return (
          <div className="Name-container">
               {/* LEFT SIDE - CALCULATOR */}
               <div className="calc name">
                    <div className="name-card-ui">
                         <h2>
                              Name Numerology <br /> Calculator
                         </h2>

                         <label>Full Name</label>
                         <input
                              type="text"
                              placeholder="Enter Full Name"
                              value={fullName}
                              onChange={(e) => setFullName(e.target.value)}
                         />

                         <label>Nickname (Optional)</label>
                         <input
                              type="text"
                              placeholder="Enter Nickname (Optional)"
                              value={nickname}
                              onChange={(e) => setNickname(e.target.value)}
                         />

                         <button onClick={handleCalculate}>Calculate Name Number</button>

                         <p className="result-title">Your Name Number</p>
                         <div className="result-box">{nameNumber !== null ? nameNumber : "--"}</div>
                    </div>
               </div>

               {/* RIGHT SIDE - OUTPUT BOX */}
               <div className="name-output-ui">
                    <h3>Name Numerology Output</h3>

                    <p>
                         <strong>Name Number:</strong> {nameNumber !== null ? nameNumber : "--"}
                    </p>

                    <p>
                         <strong>Overall vibration:</strong> --
                    </p>

                    <p>
                         <strong>Positive effects:</strong> --
                    </p>

                    <p>
                         <strong>Negative effects:</strong> --
                    </p>

                    <p>
                         <strong>Name correction advice:</strong> --
                    </p>

                    <p style={{ marginTop: "20px", opacity: "0.7" }}>
                         (Vibration, effects, and advice will come from API)
                    </p>
               </div>
          </div>
     );
};

export default NameCalc;
