import React from "react";
import "../../style/soul_urge/Soul_urge_explaination.css";
const SoulUrgeExplain = () => {
  return (
    <section className="lp-explain destiny">

      {/* 📘 FORMULA */}
      <div className="lp-box">
        <h3>Soul Urge Number Formula</h3>
        <p>
          Extract only the vowels (A, E, I, O, U) from your full birth name →
          Convert them into numbers → Add the values → Reduce to a single digit
          or Master Number (11, 22, 33).
        </p>
      </div>

      {/* 🧮 EXAMPLE */}
      <div className="lp-box">
        <h3>Example</h3>
        <p>
          Name: <b>RAHUL</b><br />
          Vowels: A, U<br />
          A(1) + U(3) = 4<br />
          Soul Urge Number = <b>4</b>
        </p>
      </div>

    </section>
  );
};

export default SoulUrgeExplain;
