import * as fs from "fs/promises";

const getSNAFU = (number: string[]) => {
  const numberMap: { [key: string]: number } = {
    "2": 2,
    "1": 1,
    "0": 0,
    "-": -1,
    "=": -2,
  };

  let numberDecimal = 0;
  number.forEach((digit, idx) => {
    numberDecimal += Math.pow(5, number.length - (idx + 1)) * numberMap[digit];
  });

  return numberDecimal;
};

async function part1() {
  const input = (await fs.readFile("./day25/input.txt")).toString().split("\n");
  let sumDecimal = 0;
  input.forEach((line) => {
    const number = line.split("");
    sumDecimal += getSNAFU(number);
  });

  let number = sumDecimal
  let snafu: string[] = []

  // JUST COULD NOT FIGURE OUT HOW TO CONVERT FROM DECIMAL TO SNAFU
  // thanks to this reddit comment - https://www.reddit.com/r/adventofcode/comments/zur1an/comment/j1la7r2/?utm_source=share&utm_medium=web2x&context=3
  while (number > 0) {
    let r = number % 5
    // console.log(number, q, r)
    if (r === 3) {
      snafu.unshift("=")
      number += 5
    }
    else if (r === 4) {
      snafu.unshift("-")
      number += 5
    }
    else {
      snafu.unshift((r).toString())
    }
    number = Math.floor(number / 5)

  }

  console.log("PART 1 : ", snafu.join(""))  
 
  // MY NAIVE SOLUTION TO ADD FROM 0 to the sumDecimal xD - will take eternity
  // for (let i = getSNAFU(number); i <= sumDecimal; i++) {
  //   let carry = 1;
  //   for (let j = number.length; j >= 0; j--) {
  //     if (carry || j === number.length) {
  //       switch (number[j]) {
  //         case "0":
  //           number[j] = "1";
  //           carry = 0;
  //           break;
  //         case "1":
  //           number[j] = "2";
  //           carry = 0;
  //           break;
  //         case "2":
  //           number[j] = "=";
  //           carry = 1;
  //           break;
  //         case "=":
  //           number[j] = "-";
  //           carry = 0;
  //           break;
  //         case "-":
  //           number[j] = "0";
  //           carry = 0;
  //           break;
  //       }
  //     }
  //   }
  //   console.log(i + 1, number.join(""));
  // }
  // console.log(sumDecimal);
}

part1();
