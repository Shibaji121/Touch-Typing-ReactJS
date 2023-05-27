import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { keyPressed, randomGenerator } from "../actions/action";

export default function Touchtyping() {
  const [timer, setTimer] = useState(10);
  const [isTimer, setIsTimer] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [nextExpKey, setnextExpKey] = useState(0);

  const keyPressCount = useSelector((state) => state.typingReducer.keyPressed);
  const expectedVal = useSelector((state) => state.typingReducer.expectedValue);
  const dispatch = useDispatch();

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
    dispatch(keyPressed(keyPressCount));
    if (e.target.value.length < inputValue.length) {
      console.log("back space");
    }
    if (e.target.value.length === expectedVal.length) {
      console.log("Completed");
      dispatch(randomGenerator());
      setInputValue("");
      return;
    }
    if (e.target.value.slice(-1) !== expectedVal.charAt(nextExpKey)) {
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
          <h2>Key Pressed: {keyPressCount}</h2>
        </div>
      </div>
      <div className="expected-phrase">{expectedVal}</div>
      <input
        value={inputValue}
        className="typing-input"
        placeholder="Enter as per the above shown sentence"
        onChange={handleInputChange}
        autoFocus
      />
    </div>
  );
}
