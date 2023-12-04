const fs = require("fs");

let input = fs
  .readFileSync("./input/input.txt", "utf-8")
  .split("\n")
  .map((input) => {
    const semiColon = input.indexOf(":");
    const endIndex = input.length;
    return input.substring(semiColon + 2, endIndex - 1);
  })
  .map((input) => input.split(" | "))
  .map((input) => input.map((subaray) => subaray.split(" ")))
  .map((input) =>
    input.map((subaray) => subaray.filter((entry) => entry !== "")),
  );

let currentTotal = 0;

for (const card of input) {
  console.log(card);
  let currentTotalForCard = 0;
  for (const winner of card[0]) {
    if (card[1].includes(winner)) {
      if (currentTotalForCard === 0) {
        currentTotalForCard += 1;
      } else {
        currentTotalForCard *= 2;
      }
    }
  }
  currentTotal += currentTotalForCard;
  console.log(`total: ${currentTotalForCard}`);
}

console.log(currentTotal);
