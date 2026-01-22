import React from "react";
import "../../style/Compatibility/CompatibilityExplain.css";

const CompatibilityExplain = () => {
     return (
          <section className="lp-explain compatibility">
               <div className="lp-box">
                    <h3>Compatibility Calculation</h3>
                    <p>
                         Compatibility Numerology uses both people’s Life Path Numbers and
                         relationship type to calculate a compatibility percentage and guidance.
                    </p>
               </div>

               <div className="lp-box">
                    <h3>Example</h3>
                    <p>
                         Name 1: <b>KIRTAN PRAJAPATI</b><br />
                         DOB 1: <b>12-08-2005</b><br />
                         Name 2: <b>VANSH PATEL</b><br />
                         DOB 2: <b>21-02-2006</b><br />
                         Relationship: <b>Friendship</b><br /><br />
                         Output: <b>Compatibility Score: 78%</b><br />
                         Strengths: Mutual understanding, fun communication<br />
                         Challenges: Ego clashes<br />
                         Advice: Respect each other’s opinions
                    </p>
               </div>
          </section>
     );
};

export default CompatibilityExplain;
