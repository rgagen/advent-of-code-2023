const fs = require("fs");

const input = fs.readFileSync("../input/input9.txt", "utf-8").split("\n");

function parseLine(line) {
  const extractor = /[^| ](\d*)/g;
  let m;
  let output = [];
  do {
    m = extractor.exec(line);
    if (m) {
      output.push(parseInt(m[0]));
    }
  } while (m);
  return output;
}

sequences = [];
for (const line of input) {
  sequences.push(parseLine(line));
}

function processSequence(sequence) {
  const output = [];
  for (let i = 1; i < sequence.length; i++) {
    output.push(sequence[i] - sequence[i - 1]);
  }
  return output;
}

function breakdownSequence(sequence) {
  const sequenceBreakdown = [sequence];
  let sum = 0;
  do {
    const nextSequence = processSequence(
      sequenceBreakdown[sequenceBreakdown.length - 1],
    );
    sequenceBreakdown.push(nextSequence);
    sum = nextSequence.reduce((acc, val) => acc + val);
  } while (sum);
  return sequenceBreakdown;
}

function continueSequence(sequenceBreakdown) {
  for (let i = sequenceBreakdown.length - 2; i >= 0; i--) {
    const lastRow = sequenceBreakdown[i + 1];
    const currentRow = sequenceBreakdown[i];
    currentRow.push(
      currentRow[currentRow.length - 1] + lastRow[lastRow.length - 1],
    );
    sequenceBreakdown[i] = currentRow;
  }
  return sequenceBreakdown[0][sequenceBreakdown[0].length - 1];
}

function reverseSequence(sequenceBreakdown) {
  for (let i = sequenceBreakdown.length - 2; i >= 0; i--) {
    const lastRow = sequenceBreakdown[i + 1];
    let currentRow = sequenceBreakdown[i];
    currentRow = [currentRow[0] - lastRow[0]].concat(currentRow);
    sequenceBreakdown[i] = currentRow;
  }
  return sequenceBreakdown[0][0];
}

let outputNextNumber = [];
let outputPrevNumber = [];
for (const sequence of sequences) {
  const sequenceBreakdown = breakdownSequence(sequence);
  const nextNumber = continueSequence(sequenceBreakdown);
  outputNextNumber.push(nextNumber);
  const prevNumber = reverseSequence(sequenceBreakdown);
  outputPrevNumber.push(prevNumber);
}

output = outputNextNumber.reduce((acc, val) => acc + val);
console.log(output);
output = outputPrevNumber.reduce((acc, val) => acc + val);
console.log(output);
