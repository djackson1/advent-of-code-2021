const fs = require("fs");
const path = require("path");

function getDayString(day) {
  if (day === 0 || day === "00") return "00";
  if (day < 10) return `0${day}`;
  return `${day}`;
}

function getInputs(day, isTestInput = false) {
  // if (day === 0) {
  //   throw new Error("You need to change the value of DAY in main.js!");
  // }
  const filename = isTestInput ? "input.spec.txt" : "input.txt";
  const dayStr = getDayString(day);
  const dayDir = path.resolve(__dirname, `../src/day${dayStr}`, filename);

  return fs.readFileSync(dayDir, "utf-8");
}

function getTestInput(day) {
  return getInputs(day, true);
}

function getCurrentDay(dirname) {
  const split = dirname.split("/");
  const day = split[split.length - 1].replace(/day/, "");
  return Number(day);
}

module.exports = {
  getCurrentDay,
  getInputs,
  getTestInput,
};
