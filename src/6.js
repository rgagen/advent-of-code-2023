const time = [40828492];
const distance = [233101111101487];

const outputs = [];

for (let i = 0; i < time.length; i++) {
  let outPutDistance = 0;
  let startRange = null;
  for (let buttonPush = 1; outPutDistance < distance[i] + 1; buttonPush++) {
    outPutDistance = buttonPush * (time[i] - buttonPush);
    startRange = buttonPush;
  }

  outPutDistance = 0;
  let endRange = null;
  for (
    let buttonPush = time[i] - 1;
    outPutDistance < distance[i] + 1;
    buttonPush--
  ) {
    outPutDistance = buttonPush * (time[i] - buttonPush);
    endRange = buttonPush;
  }

  outputs.push(endRange - startRange + 1);
}

console.log(outputs.reduce((acc, val) => acc * val));
