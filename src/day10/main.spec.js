const { expect } = require("chai");
const { getCurrentDay } = require("../../utils/files");
const {
  getPuzzleInput,
  getSyntaxError,
  getSyntaxErrorScore,
} = require("./main");

const testInput = getPuzzleInput(true);

describe(`day ${getCurrentDay(__dirname)}`, () => {
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

  describe("part a", () => {
    it("should validate validate chunks", () => {
      validChunks.forEach((chunk) => {
        expect(getSyntaxError(chunk)).to.be.null;
      });
    });

    it("should invalidate corrupted chunks", () => {
      corruptedChunks.forEach((chunk) => {
        expect(getSyntaxError(chunk)).to.not.be.null;
      });
    });

    it("should calculate the correct syntax error score for the test input", () => {
      const syntaxErrorScore = getSyntaxErrorScore(testInput);

      expect(syntaxErrorScore).to.equal(26397);
    });
  });

  describe("part b", () => {
    it("should get the incomplete lines", () => {
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
        .map((values) =>
          values.reduce((acc, value) => acc * 5 + closingValues[value], 0)
        )
        .sort((a, b) => a - b);

      const middleIncompleteValue =
        incompleteChunkValues[(incompleteChunkValues.length - 1) / 2];

      expect(middleIncompleteValue).to.equal(288957);
    });
  });
});
