export const KEY_PRESSED = "KEY_PRESSED";

export const keyPressed = (count) => {
  return {
    type: KEY_PRESSED,
    count,
  };
};
