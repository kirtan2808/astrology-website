import React from "react";
import PersonalityDescription from "../Components/Personality/personality_description";
import PersonalityCalc from "../Components/Personality/personality_calc";
import PersonalityExplain from "../Components/Personality/personality_explain";

const Personality = () => {
     return (
          <>
               <PersonalityDescription />
               <PersonalityCalc />
               <PersonalityExplain />
          </>
     );
};

export default Personality;
