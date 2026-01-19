import React from 'react'
import "../../style/Home/shortcuts.css";
import { NavLink } from 'react-router-dom';
export const Scutbtn = () => {
  return (
    <>
      <section id="sortcut">
        <div className="shortcuts">
          <h2>Explore Numerology</h2>
          <div className="card-container">
            <div className="card">
              <h3>Life Path Number</h3>
              <p>Know your life purpose and destiny through your birth number.</p>
              <NavLink to="/lifepath">
                <button>Explore</button>
              </NavLink>
            </div>

            <div className="card">
              <h3>Destiny Number</h3>
              <p>Understand your strengths, talents and future opportunities.</p>
              <NavLink to="/Destiny">
                <button>Explore</button>
              </NavLink>
            </div>

            <div className="card">
              <h3>Soul Urge Number</h3>
              <p>The Soul Urge Number reveals your inner desires, emotions, and true motivations.</p>
              <NavLink to="/Soul_urge">
                <button>Explore</button>
              </NavLink>
            </div>
          </div>
        </div>
      </section>
    </>

  )
};

// export default Scutbtn