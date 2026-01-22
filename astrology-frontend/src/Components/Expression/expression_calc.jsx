import React, { useState } from "react";

const Expression_Calc = () => {
     const [fullName, setFullName] = useState("");
     const [showResult, setShowResult] = useState(false);

     const handleCalculate = () => {
          if (!fullName.trim()) {
               setShowResult(false);
               return;
          }
          setShowResult(true);
     };

     return (
          <section className="expression-section">
               <div className="expression-container">
                    {/* LEFT CARD */}
                    <div className="expression-card">
                         <h2 className="expression-title">
                              Destiny Number <br /> Calculator
                         </h2>

                         <div className="expression-form">
                              <label className="expression-label">Enter First Name</label>
                              <input
                                   type="text"
                                   className="expression-input"
                                   placeholder=""
                                   value={fullName}
                                   onChange={(e) => {
                                        setFullName(e.target.value);
                                        setShowResult(false); // user type kare to result hide
                                   }}
                              />
                         </div>

                         <button className="expression-btn" onClick={handleCalculate}>
                              Calculate Destiny Number
                         </button>

                         <p className="expression-subtitle">Your Destiny Number</p>

                         <div className="expression-mini-output">
                              {showResult ? (
                                   <span className="expression-mini-number">5</span>
                              ) : (
                                   <span className="expression-mini-placeholder">--</span>
                              )}
                         </div>
                    </div>

                    {/* RIGHT OUTPUT PANEL (image jaisa blank box) */}
                    <div className="expression-result-panel">
                         {!showResult ? (
                              // Default me bilkul empty look (no text)
                              <div className="expression-empty" />
                         ) : (
                              // Button click ke baad yaha output show hoga
                              <div className="expression-result-content">
                                   <h3 className="expression-result-title">Result</h3>

                                   <div className="expression-result-box">
                                        <p className="expression-result-label">Name</p>
                                        <p className="expression-result-value">{fullName}</p>
                                   </div>

                                   <div className="expression-result-box">
                                        <p className="expression-result-label">Destiny Number</p>
                                        <p className="expression-result-value big">5</p>
                                   </div>

                                   <div className="expression-result-box">
                                        <p className="expression-result-label">Meaning</p>
                                        <p className="expression-result-value">
                                             Freedom-loving, adaptable, energetic
                                        </p>
                                   </div>

                                   <div className="expression-result-box">
                                        <p className="expression-result-label">Strengths</p>
                                        <p className="expression-result-value">
                                             Communication, versatility, creativity
                                        </p>
                                   </div>

                                   <div className="expression-result-box">
                                        <p className="expression-result-label">Challenges</p>
                                        <p className="expression-result-value">
                                             Restlessness, lack of focus
                                        </p>
                                   </div>

                                   <div className="expression-result-box">
                                        <p className="expression-result-label">Career Suggestions</p>
                                        <p className="expression-result-value">
                                             Marketing, media, travel, sales, entrepreneurship
                                        </p>
                                   </div>
                              </div>
                         )}
                    </div>
               </div>
          </section>
     );
};

export default Expression_Calc;
