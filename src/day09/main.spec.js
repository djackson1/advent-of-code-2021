const { expect } = require("chai");
const { getCurrentDay } = require("../../utils/files");
const {
  getPuzzleInput,
  findLowPoints,
  getRiskLevel,
  findBasins,
} = require("./main");

const day = getCurrentDay(__dirname);
const testInput = getPuzzleInput(true);

describe(`day ${day}`, () => {
  describe("part a", () => {
    it("should find the low points", () => {
      const lowPoints = findLowPoints(testInput);
      const lowPointValues = lowPoints.map(({ value }) => value);
      expect(lowPointValues).to.deep.equal([1, 5, 5, 0]);

      const riskLevel = getRiskLevel(lowPointValues);
      expect(riskLevel).to.equal(15);
    });
  });

  describe("part b", () => {
    it("should flood fill the map into an array of basins", () => {
      const basins = findBasins(testInput);

      const biggestThreeBasins = basins.slice(0, 3);
      const basinsArea =
        biggestThreeBasins[0].length *
        biggestThreeBasins[1].length *
        biggestThreeBasins[2].length;
      expect(basinsArea).to.equal(1134);
    });
  });
});
