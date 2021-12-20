const { expect } = require("chai");
const {
  getPuzzleInput,
  countDigits1478,
  createWireMap,
  printWireMap,
  getNumberFromWires,
} = require("./main");

const testInput = getPuzzleInput(true);

describe("day 08", () => {
  describe("part a", () => {
    it("should count the total digits with unique wire counts", () => {
      const countOfDigits = countDigits1478(testInput);
      expect(countOfDigits).to.equal(26);
    });
  });

  describe("part b", () => {
    it("should create the correct wire map for the test example", () => {
      const { wireMap } = createWireMap(testInput[0].wires);

      expect(wireMap).to.deep.equal({
        a: "d",
        b: "e",
        c: "a",
        d: "f",
        e: "g",
        f: "b",
        g: "c",
      });
    });

    it("should get the correct final number from the test example", () => {
      const { wireMapLookup } = createWireMap(testInput[0].wires);

      const number = getNumberFromWires(testInput[0].digits, wireMapLookup);

      expect(number).to.equal(5353);
    });

    it("should add up all the test numbers correctly", () => {
      // added the website test to the first row...
      const inputs = testInput.slice(1);

      const total = inputs.reduce((acc, { wires, digits }) => {
        const { wireMapLookup } = createWireMap(wires);
        const number = getNumberFromWires(digits, wireMapLookup);
        return acc + number;
      }, 0);

      expect(total).to.equal(61229);
    });
  });
});
