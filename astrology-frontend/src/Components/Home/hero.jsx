import "../../style/Home/hero.css";
import { NavLink } from "react-router-dom";
export const Hero = () => {
  return (
    <>
      <div className="hero_main">
        <div className="hero">
          <div className="hero-content">
            <h4>Welcome To Numerology World</h4>
            <h1>Your Numbers<br />Reveal Your Destiny</h1>
            <p>
              Discover the hidden meaning of numbers and how they influence<br />
              your life, career, relationships and future.
            </p>

            <div className="buttons">
              <button className="btn secondary" onClick={() => {
                document.getElementById("sortcut")?.scrollIntoView({
                  behavior: "smooth"
                });
              }}>Get Started</button>

              <NavLink to="/Mulank">
                <button className="btn primary"> Know Your Number</button>
              </NavLink>


            </div>
          </div>
        </div>
      </div>


    </>

  )
}