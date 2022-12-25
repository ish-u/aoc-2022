import * as fs from "fs/promises";

async function part1() {
  const input = (await fs.readFile("./day4/input.txt")).toString().split("\n");

  /*
  const input = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`.split("\n");
*/

  var pairs = 0;

  for (var i = 0; i < input.length; i++) {
    const pair = input[i];
    if (!pair) {
      break;
    }
    const first = pair
      .split(",")[0]
      .split("-")
      .map((i) => parseInt(i));
    const second = pair
      .split(",")[1]
      .split("-")
      .map((i) => parseInt(i));

    // Checking if First Pair Surronds Second
    if (first[0] <= second[0] && first[1] >= second[1]) {
      pairs++;
      continue;
    }

    // Checking if Second Pair Surronds First
    if (second[0] <= first[0] && second[1] >= first[1]) {
      pairs++;
    }
  }

  console.log("Part 1 : ", pairs);
}

async function part2() {
  const input = (await fs.readFile("./day4/input.txt")).toString().split("\n");

  /*  const input = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`.split("\n");
*/
  var pairs = 0;

  for (var i = 0; i < input.length; i++) {
    const pair = input[i];
    if (!pair) {
      break;
    }
    const first = pair
      .split(",")[0]
      .split("-")
      .map((i) => parseInt(i));
    const second = pair
      .split(",")[1]
      .split("-")
      .map((i) => parseInt(i));

    // Checking if First Pair Surronds Second
    if (first[0] <= second[0] && first[1] >= second[1]) {
      pairs++;
      continue;
    }

    // Checking if First Pair Surronds Second
    if (second[0] <= first[0] && second[1] >= first[1]) {
      pairs++;
      continue;
    }

    // First Overlap Second
    if (first[1] >= second[0] && first[0] <= second[1]) {
      pairs++;
      continue;
    }

    // Second Overlap First
    if (second[1] >= first[0] && second[0] <= first[1]) {
      pairs++;
      continue;
    }
  }

  console.log("Part 2 : ", pairs);
}

part1();
part2();
