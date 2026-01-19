import React from "react";
import "../../style/About/aboutus.css";



const AboutUs = () => {
  return (
    <div className="about-page">

      {/* INTRO */}
      <div className="about-intro">
        <h1>About Ankveda</h1>
        <p>
          Ankveda is a space where ancient numerology meets modern understanding —
          helping you decode life through numbers, clarity, and conscious awareness.
        </p>
      </div>

      {/* STORY */}
      <div className="about-story">
        <div className="story-box">
          <p>
            Numerology is not about predicting fear or luck.
            It is about understanding the rhythm of your life.
          </p>
          <p>
            At Ankveda, we believe numbers are guides — not limits.
            They reveal your strengths, challenges, and inner potential.
          </p>
          <p>
            Our goal is to simplify numerology so it becomes practical,
            positive, and meaningful in everyday life.
          </p>
        </div>

        <div className="story-side">
          <h2>Why We Exist</h2>
          <p>
            Many people feel confused about their direction in life.
            Ankveda exists to bring clarity — using the timeless wisdom
            hidden in your birth date and name.
          </p>
        </div>
      </div>

      {/* NUMBERS */}
      <div className="about-numbers">
        <div className="numbers-text">
          <h2>The Power of Numbers</h2>
          <p>
            Every number carries a vibration that influences thoughts,
            emotions, relationships, and decisions.
          </p>
          <p>
            When you understand your numbers, life starts making sense.
          </p>
        </div>

        <div className="numbers-visual">
          ∞ 
        </div>
      </div>

      {/* VALUES */}
      <div className="about-values">
        <h2>Our Core Values</h2>

        <div className="values-grid">
          <div className="value">
            <h3>Clarity</h3>
            <p>No confusion, no fear — only understanding.</p>
          </div>

          <div className="value">
            <h3>Authenticity</h3>
            <p>Pure numerology principles, simplified.</p>
          </div>

          <div className="value">
            <h3>Positivity</h3>
            <p>Guidance that uplifts and empowers.</p>
          </div>

          <div className="value">
            <h3>Balance</h3>
            <p>Mind, emotions, and purpose aligned.</p>
          </div>
        </div>
      </div>

      {/* QUOTE */}
      <div className="about-quote">
        <p>
          “Numbers don’t control your life —
          they help you understand it.”
        </p>
      </div>

      {/* CTA */}
      <div className="about-cta">
        <p>
          Begin your journey with awareness. <br />
          <span>Let numbers guide you, not define you.</span>
        </p>
      </div>

    </div>
  );
};

export default AboutUs;
