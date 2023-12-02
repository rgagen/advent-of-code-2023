const fs = require('fs');

const inputString = fs.readFileSync('input/input1_1.txt', 'utf8')
    .split('\n');

let output = 0;

for (const line of inputString) {
    const digit_iterator = line.matchAll('\\d');
    const digit_array = [...digit_iterator].map(subarray => subarray[0]);

    if (digit_array.length === 0) {
        continue
    }

    let line_output = digit_array[0];
    if (digit_array.length > 1) {
        line_output = line_output.concat(digit_array[digit_array.length - 1])
    } else {
        line_output = line_output.concat(digit_array[0])
    }
    line_output = parseInt(line_output)

    output += line_output
}

console.log(output) 