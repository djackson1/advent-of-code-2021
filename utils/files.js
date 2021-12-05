const fs = require("fs");
const path = require("path");

function getDayString(day) {
  if (day < 10) return `0${day}`;
  return `${day}`;
}

function getInputs(day, isTestInput = false) {
  const filename = isTestInput ? "input.spec.txt" : "input.txt";
  const dayStr = getDayString(day);
  const dayDir = path.resolve(__dirname, `../src/day${dayStr}`, filename);

  return fs.readFileSync(dayDir, "utf-8");
}

function getTestInput(day) {
  return getInputs(day, true);
}

module.exports = {
  getInputs,
  getTestInput,
};
