const { getInputs, getCurrentDay } = require("../../utils/files");

const DAY = getCurrentDay(__dirname);

function getPuzzleInput(isTestInput = false) {
  return getInputs(DAY, isTestInput)
    .split("\n")
    .filter((row) => row);
}
const input = getPuzzleInput();

function getHeightAtPosition(x, y, map) {
  const key = `${x}-${y}`;

  if (typeof map[key] === "undefined") return [];

  return [map[key]];
}

const getRiskLevel = (lowPoints) => {
  return lowPoints.reduce((acc, v) => acc + v + 1, 0);
};

function findLowPoints(input) {
  const width = input[0].length;
  const height = input.length;

  const map = input.reduce((acc, row, y) => {
    const split = row.split("");

    split.forEach((value, x) => {
      const key = `${x}-${y}`;
      acc[key] = Number(value);
    });

    return acc;
  }, {});

  const lowPoints = [];

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const key = `${x}-${y}`;
      const value = map[key];

      const values = [
        ...getHeightAtPosition(x, y - 1, map),
        ...getHeightAtPosition(x + 1, y, map),
        ...getHeightAtPosition(x, y + 1, map),
        ...getHeightAtPosition(x - 1, y, map),
      ];

      if (values.every((adjacentHeight) => adjacentHeight > value)) {
        lowPoints.push(value);
      }
    }
  }

  return lowPoints;
}

function a() {
  const lowPoints = findLowPoints(input);
  const riskLevel = getRiskLevel(lowPoints);
  console.log("a", riskLevel);
}
function b() {
  console.log("b", input);
}

module.exports = {
  a,
  b,
  getPuzzleInput,
  findLowPoints,
  getRiskLevel,
};
