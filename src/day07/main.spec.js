const { expect } = require("chai");
const {
  getPuzzleInput,
  findShortestAmountOfFuelLinear,
  findShortestAmountOfFuelWithAcceleration,
} = require("./main");

const testInput = getPuzzleInput(true);

describe("day 07", function () {
  describe("part a", function () {
    it("should find the shortest amount of fuel needed", function () {
      const fuel = findShortestAmountOfFuelLinear(testInput);
      expect(fuel).to.equal(37);
    });
  });

  describe("part b", function () {
    it("should find the shortest amount of fuel needed", function () {
      const fuel = findShortestAmountOfFuelWithAcceleration(testInput);
      expect(fuel).to.equal(168);
    });
  });
});
