import * as assert from "assert";
import { readFileSync } from "fs";

function main() {
  const inputFile = readFileSync(__dirname + '/input.txt', 'utf8').trim();

  assert.strictEqual(solveA("1122"), 3);
  assert.strictEqual(solveA("1111"), 4);
  assert.strictEqual(solveA("1234"), 0);
  assert.strictEqual(solveA("91212129"), 9);
  assert.strictEqual(solveA(inputFile), 1228, "solving A");

  assert.strictEqual(solveB("1212"), 6);
  assert.strictEqual(solveB("1221"), 0);
  assert.strictEqual(solveB("123425"), 4);
  assert.strictEqual(solveB("123123"), 12);
  assert.strictEqual(solveB("12131415"), 4);
  assert.strictEqual(solveB(inputFile), 1238, "solving B");
}

main();


function solveA(input: string): number {
  let chars = input.split('');
  let sum = 0;

  for (let i = 0; i < chars.length; i++) {
    let next = (i + 1) % (chars.length);
    if (chars[i] === chars[next]) {
      sum += Number(chars[i]);
    }
  }
  return sum;
}

function solveB(input: string): number {
  let chars = input.split('');
  let step = chars.length / 2;

  let sum = 0;
  for (let i = 0; i < chars.length; i++) {
    let next = (i + step) % (chars.length)
    if (chars[i] === chars[next]) {
      sum += Number(chars[i]);
    }
  }
  return sum;
}
