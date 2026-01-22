import React from "react";
import { useLanguage } from "../../Context/LanguageContext";
import "../../style/Common/GlobalLanguageSelect.css";

const GlobalLanguageSelect = () => {
     const { language, setLanguage } = useLanguage();

     return (
          <div className="global-lang-wrap">
               <select
                    className="global-lang-select"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
               >
                    <option value="en">English</option>
                    <option value="hi">Hindi</option>
                    <option value="gu">Gujarati</option>
               </select>
          </div>
     );
};

export default GlobalLanguageSelect;
