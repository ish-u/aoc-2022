import * as fs from "fs/promises";
async function part1() {
  const cratesFile = (await fs.readFile("./day5/crates.txt"))
    .toString()
    .split("\n");
  const stepsFile = (await fs.readFile("./day5/steps.txt"))
    .toString()
    .split("\n");

  /*
  const cratesFile = `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3`.split("\n");

  const stepsFile = `move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`.split("\n");
*/
  const crates: { [key: number]: string[] } = {};
  for (var i = 1; i < 10; i++) {
    crates[i] = [];
  }
  cratesFile.forEach((line) => {
    const lineArray = [];
    for (var i = 0; i < line.length; i = i + 4) {
      const substr = line
        .substring(i, i + 4)
        .replace("[", "")
        .replace("]", "")
        //@ts-ignore
        .replaceAll(" ", "");

      lineArray.push(substr);
    }
    for (var i = 0; i < lineArray.length; i++) {
      if (lineArray[i] && isNaN(lineArray[i])) {
        crates[i + 1].push(lineArray[i]);
      }
    }
  });

  const steps: number[][] = [];
  stepsFile.forEach((step) => {
    var stepArray = step
      .replace("move", "")
      .replace("from", "")
      .replace("to", "")
      .split("  ")
      .map((x) => parseInt(x));

    if (stepArray.length === 3) {
      steps.push(stepArray);
    }
  });

  // Part 1
  steps.forEach((step) => {
    const n = step[0];
    const from = step[1];
    const to = step[2];

    const p1 = crates[from].slice(0, n).reverse();
    const p2 = crates[from].slice(n);

    crates[to] = [...p1, ...crates[to]];
    crates[from] = [...p2];
  });

  var topCrates = "";
  for (var i = 1; i < 10; i++) {
    topCrates += crates[i][0];
  }
  console.log("PART 1 : ", topCrates);
}

async function part2() {
  const cratesFile = (await fs.readFile("./day5/crates.txt"))
    .toString()
    .split("\n");
  const stepsFile = (await fs.readFile("./day5/steps.txt"))
    .toString()
    .split("\n");

  /*
  const cratesFile = `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3`.split("\n");

  const stepsFile = `move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`.split("\n");
*/
  const crates: { [key: number]: string[] } = {};
  for (var i = 1; i < 10; i++) {
    crates[i] = [];
  }
  cratesFile.forEach((line) => {
    const lineArray = [];
    for (var i = 0; i < line.length; i = i + 4) {
      const substr = line
        .substring(i, i + 4)
        .replace("[", "")
        .replace("]", "")
        //@ts-ignore
        .replaceAll(" ", "");

      lineArray.push(substr);
    }
    for (var i = 0; i < lineArray.length; i++) {
      if (lineArray[i] && isNaN(lineArray[i])) {
        crates[i + 1].push(lineArray[i]);
      }
    }
  });

  const steps: number[][] = [];
  stepsFile.forEach((step) => {
    var stepArray = step
      .replace("move", "")
      .replace("from", "")
      .replace("to", "")
      .split("  ")
      .map((x) => parseInt(x));

    if (stepArray.length === 3) {
      steps.push(stepArray);
    }
  });

  // Part 1
  steps.forEach((step) => {
    const n = step[0];
    const from = step[1];
    const to = step[2];

    const p1 = crates[from].slice(0, n);
    const p2 = crates[from].slice(n);

    crates[to] = [...p1, ...crates[to]];
    crates[from] = [...p2];
  });

  var topCrates = "";
  for (var i = 1; i < 10; i++) {
    topCrates += crates[i][0];
  }
  console.log("PART 2 : ", topCrates);
}
part1();
part2();
