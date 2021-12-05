const { getInputs } = require("../../utils/files");

const input = getInputs(1)
  .split("\n")
  .filter((r) => r)
  .map(Number);

function getDepthIncreases(parsedInputs) {
  let lastDepth;
  let count = 0;

  for (let i = 0; i < parsedInputs.length; i++) {
    const value = parsedInputs[i];

    if (lastDepth) {
      if (value > lastDepth) {
        count++;
      }
    }
    lastDepth = value;
  }

  return count;
}

function a() {
  const depthIncreases = getDepthIncreases(input);

  console.log("a", depthIncreases);
}
function b() {}
a();

module.exports = {
  a,
  b,
  getDepthIncreases,
};
