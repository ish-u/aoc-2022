import * as fs from "fs/promises";

async function part1() {
  const file = (await fs.readFile("./day9/input.txt")).toString().split("\n");

  const ropeMap: string[][] = [];
  const visited: boolean[][] = [];
  for (var i = 0; i < 3000; i++) {
    const row: string[] = [];
    const rowV: boolean[] = [];
    for (var j = 0; j < 3000; j++) {
      row.push(".");
      rowV.push(false);
    }
    ropeMap.push(row);
    visited.push(rowV);
  }
  ropeMap[1500][1500] = "H";
  visited[1500][1500] = true;

  var i = 1500;
  var j = 1500;
  var ti = 1500;
  var tj = 1500;
  var start = true;
  file.forEach((line) => {
    const dirVal = line.split(" ");
    var dir = dirVal[0];
    var val = parseInt(dirVal[1]);
    // console.log(line);
    switch (dir) {
      case "R":
        while (val) {
          ropeMap[i][j] = ".";
          j += 1;
          ropeMap[i][j] = "H";
          if (start) {
            ropeMap[i][j - 1] = "T";
            start = false;
          }
          // console.log(i, j);
          if (!checkifTailClose(i, j, ropeMap)) {
            const newPos = moveTail(i, j, ti, tj, ropeMap);
            // console.log(i, j, newPos);
            ropeMap[ti][tj] = ".";
            ti = newPos[0];
            tj = newPos[1];
            ropeMap[ti][tj] = "T";
            // console.log(i, j, ti, tj);
            if (!visited[ti][tj]) {
              visited[ti][tj] = true;
            }
          }
          val--;
          // console.log(ropeMap);
        }
        break;
      case "L":
        while (val) {
          ropeMap[i][j] = ".";
          j -= 1;
          ropeMap[i][j] = "H";
          if (start) {
            ropeMap[i][j + 1] = "T";
            start = false;
          }
          // console.log(i, j);
          if (!checkifTailClose(i, j, ropeMap)) {
            const newPos = moveTail(i, j, ti, tj, ropeMap);
            // console.log(i, j, newPos);
            ropeMap[ti][tj] = ".";
            ti = newPos[0];
            tj = newPos[1];
            ropeMap[ti][tj] = "T";
            // console.log(i, j, ti, tj);
            if (!visited[ti][tj]) {
              visited[ti][tj] = true;
            }
          }
          val--;
          // console.log(ropeMap);
        }
        break;
      case "D":
        while (val) {
          ropeMap[i][j] = ".";
          i += 1;
          ropeMap[i][j] = "H";
          if (start) {
            ropeMap[i - 1][j] = "T";
            start = false;
          }
          // console.log(i, j);
          if (!checkifTailClose(i, j, ropeMap)) {
            const newPos = moveTail(i, j, ti, tj, ropeMap);
            ropeMap[ti][tj] = ".";
            ti = newPos[0];
            tj = newPos[1];
            ropeMap[ti][tj] = "T";
            // console.log(i, j, ti, tj);
            if (!visited[ti][tj]) {
              visited[ti][tj] = true;
            }
          }
          val--;
          // console.log(ropeMap);
        }
        break;
      case "U":
        while (val) {
          ropeMap[i][j] = ".";
          i -= 1;
          ropeMap[i][j] = "H";
          if (start) {
            ropeMap[i + 1][j] = "T";
            start = false;
          }
          if (!checkifTailClose(i, j, ropeMap)) {
            const newPos = moveTail(i, j, ti, tj, ropeMap);
            ropeMap[ti][tj] = ".";
            ti = newPos[0];
            tj = newPos[1];
            // console.log(i, j, ti, tj);
            ropeMap[ti][tj] = "T";
            if (!visited[ti][tj]) {
              visited[ti][tj] = true;
            }
          }
          val--;
          // console.log(ropeMap);
        }
        break;
    }
  });

  var part1 = 0;
  visited.map((r) =>
    r.map((e) => {
      if (e === true) {
        // console.log(e);
        part1 += 1;
      }
    })
  );

  console.log("PART 1 :", part1);
}

function checkifTailClose(i, j, ropeMap) {
  // Down
  if (i + 1 < ropeMap[0].length && ropeMap[i + 1][j] === "T") {
    return true;
  }
  // Top
  else if (i - 1 >= 0 && ropeMap[i - 1][j] === "T") {
    return true;
  }
  // Right
  else if (j + 1 < ropeMap[0].length && ropeMap[i][j + 1] === "T") {
    return true;
  }
  // Left
  else if (j - 1 >= 0 && ropeMap[i][j - 1] === "T") {
    return true;
  }
  // Top Right
  else if (
    i - 1 >= 0 &&
    j + 1 < ropeMap[0].length &&
    ropeMap[i - 1][j + 1] === "T"
  ) {
    return true;
  }
  // Top Left
  else if (i - 1 >= 0 && j - 1 >= 0 && ropeMap[i - 1][j - 1] === "T") {
    return true;
  }
  // Bottom Right
  else if (
    i + 1 < ropeMap.length &&
    j + 1 < ropeMap[0].length &&
    ropeMap[i + 1][j + 1] === "T"
  ) {
    return true;
  }
  // Bottom Left
  else if (
    i + 1 < ropeMap.length &&
    j - 1 >= 0 &&
    ropeMap[i + 1][j - 1] === "T"
  ) {
    return true;
  }
  return false;
}

function moveTail(i, j, ti, tj, ropeMap): [number, number] {
  // Down
  if (i + 2 < ropeMap[0].length && ropeMap[i + 2][j] === "T") {
    return [i + 1, j];
  }
  // Top
  else if (i - 2 >= 0 && ropeMap[i - 2][j] === "T") {
    return [i - 1, j];
  }
  // Right
  else if (j + 2 < ropeMap[0].length && ropeMap[i][j + 2] === "T") {
    return [i, j + 1];
  }
  // Left
  else if (j - 2 >= 0 && ropeMap[i][j - 2] === "T") {
    return [i, j - 1];
  }
  // Top Right
  else if (
    (i - 2 >= 0 && j + 2 < ropeMap.length && ropeMap[i - 2][j + 2] === "T") ||
    (i - 2 >= 0 && j + 1 < ropeMap.length && ropeMap[i - 2][j + 1] === "T") ||
    (i - 1 >= 0 && j + 2 < ropeMap.length && ropeMap[i - 1][j + 2] === "T")
  ) {
    // return [i - 1, j + 1];
    return [ti + 1, tj - 1];
  }
  // Top Left
  else if (
    (i - 2 >= 0 && j - 2 >= 0 && ropeMap[i - 2][j - 2] === "T") ||
    (i - 2 >= 0 && j - 1 >= 0 && ropeMap[i - 2][j - 1] === "T") ||
    (i - 1 >= 0 && j - 2 >= 0 && ropeMap[i - 1][j - 2] === "T")
  ) {
    return [ti + 1, tj + 1];
  }
  // Bottom Right
  else if (
    (i + 2 < ropeMap.length &&
      j + 2 < ropeMap[0].length &&
      ropeMap[i + 2][j + 2] === "T") ||
    (i + 2 < ropeMap.length &&
      j + 1 < ropeMap[0].length &&
      ropeMap[i + 2][j + 1] === "T") ||
    (i + 1 < ropeMap.length &&
      j + 2 < ropeMap[0].length &&
      ropeMap[i + 1][j + 2] === "T")
  ) {
    // return [i + 1, j + 1];
    return [ti - 1, tj - 1];
  }
  // Bottom Left
  else if (
    (i + 2 < ropeMap.length && j - 2 >= 0 && ropeMap[i + 2][j - 2] === "T") ||
    (i + 2 < ropeMap.length && j - 1 >= 0 && ropeMap[i + 2][j - 1] === "T") ||
    (i + 1 < ropeMap.length && j - 2 >= 0 && ropeMap[i + 1][j - 2] === "T")
  ) {
    // return [i + 1, j - 1];
    return [ti - 1, tj + 1];
  }
  return [ti, tj];
}

//part1();

// PART 2
async function part2() {
  const input = (await fs.readFile("./day9/input.test.txt"))
    .toString()
    .split("\n");

  console.log(input);
}
part2();
