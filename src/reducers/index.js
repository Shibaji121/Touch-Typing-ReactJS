import { combineReducers } from "redux";
import typingReducer from "./reducer";

const rootReducer = combineReducers({
  typingReducer,
});

export default rootReducer;
