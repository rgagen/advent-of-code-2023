const fs = require("fs");

const input = fs.readFileSync("../input/input11.txt", "utf-8").split("\n");

const emptyXIndices = [];
for (let x = 0; x < input[0].length; x++) {
  let galaxyDetected = false;
  for (let y = 0; y < input.length; y++) {
    if (input[y][x].includes("#")) {
      galaxyDetected = true;
      break;
    }
  }
  if (!galaxyDetected) {
    emptyXIndices.push(x);
  }
}

const emptyYIndices = [];
for (let y = 0; y < input.length; y++) {
  let galaxyDetected = false;
  for (let x = 0; x < input[0].length; x++) {
    if (input[y][x].includes("#")) {
      galaxyDetected = true;
      break;
    }
  }
  if (!galaxyDetected) {
    emptyYIndices.push(y);
  }
}

console.log(emptyXIndices);
console.log(emptyYIndices);

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

galaxyArray = [];

for (let y = 0; y < input.length; y++) {
  for (let x = 0; x < input[0].length; x++) {
    if (input[y][x] === "#") {
      galaxyArray.push(new Point(x, y));
    }
  }
}

const shortestPaths = [];
const expansionFactor = 999999;

while (galaxyArray.length > 0) {
  const currentGalaxy = galaxyArray.pop();
  for (let galaxy of galaxyArray) {
    let xExpansion = 0;
    for (const x of emptyXIndices) {
      if (
        (x < currentGalaxy.x && x > galaxy.x) ||
        (x > currentGalaxy.x && x < galaxy.x)
      ) {
        xExpansion += 1;
      }
    }

    let yExpansion = 0;
    for (const y of emptyYIndices) {
      if (
        (y < currentGalaxy.y && y > galaxy.y) ||
        (y > currentGalaxy.y && y < galaxy.y)
      ) {
        yExpansion += 1;
      }
    }

    let pathLength =
      Math.abs(currentGalaxy.x - galaxy.x) +
      xExpansion * expansionFactor +
      Math.abs(currentGalaxy.y - galaxy.y) +
      yExpansion * expansionFactor;

    shortestPaths.push(pathLength);
  }
}

const sumShortestPaths = shortestPaths.reduce((acc, val) => acc + val);
console.log(sumShortestPaths);
