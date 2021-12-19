const { expect } = require("chai");
const { getCurrentDay } = require("../../utils/files");
const { getPuzzleInput, findLowPoints, getRiskLevel } = require("./main");

const day = getCurrentDay(__dirname);
const testInput = getPuzzleInput(true);

describe(`day ${day}`, function () {
  describe("part a", function () {
    it("should find the low points", function () {
      const lowPoints = findLowPoints(testInput);
      expect(lowPoints).to.deep.equal([1, 5, 5, 0]);

      const riskLevel = getRiskLevel(lowPoints);
      expect(riskLevel).to.equal(15);
    });
  });

  describe("part b", function () {});
});
