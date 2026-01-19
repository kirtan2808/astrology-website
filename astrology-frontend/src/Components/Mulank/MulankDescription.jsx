import React from "react";
import "../../style/Mulank/mulank_description.css";

const MulankDescription = () => {
  return (
    <div className="description mulank">
      <div className="life-img">
        <img src="src/images/mulank1.jpg" alt="Mulank Number" />
      </div>

      <div className="question">
        <h1>What Is Mulank (Chaldean Number)?</h1>
        <p>
          Mulank Number, also known as the Chaldean Birth Number, is calculated
          using only the day on which you were born. It represents your core
          personality, natural behavior, and how the world sees you.
          This number influences your instincts, habits, and first reactions
          in life.
        </p>
      </div>
    </div>
  );
};

export default MulankDescription;
