import React from "react";
import "../../style/NameNumerology/NameExplain.css";

const NameExplain = () => {
     return (
          <section className="lp-explain name">
               <div className="lp-box">
                    <h3>Name Numerology Formula</h3>
                    <p>
                         Convert each letter of your full name into numbers using the
                         Pythagorean numerology chart → Add all values → Reduce the total to a
                         single digit or Master Number (11, 22, 33).
                    </p>
               </div>

               <div className="lp-box">
                    <h3>Example</h3>
                    <p>
                         Full Name: <b>KIRTAN PRAJAPATI</b>
                         <br />
                         Output: <b>Name Number = 5</b>
                         <br />
                         <br />
                         Vibration: Fast-moving, progressive
                         <br />
                         Positive Effects: Success through communication
                         <br />
                         Negative Effects: Instability if unfocused
                         <br />
                         Advice: Meditation or grounding activities recommended
                    </p>
               </div>
          </section>
     );
};

export default NameExplain;
