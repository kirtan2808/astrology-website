import numerologyData from "../../data/numerologyData";
import NumerologySection from "./NumerologySection";
import "../../style/Home/numerology.css";
import { NavLink } from "react-router-dom";
const NumerologySections = () => {
  return (
    <>
      <h1 className="section-heading">Our Services</h1>
      {numerologyData.map((item) => (
        <NumerologySection
          key={item.id}
          title={item.title}
          desc={item.desc}
          img={item.img}
          reverse={item.reverse}
        />

      ))}
      <div className="buttons1" id="buttons1">
        <NavLink to="/Services">
          <button className="btn secondary">Explor More</button>
        </NavLink>
      </div>
    </>
  );
};

export default NumerologySections;
