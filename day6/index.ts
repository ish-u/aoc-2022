import * as fs from "fs/promises";

async function main() {
  const input = (await fs.readFile("./day6/input.txt")).toString();

  for (var i = 0; i < input.length; i++) {
    if (!(i + 3 >= input.length)) {
      const code = input.substring(i, i + 4);
      if (new Set(code).size === 4) {
        console.log("PART 1 : ", i + 4, code);
        break;
      }
    }
  }

  for (var i = 0; i < input.length; i++) {
    if (!(i + 13 >= input.length)) {
      const code = input.substring(i, i + 14);
      if (new Set(code).size === 14) {
        console.log("PART 2 : ", i + 14, code);
        break;
      }
    }
  }
}

main();
