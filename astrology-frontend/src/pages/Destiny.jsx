import React from "react";
import DestinyDescription from "../Components/DestinyNo.jsx/Destiny_description";
import "../style/DestinyNo/Destiny_description.css";
import Destiny_calc from "../Components/DestinyNo.jsx/destiny_calc";
import "../style/DestinyNo/Destiny_calc.css";
import DestinyExplain from "../Components/DestinyNo.jsx/destiny_explain";
import "../style/DestinyNo/destiny_explain.css";


const Destiny = () => {
  return (
    <>
      <DestinyDescription />
      <Destiny_calc/>
      <DestinyExplain/>
    </>
  );
};

export default Destiny;
