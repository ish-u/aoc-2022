import * as fs from "fs/promises";

async function part1() {
  const input = (await fs.readFile("./day12/input.txt")).toString().split("\n");

  const heatmap: string[][] = [];
  const visited: boolean[][] = [];
  input.forEach((line) => {
    heatmap.push(line.split(""));
    var v: boolean[] = [];
    line.split("").map((_) => v.push(false));
    visited.push(v);
  });

  const directions: number[][] = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  var start = [0, 0];
  var end = [0, 0];
  heatmap.forEach((row, i) => {
    row.forEach((ele, j) => {
      if (ele === "E") {
        end = [i, j];
      }
      if (ele === "S") {
        start = [i, j];
      }
    });
  });
  heatmap[start[0]][start[1]] = "a";
  heatmap[end[0]][end[1]] = "z";

  const queue: number[][] = [[start[0], start[1], 0]];

  while (queue.length) {
    const curr = queue.shift();
    if (curr) {
      for (var i = 0; i < directions.length; i++) {
        if (
          curr[0] + directions[i][0] < 0 ||
          curr[1] + directions[i][1] < 0 ||
          curr[0] + directions[i][0] >= heatmap.length ||
          curr[1] + directions[i][1] >= heatmap[0].length
        ) {
          continue;
        }
        if (visited[curr[0] + directions[i][0]][curr[1] + directions[i][1]]) {
          continue;
        }
        if (
          heatmap[curr[0] + directions[i][0]][
            curr[1] + directions[i][1]
          ].charCodeAt(0) -
            heatmap[curr[0]][curr[1]].charCodeAt(0) >
          1
        ) {
          continue;
        }
        if (
          curr[0] + directions[i][0] === end[0] &&
          curr[1] + directions[i][1] === end[1]
        ) {
          console.log("PART 1 : ", curr[2] + 1);
          return;
        }
        visited[curr[0] + directions[i][0]][curr[1] + directions[i][1]] = true;
        queue.push([
          curr[0] + directions[i][0],
          curr[1] + directions[i][1],
          curr[2] + 1,
        ]);
      }
    }
  }
}

async function part2() {
  const input = (await fs.readFile("./day12/input.txt")).toString().split("\n");

  const heatmap: string[][] = [];
  const visited: boolean[][] = [];
  input.forEach((line) => {
    heatmap.push(line.split(""));
    var v: boolean[] = [];
    line.split("").map((_) => v.push(false));
    visited.push(v);
  });

  const directions: number[][] = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  var start = [0, 0];
  var end = [0, 0];

  const startCoOrdinates: number[][] = [];
  heatmap.forEach((row, i) => {
    row.forEach((ele, j) => {
      if (ele === "a") {
        startCoOrdinates.push([i, j]);
      }
      if (ele === "E") {
        end = [i, j];
      }
      if (ele === "S") {
        startCoOrdinates.push([i, j]);
        start = [i, j];
      }
    });
  });

  heatmap[start[0]][start[1]] = "a";
  heatmap[end[0]][end[1]] = "z";

  const lengths: number[] = [];
  startCoOrdinates.forEach((start) => {
    const queue: number[][] = [[start[0], start[1], 0]];
    // console.log(queue);
    while (queue.length) {
      const curr = queue.shift();
      if (curr) {
        for (var i = 0; i < directions.length; i++) {
          if (
            curr[0] + directions[i][0] < 0 ||
            curr[1] + directions[i][1] < 0 ||
            curr[0] + directions[i][0] >= heatmap.length ||
            curr[1] + directions[i][1] >= heatmap[0].length
          ) {
            continue;
          }
          if (visited[curr[0] + directions[i][0]][curr[1] + directions[i][1]]) {
            continue;
          }
          if (
            heatmap[curr[0] + directions[i][0]][
              curr[1] + directions[i][1]
            ].charCodeAt(0) -
              heatmap[curr[0]][curr[1]].charCodeAt(0) >
            1
          ) {
            continue;
          }
          if (
            curr[0] + directions[i][0] === end[0] &&
            curr[1] + directions[i][1] === end[1]
          ) {
            // console.log(curr[2] + 1);
            lengths.push(curr[2] + 1);
            // return;
            break;
          }
          visited[curr[0] + directions[i][0]][curr[1] + directions[i][1]] =
            true;
          queue.push([
            curr[0] + directions[i][0],
            curr[1] + directions[i][1],
            curr[2] + 1,
          ]);
        }
      }
    }
    visited.forEach((row, i) =>
      row.forEach((ele, j) => (visited[i][j] = false))
    );
  });
  console.log("PART 2 : ", Math.min(...lengths));
}

part1();
part2();
