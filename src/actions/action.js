export const KEY_PRESSED = "KEY_PRESSED";
export const RANDOM_GEN = "RANDOM_GEN";
export const INPUT_ENTER = "INPUT_ENTER";

export const keyPressed = (count) => {
  return {
    type: KEY_PRESSED,
    count,
  };
};

export const randomGenerator = () => {
  return {
    type: RANDOM_GEN,
  };
};

export const enterInputValue = (value) => {
  return {
    type: INPUT_ENTER,
    value,
  };
};
