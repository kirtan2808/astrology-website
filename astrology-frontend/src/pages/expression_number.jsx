import React from "react";
import DestinyDescription from "../Components/expression_number/expression_description";
import "../style/expression_number/expression_description.css";
import Destiny_calc from "../Components/expression_number/expression_calc";
import "../style/expression_number/expression_calc.css";
import DestinyExplain from "../Components/expression_number/expression_explain";
import "../style/expression_number/expression_explain.css";


const ExpressionNumber = () => {
    return (
        <>
            <DestinyDescription />
            <Destiny_calc />
            <DestinyExplain />
        </>
    );
};

export default ExpressionNumber;
