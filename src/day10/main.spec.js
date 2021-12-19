const { expect } = require("chai");
const { getCurrentDay } = require("../../utils/files");
const {
  getPuzzleInput,
  getSyntaxError,
  getSyntaxErrorScore,
} = require("./main");

const testInput = getPuzzleInput(true);

describe(`day ${getCurrentDay(__dirname)}`, function () {
  const validChunks = [
    "()",
    "[]",
    "([])",
    "{()()()}",
    "<([{}])>",
    "[<>({}){}[([])<>]]",
    "(((((((((())))))))))",
  ];

  const corruptedChunks = ["(]", "{()()()>", "(((()))}", "<([]){()}[{}])"];

  describe("part a", function () {
    it("should validate validate chunks", function () {
      validChunks.forEach((chunk) => {
        expect(getSyntaxError(chunk)).to.be.null;
      });
    });

    it("should invalidate corrupted chunks", function () {
      corruptedChunks.forEach((chunk) => {
        expect(getSyntaxError(chunk)).to.not.be.null;
      });
    });

    it("should calculate the correct syntax error score for the test input", function () {
      const syntaxErrorScore = getSyntaxErrorScore(testInput);

      expect(syntaxErrorScore).to.equal(26397);
    });
  });

  describe("part b", function () {
    it("should get the incomplete lines", function () {
      const closingValues = {
        ")": 1,
        "]": 2,
        "}": 3,
        ">": 4,
      };
      const incompleteRows = testInput
        .map(getSyntaxError)
        .filter((value) => Array.isArray(value));

      const incompleteChunkValues = incompleteRows
        .map((values) => {
          return values.reduce((acc, value) => {
            return acc * 5 + closingValues[value];
          }, 0);
        })
        .sort((a, b) => a - b);

      const middleIncompleteValue =
        incompleteChunkValues[(incompleteChunkValues.length - 1) / 2];

      expect(middleIncompleteValue).to.equal(288957);
    });
  });
});
