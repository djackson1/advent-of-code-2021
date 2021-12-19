const { getInputs, getCurrentDay } = require("../../utils/files");

const DAY = getCurrentDay(__dirname);

function getPuzzleInput(isTestInput = false) {
  return getInputs(DAY, isTestInput)
    .split("\n")
    .filter((row) => row);
}
const input = getPuzzleInput();

const openers = ["(", "[", "{", "<"];
const closers = [")", "]", "}", ">"];
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

      if (matchingCloser[lastItem] !== c) return c;
    }
  }

  if (stack.length === 0) return null;

  return null;
}

function getSyntaxErrorScore(input) {
  const syntaxErrorCounts = input.reduce((acc, chunk) => {
    const syntaxError = getSyntaxError(chunk);

    if (!syntaxError) return acc;

    if (!acc[syntaxError]) acc[syntaxError] = 0;
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
  const syntaxErrorScore = getSyntaxErrorScore(input);
  console.log("a", syntaxErrorScore);
}
function b() {
  console.log("b", input);
}

module.exports = {
  a,
  b,
  getPuzzleInput,
  getSyntaxError,
  getSyntaxErrorScore,
};
