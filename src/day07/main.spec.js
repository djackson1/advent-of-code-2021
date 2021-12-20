const { expect } = require("chai");
const {
  getPuzzleInput,
  findShortestAmountOfFuelLinear,
  findShortestAmountOfFuelWithAcceleration,
} = require("./main");

const testInput = getPuzzleInput(true);

describe("day 07", () => {
  describe("part a", () => {
    it("should find the shortest amount of fuel needed", () => {
      const fuel = findShortestAmountOfFuelLinear(testInput);
      expect(fuel).to.equal(37);
    });
  });

  describe("part b", () => {
    it("should find the shortest amount of fuel needed", () => {
      const fuel = findShortestAmountOfFuelWithAcceleration(testInput);
      expect(fuel).to.equal(168);
    });
  });
});
