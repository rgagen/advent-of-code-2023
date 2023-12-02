const fs = require("fs");

const inputString = fs.readFileSync("input/input2_1.txt", "utf8").split("\n");

let currentTotal = 0;
let currentGame = 0;

for (let line of inputString) {
  if (line.length === 0) {
    continue;
  }

  currentGame += 1;
  console.log(`Game ${currentGame}`)

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

  for (revealObject of reveals) {
    console.log(revealObject);
    if (revealObject.red > 12 || revealObject.green > 13 || revealObject.blue > 14) {
        console.log('IMPOSSIBLE GAME');
        impossibleGameFlag = true;
        break;
    }
  }

  if (!impossibleGameFlag) {
    currentTotal += currentGame;
    console.log(`${currentTotal} - after adding ${currentGame}`)
  }
}

console.log(currentTotal);