const fs = require("fs");

let input = fs
  .readFileSync("../input/input5.txt", "utf-8")
  .split("\n")
  .filter((i) => i !== "");

let seeds = input[0]
  .substring(input[0].indexOf(":") + 2)
  .split(" ")
  .map((i) => parseInt(i));

input.splice(0, 1);

class Result {
  constructor(change, seed) {
    this.change = change;
    this.seed = seed;
  }
}

class PlantingMap {
  constructor(inputStr) {
    const inputArr = inputStr.split(" ").map((num) => parseInt(num));
    this.destRangeStart = inputArr[0];
    this.sourceRangeStart = inputArr[1];
    this.length = inputArr[2];
  }

  checkSeed(seed) {
    if (
      seed < this.sourceRangeStart ||
      seed > this.sourceRangeStart + this.length - 1
    ) {
      return new Result(false, seed);
    }
    const offset = seed - this.sourceRangeStart;
    return new Result(true, this.destRangeStart + offset);
  }
}

const mapGroups = [];
let mapGroupIndex = -1;

for (let i = 0; i < input.length; i++) {
  if (input[i].includes(":")) {
    mapGroupIndex += 1;
    mapGroups[mapGroupIndex] = [];
    continue;
  }
  mapGroups[mapGroupIndex].push(new PlantingMap(input[i]));
}

let seedPositions = [];

for (const seed of seeds) {
  let currentPosition = seed;
  for (const mapGroup of mapGroups) {
    let breakFlag = false;
    for (const plantingMap of mapGroup) {
      if (breakFlag) {
        continue;
      }
      let result = plantingMap.checkSeed(currentPosition);
      if (result.change) {
        currentPosition = result.seed;
        breakFlag = true;
      }
    }
  }
  seedPositions.push(currentPosition);
}

let minValue = seedPositions.reduce((acc, value) =>
  value < acc ? value : acc,
);

console.log(minValue);
