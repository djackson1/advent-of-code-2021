const { expect } = require("chai");
const { getTestInput } = require("../../utils/files");
const {
  getPuzzleInput,
  removeDiagonals,
  createOceanFloorVentMap,
} = require("./main");

const testInput = getPuzzleInput(true);
const partAInput = removeDiagonals(testInput);
const floorMap = createOceanFloorVentMap(partAInput);
console.log("floorMap", floorMap);

describe("day 05", function () {
  describe("part a", function () {
    it("should find 5 vents with overlapping coords", function () {
      const ventCount = Object.values(floorMap);
      const tilesTwoPlus = ventCount.filter((r) => r >= 2);
      expect(tilesTwoPlus.length).to.equal(5);
    });
  });

  describe("part b", function () {});
});
