import React from "react";
import SelectDropDown from "./SelectDropDown";

const TextBox = ({
  selectedLanguage,
  style,
  setShowModal,
  textToTranslate,
  setTextToTranslate,
  setTranslatedText,
  translatedText,
}) => {

  const handleClick=()=>{
    setTranslatedText('')
    setTextToTranslate('')
  }

  return (
    <div className={style}>
      <SelectDropDown
        selectedLanguage={selectedLanguage}
        setShowModal={setShowModal}
        style={style}
      />
      <textarea
        placeholder={style === "input" ? "Enter The Text" : "Translate"}
        disabled={style === "output"}
        onChange={(e)=>setTextToTranslate(e.target.value)}
        value={style === 'input' ? textToTranslate:translatedText}
      />
      {style==='input'&& (
        <div className="delete" onClick={handleClick}>x</div>
      )}
    </div>
  );
};

export default TextBox;
