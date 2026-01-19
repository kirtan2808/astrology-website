import React, { useState, useEffect, useRef } from "react";
import "../style/navbar.css";
import { NavLink } from "react-router-dom";

function Navbar() {
  const [showNav, setShowNav] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth <= 768) return;

      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 5);

      if (currentScrollY < lastScrollY.current) {
        setShowNav(true);
      } else {
        setShowNav(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`navbar ${showNav ? "show" : "hide"} ${
        scrolled ? "navbar-bg" : ""
      }`}
    >
      {/* ☰ Hamburger (mobile only) */}
      <div
        className={`menu-toggle ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* LOGO (desktop only) */}
      <div className="logo desktop-logo">
        <img src="/logo5.png" alt="Logo" />
      </div>

      {/* LINKS + MOBILE MENU */}
      <nav className={`links ${menuOpen ? "active" : ""}`}>
        {/* LOGO inside mobile menu */}
        <div className="logo mobile-logo">
          <img src="/logo5.png" alt="Logo" />
        </div>

        <NavLink to="/" onClick={() => setMenuOpen(false)}>Home</NavLink>
        <NavLink to="/AboutUs" onClick={() => setMenuOpen(false)}>About</NavLink>
        <NavLink to="/services" onClick={() => setMenuOpen(false)}>Services</NavLink>
        <NavLink to="/ContectUs" onClick={() => setMenuOpen(false)}>Contact</NavLink>
      </nav>
    </header>
  );
}

export default Navbar;
