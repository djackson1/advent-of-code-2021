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

function countDigits1478(inputs) {
  return inputs.reduce((acc, { digits }) => {
    const digitCount = digits.reduce((acc2, d) => {
      const is1478 = [2, 4, 3, 7].includes(d.length);
      return acc2 + (is1478 ? 1 : 0);
    }, 0);

    return acc + digitCount;
  }, 0);
}

function getWireCounts(wiresArr) {
  const wires = wiresArr.join("").split("");

  const counts = wires.reduce((acc, wire) => {
    if (!acc[wire]) {
      acc[wire] = 0;
    }
    acc[wire]++;

    return acc;
  }, {});

  return counts;
}

function findWireSimilarities(wires) {
  const counts = getWireCounts(wires);

  const diff = Object.entries(counts).reduce((acc, [wire, count]) => {
    if (count === wires.length) {
      acc.push(wire);
    }
    return acc;
  }, []);

  return diff;
}

function findWireDifferences(wires) {
  const counts = getWireCounts(wires);

  const diff = Object.entries(counts).reduce((acc, [wire, count]) => {
    if (count !== wires.length) {
      acc.push(wire);
    }
    return acc;
  }, []);

  return diff;
}

function getDigitFromWires(wires, wireMapLookup) {
  console.log("getDigitFromWires ~ wireMapLookup", wireMapLookup);
  console.log("getDigitFromWires ~ wires", wires);
  if (wires.length === 2) return 1;
  if (wires.length === 3) return 7;
  if (wires.length === 4) return 4;
  if (wires.length === 7) return 8;

  const digitWireString = wires
    .map((wire) => wireMapLookup[wire])
    .sort((a, b) => (a < b ? -1 : a > b ? 1 : 0))
    .join("");

  if (digitWireString === "abcefg") return 0;
  if (digitWireString === "acdeg") return 2;
  if (digitWireString === "acdfg") return 3;
  if (digitWireString === "abdfg") return 5;
  if (digitWireString === "abdefg") return 6;
  if (digitWireString === "abcdfg") return 9;

  // length 5 = [2,3,5]
  // length 6 = [0,6,9]
  // const {a,b,c,d,e,f,g} = wire

  // 2 = [a,c,d,e,g]
  // if (wireMapLookup[wires]) {
  // }
}

function getNumberFromWires(wireGroups, wireMapLookup) {
  const digits = wireGroups.map((wires) =>
    getDigitFromWires(wires.split(""), wireMapLookup)
  );

  return parseInt(digits.join(""), 10);
}

function swap(json) {
  var ret = {};
  for (var key in json) {
    ret[json[key]] = key;
  }
  return ret;
}

function createWireMap(wires) {
  const wiresByLength = wires.reduce((acc, wire) => {
    if (!acc[wire.length]) {
      acc[wire.length] = [];
    }
    acc[wire.length].push(wire);

    return acc;
  }, {});
  console.log("wiresByLength ~ wiresByLength", wiresByLength);

  // wire position "a" is the extra between wire length 2 and 3
  // only one difference, always one element
  const [wireA] = findWireDifferences([
    wiresByLength[2][0],
    wiresByLength[3][0],
  ]);

  // the same between [2,3,5] are the middle bars
  const wiresADG = findWireSimilarities(wiresByLength[5]);
  console.log("createWireMap ~ wiresADG", wiresADG);

  // remove wireA and we have a group of DG
  const wiresDG = wiresADG.filter((wire) => wire !== wireA);
  console.log("createWireMap ~ wiresDG", wiresDG);

  // all counts.. useful?
  const allCounts = getWireCounts([
    ...wiresByLength[2],
    ...wiresByLength[3],
    ...wiresByLength[4],
    ...wiresByLength[5],
    ...wiresByLength[6],
    ...wiresByLength[7],
  ]);
  console.log("createWireMap ~ allCounts", allCounts);

  const wireF = Object.entries(allCounts)
    .filter(([_, count]) => count === 9)
    .map(([wire]) => wire)[0]; // only 1 wire in this array

  const wireC = wiresByLength[2][0]
    .split("")
    .filter((wire) => wire !== wireF)[0];

  // wire lengths => DIGITS
  // 2 = [1]
  // 3 = [7]
  // 4 = [4]
  // 5 = [2,3,5]
  // 6 = [0,6,9]
  // 7 = [8]

  const wiresCF = Object.values(wiresByLength[2])[0].split("");
  console.log("createWireMap ~ wiresCF", wiresCF);

  // const digits235count = getWireCounts(wiresByLength[5]);
  // console.log("createWireMap ~ digits235count", digits235count);

  // const digits069count = getWireCounts(wiresByLength[6]);
  // console.log("createWireMap ~ digits069count", digits069count);

  const digits069missing = findWireDifferences(wiresByLength[6]);

  // remove wires d/g and c/f and it only leaves wire e
  const wireE = digits069missing.filter(
    (wire) => !wiresDG.includes(wire) && !wiresCF.includes(wire)
  )[0];

  const wireD = digits069missing
    .filter((wire) => wire !== wireE)
    .filter((wire) => wire !== wireC)[0];

  const digit4wires = Object.keys(getWireCounts(wiresByLength[4]));
  const wireB = digit4wires.filter(
    (wire) => ![wireC, wireD, wireF].includes(wire)
  )[0];
  console.log("createWireMap ~ wireB", wireB);

  const digit8wires = Object.keys(getWireCounts(wiresByLength[7]));
  const wireG = digit8wires.filter(
    (wire) => ![wireA, wireB, wireC, wireD, wireE, wireF].includes(wire)
  )[0];
  console.log("createWireMap ~ wireG", wireG);

  // initial wire to new wire
  const wireMap = {
    a: wireA,
    b: wireB,
    c: wireC,
    d: wireD,
    e: wireE,
    f: wireF,
    g: wireG,
  };

  // reverse the map so we have a lookup
  return { wireMap, wireMapLookup: swap(wireMap) };
}

function printWireMap(wireMap) {
  const { a, b, c, d, e, f, g } = wireMap;
  console.log(` ${a}${a}${a}${a} `);
  console.log(`${b}    ${c}`);
  console.log(`${b}    ${c}`);
  console.log(` ${d}${d}${d}${d} `);
  console.log(`${e}    ${f}`);
  console.log(`${e}    ${f}`);
  console.log(` ${g}${g}${g}${g} `);
}

function a() {
  const digitCount = countDigits1478(input);
  console.log("a", digitCount);
}
function b() {
  const total = input.reduce((acc, { wires, digits }) => {
    const { wireMapLookup } = createWireMap(wires);
    const number = getNumberFromWires(digits, wireMapLookup);
    return acc + number;
  }, 0);

  console.log("b", total);
}

module.exports = {
  a,
  b,
  getPuzzleInput,
  countDigits1478,
  createWireMap,
  printWireMap,
  getNumberFromWires,
};
