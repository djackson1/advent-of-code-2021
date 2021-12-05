const { getInputs } = require("../../utils/files");

const input = getInputs(1)
  .split("\n")
  .filter((r) => r)
  .map(Number);

function getDepthIncreasesSlidingWindow(parsedInputs, windowSize = 3) {
  let lastDepth;
  let count = 0;

  const maxWindows = parsedInputs.length - windowSize + 1;
  for (let i = 0; i < maxWindows; i++) {
    const values = parsedInputs.slice(i, i + windowSize);
    const value = values.reduce((acc, v) => acc + v, 0);
    console.log("getDepthIncreasesSlidingWindow ~ value", value);

    if (lastDepth) {
      if (value > lastDepth) {
        count++;
      }
    }
    lastDepth = value;
  }

  return count;
}

function getDepthIncreases(parsedInputs) {
  return getDepthIncreasesSlidingWindow(parsedInputs, 1);
}

function a() {
  const depthIncreases = getDepthIncreases(input);

  console.log("a", depthIncreases);
}
function b() {
  const depthIncreases = getDepthIncreasesSlidingWindow(input);

  console.log("b", depthIncreases);
}
// b();

module.exports = {
  a,
  b,
  getDepthIncreases,
  getDepthIncreasesSlidingWindow,
};
