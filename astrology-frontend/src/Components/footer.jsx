import React from 'react'
import "../style/footer.css";
import { NavLink } from 'react-router-dom';
function Footer() {
  return (
    <>
      <div className="site-footer">
        <div className="footer-container">

          <div className="footer-box">
            <div className="footer-logo"><img src="logo5.png" alt="" /></div>
            <p>
              Ankveda is a numerology platform that helps you understand
              your life path, destiny, and inner strengths through the
              power of numbers.
            </p>
          </div>

          <div className="footer-box" id="quick-links">
            <h3>Quick Links</h3>
            <ul>
              <NavLink to="/">Home</NavLink>
              <NavLink to="/AboutUs">About</NavLink>
              <NavLink to="/Services">Service</NavLink>
              <NavLink to="/ContectUs">Contact</NavLink>
            </ul>
          </div>


          <div className="footer-box">
            <h3>Contact Us</h3>
            <p>Email: vansh.905471@gmail.com</p>
            <p>Phone: +91 1234567890</p>
            <p>Location: India</p>
          </div>

        </div>


        <div className="footer-bottom">
          © 2025 Numero • All Rights Reserved
        </div>
      </div>
    </>
  )
}

export default Footer