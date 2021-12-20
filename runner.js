const { argv } = require("yargs");

(function () {
  const [dayRaw, part] = argv._;
  const day = Number(dayRaw) < 10 ? `0${Number(dayRaw)}` : Number(dayRaw);

  const daySolutions = require(`./src/day${day}/main.js`);

  if (part === "a" || part === "b") {
    console.log(`Running day ${day}`);
    daySolutions[part]();
  }
}());
