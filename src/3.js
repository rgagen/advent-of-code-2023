const fs = require("fs");

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  clone(xOffset = 0, yOffset = 0) {
    return new Point(this.x + xOffset, this.y + yOffset);
  }

  backOne() {
    return this.clone(-1, 0);
  }

  forwardOne() {
    return this.clone(+1, 0);
  }

  downOne() {
    return this.clone(0, +1);
  }

  upOne() {
    return this.clone(0, -1);
  }

  rowStart() {
    let newPoint = this.clone();
    newPoint.x = 0;
    return newPoint;
  }
}

class Engine {
  constructor(path) {
    this.engineArray = fs.readFileSync(path, "utf-8").split("\n");
    this.engineArray.pop(); // Remove final blank line
    this.iterator = new Point(0, 0);
    this.yBounds = this.engineArray.length - 1;
    this.xBounds = this.engineArray[0].length - 1;
  }

  checkBounds(point) {
    if (point.x < 0 || point.x > this.xBounds) {
      return false;
    }
    if (point.y < 0 || point.y > this.yBounds) {
      return false;
    }
    return true;
  }

  nextIter() {
    let newPoint = this.iterator.forwardOne();
    if (this.checkBounds(newPoint)) {
      this.iterator = newPoint;
      return true;
    } else {
      newPoint = newPoint.downOne().rowStart();
    }

    if (this.checkBounds(newPoint)) {
      this.iterator = newPoint;
      return true;
    } else {
      return false;
    }
  }

  setIter(point) {
    this.iterator = point;
  }

  getPoint(point) {
    if (!this.checkBounds(point)) {
      return null;
    }

    return this.engineArray[point.y][point.x];
  }

  isPointX(regex = /./, point) {
    const pointContents = this.getPoint(point);
    if (pointContents !== null) {
      return pointContents.match(regex) !== null;
    } else {
      return false;
    }
  }

  isPointNumber(point) {
    return this.isPointX(/\d/, point);
  }

  isPointGear(point) {
    return this.isPointX(/\*/, point);
  }
}

class PartNumber {
  constructor(point) {
    while (engine.isPointNumber(point)) {
      point = point.backOne();
    }
    point = point.forwardOne();
    this.numberStartPoint = point.clone();

    this.numberValue = 0;
    while (engine.isPointNumber(point)) {
      this.numberValue =
        this.numberValue * 10 + parseInt(engine.getPoint(point));
      point = point.forwardOne();
    }
    this.numberEndPoint = point.backOne();
  }
}

class SearchSpace {
  constructor(pointStart, pointEnd) {
    const searchSpace = [];
    const iLength = pointEnd.x - pointStart.x + 2;

    let currentPoint = pointStart.upOne().backOne();
    for (let i = 0; i <= iLength; i++) {
      searchSpace.push(currentPoint.clone());
      currentPoint = currentPoint.forwardOne();
    }

    searchSpace.push(pointStart.backOne());
    searchSpace.push(pointEnd.forwardOne());

    currentPoint = pointStart.downOne().backOne();
    for (let i = 0; i <= iLength; i++) {
      searchSpace.push(currentPoint.clone());
      currentPoint = currentPoint.forwardOne();
    }

    this.searchSpace = searchSpace;
  }

  checkSearchSpace(regex) {
    let hits = [];
    for (let point of this.searchSpace) {
      const pointContent = engine.getPoint(point);
      if (pointContent === null) {
        continue;
      }
      if (pointContent.match(regex)) {
        hits.push(point);
      }
    }
    this.result = hits;
  }

  deconflictResults() {
    let forDeletion = [];

    for (let i = 1; i < this.result.length; i++) {
      if (
        this.result[i].y === this.result[i - 1].y &&
        this.result[i].x - this.result[i - 1].x === 1
      ) {
        forDeletion.push(i - 1);
      }
    }

    this.result = this.result.filter(
      (value, index) => !forDeletion.includes(index),
    );
  }
}

const engine = new Engine("../input/input3.txt");

// PART 1
let partList = [0];
do {
  if (!engine.isPointNumber(engine.iterator)) {
    continue;
  }

  const currentNumber = new PartNumber(engine.iterator);

  const searchSpace = new SearchSpace(
    currentNumber.numberStartPoint,
    currentNumber.numberEndPoint,
  );

  const symbolRegex = /(?!\.)\W/;
  searchSpace.checkSearchSpace(symbolRegex);

  if (searchSpace.result.length !== 0) {
    partList.push(currentNumber.numberValue);
  }

  engine.setIter(currentNumber.numberEndPoint);
} while (engine.nextIter());

const totalPart1 = partList.reduce((accumulator, value) => accumulator + value);
console.log(`Part 1 total: ${totalPart1}`);

// PART 2
engine.setIter(new Point(0, 0));
let gearList = [0];
do {
  if (!engine.isPointGear(engine.iterator)) {
    continue;
  }

  const searchSpace = new SearchSpace(engine.iterator, engine.iterator);
  const numberRegex = /\d/;
  searchSpace.checkSearchSpace(numberRegex);
  searchSpace.deconflictResults();

  if (searchSpace.result.length !== 2) {
    continue;
  }

  let results = [];
  for (const result of searchSpace.result) {
    const currentNumber = new PartNumber(result);
    results.push(currentNumber.numberValue);
  }

  gearList.push(results[0] * results[1]);
} while (engine.nextIter());

const totalPart2 = gearList.reduce((accumulator, value) => accumulator + value);
console.log(`Part 1 total: ${totalPart2}`);
