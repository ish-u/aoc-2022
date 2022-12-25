import * as fs from "fs/promises";

async function part1() {
  const input = (await fs.readFile("./day15/input.test.txt"))
    .toString()
    .split("\n");

  const sensors: number[][] = [];
  const beacons: number[][] = [];
  const cave: string[][] = [];

  for (var i = 0; i < 25; i++) {
    cave.push([]);
    for (var j = 0; j < 50; j++) {
      cave[i].push(".");
    }
  }

  // console.log(cave.map((row) => row.join("")).join("\n"));

  input.forEach((line) => {
    const sensor = line
      .split(":")[0]
      .split(" ")
      .splice(2)
      .map((c) => parseInt(c.split("=")[1]));
    sensors.push(sensor);

    const beacon = line
      .split(":")[1]
      .split(" ")
      .splice(5)
      .map((c) => parseInt(c.split("=")[1]));
    beacons.push(beacon);
  });

  console.log(sensors, beacons);

  const translateX = 20;

  for (var i = 0; i < sensors.length; i++) {
    cave[sensors[i][1]][translateX + sensors[i][0]] = "S";
    cave[beacons[i][1]][translateX + beacons[i][0]] = "B";
  }

  console.log(cave.map((row) => row.join("")).join("\n"));

  const currentSensors: number[][] = [];

  for (var i = 0; i < beacons.length; i++) {
    if (beacons[i][0] === 2 && beacons[i][1] === 10) {
      currentSensors.push(sensors[i]);
      console.log(sensors[i]);
    }
  }

  for (var i = -20; i <= 20; i++) {
    if(Math.abs())
  }
}

async function part2() {}
part1();
