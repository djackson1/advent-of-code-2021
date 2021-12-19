const { getInputs } = require("../../utils/files");

const DAY = 8;

function getPuzzleInput(isTestInput = false) {
  return getInputs(DAY, isTestInput)
    .split("\n")
    .filter((row) => row)
    .map((row) => {
      const [l, r] = row.split("|");
      const wires = l.split(" ").filter((v) => v);
      const digits = r.split(" ").filter((v) => v);
      return { wires, digits };
    });
}
const input = getPuzzleInput();
console.log("input", input);

function countDigits1478(inputs) {
  return inputs.reduce((acc, { digits }) => {
    const digitCount = digits.reduce((acc2, d) => {
      const is1478 = [2, 4, 3, 7].includes(d.length);
      return acc2 + (is1478 ? 1 : 0);
    }, 0);

    return acc + digitCount;
  }, 0);
}

function a() {
  const digitCount = countDigits1478(input);
  console.log("a", digitCount);
}
function b() {
  console.log("b", input);
}

module.exports = {
  a,
  b,
  getPuzzleInput,
  countDigits1478,
};
