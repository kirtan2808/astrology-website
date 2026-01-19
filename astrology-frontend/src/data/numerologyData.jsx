import life from "../images/lifepath.jpg";
import destiny from "../images/destiny.avif";
import soul from "../images/soul.jpg";
import personality from "../images/personality.jpg";
import nameNum from "../images/name.png";
import compatibility from "../images/compatibility.jpg";
import remedies from "../images/remedies.jpg";

const numerologyData = [
  {
    id: 1,
    title: "Life Path Number",
    desc: "The Life Path Number reveals your life’s purpose and the natural path you are meant to follow.It helps you understand your strengths, challenges, and overall direction in life.",
    img: life,
    reverse: false
  },
  {
    id: 2,
    title: "Destiny / Expression Number",
    desc: "The Destiny Number shows your talents, abilities, and life goals based on your full name.It explains how you express yourself and what you are meant to achieve.",
    img: destiny,
    reverse: true
  },
  {
    id: 3,
    title: "Soul Urge Number",
    desc: "The Soul Urge Number reveals your inner desires, emotions, and true motivations.It helps you understand what truly makes you happy from within.",
    img: soul,
    reverse: false
  },
  {
    id: 4,
    title: "Personality Number",
    desc: "The Personality Number represents how others see you in the outer world.It reflects your behavior, communication style, and first impression.",
    img: personality,
    reverse: true
  },
  {
    id: 5,
    title: "Name Numerology",
    desc: "Name Numerology analyzes the vibrations of your name to check its energy and impact.It helps in choosing or correcting names for success, harmony, and positivity.",
    img: nameNum,
    reverse: false
  },
  {
    id: 6,
    title: "Compatibility",
    desc: "Compatibility Numerology checks the harmony between two people using their numbers.It helps understand love compatibility, emotional bonding, and relationship balance.",
    img: compatibility,
    reverse: true
  },
  {
    id: 7,
    title: "Numerology Remedies",
    desc: "Numerology Remedies provide simple solutions based on your numbers.They help reduce negative effects and improve luck, confidence, and life balance.",
    img: remedies,
    reverse: false
  }
];

export default numerologyData;
