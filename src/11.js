const fs = require("fs");

const input = fs.readFileSync("../input/input11_test.txt", "utf-8").split("\n");

const xToBeDoubled = [];
for (let x = 0; x < input[0].length; x++) {
  let galaxyDetected = false;
  for (let y = 0; y < input.length; y++) {
    if (input[y][x].includes("#")) {
      galaxyDetected = true;
      break;
    }
  }
  if (!galaxyDetected) {
    xToBeDoubled.push(x);
  }
}

const yToBeDoubled = [];
for (let y = 0; y < input.length; y++) {
  let galaxyDetected = false;
  for (let x = 0; x < input[0].length; x++) {
    if (input[y][x].includes("#")) {
      galaxyDetected = true;
      break;
    }
  }
  if (!galaxyDetected) {
    yToBeDoubled.push(y);
  }
}

console.log(xToBeDoubled);
console.log(yToBeDoubled);

for (let [y, line] of input.entries()) {
  for (const [i, x] of xToBeDoubled.entries()) {
    let index = i + x;
    line = line.substring(0, index) + "." + line.substring(index);
  }
  input[y] = line;
}

for (let i = 0; i < yToBeDoubled.length; i++) {
  let index = i + yToBeDoubled[i];
  let line = "".padStart(input[0].length, ".");
  input.splice(index, 0, line);
}

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

while (galaxyArray.length > 0) {
  const currentGalaxy = galaxyArray.pop();
  for (let galaxy of galaxyArray) {
    let pathLength =
      Math.abs(currentGalaxy.x - galaxy.x) +
      Math.abs(currentGalaxy.y - galaxy.y);
    shortestPaths.push(pathLength);
  }
}

const sumShortestPaths = shortestPaths.reduce((acc, val) => acc + val);
console.log(sumShortestPaths);
