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

describe("day 02", () => {
  describe("part a", () => {
    it("should calculate the correct position", () => {
      const position = getPosition(parsedInputs);

      expect(position.y * position.x).to.equal(150);
    });
  });
  describe("part b", () => {
    it("should calculate the correct position", () => {
      const position = getPositionB(parsedInputs);

      expect(position.y * position.x).to.equal(900);
    });
  });
});
