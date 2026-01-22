import React, { useState } from "react";
import "../../style/Personality/personality_calc.css";

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

const VOWELS = new Set(["A", "E", "I", "O", "U"]);
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

const calculatePersonalityNumber = (name) => {
     if (!name) return 0;

     const letters = name
          .toUpperCase()
          .replace(/[^A-Z]/g, "")
          .split("");

     // ✅ Only consonants
     const consonants = letters.filter((ch) => !VOWELS.has(ch));

     const total = consonants.reduce((sum, ch) => sum + (PYTHAGOREAN_MAP[ch] || 0), 0);
     return reduceNumber(total);
};

const PersonalityCalc = () => {
     const [fullName, setFullName] = useState("");
     const [personalityNumber, setPersonalityNumber] = useState(null);

     const handleCalculate = () => {
          const result = calculatePersonalityNumber(fullName);
          setPersonalityNumber(result);
     };

     return (
          <div className="Personality-container">
               {/* LEFT SIDE - CALCULATOR */}
               <div className="calc personality">
                    <div className="personality-card-ui">
                         <h2>Personality Number<br />Calculator</h2>

                         <label>Enter Full Name</label>
                         <input
                              type="text"
                              placeholder="Full Name"
                              value={fullName}
                              onChange={(e) => setFullName(e.target.value)}
                         />

                         <button onClick={handleCalculate}>
                              Calculate Personality Number
                         </button>

                         <p className="result-title">Your Personality Number</p>
                         <div className="result-box">
                              {personalityNumber !== null ? personalityNumber : "--"}
                         </div>
                    </div>
               </div>

               {/* RIGHT SIDE - OUTPUT BOX */}
               <div className="personality-output-ui">
                    <h3>Personality Number Output</h3>

                    <p>
                         <strong>Personality Number : </strong>{" "}
                         {personalityNumber !== null ? personalityNumber : "--"}
                    </p>

                    <p style={{ marginTop: "20px", opacity: "0.7" }}>
                         (Public image, Social behavior, First impression traits will come from API)
                    </p>
               </div>
          </div>
     );
};

export default PersonalityCalc;
