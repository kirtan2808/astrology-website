import React from "react";
import "../../style/Mulank/mulank_explain.css";

const MulankExplain = () => {
  return (
    <section className="lp-explain mulank">

      {/* 📘 FORMULA */}
      <div className="lp-box">
        <h3>Mulank Number Formula</h3>
        <p>
          Take only the **day** of your birth →
          If it is a double digit, add the digits →
          Reduce to a single digit (1–9).
        </p>
      </div>

      {/* 🧮 EXAMPLE */}
      <div className="lp-box">
        <h3>Example</h3>
        <p>
          Date of Birth: <b>28-08-2005</b><br />
          Day = 28 → 2 + 8 = <b>10</b> → 1 + 0 = <b>1</b><br />
          Mulank Number = <b>1</b>
        </p>
      </div>

    </section>
  );
};

export default MulankExplain;
