import { useEffect, useState } from "react";
import "./App.css";
import Arrows from "./components/Arrows";
import TextBox from "./components/TextBox";
import Modal from "./components/Modal";
import axios from "axios";
import Button from "./components/Button";

function App() {
  const [showModal, setShowModal] = useState(null);
  console.log("showModal", showModal);
  // for swapping of inpuLanguage and outputLanguage i<>o
  const [inputLanguage, setInputLanguage] = useState("English");
  const [outputLanguage, setOutputLanguage] = useState("Hindi");

  const [languageKey, setLanguageKey] = useState("en");
  console.log(languageKey, "language key");

  const handleClick = () => {
    setInputLanguage(outputLanguage);
    setOutputLanguage(inputLanguage);
  };

  const [languages, setLanguages] = useState(null);

  // api call
  const getLanguage = async () => {
    const options = {
      method: "GET",
      url: "https://api.cognitive.microsofttranslator.com/languages?api-version=3.0",
      params: {
        "api-version": "3.0",
      },
      headers: {
        "content-type": "application/json",
      },
    };

    try {
      const response = await axios.request(options);

      const languageData = response.data.dictionary;
      const languageName = Object.keys(languageData).map(
        (key) => languageData[key].name
      );
      setLanguages(languageName);

      setLanguageKey(Object.keys(languageData));
    } catch (error) {
      console.error(error);
    }
  };

  // state creating for text
  const [textToTranslate, setTextToTranslate] = useState("");

  const [translatedText, setTranslatedText] = useState("");

  const Translate = async () => {
    const options = {
      method: "POST",
      url: "https://microsoft-translator-text.p.rapidapi.com/translate",
      params: {
        "to[0]": languageKey[languages.indexOf(outputLanguage)],
        "api-version": "3.0",
        profanityAction: "NoAction",
        textType: "plain",
      },
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": "6112aff459mshe2bde97b6f3fa8bp158df2jsn4515ccc2f114",
        "X-RapidAPI-Host": "microsoft-translator-text.p.rapidapi.com",
      },
      data: [
        {
          Text: textToTranslate,
        },
      ],
    };

    try {
      const response = await axios.request(options);
      console.log("output", response.data[0].translations[0].text);
      setTranslatedText(response.data[0].translations[0].text);
    } catch (error) {
      console.error("error occured", error);
    }
  };

  console.log("translated text", translatedText);
  console.log(textToTranslate, "text to translate");

  console.log("language", languages);

  useEffect(() => {
    getLanguage();
  }, []);

  return (
    <div className="app">
      {!showModal && (
        <>
          <TextBox
            style="input"
            selectedLanguage={inputLanguage}
            setShowModal={setShowModal}
            setTextToTranslate={setTextToTranslate}
            textToTranslate={textToTranslate}
            setTranslatedText={setTranslatedText}
          />
          <div className="arrow-container" onClick={handleClick}>
            <Arrows />
          </div>
          <TextBox
            style="output"
            selectedLanguage={outputLanguage}
            setShowModal={setShowModal}
            translatedText={translatedText}
          />
          <div className="button-container" onClick={Translate}>
            <Button />
          </div>
        </>
      )}
      {showModal && (
        <Modal
          setShowModal={setShowModal}
          languages={languages}
          choosenLanguage={
            showModal === "input" ? inputLanguage : outputLanguage
          }
          setChoosenLanguage={
            showModal === "input" ? setInputLanguage : setOutputLanguage
          }
        />
      )}
    </div>
  );
}

export default App;
