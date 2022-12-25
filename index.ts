import day1 from "./day1";
import day3 from "./day3";
async function main() {
  console.log("MAIN");

  const out1 = await day1();
  const out3 = await day3();

  console.table([out1,out3]);
}

main();
