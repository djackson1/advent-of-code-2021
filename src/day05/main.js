const { getInputs } = require("../../utils/files");

const DAY = 5;

function getPuzzleInput(isTestInput = false) {
  return getInputs(DAY, isTestInput)
    .split("\n")
    .filter((r) => r)
    .map((row) => {
      const [l, r] = row.split("->");
      const [lx, ly] = l.split(",").map(Number);
      const [rx, ry] = r.split(",").map(Number);
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
  // .map((r) => {
  //   const { lx, rx } = r;
  //   if (lx === rx) {
  //     return { ...r, type: "HORIZONTAL" };
  //   } else {
  //     return { ...r, type: "VERTICAL" };
  //   }
  // });
}

function createOceanFloorVentMap(input) {
  const floorMap = {};

  input.forEach(({ lx, ly, rx, ry }, i) => {
    const isHorizontal = ly === ry;

    const dx = isHorizontal ? (rx > lx ? 1 : -1) : 0;
    const dy = !isHorizontal ? (ry > ly ? 1 : -1) : 0;

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
  });

  return floorMap;
}

function a() {
  const input = removeDiagonals(puzzleInput);
  const floorMap = createOceanFloorVentMap(input);
  const ventCount = Object.values(floorMap);
  const tilesTwoPlus = ventCount.filter((r) => r >= 2);

  console.log("a", tilesTwoPlus.length);
}
function b() {
  console.log("b", input);
}

module.exports = {
  a,
  b,
  getPuzzleInput,
  removeDiagonals,
  createOceanFloorVentMap,
};
