import * as fs from "fs/promises";
async function main() {
  try {
    const file = await fs.readFile("./day1/input.txt");
    const lines = file.toString().split("\n");

    const calories: number[] = [];
    var current = 0;
    lines.forEach((line) => {
      if (line === "") {
        calories.push(current);
        current = 0;
      } else {
        current += parseInt(line);
      }
    });

    calories.sort((a, b) => b - a);

    console.log(`Part 1 : ${calories[0]}`);
    console.log(`Part 2 : ${calories[0] + calories[1] + calories[2]}`);

    return [calories[0], calories[0] + calories[1] + calories[2]]
  } catch (err) {
    console.log(err);
  }
}

export default main;
// main();
