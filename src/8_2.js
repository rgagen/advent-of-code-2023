const fs = require("fs");

const input = fs.readFileSync("../input/input8.txt", "utf-8").split("\n");

class Directions {
  constructor(input) {
    this.directionString = input;
    this.length = this.directionString.length;
    this.currentDirectionIndex = 0;
    this.totalSteps = 0;
  }

  nextDirection() {
    const output =
      this.directionString[this.currentDirectionIndex] === "L"
        ? "left"
        : "right";
    this.currentDirectionIndex += 1;
    if (this.currentDirectionIndex >= this.length) {
      this.currentDirectionIndex = 0;
    }
    this.totalSteps += 1;
    return output;
  }
}

const directions = new Directions(input[0]);
input.splice(0, 2);

function parseLine(line) {
  const extractor = /(...) = \((...), (...)\)/;
  const match = line.match(extractor);
  return { key: match[1], left: match[2], right: match[3] };
}

const map = {};
const currentLocations = [];
for (const line of input) {
  const match = parseLine(line);
  if (match === null) {
    continue;
  }
  map[match.key] = match;
  if (/..A/.test(match.key)) {
    currentLocations.push(match.key);
  }
}

function isDone(testLocations) {
  const results = testLocations.map((value) => /..Z/.test(value));
  return results.every(Boolean);
}

while (!isDone(currentLocations)) {
  const nextDirection = directions.nextDirection();

  for (let i = 0; i < currentLocations.length; i++) {
    const currentNode = map[currentLocations[i]];
    currentLocations[i] = currentNode[nextDirection];
  }
}

console.log(directions.totalSteps);
