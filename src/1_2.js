const fs = require("fs");

const inputString = fs.readFileSync("../input/input1_1.txt", "utf8").split("\n");

let output = 0;

for (const line of inputString) {

  const regex = /\d|(?=one|two|three|four|five|six|seven|eight|nine)../g

  const digit_iterator = line.matchAll(regex);
  let digit_array = [...digit_iterator].map((subarray) => subarray[0]);

  if (digit_array.length === 0) {
    continue;
  }

  digit_array = digit_array.map((element) => {
    switch (element) {
      case "on":
        return 1;
      case "tw":
        return 2;
      case "th":
        return 3;
      case "fo":
        return 4;
      case "fi":
        return 5;
      case "si":
        return 6;
      case "se":
        return 7;
      case "ei":
        return 8;
      case "ni":
        return 9;
      default:
        return parseInt(element);
    }
  });

  let line_output = 0;
  if (digit_array.length > 1) {
    line_output = digit_array[0] * 10 + digit_array[digit_array.length - 1];
  } else {
    line_output = digit_array[0] * 10 + digit_array[0];
  }

  output += line_output
}

console.log(output);