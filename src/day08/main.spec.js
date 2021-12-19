const { expect } = require("chai");
const { getPuzzleInput, countDigits1478 } = require("./main");

const testInput = getPuzzleInput(true);
console.log("testInput", testInput);

describe("day 08", function () {
  describe("part a", function () {
    it("should count the total digits with unique wire counts", function () {
      const countOfDigits = countDigits1478(testInput);
      expect(countOfDigits).to.equal(26);
    });
  });

  describe("part b", function () {});
});
