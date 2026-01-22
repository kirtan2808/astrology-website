import React from "react";

const ExpressionExplain = () => {
     return (
          <section className="lp-explain expression">

               {/* 📘 FORMULA */}
               <div className="lp-box">
                    <h3>Expression Number Formula</h3>
                    <p>
                         Convert each letter of your full name into numbers using the
                         Pythagorean numerology chart → Add all values → Reduce the total to a
                         single digit or Master Number (11, 22, 33).
                    </p>
               </div>

               {/* 🧮 EXAMPLE */}
               <div className="lp-box">
                    <h3>Example</h3>
                    <p>
                         Name: <b>KIRTAN</b><br />
                         K(2) + I(9) + R(9) + T(2) + A(1) + N(5) = 28<br />
                         2 + 8 = <b>10</b><br />
                         1 + 0 = <b>1</b><br />
                         Expression Number = <b>1</b>
                    </p>
               </div>

          </section>
     );
};

export default ExpressionExplain;
