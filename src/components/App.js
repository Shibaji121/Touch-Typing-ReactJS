import React, { useEffect } from "react";
import Touchtyping from "./touchtyping";
import { useDispatch } from "react-redux";
import { randomGenerator } from "../actions/action";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(randomGenerator());
  }, [dispatch]);

  return (
    <div className="App">
      <Touchtyping />
    </div>
  );
}

export default App;
