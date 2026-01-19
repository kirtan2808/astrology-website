import React from 'react'
import "../../style/Home/about.css";
import { NavLink } from 'react-router-dom';
export default function About() {
    return (
        <>

            <div className="about">

                <div>
                    <h1 className="section-heading1">About</h1>
                </div>

                <div className="img-about">
                    <div>
                        <img src="about-img.jpg" alt="1" />
                    </div>
                    <div className="about-con">
                        <p>Numerology is the ancient science of numbers and their influence on our lives.
                            Our platform helps you discover the hidden meanings behind your Life Path, Destiny, and Name numbers.
                            We provide accurate and easy-to-understand numerology insights for self-discovery and growth.
                            Understand your personality, relationships, and future possibilities through numbers.
                            Our goal is to guide you toward clarity, balance, and positive life decisions.</p>
                        <div className="more">
                            <NavLink to="/AboutUs">
                                <button className="btn secondary" onClick>More</button>
                            </NavLink>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
