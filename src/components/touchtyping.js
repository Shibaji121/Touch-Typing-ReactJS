import React, { useEffect, useState } from "react";

export default function Touchtyping(props) {
  const [timer, setTimer] = useState(10);
  const [keysPressed, setKeysPressed] = useState(0);
  const [isTimer, setIsTimer] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [nextExpKey, setnextExpKey] = useState(0);

  useEffect(() => {
    let interval;
    if (isTimer) {
      interval = setInterval(() => {
        setTimer((prevTime) => prevTime - 1);
      }, 1000);
    }
    if (timer === 0) {
      setIsTimer(false);
    }
    return () => clearInterval(interval);
  }, [isTimer, timer]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setKeysPressed((prevCount) => prevCount + 1);
    if (e.target.value.length < inputValue.length) {
      console.log("back space");
    }
    if (e.target.value.length === props.expectedVal.length) {
      console.log("Completed");
    }
    if (e.target.value.slice(-1) !== props.expectedVal.charAt(nextExpKey)) {
      console.log("You entered wrong letter");
      setnextExpKey((prev) => prev - 1);
    } else {
      setnextExpKey((prev) => prev + 1);
    }
    setIsTimer(true);
  };

  return (
    <div className="typing-app">
      <div className="timer">
        Timer:{" "}
        {Math.floor(timer / 60)
          .toString()
          .padStart(2, "0")}
        :{(timer % 60).toString().padStart(2, "0")}
      </div>
      <div className="measurements">
        <div className="wpm measure-box">
          <h2>WPM: 40</h2>
        </div>
        <div className="accuracy measure-box">
          <h2>Accuracy: 100%</h2>
        </div>
        <div className="key-pressed measure-box">
          <h2>Key Pressed: {keysPressed}</h2>
        </div>
      </div>
      <div className="expected-phrase">{props.expectedVal}</div>
      <input
        className="typing-input"
        placeholder="Enter as per the above shown sentence"
        onChange={handleInputChange}
        autoFocus
      />
    </div>
  );
}
