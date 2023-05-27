import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  enterInputValue,
  enteredCorrectKey,
  increaseLevel,
  keyPressed,
  randomGenerator,
  resetAll,
} from "../actions/action";
import { toast } from "react-toastify";

export default function Touchtyping() {
  const [timer, setTimer] = useState(5 * 60);
  const [isTimer, setIsTimer] = useState(false);
  const [nextExpKey, setnextExpKey] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [background, setBackground] = useState("white");

  const keyPressCount = useSelector((state) => state.typingReducer.keyPressed);
  const expectedVal = useSelector((state) => state.typingReducer.expectedValue);
  const inputVal = useSelector((state) => state.typingReducer.inputValue);
  const levels = useSelector((state) => state.typingReducer.levels);
  const correctKeyCount = useSelector(
    (state) => state.typingReducer.correctKey
  );
  const dispatch = useDispatch();
  const ref = useRef();

  const accuracy =
    keyPressCount === 0
      ? 0
      : ((correctKeyCount / keyPressCount) * 100).toFixed(2);
  const wordsPM = correctKeyCount === 0 ? 0 : correctKeyCount / 10;

  useEffect(() => {
    let interval;
    if (isTimer) {
      interval = setInterval(() => {
        setTimer((prevTime) => prevTime - 1);
      }, 1000);
    }
    if (timer === 0) {
      setIsTimer(false);
      setCompleted(true);
      toast.success("Timer Finished!!! See The results", {
        position: toast.POSITION.TOP_LEFT,
      });
    }
    return () => clearInterval(interval);
  }, [isTimer, timer]);

  //   Handle input entered Change
  const handleInputChange = (e) => {
    dispatch(enterInputValue(e.target.value));
    dispatch(keyPressed(keyPressCount));

    // Checking Value entered correctly logic
    if (e.target.value === expectedVal.substring(0, nextExpKey + 1)) {
      setnextExpKey((prev) => prev + 1);
      dispatch(enteredCorrectKey());
      ref.current.style.background = "white";
      ref.current.style.color = "black";
    } else {
      toast.error("Wrong Key Entered", {
        position: toast.POSITION.TOP_LEFT,
      });
      ref.current.style.background = "lightpink";
      ref.current.style.color = "red";
      return;
    }

    // Checking the Level completion logic here
    if (e.target.value.length === expectedVal.length) {
      toast.success(`level ${levels} is completed successfully`, {
        position: toast.POSITION.TOP_LEFT,
      });
      dispatch(randomGenerator());
      dispatch(enterInputValue(""));
      setnextExpKey(0);
      dispatch(increaseLevel());
      setIsTimer(false);
      return;
    }
    setIsTimer(true);
  };

  //   Handling back button key press
  const handleKeyDown = (e) => {
    if (e.key === "Backspace") {
      toast.info("Back Button Clicked", {
        position: toast.POSITION.TOP_LEFT,
      });
      return;
    }
  };

  //   handle the background mode change here
  const handleDarkModeChange = () => {
    if (background === "white") {
      setBackground("dark");
    } else {
      setBackground("white");
    }
    toast.success(`${background} Mode Changed`, {
      position: toast.POSITION.TOP_LEFT,
    });
  };

  //   To start a fresh session after completion of time
  const handleReset = () => {
    setCompleted(false);
    dispatch(randomGenerator());
    dispatch(resetAll());
    setnextExpKey(0);
    setTimer(5 * 60);
    setIsTimer(false);
    toast.success("Lets Start Again!!", {
      position: toast.POSITION.TOP_LEFT,
    });
  };

  return (
    <div
      className="typing-app"
      style={
        completed
          ? {
              background:
                'url("https://i0.wp.com/innerventur.es/wp-content/uploads/2020/09/congratulations-outlook-featured.gif?fit=1440%2C550&ssl=1")',
            }
          : background === "white"
          ? {
              background:
                'url("https://thumbs.gfycat.com/CreativeIncredibleAmericanredsquirrel.webp")',
            }
          : {
              background:
                'url("https://thumbs.gfycat.com/AjarJaggedClumber.webp")',
            }
      }
    >
      {!completed ? (
        <>
          <div className="timer">
            Timer:{" "}
            {Math.floor(timer / 60)
              .toString()
              .padStart(2, "0")}
            :{(timer % 60).toString().padStart(2, "0")}
          </div>
          <span className="dark-mode" onClick={handleDarkModeChange}>
            <img
              src="https://cdn-icons-png.flaticon.com/128/5273/5273582.png"
              alt="dark-mode"
              style={{ width: "5rem" }}
            />
          </span>
          <div className="measurements">
            <div className="wpm measure-box">
              <h2>WPM: {wordsPM}</h2>
            </div>
            <div className="accuracy measure-box">
              <h2>Accuracy: {accuracy}%</h2>
            </div>
            <div className="key-pressed measure-box">
              <h2>Key Pressed: {keyPressCount}</h2>
            </div>
            <div className="level measure-box">
              <h2>Level: {levels}</h2>
            </div>
          </div>

          <div className="expected-phrase">{expectedVal}</div>
          <input
            ref={ref}
            value={inputVal}
            className="typing-input"
            placeholder="Enter as per the above shown sentence"
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        </>
      ) : (
        <>
          <h1 className="done-page">
            Congratulations!!! Successfully Completed {levels} levels of the
            Practice module
          </h1>
          <h2>Current Scores as below</h2>
          <div className="scores">
            <div>Total Key Pressed: {keyPressCount}</div>
            <div>Total Corrected Key Pressed: {correctKeyCount}</div>
            <div>Words Per Minute : {wordsPM}</div>
            <div>Accuracy: {accuracy}%</div>
            <button onClick={handleReset}>Go To Practice Again</button>
          </div>
        </>
      )}
    </div>
  );
}
