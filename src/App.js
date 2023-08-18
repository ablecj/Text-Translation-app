import { useState } from "react";
import "./App.css";
import Arrows from "./components/Arrows";
import TextBox from "./components/TextBox";

function App() {
  const [showModal, setShowModal] = useState(null)

  // for swapping of inpuLanguage and outputLanguage i<>o
  const [inputLanguage, setInputLanguage] = useState("English");
  const [outputLanguage, setOutputLanguage] = useState("Hindi");

  const handleClick = () => {
    setInputLanguage(outputLanguage);
    setOutputLanguage(inputLanguage);
  };

  console.log("showModal", showModal);
  return (
    <div className="app">
      <TextBox style="input" selectedLanguage={inputLanguage} setShowModal={setShowModal} />
      <div className="arrow-container" onClick={handleClick}>
        <Arrows />
      </div>
      <TextBox style="output" selectedLanguage={outputLanguage} setShowModal={setShowModal} />
    </div>
  );
}

export default App;
