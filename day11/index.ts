import * as fs from "fs/promises";

async function part1() {
  const input = (await fs.readFile("./day11/input.txt"))
    .toString()
    .split("\n\n");

  // Parsing Input
  const monkeys: {
    [key: string]: {
      items: number[];
      operation: {
        operator: string;
        value: string;
      };
      test: number;
      T: string;
      F: string;
    };
  } = {};

  input.forEach((monkey) => {
    const lines = monkey.split("\n");
    monkeys[lines[0].split(":")[0]] = {
      items: lines[1]
        .split(":")[1]
        .split(",")
        .map((item) => parseInt(item)),
      operation: {
        operator: lines[2].split(":")[1].trim().split("=")[1].split(" ")[2],
        value: lines[2].split(":")[1].trim().split("=")[1].split(" ")[3],
      },
      test: parseInt(lines[3].split(":")[1].split(" ")[3]),
      T: "Monkey " + lines[4].split(":")[1].split(" ")[4],
      F: "Monkey " + lines[5].split(":")[1].split(" ")[4],
    };
  });

  // All the Monkeys
  const monkeyKeys = Object.keys(monkeys);

  // to inspect the number of times the monkey inspected items
  var monkeyInspection: { [key: string]: number } = {};
  monkeyKeys.forEach((key) => (monkeyInspection[key] = 0));

  for (var i = 0; i < 20; i++) {
    // console.log("PASS ", i + 1);
    for (var j = 0; j < monkeyKeys.length; j++) {
      var monkeyItems: { [key: string]: number[] } = {};
      monkeyKeys.forEach((key) => (monkeyItems[key] = []));

      const monkeyKey = monkeyKeys[j];
      monkeys[monkeyKey].items.forEach((item) => {
        monkeyInspection[monkeyKey]++;
        var oldValue: number = item;
        var operator: string = monkeys[monkeyKey].operation.operator;
        var operationValue: number = isNaN(
          parseInt(monkeys[monkeyKey].operation.value)
        )
          ? oldValue
          : parseInt(monkeys[monkeyKey].operation.value);
        var newValue = 0;
        switch (operator) {
          case "+":
            newValue = oldValue + operationValue;
            break;
          case "-":
            newValue = oldValue - operationValue;
            break;
          case "*":
            newValue = oldValue * operationValue;
            break;
          case "/":
            newValue = oldValue / operationValue;
            break;
        }
        // Bored Value - decreasing the worry level
        newValue = Math.floor(newValue / 3);
        // throwing Item
        var testValue = monkeys[monkeyKey].test;
        if (newValue % testValue === 0) {
          monkeyItems[monkeys[monkeyKey].T].push(newValue);
        } else {
          monkeyItems[monkeys[monkeyKey].F].push(newValue);
        }
      });

      // console.log(monkeyItems);
      // Updating the Items after the monkey[monkeyKey] throws their items
      monkeyKeys.forEach((key) => {
        if (key === monkeyKeys[j]) {
          monkeys[key].items = [];
        } else {
          monkeys[key].items = [...monkeys[key].items, ...monkeyItems[key]];
        }
      });
    }
    // monkeyKeys.forEach((key) => {
    //   console.log(key, ":", monkeys[key].items);
    // });
    // console.log();
  }

  const v = Object.values(monkeyInspection);
  v.sort((a, b) => b - a);
  // console.log(v);
  console.log("PART 1 :", v[0] * v[1]);
}

async function part2() {
  const input = (await fs.readFile("./day11/input.txt"))
    .toString()
    .split("\n\n");

  // Parsing Input
  const monkeys: {
    [key: string]: {
      items: number[];
      operation: {
        operator: string;
        value: string;
      };
      test: number;
      T: string;
      F: string;
    };
  } = {};

  input.forEach((monkey) => {
    const lines = monkey.split("\n");
    monkeys[lines[0].split(":")[0]] = {
      items: lines[1]
        .split(":")[1]
        .split(",")
        .map((item) => parseInt(item)),
      operation: {
        operator: lines[2].split(":")[1].trim().split("=")[1].split(" ")[2],
        value: lines[2].split(":")[1].trim().split("=")[1].split(" ")[3],
      },
      test: parseInt(lines[3].split(":")[1].split(" ")[3]),
      T: "Monkey " + lines[4].split(":")[1].split(" ")[4],
      F: "Monkey " + lines[5].split(":")[1].split(" ")[4],
    };
  });

  // All the Monkeys
  const monkeyKeys = Object.keys(monkeys);

  // value to use for decreasing worry levels
  var toModWith = 1;
  monkeyKeys.forEach((key) => (toModWith *= monkeys[key].test));

  // to inspect the number of times the monkey inspected items
  var monkeyInspection: { [key: string]: number } = {};
  monkeyKeys.forEach((key) => (monkeyInspection[key] = 0));

  for (var i = 0; i < 10000; i++) {
    // console.log("PASS ", i + 1);
    for (var j = 0; j < monkeyKeys.length; j++) {
      var monkeyItems: { [key: string]: number[] } = {};
      monkeyKeys.forEach((key) => (monkeyItems[key] = []));

      const monkeyKey = monkeyKeys[j];
      monkeys[monkeyKey].items.forEach((item) => {
        monkeyInspection[monkeyKey]++;
        var oldValue: number = item;
        var operator: string = monkeys[monkeyKey].operation.operator;
        var operationValue: number = isNaN(
          parseInt(monkeys[monkeyKey].operation.value)
        )
          ? oldValue
          : parseInt(monkeys[monkeyKey].operation.value);
        var newValue = 0;
        switch (operator) {
          case "+":
            newValue = oldValue + operationValue;
            break;
          case "-":
            newValue = oldValue - operationValue;
            break;
          case "*":
            newValue = oldValue * operationValue;
            break;
          case "/":
            newValue = oldValue / operationValue;
            break;
        }
        // Bored Value - decreasing the worry level
        newValue = newValue % toModWith;
        // throwing Item
        var testValue = monkeys[monkeyKey].test;
        if (newValue % testValue === 0) {
          monkeyItems[monkeys[monkeyKey].T].push(newValue);
        } else {
          monkeyItems[monkeys[monkeyKey].F].push(newValue);
        }
      });

      // console.log(monkeyItems);
      // Updating the Items after the monkey[monkeyKey] throws their items
      monkeyKeys.forEach((key) => {
        if (key === monkeyKeys[j]) {
          monkeys[key].items = [];
        } else {
          monkeys[key].items = [...monkeys[key].items, ...monkeyItems[key]];
        }
      });
    }
    // monkeyKeys.forEach((key) => {
    //   console.log(key, ":", monkeys[key].items);
    // });
    // console.log();
  }

  const v = Object.values(monkeyInspection);
  v.sort((a, b) => b - a);
  // console.log(v);
  console.log("PART 1 :", v[0] * v[1]);
}

part1();
part2();
