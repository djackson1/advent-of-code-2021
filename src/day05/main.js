const { getInputs } = require("../../utils/files");

const DAY = 5;

function getPuzzleInput(isTestInput = false) {
  return getInputs(DAY, isTestInput)
    .split("\n")
    .filter((r) => r)
    .map((row) => {
      const [l, r] = row.split("->");
      const [ly, lx] = l.split(",").map(Number);
      const [ry, rx] = r.split(",").map(Number);
      return { lx, ly, rx, ry };
    });
}

const puzzleInput = getPuzzleInput();

function removeDiagonals(input) {
  return input.filter(({ lx, ly, rx, ry }) => {
    if (lx === rx) return true;
    if (ly === ry) return true;
    return false;
  });
}

function createOceanFloorVentMap(input) {
  const floorMap = {};

  input.forEach(({ lx, ly, rx, ry }) => {
    const dx = lx !== rx ? (rx > lx ? 1 : -1) : 0;
    const dy = ly !== ry ? (ry > ly ? 1 : -1) : 0;

    // diagonal
    if (dx !== 0 && dy !== 0) {
      let x = lx;
      let y = ly;

      while (true) {
        if (x === rx + dx && y === ry + dy) break;

        const key = `${x}-${y}`;
        if (!floorMap[key]) floorMap[key] = 0;
        floorMap[key]++;

        x += dx;
        y += dy;
      }
      // horizontal or vertical
    } else {
      for (let x = lx; x !== rx + dx; x += dx) {
        const key = `${x}-${ly}`;
        if (!floorMap[key]) floorMap[key] = 0;
        floorMap[key]++;
      }

      for (let y = ly; y !== ry + dy; y += dy) {
        const key = `${lx}-${y}`;
        if (!floorMap[key]) floorMap[key] = 0;
        floorMap[key]++;
      }
    }
  });

  return floorMap;
}

function print(map) {
  const values = Object.keys(map).map((str) => str.split("-").map(Number));

  const maxX = values.reduce((acc, [x]) => (x > acc ? x : acc), 0);
  const maxY = values.reduce((acc, [_, y]) => (y > acc ? y : acc), 0);

  for (let x = 0; x <= maxX; x++) {
    let str = "";
    for (let y = 0; y <= maxY; y++) {
      const key = `${x}-${y}`;

      if (map[key]) {
        str += map[key];
      } else {
        str += ".";
      }
    }
    console.log(str);
  }
}

function a() {
  const input = removeDiagonals(puzzleInput);
  const floorMap = createOceanFloorVentMap(input);
  const ventCount = Object.values(floorMap);
  const tilesTwoPlus = ventCount.filter((r) => r >= 2);

  console.log("a", tilesTwoPlus.length);
}
function b() {
  const floorMap = createOceanFloorVentMap(puzzleInput);
  const ventCount = Object.values(floorMap);
  const tilesTwoPlus = ventCount.filter((r) => r >= 2);

  console.log("b", tilesTwoPlus.length);
}

module.exports = {
  a,
  b,
  getPuzzleInput,
  removeDiagonals,
  createOceanFloorVentMap,
  print,
};
