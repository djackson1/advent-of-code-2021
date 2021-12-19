const { getInputs } = require("../../utils/files");

const DAY = 0;

function getPuzzleInput(isTestInput = false) {
  return getInputs(DAY, isTestInput)
    .split("\n")
    .filter((row) => row)
    .map(Number);
}
const input = getPuzzleInput();

function a() {
  console.log("a", input);
}
function b() {
  console.log("b", input);
}

module.exports = {
  a,
  b,
  getPuzzleInput,
};
