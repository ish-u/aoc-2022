import * as fs from "fs/promises";

async function main() {
  const input = (await fs.readFile("./day8/input.txt")).toString().split("\n");

  const treeGrid: number[][] = [];
  const treeGridSize: number[][] = [];
  const scores: number[] = [];

  input.forEach((line) => {
    const row = line.split("").map((tree) => parseInt(tree));
    treeGrid.push(row);
    treeGridSize.push(row.map((ele) => 0));
  });

  var visibleTrees: number = 0;
  for (var i = 0; i < treeGrid.length; i++) {
    for (var j = 0; j < treeGrid[i].length; j++) {
      if (checkVisible(i, j, i, j, treeGrid)) {
        visibleTrees++;
      }
      scores.push(findLength(i, j, treeGrid));
    }
  }

  console.log("PART 1 :", visibleTrees);
  console.log("PART 2 :", Math.max(...scores));
}

// PART 1
function checkVisible(i, j, currI, currJ, treeGrid) {
  if (
    j === 0 ||
    i === 0 ||
    j === treeGrid[i].length - 1 ||
    i === treeGrid.length - 1
  ) {
    return true;
  }

  return (
    checkRight(i, j, currI, currJ, treeGrid) ||
    checkLeft(i, j, currI, currJ, treeGrid) ||
    checkBottom(i, j, currI, currJ, treeGrid) ||
    checkTop(i, j, currI, currJ, treeGrid)
  );
}

function checkRight(i, j, currI, currJ, treeGrid) {
  if (
    (j === 0 ||
      i === 0 ||
      j === treeGrid[i].length - 1 ||
      i === treeGrid.length - 1) &&
    treeGrid[currI][currJ] > treeGrid[i][j]
  ) {
    return true;
  }

  if (treeGrid[currI][currJ] > treeGrid[i][j - 1]) {
    return checkRight(i, j - 1, currI, currJ, treeGrid);
  }
  return false;
}

function checkLeft(i, j, currI, currJ, treeGrid) {
  if (
    (j === 0 ||
      i === 0 ||
      j === treeGrid[i].length - 1 ||
      i === treeGrid.length - 1) &&
    treeGrid[currI][currJ] > treeGrid[i][j]
  ) {
    return true;
  }

  if (treeGrid[currI][currJ] > treeGrid[i][j + 1]) {
    return checkLeft(i, j + 1, currI, currJ, treeGrid);
  }

  return false;
}

function checkTop(i, j, currI, currJ, treeGrid) {
  if (
    (j === 0 ||
      i === 0 ||
      j === treeGrid[i].length - 1 ||
      i === treeGrid.length - 1) &&
    treeGrid[currI][currJ] > treeGrid[i][j]
  ) {
    return true;
  }

  if (treeGrid[currI][currJ] > treeGrid[i - 1][j]) {
    return checkTop(i - 1, j, currI, currJ, treeGrid);
  }
  return false;
}

function checkBottom(i, j, currI, currJ, treeGrid) {
  if (
    (j === 0 ||
      i === 0 ||
      j === treeGrid[i].length - 1 ||
      i === treeGrid.length - 1) &&
    treeGrid[currI][currJ] > treeGrid[i][j]
  ) {
    return true;
  }

  if (treeGrid[currI][currJ] > treeGrid[i + 1][j]) {
    return checkBottom(i + 1, j, currI, currJ, treeGrid);
  }

  return false;
}

// PART 2
function findLength(i, j, treeGrid) {
  if (
    j === 0 ||
    i === 0 ||
    j === treeGrid[i].length - 1 ||
    i === treeGrid.length - 1
  ) {
    return 0;
  }

  return (
    findLengthRight(i, j, i, j, treeGrid, 0) *
    findLengthLeft(i, j, i, j, treeGrid, 0) *
    findLengthTop(i, j, i, j, treeGrid, 0) *
    findLengthBottom(i, j, i, j, treeGrid, 0)
  );
}
function findLengthRight(i, j, currI, currJ, treeGrid, currLen) {
  if (
    j === 0 ||
    i === 0 ||
    j === treeGrid[i].length - 1 ||
    i === treeGrid.length - 1
  ) {
    return currLen;
  }
  if (treeGrid[currI][currJ] > treeGrid[i][j - 1]) {
    return findLengthRight(i, j - 1, currI, currJ, treeGrid, currLen + 1);
  }
  return currLen + 1;
}

function findLengthLeft(i, j, currI, currJ, treeGrid, currLen) {
  if (
    j === 0 ||
    i === 0 ||
    j === treeGrid[i].length - 1 ||
    i === treeGrid.length - 1
  ) {
    return currLen;
  }
  if (treeGrid[currI][currJ] > treeGrid[i][j + 1]) {
    return findLengthLeft(i, j + 1, currI, currJ, treeGrid, currLen + 1);
  }
  return currLen + 1;
}

function findLengthTop(i, j, currI, currJ, treeGrid, currLen) {
  if (
    j === 0 ||
    i === 0 ||
    j === treeGrid[i].length - 1 ||
    i === treeGrid.length - 1
  ) {
    return currLen;
  }
  if (treeGrid[currI][currJ] > treeGrid[i - 1][j]) {
    return findLengthTop(i - 1, j, currI, currJ, treeGrid, currLen + 1);
  }
  return currLen + 1;
}

function findLengthBottom(i, j, currI, currJ, treeGrid, currLen) {
  if (
    j === 0 ||
    i === 0 ||
    j === treeGrid[i].length - 1 ||
    i === treeGrid.length - 1
  ) {
    return currLen;
  }
  if (treeGrid[currI][currJ] > treeGrid[i + 1][j]) {
    return findLengthBottom(i + 1, j, currI, currJ, treeGrid, currLen + 1);
  }
  return currLen + 1;
}

main();

