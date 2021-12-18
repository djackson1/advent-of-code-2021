const { getInputs } = require("../../utils/files");

const DAY = 7;

function getPuzzleInput(isTestInput = false) {
  return getInputs(DAY, isTestInput).split("\n")[0].split(",").map(Number);
}
const input = getPuzzleInput();

function findShortestAmountOfFuel(inputs) {
  const max = inputs.reduce((acc, v) => (v > acc ? v : acc), 0);

  const values = [...new Array(max + 1)].map((_, i) => i);

  const fuelCounts = values.map((position) => {
    return inputs.reduce((acc, crabPosition) => {
      const distance = Math.abs(position - crabPosition);
      return acc + distance;
    }, 0);
  });

  const shortestFuel = fuelCounts.sort((a, b) => a - b)[0];

  return shortestFuel;
}

function a() {
  const fuel = findShortestAmountOfFuel(input);
  console.log("a", fuel);
}
function b() {
  console.log("b", input);
}

module.exports = {
  a,
  b,
  getPuzzleInput,
  findShortestAmountOfFuel,
};
