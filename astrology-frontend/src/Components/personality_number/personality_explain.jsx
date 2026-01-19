import React from "react";

const DestinyExplain = ({ conclusion }) => {
  return (
    <section className="lp-explain destiny">
      
      {/* 📘 FORMULA */}
      <div className="lp-box">
        <h3>Destiny Number Formula</h3>
        <p>
          Convert each letter of your full name into numbers using the
          numerology chart → Add all values → Reduce the total to a single
          digit or Master Number (11, 22, 33).
        </p>
      </div>

      {/* 🧮 EXAMPLE */}
      <div className="lp-box">
        <h3>Example</h3>
        <p>
          Name: <b>RAHUL</b><br />
          R(9) + A(1) + H(8) + U(3) + L(3) = 24<br />
          2 + 4 = <b>6</b><br />
          Destiny Number = <b>6</b>
        </p>
      </div>

    </section>
  );
};

export default DestinyExplain;
