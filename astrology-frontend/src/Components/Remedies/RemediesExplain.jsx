import React from "react";
import "../../style/Remedies/RemediesExplain.css";

const RemediesExplain = () => {
     return (
          <section className="lp-explain remedies">
               <div className="lp-box">
                    <h3>Remedies & Guidance Logic</h3>
                    <p>
                         Remedies are generated based on your name, date of birth, and selected
                         problem area. It suggests lucky elements and practical guidance to
                         restore balance.
                    </p>
               </div>

               <div className="lp-box">
                    <h3>Example</h3>
                    <p>
                         Name: <b>KIRTAN PRAJAPATI</b><br />
                         DOB: <b>12-08-2005</b><br />
                         Problem Area: <b>Career</b><br /><br />
                         Lucky Number: <b>5</b><br />
                         Lucky Color: <b>Green</b><br />
                         Lucky Day: <b>Wednesday</b><br />
                         Guidance: Avoid impulsive decisions<br />
                         Lifestyle Tip: Maintain routine and discipline
                    </p>
               </div>
          </section>
     );
};

export default RemediesExplain;
