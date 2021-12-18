const { getInputs } = require("../../utils/files");

const DAY = 7;

function getPuzzleInput(isTestInput = false) {
  return getInputs(DAY, isTestInput).split("\n")[0].split(",").map(Number);
}
const input = getPuzzleInput();

function triangleNumbersFn(a, b) {
  const distance = Math.abs(a - b);
  return (distance * (distance + 1)) / 2;
}

function linearFn(a, b) {
  return Math.abs(a - b);
}

function findShortestAmountOfFuel(inputs, distanceFunction) {
  const max = inputs.reduce((acc, v) => (v > acc ? v : acc), 0);

  const values = [...new Array(max + 1)].map((_, i) => i);

  const fuelCounts = values.map((position) => {
    return inputs.reduce((acc, crabPosition) => {
      const distance = distanceFunction(position, crabPosition);
      return acc + distance;
    }, 0);
  });

  const shortestFuel = fuelCounts.sort((a, b) => a - b)[0];

  return shortestFuel;
}

function findShortestAmountOfFuelWithAcceleration(inputs) {
  return findShortestAmountOfFuel(inputs, triangleNumbersFn);
}

function findShortestAmountOfFuelLinear(inputs) {
  return findShortestAmountOfFuel(inputs, linearFn);
}

function a() {
  const fuel = findShortestAmountOfFuelLinear(input);
  console.log("a", fuel);
}
function b() {
  const fuel = findShortestAmountOfFuelWithAcceleration(input);
  console.log("b", fuel);
}

module.exports = {
  a,
  b,
  getPuzzleInput,
  findShortestAmountOfFuelLinear,
  findShortestAmountOfFuelWithAcceleration,
};
