import React, { useState, useEffect } from "react";

const Typing = () => {
  const [inputValue, setInputValue] = useState("");
  const [nextKeys, setNextKeys] = useState("");
  const [keysPressed, setKeysPressed] = useState(0);
  const [correctKeys, setCorrectKeys] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [timer, setTimer] = useState(5 * 60); // 5 minutes in seconds
  const [completed, setCompleted] = useState(false);

  let interval; // Declare interval variable

  const allKeys = "asdfjkl;"; // All available keys for practice
  const nextKey = nextKeys.charAt(0); // Next key user is supposed to type

  // Update the input value
  const handleInputChange = (e) => {
    const typedKey = e.target.value.slice(-1);

    setInputValue(e.target.value);
    setKeysPressed((prevCount) => prevCount + 1);

    if (typedKey === nextKey) {
      setCorrectKeys((prevCount) => prevCount + 1);
      setNextKeys((prevKeys) => prevKeys.slice(1));
    }
  };

  // Generate random keys for practice
  const generateNextKeys = () => {
    const randomKeys = Array.from({ length: 20 }, () =>
      allKeys.charAt(Math.floor(Math.random() * allKeys.length))
    ).join("");
    setNextKeys(randomKeys);
  };

  // Start the timer when the component mounts
  useEffect(() => {
    interval = setInterval(() => {
      // Assign interval within the hook
      setTimer((prevTime) => prevTime - 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  // Calculate accuracy percentage
  useEffect(() => {
    if (keysPressed > 0) {
      const accuracyPercentage = (correctKeys / keysPressed) * 100;
      setAccuracy(accuracyPercentage.toFixed(2));
    }
  }, [correctKeys, keysPressed]);

  // Reset the timer and counters
  const resetPractice = () => {
    setInputValue("");
    setNextKeys("");
    setKeysPressed(0);
    setCorrectKeys(0);
    setAccuracy(100);
    setTimer(5 * 60);
    setCompleted(false);
  };

  useEffect(() => {
    if (timer === 0) {
      clearInterval(interval);
      setCompleted(true);
    }
  }, [timer]);

  return (
    <div className="typing-app">
      <div className="timer">
        Timer: {Math.floor(timer / 60)}:{timer % 60}
      </div>
      <div className="next-keys">Next Keys: {nextKeys}</div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        className="typing-input"
        autoFocus
      />
      <div className="stats">
        <div className="keys-pressed">Keys Pressed: {keysPressed}</div>
        <div className="accuracy">Accuracy: {accuracy}%</div>
      </div>
      {completed && (
        <div className="result">
          <h2>Practice Completed!</h2>
          <p>Keys Pressed: {keysPressed}</p>
          <p>Accuracy: {accuracy}%</p>
          <button onClick={resetPractice}>Start Again</button>
        </div>
      )}
    </div>
  );
};

export default Typing;
