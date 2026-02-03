import "./LanguageSelect.css";

function LanguageSelect({ language, setLanguage }) {
  return (
    <div className="language-select">
      <label className="lang-label">Select Language</label>

      <select
        className="lang-dropdown"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
      >
        <option value="en">English</option>
        <option value="hi">Hindi</option>
        <option value="gu">Gujarati</option>
      </select>
    </div>
  );
}

export default LanguageSelect;
