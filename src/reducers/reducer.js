import { INPUT_ENTER, KEY_PRESSED, RANDOM_GEN } from "../actions/action";

const initialState = {
  keyPressed: 0,
  expectedValue: "",
  inputValue: "",
};

export default function typingReducer(state = initialState, action) {
  switch (action.type) {
    case KEY_PRESSED:
      return {
        ...state,
        keyPressed: state.keyPressed + 1,
      };
    case RANDOM_GEN:
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
      return {
        ...state,
        expectedValue: randomSent,
      };
    case INPUT_ENTER:
      return {
        ...state,
        inputValue: action.value,
      };
    default:
      return state;
  }
}
