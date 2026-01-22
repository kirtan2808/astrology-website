import React from "react";
import "../../style/Personality/personality_description.css";

const PersonalityDescription = () => {
     return (
          <div className="description personality">
               <div className="life-img">
                    <img src="src/images/personality_des.webp" alt="Personality Number" />
               </div>

               <div className="question">
                    <h1>What Is Personality Number?</h1>
                    <p>
                         The Personality Number shows how others see you — your outer personality,
                         public image, and first impression. It is calculated using only the
                         consonants from your full name and reflects your social behavior and
                         how you appear to the world.
                    </p>
               </div>
          </div>
     );
};

export default PersonalityDescription;
