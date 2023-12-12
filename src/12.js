const fs = require("fs");

class springRow {
  row;
  groups;
  knownSpringIndex;
  possibleSpringIndex;

  constructor(inputLine) {
    [this.row, this.groups] = this.parseLine(inputLine);
    [this.knownSpringIndex, this.possibleSpringIndex] = this.findSpringIndex(
      this.row,
    );
    this.missingSprings =
      this.groups.reduce((acc, x) => acc + x) - this.knownSpringIndex.length;
  }

  parseLine(line) {
    line = line.split(" ");

    let groups = [];
    const extractor = /(\d+)/g;
    let m;

    do {
      m = extractor.exec(line[1]);
      if (m) {
        groups.push(m[1]);
      }
    } while (m);
    groups = groups.map((x) => parseInt(x));

    return [line[0], groups];
  }

  findSpringIndex(row) {
    const possibleSpringIndex = [];
    const knownSpringIndex = [];
    for (let i = 0; i < this.row.length; i++) {
      if (row[i] === "?") {
        possibleSpringIndex.push(i);
      } else if (row[i] === "#") {
        knownSpringIndex.push(i);
      }
    }
    return [knownSpringIndex, possibleSpringIndex];
  }

  selectRandomPossibleSprings() {
    const shuffled = this.possibleSpringIndex.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, this.missingSprings);
  }

  createPossibleSolution() {
    const selectedPossibleSprings = this.selectRandomPossibleSprings();
    let possibleSolution = "";
    for (let i = 0; i < this.row.length; i++) {
      if (
        selectedPossibleSprings.includes(i) ||
        this.knownSpringIndex.includes(i)
      ) {
        possibleSolution += "#";
      } else {
        possibleSolution += ".";
      }
    }
    return possibleSolution;
  }

  checkSolution(solution) {
    let solutionOutput = [0];
    for (let i = 0; i < solution.length; i++) {
      if (solution[i] === "#") {
        solutionOutput[solutionOutput.length - 1] += 1;
      } else {
        solutionOutput.push(0);
      }
    }
    solutionOutput = solutionOutput.filter((x) => x !== 0);

    if (solutionOutput.length !== this.groups.length) return false;
    for (let i = 0; i < solutionOutput.length; i++) {
      if (solutionOutput[i] !== this.groups[i]) return false;
    }
    return true;
  }

  bruteForceSolutions(n) {
    let solutionSet = new Set();
    for (let i = 0; i < n; i++) {
      const solution = this.createPossibleSolution();
      if (this.checkSolution(solution)) {
        solutionSet.add(solution);
      }
    }
    this.solutionSet = solutionSet;
  }
}

const input = fs.readFileSync("../input/input12.txt", "utf-8").split("\n");
const rows = [];

for (const line of input) {
  rows.push(new springRow(line));
}

let total = 0;
for (const springRow of rows) {
  springRow.bruteForceSolutions(1000000);
  total += springRow.solutionSet.size;
}

console.log(total);
