const { getInputs } = require("../../utils/files");

const inputs = getInputs(02)
  .split("\n")
  .filter((r) => r)
  .map((r) => {
    const [dir, value] = r.split(" ");
    return { dir, value: Number(value) };
  });

function getPosition(inputs) {
  const position = { x: 0, y: 0 };

  inputs.forEach(({ dir, value }) => {
    if (dir === "forward") {
      position.x += value;
    } else if (dir === "down") {
      position.y += value;
    } else if (dir === "up") {
      position.y -= value;
    }
  });

  return position;
}

function getPositionB(inputs) {
  const position = { x: 0, y: 0, aim: 0 };

  inputs.forEach(({ dir, value }) => {
    if (dir === "forward") {
      const depthChange = position.aim * value;
      position.x += value;
      position.y += depthChange;
    } else if (dir === "down") {
      position.aim += value;
    } else if (dir === "up") {
      position.aim -= value;
    }
  });

  return position;
}

function a() {
  const position = getPosition(inputs);
  console.log("a", position, position.x * position.y);
}

function b() {
  const position = getPositionB(inputs);
  console.log("b", position, position.x * position.y);
}

module.exports = {
  a,
  b,
  getPosition,
  getPositionB,
};
