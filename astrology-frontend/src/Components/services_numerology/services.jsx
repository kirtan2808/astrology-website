import { Link } from "react-router-dom";
import "../../style/Services_numerology/services.css";

const Services = () => {
  const numerologyServices = [
    {
      icon: "✧",
      title: "Life Path Number",
      desc: "Understand your core purpose, strengths, and the journey your soul has chosen.",
      link: "/lifepath"
    },
    {
      icon: "☉",
      title: "Destiny Number",
      desc: "Reveal your long-term goals, achievements, and karmic direction.",
      link: "/Destiny"
    },
    {
      icon: "❂",
      title: "Expression Number",
      desc: "Discover how you express yourself and your natural talents.",
      link: "/ExpressionNumber"
    },
    {
      icon: "☽",
      title: "Soul Urge Number",
      desc: "Explore your inner desires, emotional needs, and motivations.",
      link: "/Soul_urge"
    },
    {
      icon: "◈",
      title: "Personality Number",
      desc: "Understand how the world perceives you and your outward behavior.",
      link: "/PersonalityNumber"
    },
    {
      icon: "𓂀",
      title: "Name Numerology",
      desc: "Analyze how your name vibrations influence success and harmony.",
      link: "/name-numerology"
    },
    {
      icon: "☯",
      title: "Compatibility",
      desc: "Check relationship harmony using numerological alignment.",
      link: "/compatibility"
    },
    {
      icon: "∞",
      title: "Remedies & Guidance",
      desc: "Practical numerology-based remedies to restore balance in life.",
      link: "/numerology-remedies"
    }
  ];

  const astrologyServices = [
    {
      icon: "♈",
      title: "Astrology",
      desc: "Understand planetary positions and how celestial energies influence your life.",
      link: "/astrology"
    },
    {
      icon: "☸",
      title: "Kundli",
      desc: "Detailed birth chart analysis to reveal destiny, timing, and life patterns.",
      link: "/kundli"
    }
  ];

  return (
    <div className="services-page">

      {/* ===== NUMEROLOGY ===== */}
      <div className="services-intro">
        <h1>Our Numerology Services</h1>
        <p>
          Discover the hidden patterns of your life through numbers.
          Each service is designed to bring clarity, balance, and self-awareness.
        </p>
      </div>

      <div className="services-grid">
        {numerologyServices.map((service, index) => (
          <Link to={service.link} className="service-link" key={index}>
            <div className="service-card">
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* ===== ASTROLOGY ===== */}
      <div className="services-intro">
        <h1>Astrology Services</h1>
        <p>
          Decode cosmic influences and understand how planetary movements shape your destiny.
        </p>
      </div>

      <div className="services-grid">
        {astrologyServices.map((service, index) => (
          <Link to={service.link} className="service-link" key={index}>
            <div className="service-card">
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* ===== CTA ===== */}
      <div className="services-cta">
        <h2>Let Numbers & Stars Guide You</h2>
        <p>
          Every number and planet carries meaning.
          Discover yours and move forward with clarity and confidence.
        </p>
      </div>

    </div>
  );
};

export default Services;
