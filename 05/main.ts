import * as assert from "assert";
import { readFileSync } from "fs";

function main() {
  const inputFile = readFileSync(__dirname + '/input.txt', 'utf8').trim();
  let example = "0 3 0 1 -3";
  assert.strictEqual(solveA(example), 5);
  assert.strictEqual(solveA(inputFile), 343364, "solving A");

  assert.strictEqual(solveB(example), 10);
  assert.strictEqual(solveB(inputFile), 25071947, "solving B");
}

main();

function solveA(input: string): number {
  const codes = input.split(/\s/).map(Number);
  let index = 0;
  let steps = 0;

  while (0 <= index && index < codes.length) {
    steps++;
    const v = codes[index];
    codes[index] += 1;
    index += v
  }

  return steps
}

function solveB(input: string): number {
  const codes = input.split(/\s/).map(Number);
  let index = 0;
  let steps = 0;

  while (0 <= index && index < codes.length) {
    steps++;
    const v = codes[index];
    codes[index] += (v >= 3 ? -1 : +1);
    index += v
  }

  return steps
}
