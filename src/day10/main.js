const { getInputs, getCurrentDay } = require("../../utils/files");

const DAY = getCurrentDay(__dirname);

function getPuzzleInput(isTestInput = false) {
  return getInputs(DAY, isTestInput)
    .split("\n")
    .filter((row) => row);
}
const puzzleInput = getPuzzleInput();
const openers = ["(", "[", "{", "<"];
const matchingCloser = {
  "(": ")",
  "[": "]",
  "{": "}",
  "<": ">",
};

function getSyntaxError(chunk) {
  const chunkChars = chunk.split("");
  const stack = [];

  for (let i = 0; i < chunkChars.length; i++) {
    const c = chunkChars[i];

    if (openers.includes(c)) {
      stack.push(c);
    } else {
      const lastItem = stack.pop();

      if (matchingCloser[lastItem] !== c) {
        return c;
      }
    }
  }

  if (stack.length === 0) {
    return null;
  }

  stack.reverse();

  return stack.map((char) => matchingCloser[char]);
}

function getSyntaxErrorScore(input) {
  const syntaxErrorCounts = input.reduce((acc, chunk) => {
    const syntaxError = getSyntaxError(chunk);

    if (!syntaxError) {
      return acc;
    }

    if (!acc[syntaxError]) {
      acc[syntaxError] = 0;
    }
    acc[syntaxError]++;

    return acc;
  }, {});

  return (
    (syntaxErrorCounts[")"] || 0) * 3 +
    (syntaxErrorCounts["]"] || 0) * 57 +
    (syntaxErrorCounts["}"] || 0) * 1197 +
    (syntaxErrorCounts[">"] || 0) * 25137
  );
}

function a() {
  const syntaxErrorScore = getSyntaxErrorScore(puzzleInput);
  console.log("a", syntaxErrorScore);
}
function b() {
  const closingValues = {
    ")": 1,
    "]": 2,
    "}": 3,
    ">": 4,
  };
  const incompleteRows = puzzleInput
    .map(getSyntaxError)
    .filter((value) => Array.isArray(value));
  const incompleteChunkValues = incompleteRows
    .map((values) =>
      values.reduce((acc, value) => acc * 5 + closingValues[value], 0)
    )
    .sort((v1, v2) => v1 - v2);
  const middleIncompleteValue =
    incompleteChunkValues[(incompleteChunkValues.length - 1) / 2];

  console.log("b", middleIncompleteValue);
}

module.exports = {
  a,
  b,
  getPuzzleInput,
  getSyntaxError,
  getSyntaxErrorScore,
};
