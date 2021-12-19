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

  describe("part b", function () {});
});
