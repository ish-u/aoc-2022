import * as fs from "fs/promises";

async function part1() {
//  const input = (await fs.readFile("./day14/input.txt")).toString().split("\n");
    const input =  (await fs.readFile("./day14/input.txt")).toString().split("\n")
  // CaveMap
  const caveMap: string[][] = [];
  for (var i = 0; i < 250; i++) {
    caveMap.push([]);
    for (var j = 0; j < 1000; j++) {
      caveMap[i].push(".");
    }
  }

  // Parsing Input
  input.forEach((line) => {
    const points = line.split("->");
    for (var i = 1; i < points.length; i++) {
      const p1 = points[i - 1]
        .trim()
        .split(",")
        .map((p) => parseInt(p));
      const p2 = points[i]
        .trim()
        .split(",")
        .map((p) => parseInt(p));

      // console.log(p1, p2);
      caveMap[p2[1]][p2[0]] = "#";
      if (p1[0] === p2[0]) {
        var diff = p1[1] - p2[1];
        if (diff < 0) {
          while (diff !== 0) {
            p2[1]--;
            diff++;
            caveMap[p2[1]][p2[0]] = "#";
            // console.log(p1, p2);
          }
        } else {
          while (diff !== 0) {
            p2[1]++;
            diff--;
            caveMap[p2[1]][p2[0]] = "#";
            // console.log(p1, p2);
          }
        }
      } else if (p1[1] === p2[1]) {
        var diff = p1[0] - p2[0];
        if (diff < 0) {
          while (diff !== 0) {
            p2[0]--;
            diff++;
            caveMap[p2[1]][p2[0]] = "#";
            // console.log(p1, p2);
          }
        } else {
          while (diff !== 0) {
            p2[0]++;
            diff--;
            caveMap[p2[1]][p2[0]] = "#";
            // console.log(p1, p2);
          }
        }
      }
      // console.log("\n");
    }
  });

  // Sand
  caveMap[0][500] = "+";
  var i = 0;
  var j = 500;
  var count = 0;

  // Simulating Sand
  while (
    i + 1 < caveMap.length &&
    j < caveMap[0].length &&
    caveMap[1][500] !== "o"
  ) {
    // console.log(i, j);
    if (caveMap[i + 1][j] === "#" || caveMap[i + 1][j] === "o") {
      if (caveMap[i + 1][j - 1] === ".") {
        i++;
        j--;
      } else if (caveMap[i + 1][j + 1] === ".") {
        i++;
        j++;
      } else {
        caveMap[i][j] = "o";
        i = 0;
        j = 500;
        count++;
      }
    } else {
      i++;
    }
  }
  console.log("PART 1 : ", count);
}

async function part2() {
  const input = (await fs.readFile("./day14/input.txt")).toString().split("\n");

  // CaveMap
  const caveMap: string[][] = [];
  for (var i = 0; i < 250; i++) {
    caveMap.push([]);
    for (var j = 0; j < 1000; j++) {
      caveMap[i].push(".");
    }
  }

  // Base - 2 CoOrdinate
  var maxY = 0;

  // Parsing Input
  input.forEach((line) => {
    const points = line.split("->");
    for (var i = 1; i < points.length; i++) {
      const p1 = points[i - 1]
        .trim()
        .split(",")
        .map((p) => parseInt(p));
      const p2 = points[i]
        .trim()
        .split(",")
        .map((p) => parseInt(p));

      const maxPY = Math.max(p1[1], p2[1]);
      if (maxPY > maxY) {
        maxY = maxPY;
      }

      // console.log(p1, p2);
      caveMap[p2[1]][p2[0]] = "#";
      if (p1[0] === p2[0]) {
        var diff = p1[1] - p2[1];
        if (diff < 0) {
          while (diff !== 0) {
            p2[1]--;
            diff++;
            caveMap[p2[1]][p2[0]] = "#";
            // console.log(p1, p2);
          }
        } else {
          while (diff !== 0) {
            p2[1]++;
            diff--;
            caveMap[p2[1]][p2[0]] = "#";
            // console.log(p1, p2);
          }
        }
      } else if (p1[1] === p2[1]) {
        var diff = p1[0] - p2[0];
        if (diff < 0) {
          while (diff !== 0) {
            p2[0]--;
            diff++;
            caveMap[p2[1]][p2[0]] = "#";
            // console.log(p1, p2);
          }
        } else {
          while (diff !== 0) {
            p2[0]++;
            diff--;
            caveMap[p2[1]][p2[0]] = "#";
            // console.log(p1, p2);
          }
        }
      }
      // console.log("\n");
    }
  });

  // Drawing the Base
  // console.log(maxY);
  maxY += 2;
  for (var j = 0; j < caveMap[0].length; j++) {
    caveMap[maxY][j] = "#";
  }

  // Sand
  caveMap[0][500] = "+";
  var i = 0;
  var j = 500;
  var count = 0;

  // Simulating Sand
  while (
    i + 1 < caveMap.length &&
    j < caveMap[0].length &&
    caveMap[0][500] !== "o"
  ) {
    // console.log(i, j);
    if (caveMap[i + 1][j] === "#" || caveMap[i + 1][j] === "o") {
      if (caveMap[i + 1][j - 1] === ".") {
        i++;
        j--;
      } else if (caveMap[i + 1][j + 1] === ".") {
        i++;
        j++;
      } else {
        caveMap[i][j] = "o";
        i = 0;
        j = 500;
        count++;
      }
    } else {
      i++;
    }
  }

  console.log("PART 2 : ", count);
}

part1();
part2();

// FOR VISUALIZATION EXAMPLE INPUT
async function simulateSand() {
  const input = (await fs.readFile("./day14/input.test.txt")) // Have Example File Input - not actual input file
    .toString()
    .split("\n");

  // CaveMap
  const caveMap: string[][] = [];
  for (var i = 0; i < 15; i++) {
    caveMap.push([]);
    for (var j = 0; j < 40; j++) {
      caveMap[i].push("  ");
    }
  }

  // Base - 2 CoOrdinate
  var maxY = 0;
  const translateBy = 480;
  // Parsing Input
  input.forEach((line) => {
    const points = line.split("->");
    for (var i = 1; i < points.length; i++) {
      const p1 = points[i - 1]
        .trim()
        .split(",")
        .map((p) => parseInt(p));
      const p2 = points[i]
        .trim()
        .split(",")
        .map((p) => parseInt(p));

      const maxPY = Math.max(p1[1], p2[1]);
      if (maxPY > maxY) {
        maxY = maxPY;
      }

      // console.log(p1, p2);
      caveMap[p2[1]][p2[0] - translateBy] = "⬛";
      if (p1[0] === p2[0]) {
        var diff = p1[1] - p2[1];
        if (diff < 0) {
          while (diff !== 0) {
            p2[1]--;
            diff++;
            caveMap[p2[1]][p2[0] - translateBy] = "⬛";
            // console.log(p1, p2);
          }
        } else {
          while (diff !== 0) {
            p2[1]++;
            diff--;
            caveMap[p2[1]][p2[0] - translateBy] = "⬛";
            // console.log(p1, p2);
          }
        }
      } else if (p1[1] === p2[1]) {
        var diff = p1[0] - p2[0];
        if (diff < 0) {
          while (diff !== 0) {
            p2[0]--;
            diff++;
            caveMap[p2[1]][p2[0] - translateBy] = "⬛";
            // console.log(p1, p2);
          }
        } else {
          while (diff !== 0) {
            p2[0]++;
            diff--;
            caveMap[p2[1]][p2[0] - translateBy] = "⬛";
            // console.log(p1, p2);
          }
        }
      }
      // console.log("\n");
    }
  });
  // console.log(caveMap.map((row) => row.join("")).join("\n"));
  // return;

  // Drawing the Base
  // Un Comment to simulate Part 2
  // console.log(maxY);
  maxY += 4;
  for (var j = 0; j < caveMap[0].length; j++) {
    caveMap[maxY][j] = "⬛";
  }

  // Sand
  caveMap[0][500 - translateBy] = "+";
  var i = 0;
  var j = 500 - translateBy;
  var count = 0;

  // Simulating Sand
  while (
    i + 1 < caveMap.length &&
    j < caveMap[0].length &&
    caveMap[0][500 - translateBy] !== "🟡" // change to caveMap[0][500-translatedBy] for Part 2
  ) {
    // console.log(i, j);
    if (caveMap[i + 1][j] === "⬛" || caveMap[i + 1][j] === "🟡") {
      if (caveMap[i + 1][j - 1] === "  ") {
        i++;
        j--;
      } else if (caveMap[i + 1][j + 1] === "  ") {
        i++;
        j++;
      } else {
        caveMap[i][j] = "🟡";
        i = 0;
        j = 500 - translateBy;
        count++;
      }
    } else {
      i++;
    }
    console.clear();
    console.log(caveMap.map((row) => row.join("")).join("\n"));
    await new Promise((r) => setTimeout(r, 15));
  }

  // console.log("PART 1 : ", count);
}

simulateSand();
