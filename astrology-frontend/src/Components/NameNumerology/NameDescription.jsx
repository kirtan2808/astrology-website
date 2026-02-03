import React from "react";
import "../../style/NameNumerology/NameDescription.css";

const NameDescription = () => {
     return (
          <div className="description name">
               <div className="life-img">
                    <img src="src/images/name_numerology.jpeg" alt="Name Numerology" />
               </div>

               <div className="question">
                    <h1>What Is Name Numerology?</h1>
                    <p>
                         Name Numerology (Name Analysis) shows the overall energy and vibration
                         of your name. It is calculated using your full name and helps you
                         understand the positive effects, negative effects, and the type of
                         energy your name carries in daily life.
                    </p>
               </div>
          </div>
     );
};

export default NameDescription;
