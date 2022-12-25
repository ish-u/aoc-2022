import * as fs from "fs/promises";

async function part1() {
  const input = (await fs.readFile("./day3/input.txt")).toString().split("\n");
  const commonItems: string[] = [];

  input.forEach((line) => {
    const part2 = line.slice(0, line.length / 2);
    const part1 = line.slice(line.length / 2, line.length);

    const currentItems: string[] = [];

    const mapPart1: { [key: string]: boolean } = {};
    [...part1].forEach((letter) => {
      if (letter) {
        mapPart1[letter] = true;
      }
    });

    [...part2].forEach((letter) => {
      if (mapPart1[letter] && !currentItems.includes(letter)) {
        commonItems.push(letter);
        currentItems.push(letter);
      }
    });
  });

  // Priority Hash Map
  const priority: { [key: string]: number } = {};
  for (var i = 0; i < 26; i++) {
    priority[String.fromCharCode("a".charCodeAt(0) + i)] = i + 1;
  }
  for (var i = 0; i < 26; i++) {
    priority[String.fromCharCode("A".charCodeAt(0) + i)] = i + 26 + 1;
  }

  var priorities = 0;
  commonItems.forEach((item) => {
    priorities += priority[item];
  });

  console.log(priorities);
  return priorities;
}

async function part2() {
  const input = (await fs.readFile("./day3/input.txt")).toString().split("\n");

  const commonItems: string[] = [];

  for (var i = 0; i < input.length; i = i + 3) {
    const part1 = input[i];
    const part2 = input[i + 1];
    const part3 = input[i + 2];

    const currentItems: string[] = [];

    [...part1].forEach((letter) => {
      if (
        part2.includes(letter) &&
        part3.includes(letter) &&
        !currentItems.includes(letter)
      ) {
        commonItems.push(letter);
        currentItems.push(letter);
      }
    });
  }

  const priority: { [key: string]: number } = {};
  for (var i = 0; i < 26; i++) {
    priority[String.fromCharCode("a".charCodeAt(0) + i)] = i + 1;
  }
  for (var i = 0; i < 26; i++) {
    priority[String.fromCharCode("A".charCodeAt(0) + i)] = i + 26 + 1;
  }

  var priorities = 0;
  commonItems.forEach((item) => {
    priorities += priority[item];
  });

  console.log(priorities);
  return priorities;
}

async function main() {
  return [await part1(), await part2()];
}
export default main;
