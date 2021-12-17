const { getInputs } = require("../../utils/files");

const input = getInputs(0)
  .split("\n")
  .filter((r) => r)
  .map(Number);

function a() {
  console.log("a", input);
}
function b() {
  console.log("b", input);
}

module.exports = {
  a,
  b,
};
