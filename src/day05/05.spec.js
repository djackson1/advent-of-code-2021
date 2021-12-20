const { expect } = require("chai");
const { getTestInput } = require("../../utils/files");
const {
  getPuzzleInput,
  removeDiagonals,
  createOceanFloorVentMap,
  print,
} = require("./main");

const testInput = getPuzzleInput(true);
const partAInput = removeDiagonals(testInput);
const floorMapPartA = createOceanFloorVentMap(partAInput);
const floorMapPartB = createOceanFloorVentMap(testInput);

describe("day 05", () => {
  before(() => {
    print(floorMapPartA);
    console.log();
    print(floorMapPartB);
  });
  describe("part a", () => {
    it("should find 5 vents with overlapping coords", () => {
      const ventCount = Object.values(floorMapPartA);
      const tilesTwoPlus = ventCount.filter((r) => r >= 2);
      expect(tilesTwoPlus.length).to.equal(5);
    });
  });

  describe("part b", () => {
    it("should find 12 vents with overlapping coords", () => {
      const ventCount = Object.values(floorMapPartB);
      const tilesTwoPlus = ventCount.filter((r) => r >= 2);
      expect(tilesTwoPlus.length).to.equal(12);
    });
  });
});
