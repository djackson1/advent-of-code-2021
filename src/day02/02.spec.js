const { expect } = require("chai");
const { getTestInput } = require("../../utils/files");
const { getPosition, getPositionB } = require("./main");

const testInput = getTestInput(02);
const parsedInputs = testInput
  .split("\n")
  .filter((r) => r)
  .map((r) => {
    const [dir, value] = r.split(" ");
    return { dir, value: Number(value) };
  });

describe("day 02", function () {
  describe("part a", function () {
    it("should calculate the correct position", function () {
      const position = getPosition(parsedInputs);

      expect(position.y * position.x).to.equal(150);
    });
  });
  describe("part b", function () {
    it("should calculate the correct position", function () {
      const position = getPositionB(parsedInputs);

      expect(position.y * position.x).to.equal(900);
    });
  });
});
