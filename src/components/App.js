import React, { useEffect, useState } from "react";
import Touchtyping from "./touchtyping";

function App() {
  const [expectedVal, setExpectedVal] = useState("");

  useEffect(() => {
    randomBigramGenerate();
  }, []);

  const randomBigramGenerate = () => {
    const letters = "asdfjkl";
    const bigrams = [];
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * (letters.length - 1));
      const firstLetter = letters[randomIndex];
      const secondLetter = letters[randomIndex + 1];
      const bigram = `${firstLetter}${secondLetter}`;
      bigrams.push(bigram);
    }
    const randomSent = bigrams.join(" ");
    console.log(randomSent);
    setExpectedVal(randomSent);
  };

  return (
    <div className="App">
      <Touchtyping
        expectedVal={expectedVal}
        randomBigramGenerate={randomBigramGenerate}
      />
    </div>
  );
}

export default App;
