import React from "react";
import "../../style/Personality/personality_explain.css";

const PersonalityExplain = () => {
     return (
          <section className="lp-explain personality">

               {/* 📘 FORMULA */}
               <div className="lp-box">
                    <h3>Personality Number Formula</h3>
                    <p>
                         Take your full name → Use only consonants (ignore vowels A, E, I, O, U)
                         → Convert letters into numbers using the Pythagorean chart → Add all
                         values → Reduce to a single digit or Master Number (11, 22, 33).
                    </p>
               </div>

               {/* 🧮 EXAMPLE */}
               <div className="lp-box">
                    <h3>Example</h3>
                    <p>
                         Full Name: <b>KIRTAN PRAJAPATI</b><br /><br />
                         Consonants: <b>K R T N P R J P T</b><br />
                         K(2) + R(9) + T(2) + N(5) + P(7) + R(9) + J(1) + P(7) + T(2) = 44<br />
                         4 + 4 = <b>8</b><br />
                         Personality Number = <b>8</b>
                    </p>
               </div>

          </section>
     );
};

export default PersonalityExplain;
