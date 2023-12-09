const fs = require("fs");

const input = fs.readFileSync("../input/input7.txt", "utf-8").split("\n");

class Hand {
  constructor(hand, bid) {
    this.hand = hand;
    this.bid = bid;
    this.handStrength = this.handType(hand);
  }

  handType(hand) {
    const cardDict = {};
    let jokerNumber = 0;
    for (const card of hand) {
      if (card === "J") {
        jokerNumber += 1;
        continue;
      }
      cardDict[card] = cardDict[card] ? cardDict[card] + 1 : 1;
    }

    if (jokerNumber === 5) {
      return 6;
    }

    const numberUniqueCards = Object.entries(cardDict).length;
    const maxNumRepeats =
      Object.values(cardDict).reduce((acc, val) => (acc > val ? acc : val)) +
      jokerNumber;

    switch (maxNumRepeats) {
      case 5: // 5 of a kind
        return 6;
      case 4: // 4 of a kind
        return 5;
      case 3: // full house or three of a kind
        return numberUniqueCards === 2 ? 4 : 3;
      case 2: // two pair or one pair
        return numberUniqueCards === 3 ? 2 : 1;
      case 1: // high card
        return 0;
    }
  }

  cardStrength(card) {
    let output = parseInt(card);
    if (output) {
      return output;
    }
    switch (card) {
      case "J":
        return 1;
      case "T":
        return 10;
      case "Q":
        return 12;
      case "K":
        return 13;
      case "A":
        return 14;
    }
  }

  compare(comparatorHand) {
    if (this.handStrength > comparatorHand.handStrength) {
      return 1;
    }
    if (this.handStrength < comparatorHand.handStrength) {
      return -1;
    }

    for (let i = 0; i < this.hand.length; i++) {
      const handCardStrength = this.cardStrength(this.hand[i]);
      const comparatorCardStrength = this.cardStrength(comparatorHand.hand[i]);
      if (handCardStrength === comparatorCardStrength) {
        continue;
      }
      if (handCardStrength > comparatorCardStrength) {
        return 1;
      }
      if (handCardStrength < comparatorCardStrength) {
        return -1;
      }
    }

    return 0;
  }
}

function parseLine(line) {
  let extractor = /(.....) ([0-9]+)/;
  const match = line.match(extractor);
  return new Hand(match[1], match[2]);
}

const hands = [];

for (const line of input) {
  const output = parseLine(line);
  hands.push(output);
}

let swapRequired = false;

do {
  swapRequired = false;
  for (let i = 1; i < hands.length; i++) {
    const handBehind = hands[i - 1];
    const handInfront = hands[i];
    if (handBehind.compare(handInfront) > 0) {
      hands[i - 1] = handInfront;
      hands[i] = handBehind;
      swapRequired = true;
    }
  }
} while (swapRequired);

let currentTotal = 0;

for (let i = 0; i < hands.length; i++) {
  currentTotal += hands[i].bid * (i + 1);
}

console.log(hands);
console.log(currentTotal);
