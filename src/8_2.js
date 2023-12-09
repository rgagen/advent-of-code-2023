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

const directionInput = input[0];
input.splice(0, 2);

function parseLine(line) {
  const extractor = /(...) = \((...), (...)\)/;
  const match = line.match(extractor);
  return { key: match[1], left: match[2], right: match[3] };
}

const map = {};
const startPositions = [];
for (const line of input) {
  const match = parseLine(line);
  if (match === null) {
    continue;
  }
  map[match.key] = match;
  if (/..A/.test(match.key)) {
    startPositions.push(match.key);
  }
}

function lowestHit(startPosition) {
  const directions = new Directions(directionInput);
  let currentKey = startPosition;
  const destinationRegex = /..Z/;
  while (!destinationRegex.test(currentKey)) {
    const nextDirection = directions.nextDirection();
    const currentNode = map[currentKey];
    currentKey = currentNode[nextDirection];
  }
  return directions.totalSteps;
}

console.log();

outputToFirstHit = [];
for (const startPosition of startPositions) {
  outputToFirstHit.push(lowestHit(startPosition));
}

console.log(outputToFirstHit);

function gcd(a, b) {
  return !b ? a : gcd(b, a % b);
}

function lcm(a, b) {
  return (a * b) / gcd(a, b);
}

const lcmOutput = outputToFirstHit.reduce((acc, val) => lcm(acc, val));
console.log(lcmOutput);
