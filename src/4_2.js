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

function numberOfWinners(card) {
  let totalWinners = 0;
  for (const winner of card[0]) {
    if (card[1].includes(winner)) {
      totalWinners += 1;
    }
  }
  return totalWinners;
}

cardCopiesArray = Array(input.length).fill(1);

for (let i = 0; i < input.length; i++) {
  const winners = numberOfWinners(input[i]);
  //   console.log(
  //     `card ${i + 1}: winners - ${winners}, copies - ${cardCopiesArray[i]}`,
  //   );
  for (let j = i + 1; j < i + winners + 1; j++) {
    cardCopiesArray[j] += cardCopiesArray[i];
  }
  //   console.log(cardCopiesArray);
}

let total = cardCopiesArray.reduce((acc, value) => acc + value);
console.log(total);
