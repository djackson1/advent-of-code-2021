const { expect } = require("chai");
const { getTestInput } = require("../../utils/files");
const { getDepthIncreases, getDepthIncreasesSlidingWindow } = require("./main");

const testInput = getTestInput(01);
const parsedInputs = testInput
  .split("\n")
  .filter((r) => r)
  .map(Number);

describe("day 01", () => {
  describe("part a", () => {
    it("should get the correct amount of depth increases", () => {
      const depthIncreases = getDepthIncreases(parsedInputs);

      expect(depthIncreases).to.equal(7);
    });
  });

  describe("part b", () => {
    it("should get the correct amount of depth increases", () => {
      const depthIncreases = getDepthIncreasesSlidingWindow(parsedInputs);

      expect(depthIncreases).to.equal(5);
    });
  });
});
