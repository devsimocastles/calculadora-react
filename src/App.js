import React, { createContext, useState } from "react";
import Boton from "./components/Boton.jsx";
import Pantalla from "./components/Pantalla.jsx";
import { evaluate, log } from "mathjs";
import { eventWrapper } from "@testing-library/user-event/dist/utils/index.js";

function App() {



  // CALCULATOR FUNCTIONS ///////////////////////////////////////////////////////////////////////////////////////////  
  const [input, setInput] = useState("");

  const addInput = val => {
    setInput(input+val);
  }

  const resetInput = () => setInput("");

  const delInput = () => setInput(String(input).slice(0, input.length-1));

  const calculate = () => {
    const numRegex = /\d+/;
    const operationRegex = /\d+([+-/*]\d+)+/;
    const symbolRegex = /([+-/*]{2})+/; 
    if (!numRegex.test(input) || symbolRegex.test(input) || !operationRegex.test(input)) setInput("Syntax Error");
    else {
      setInput(evaluate(input));
    }
  };

  // THEME SWITCHER ///////////////////////////////////////////////////////////////////////////////////

  const ThemeContext = createContext(null);
  const [theme, setTheme] = useState(1);

  const updateTheme = () => {
    const theme_switch = document.getElementById("theme-switch");
    setTheme(theme_switch.value);
  };

  return (
    <ThemeContext.Provider value={theme}>
    <div className="App" id={`theme-${theme}`}>
      <header>
        <h1>calc</h1>
        <div className="theme-switch-container">
          <label>
            THEME
            <div className="slider-container">
              <div className="values-container">
                <span>1</span>
                <span>2</span>
                <span>3</span>
              </div>
              <input id="theme-switch" type="range" min="1" max="3" step="1" defaultValue={theme} onInput={() => updateTheme()}>
              </input>
            </div>
          </label>
        </div>
      </header>
      <div className="calculator-container">
        <Pantalla input={input} />
        <div className="calculator-buttons">
          <div className="row">
            <Boton func={addInput}>7</Boton>
            <Boton func={addInput}>8</Boton>
            <Boton func={addInput}>9</Boton>
            <Boton func={delInput}>DEL</Boton>
          </div>
          <div className="row">
            <Boton func={addInput}>4</Boton>
            <Boton func={addInput}>5</Boton>
            <Boton func={addInput}>6</Boton>
            <Boton func={addInput}>+</Boton>
          </div>
          <div className="row">
            <Boton func={addInput}>1</Boton>
            <Boton func={addInput}>2</Boton>
            <Boton func={addInput}>3</Boton>
            <Boton func={addInput}>-</Boton>
          </div>
          <div className="row">
            <Boton func={addInput}>.</Boton>
            <Boton func={addInput}>0</Boton>
            <Boton func={addInput}>/</Boton>
            <Boton func={addInput}>*</Boton>
          </div>
          <div className="row">
            <Boton func={resetInput}>RESET</Boton>
            <Boton func={calculate}>=</Boton>
          </div>
        </div>
      </div>
    </div>
    </ThemeContext.Provider>
  );
}

export default App;
