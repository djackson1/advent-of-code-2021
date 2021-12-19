const { expect } = require("chai");
const { getCurrentDay } = require("../../utils/files");
const { getPuzzleInput } = require("./main");

const day = getCurrentDay(__dirname);
console.log("day", day);
const testInput = getPuzzleInput(true);

describe(`day ${day}`, function () {
  describe("part a", function () {});

  describe("part b", function () {});
});
