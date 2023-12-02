const fs = require("fs");

const inputString = fs.readFileSync("input/input2_1.txt", "utf8").split("\n");

let currentTotal = 0;

for (let line of inputString) {
  if (line.length === 0) {
    continue;
  }

  let trimIndex = line.indexOf(":");
  line = line.substring(trimIndex + 2);

  let reveals = line.split(";");
  let extractionRegex = /\d+|[\w]+/g;
  reveals = reveals.map((reveal) =>
    reveal.trim().replaceAll(",", "").split(" ")
  );

  reveals = reveals.map((reveal) => {
    let revealObject = {};

    while(reveal.length > 1) {
      let color = reveal.pop();
      let number = parseInt(reveal.pop());
      revealObject[color] = number;
    }

    return revealObject
  });

  let impossibleGameFlag = null;

  let redMin = 0;
  let blueMin = 0;
  let greenMin = 0;

  for (revealObject of reveals) {
    if (revealObject.red > redMin) {
      redMin = revealObject.red
    }
    if (revealObject.green > greenMin) {
      greenMin = revealObject.green
    }
    if (revealObject.blue > blueMin) {
      blueMin = revealObject.blue
    }
  }

  console.log(reveals);
  console.log(`red: ${redMin} blue: ${blueMin} green: ${greenMin}`)

  const power = redMin * blueMin * greenMin;
  currentTotal += power;
}

console.log(currentTotal);