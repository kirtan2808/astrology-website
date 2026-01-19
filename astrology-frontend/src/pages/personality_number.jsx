import React from "react";
import DestinyDescription from "../Components/personality_number/personality_description";
import "../style/personality_number/personality_description.css";
import Destiny_calc from "../Components/personality_number/personality_calc";
import "../style/personality_number/personality_calc.css";
import DestinyExplain from "../Components/personality_number/personality_explain";
import "../style/personality_number/personality_explain.css";


const PersonalityNumber = () => {
    return (
        <>
            <DestinyDescription />
            <Destiny_calc />
            <DestinyExplain />
        </>
    );
};

export default PersonalityNumber;
