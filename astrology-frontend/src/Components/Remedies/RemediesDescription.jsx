import React from "react";
import "../../style/Remedies/RemediesDescription.css";

const RemediesDescription = () => {
     return (
          <div className="description remedies">
               <div className="life-img">
                    <img src="src/images/remedius_num.jpg" alt="Remedies & Guidance" />
               </div>

               <div className="question">
                    <h1>What Are Remedies & Guidance?</h1>
                    <p>
                         Remedies & Guidance provide numerology-based solutions to improve life
                         balance. By using your name, date of birth, and problem area, it can
                         suggest lucky numbers, colors, days, and lifestyle guidance.
                    </p>
               </div>
          </div>
     );
};

export default RemediesDescription;
