const fs = require("fs");

class springRow {
  row;
  groups;
  knownSpringIndex;
  possibleSpringIndex;

  constructor(inputLine, expansionFactor = 0) {
    [this.row, this.groups] = this.parseLine(inputLine);
    if (expansionFactor) {
      this.expandRows(expansionFactor);
    }
    [this.knownSpringIndex, this.possibleSpringIndex] = this.findSpringIndex(
      this.row,
    );
    this.missingSprings = this.findNumMissingSprings();
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

  findNumMissingSprings() {
    return (
      this.groups.reduce((acc, x) => acc + x) - this.knownSpringIndex.length
    );
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

  expandRows(n) {
    const row = this.row;
    const groups = this.groups;
    for (let i = 1; i < n; i++) {
      this.row += "?" + row;
      this.groups = this.groups.concat(groups);
    }
  }

  arrayCombinations(arr, k) {
    const result = [];

    function generateCombinations(current, start) {
      if (current.length === k) {
        result.push([...current]);
        return;
      }

      for (let i = start; i < arr.length; i++) {
        current.push(arr[i]);
        generateCombinations(current, i + 1);
        current.pop();
      }
    }

    generateCombinations([], 0);
    return result;
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

  findAllSolutions() {
    const combinations = this.arrayCombinations(
      this.possibleSpringIndex,
      this.missingSprings,
    );
    let solutions = 0;

    for (const combination of combinations) {
      let possibleSolution = "";
      for (let i = 0; i < this.row.length; i++) {
        if (combination.includes(i) || this.knownSpringIndex.includes(i)) {
          possibleSolution += "#";
        } else {
          possibleSolution += ".";
        }
      }
      if (this.checkSolution(possibleSolution)) {
        solutions += 1;
      }
    }

    this.solutions = solutions;
  }
}

const input = fs.readFileSync("../input/input12_test.txt", "utf-8").split("\n");
const rows = [];

for (const line of input) {
  rows.push(new springRow(line, 5));
}

let total = 0;
while (rows.length > 0) {
  const springRow = rows.pop();
  springRow.findAllSolutions();
  total += springRow.solutions;
}

console.log(total);
