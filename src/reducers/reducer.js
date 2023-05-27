import {
  CORRECT_KEY_PRESSED,
  INCREASE_LEVEL,
  INPUT_ENTER,
  KEY_PRESSED,
  RANDOM_GEN,
  RESET_ALL,
} from "../actions/action";

const initialState = {
  keyPressed: 0,
  correctKey: 0,
  expectedValue: "",
  inputValue: "",
  levels: 1,
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
    case CORRECT_KEY_PRESSED:
      return {
        ...state,
        correctKey: state.correctKey + 1,
      };
    case INCREASE_LEVEL:
      return {
        ...state,
        levels: state.levels + 1,
      };
    case RESET_ALL:
      return {
        ...state,
        keyPressed: 0,
        correctKey: 0,
        inputValue: "",
        levels: 1,
      };
    default:
      return state;
  }
}
