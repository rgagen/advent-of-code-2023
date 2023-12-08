const fs = require("fs");

const input = fs.readFileSync("./input/input.txt", "utf-8").split("\r\n");

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
  const extractor = /(...) = \((...)\, (...)\)/;
  const match = line.match(extractor);
  return { key: match[1], left: match[2], right: match[3] };
}

const map = {};
for (const line of input) {
  const match = parseLine(line);
  if (match === null) {
    continue;
  }
  map[match.key] = match;
}

let currentKey = "AAA";
const destinationKey = "ZZZ";

while (currentKey !== destinationKey) {
  const nextDirection = directions.nextDirection();
  const currentNode = map[currentKey];
  currentKey = currentNode[nextDirection];
}

console.log(directions.totalSteps);
