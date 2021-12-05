const { expect } = require("chai");
const { getTestInput } = require("../../utils/files");
const { getDepthIncreases } = require("./main");

const testInput = getTestInput(01);
const parsedInputs = testInput
  .split("\n")
  .filter((r) => r)
  .map(Number);

describe("day 01", function () {
  it("should run", function () {
    const depthIncreases = getDepthIncreases(parsedInputs);

    expect(depthIncreases).to.equal(7);
  });
});
