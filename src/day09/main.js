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

const getRiskLevel = (lowPoints) => lowPoints.reduce((acc, v) => acc + v + 1, 0);

function getAdjacentHeights(x, y, map) {
  const values = [
    ...getHeightAtPosition(x, y - 1, map),
    ...getHeightAtPosition(x + 1, y, map),
    ...getHeightAtPosition(x, y + 1, map),
    ...getHeightAtPosition(x - 1, y, map),
  ];
  return values;
}

function generatePointMap(input) {
  return input.reduce((acc, row, y) => {
    const split = row.split("");

    split.forEach((value, x) => {
      const key = `${x}-${y}`;
      acc[key] = Number(value);
    });

    return acc;
  }, {});
}

function findLowPoints(input) {
  const width = input[0].length;
  const height = input.length;

  const map = generatePointMap(input);

  const lowPoints = [];

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const key = `${x}-${y}`;
      const value = map[key];

      const values = getAdjacentHeights(x, y, map);

      if (values.every((adjacentHeight) => adjacentHeight > value)) {
        lowPoints.push({ x, y, value });
      }
    }
  }

  return lowPoints;
}

function isPointValid(x, y, width, height) {
  return x >= 0 && x < width && y >= 0 && y < height;
}

function getAdjacentPoints(x, y, width, height) {
  const points = [];

  if (isPointValid(x, y + 1, width, height)) points.push({ x, y: y + 1 });
  if (isPointValid(x, y - 1, width, height)) points.push({ x, y: y - 1 });
  if (isPointValid(x + 1, y, width, height)) points.push({ x: x + 1, y });
  if (isPointValid(x - 1, y, width, height)) points.push({ x: x - 1, y });

  return points;
}

// for every point we simulate a flood fill until we find the low point
function findBasins(input) {
  // everytime we find the low point we cache where it started and ended
  const pointCache = {};

  const width = input[0].length;
  const height = input.length;

  const lowPoints = findLowPoints(input);

  const map = generatePointMap(input);

  const basins = lowPoints.reduce((acc, { x, y }, i) => {
    const adjacentPoints = getAdjacentPoints(x, y, width, height);
    const points = [];
    while (adjacentPoints.length > 0) {
      const adjacentPoint = adjacentPoints.pop();
      const adjacentKey = `${adjacentPoint.x}-${adjacentPoint.y}`;
      const adjacentValue = map[adjacentKey];

      if (pointCache[adjacentKey]) continue;
      if (adjacentValue === 9) continue;

      points.push({ x: adjacentPoint.x, y: adjacentPoint.y });
      pointCache[adjacentKey] = true;

      const nextAdjacent = getAdjacentPoints(
        adjacentPoint.x,
        adjacentPoint.y,
        width,
        height
      );

      adjacentPoints.push(...nextAdjacent);
    }

    acc.push(points);
    return acc;
  }, []);

  basins.sort((a, b) => b.length - a.length);

  return basins;
}

function a() {
  const lowPoints = findLowPoints(input);
  const riskLevel = getRiskLevel(lowPoints);
  console.log("a", riskLevel);
}
function b() {
  const basins = findBasins(input);
  const biggestThreeBasins = basins.slice(0, 3);
  const basinsArea =
    biggestThreeBasins[0].length *
    biggestThreeBasins[1].length *
    biggestThreeBasins[2].length;
  console.log("b", basinsArea);
}

module.exports = {
  a,
  b,
  getPuzzleInput,
  findLowPoints,
  getRiskLevel,
  findBasins,
};
