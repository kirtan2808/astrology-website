import React from "react";
import SoulUrgeDescription from "../Components/Soul_urge/description_soul_urge";
import SoulUrge_calc from "../Components/Soul_urge/soul_urge_calc";
import SoulUrgeExplain from "../Components/Soul_urge/Soul_urge_explaination";


const Soul_urge = () => {
  return (
    <>
      <SoulUrgeDescription />
      <SoulUrge_calc/>
      <SoulUrgeExplain/>
    </>
  );
};

export default Soul_urge;
