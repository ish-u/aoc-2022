import * as fs from "fs/promises";

async function part1() {
  const input = (await fs.readFile("./day10/input.txt")).toString().split("\n");
  
  
  var cycle = 0;
  var X = 1;
  var sum = 0;
  input.forEach((line) => {
    const cmd = line.split(" ");
    // console.log(cmd);

    const catchCycles = [20, 60, 100, 140, 180, 220];
    if (cmd.length === 1) {
      // noop cycle
      cycle++;
      if (catchCycles.includes(cycle)) {
        // console.log(cycle, X, cycle * X);
        sum += cycle * X;
      }
    } else if (cmd.length === 2) {
      // add Y cycle 1
      cycle++;
      if (catchCycles.includes(cycle)) {
        // console.log(cycle, X, cycle * X);
        sum += cycle * X;
      }
      // add Y cycle 2
      cycle++;
      if (catchCycles.includes(cycle)) {
        // console.log(cycle, X, cycle * X);
        sum += cycle * X;
      }
      // end of cycle 2
      X += parseInt(cmd[1]);
    }
  });
  console.log("PART 1 : ", sum);
}

async function part2() {
  const input = (await fs.readFile("./day10/input.txt")).toString().split("\n");

  var sprite = "###.....................................".split("");
  var current = "";

  var cycle = 0;
  var X = 0;

  input.forEach((line) => {
    const cmd = line.split(" ");
    // console.log(cmd);
    if (cmd.length === 1) {
      // noop cycle
      cycle++;
      if (sprite[(cycle - 1) % 40] === "#") {
        current += "#";
      } else {
        current += ".";
      }
      // console.log(cycle, current);
      // console.log(sprite.join(""));
      // console.log("\n");
    } else if (cmd.length === 2) {
      // add Y cycle 1
      cycle++;
      if (sprite[(cycle - 1) % 40] === "#") {
        current += "#";
      } else {
        current += ".";
      }
      // console.log(cycle, current);
      // console.log(sprite.join(""));
      // console.log("\n");

      // add Y cycle 2
      cycle++;
      if (sprite[(cycle - 1) % 40] === "#") {
        current += "#";
      } else {
        current += ".";
      }

      // end of cycle 2
      sprite[X + 0] = ".";
      sprite[X + 1] = ".";
      sprite[X + 2] = ".";
      X += parseInt(cmd[1]);
      sprite[X + 0] = "#";
      sprite[X + 1] = "#";
      sprite[X + 2] = "#";
      // console.log(cycle, current);
      // console.log(sprite.join(""));
      // console.log("\n");
    }
  });

  console.log("PART 2 :");
  //@ts-ignore
  current = current.replaceAll("#", "█");
  //@ts-ignore
  current = current.replaceAll(".", " ");
  var line = "";
  for (var i = 0; i < 240; i++) {
    if (i % 40 === 0) {
      console.log(line);
      line = "";
    }
    line += current[i];
  }
  console.log(line);
}

part1();
part2();
