
const NumerologySection = ({ title, desc, img, reverse }) => {
  return (
    <>

      <div className={`num-section ${reverse ? "reverse" : ""}`}>
        <div className="num-image">
          <img src={img} alt={title} />
        </div>

        <div className="num-content">
          <h2>{title}</h2>
          <p>{desc}</p>
        </div>

      </div>
    </>
  );
};

export default NumerologySection;
