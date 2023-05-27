import { KEY_PRESSED } from "../actions/action";

const initialState = {
  keyPressed: 0,
};

export default function typingReducer(state = initialState, action) {
  switch (action.type) {
    case KEY_PRESSED:
      return {
        ...state,
        keyPressed: state.keyPressed + 1,
      };
    default:
      return state;
  }
}
