const { getInputs, getCurrentDay } = require("../../utils/files");

const DAY = getCurrentDay(__dirname);

function getPuzzleInput(isTestInput = false) {
  return getInputs(DAY, isTestInput)
    .split("\n")
    .filter((row) => row)
    .map(Number);
}
const puzzleInput = getPuzzleInput();

function a() {
  console.log("a", puzzleInput);
}
function b() {
  console.log("b", puzzleInput);
}

module.exports = {
  a,
  b,
  getPuzzleInput,
};
