const { expect } = require("chai");
const { getPuzzleInput, findShortestAmountOfFuel } = require("./main");

const testInput = getPuzzleInput(true);

describe("day 07", function () {
  describe("part a", function () {
    it("should find the shortest amount of fuel needed", function () {
      const fuel = findShortestAmountOfFuel(testInput);
      expect(fuel).to.equal(37);
    });
  });

  describe("part b", function () {});
});
