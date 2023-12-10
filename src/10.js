const fs = require("fs");

class Point {
  constructor(x, y, previous = "start", counter = 0) {
    this.x = x;
    this.y = y;
    this.previous = previous;
    this.counter = counter;
  }

  clone(xOffset = 0, yOffset = 0, previous = "start", counter = 0) {
    return new Point(this.x + xOffset, this.y + yOffset, previous, counter);
  }

  west() {
    this.x -= 1;
    this.previous = "E";
    this.counter += 1;
    // console.log("Moving west");
  }

  east() {
    this.x += 1;
    this.previous = "W";
    this.counter += 1;
    // console.log("Moving east");
  }

  south() {
    this.y += 1;
    this.previous = "N";
    this.counter += 1;
    // console.log("Moving south");
  }

  north() {
    this.y -= +1;
    this.previous = "S";
    this.counter += 1;
    // console.log("Moving north");
  }

  moveByDirectionCode(directionCode) {
    switch (directionCode) {
      case "E":
        this.east();
        return true;
      case "W":
        this.west();
        return true;
      case "S":
        this.south();
        return true;
      case "N":
        this.north();
        return true;
      default:
        return false;
    }
  }

  goBack() {
    this.moveByDirectionCode(this.previous);
  }

  checkEquality(point) {
    return this.x === point.x && this.y === point.y;
  }
}

class Map {
  constructor(input) {
    this.map = input;
    this.xBound = input[0].length;
    this.yBound = input.length;
    this.start = this.setStart();
    this.position = this.start.clone();
    this.pipePoints = [this.start.clone()];
    this.startingDirections = this.findStartConnections(this.start);
    while (this.nextPipeStep()) {
      this.pipePoints.push(this.position.clone());
    }
  }

  setStart() {
    for (let x = 0; x < this.xBound; x++) {
      for (let y = 0; y < this.yBound; y++) {
        if (this.map[y][x] === "S") {
          return new Point(x, y);
        }
      }
    }
  }

  getPipe(point) {
    const row = this.map[point.y];
    if (row) {
      return this.map[point.y][point.x];
    }
    return undefined;
  }

  findStartConnections() {
    // console.log("Finding start connections!");
    const searchPoint = this.position.clone();
    const connections = [];

    searchPoint.north();
    let char = this.getPipe(searchPoint);
    if (["|", "F", "7"].includes(char)) {
      connections.push("N");
    }
    searchPoint.goBack();

    searchPoint.east();
    char = this.getPipe(searchPoint);
    if (["-", "J", "7"].includes(char)) {
      connections.push("E");
    }
    searchPoint.goBack();

    searchPoint.south();
    char = this.getPipe(searchPoint);
    if (["|", "J", "L"].includes(char)) {
      connections.push("S");
    }
    searchPoint.goBack();

    searchPoint.west();
    char = this.getPipe(searchPoint);
    if (["-", "F", "L"].includes(char)) {
      connections.push("W");
    }

    // console.log("Done!");
    return connections;
  }

  nextPipeStep() {
    const currentChar = this.getPipe(this.position);

    if (currentChar === "." || !currentChar) {
      throw new Error("Off track!");
    }

    // Handle Start
    if (currentChar === "S" && this.position.counter !== 0) {
      // console.log("Back at the start");
      return false;
    } else if (currentChar === "S") {
      this.position.moveByDirectionCode(this.startingDirections[0]);
      return true;
    }

    switch (this.position.previous) {
      case "N":
        switch (currentChar) {
          case "|":
            this.position.south();
            break;
          case "L":
            this.position.east();
            break;
          case "J":
            this.position.west();
            break;
          default:
            throw new Error("Came from north but no path forward!");
        }
        break;
      case "E":
        switch (currentChar) {
          case "-":
            this.position.west();
            break;
          case "F":
            this.position.south();
            break;
          case "L":
            this.position.north();
            break;
          default:
            throw new Error("Came from east but no path forward!");
        }
        break;
      case "S":
        switch (currentChar) {
          case "|":
            this.position.north();
            break;
          case "F":
            this.position.east();
            break;
          case "7":
            this.position.west();
            break;
          default:
            throw new Error("Came from south but no path forward!");
        }
        break;
      case "W":
        switch (currentChar) {
          case "-":
            this.position.east();
            break;
          case "J":
            this.position.north();
            break;
          case "7":
            this.position.south();
            break;
          default:
            throw new Error("Came from west but no path forward!");
        }
        break;
      default:
        throw new Error("Fuck");
    }
    return true;
  }

  exploreSpace(startPoint) {
    const pointsToSearch = [startPoint.clone()];
    const pointsSearched = [];
    const includedPoints = [];
    let edgeDetected = false;

    do {
      const currentPoint = pointsToSearch.pop();
      pointsSearched.push(currentPoint.clone());

      const char = this.getPipe(currentPoint);
      if (!char) {
        edgeDetected = true;
        continue;
      }

      let pipePoint = false;
      for (const point of this.pipePoints) {
        pipePoint = pipePoint || point.checkEquality(currentPoint);
      }
      if (pipePoint) {
        continue;
      }

      includedPoints.push(currentPoint.clone());

      const searchDirections = ["N", "S", "E", "W"];
      for (const direction of searchDirections) {
        currentPoint.moveByDirectionCode(direction);

        let alreadyKnown = false;
        for (const point of pointsSearched) {
          alreadyKnown = alreadyKnown || point.checkEquality(currentPoint);
        }
        if (alreadyKnown) {
          currentPoint.goBack();
          continue;
        }

        pointsToSearch.push(currentPoint.clone());
        currentPoint.goBack();
      }
    } while (pointsToSearch.length > 0);

    return includedPoints;
  }
}

const input = fs.readFileSync("../input/input10_test.txt", "utf-8").split("\n");
let map = new Map(input);

console.log(map.position.counter / 2);

console.log(map.exploreSpace(new Point(3, 3)));
