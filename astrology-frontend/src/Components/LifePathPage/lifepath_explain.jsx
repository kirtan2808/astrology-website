import React from "react";

const LifePathExplain = () => {
     return (
          <section className="lp-explain lifepath">

               {/* 📘 FORMULA */}
               <div className="lp-box">
                    <h3>Life Path Number Formula</h3>
                    <p>
                         Take your full date of birth → Add the day, month, and year digits separately → Reduce each to a single digit → Add them together → Reduce the final total to a single digit or Master Number (11, 22, 33).
                    </p>
               </div>

               {/* 🧮 EXAMPLE */}
               <div className="lp-box">
                    <h3>Example</h3>
                    <p>
                         Birth Date: <b>14-07-1998</b><br />
                         Day: 1 + 4 = <b>5</b><br />
                         Month: 0 + 7 = <b>7</b><br />
                         Year: 1 + 9 + 9 + 8 = <b>27</b> → 2 + 7 = <b>9</b><br />
                         <br />
                         Final Calculation:<br />
                         5 + 7 + 9 = <b>21</b><br />
                         2 + 1 = <b>3</b><br />
                         Life Path Number = <b>3</b>
                    </p>
               </div>

          </section>
     );
};

export default LifePathExplain;
