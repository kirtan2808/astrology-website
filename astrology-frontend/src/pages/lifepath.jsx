import React from "react";
import Description from "../Components/LifePathPage/description";
import "../style/LifePathPage/description.css";
import Lifepath_calc from "../Components/LifePathPage/lifepath_calc";
import "../style/LifePathPage/lifepath_calc.css";
import LifePathExplain from "../Components/LifePathPage/lifepath_explain";

const LifePath = () => {
  return (
    <>
      <Description />
      <Lifepath_calc/>
      <LifePathExplain/>
    </>
  );
};

export default LifePath;
