import * as assert from "assert";
import { readFileSync } from "fs";
import _ = require("lodash");

function main() {
  const inputFile = readFileSync(__dirname + '/input.txt', 'utf8').trim();
  let example = "0 2 7 0";
  assert.strictEqual(solveA(example), 5);
  assert.strictEqual(solveA(inputFile), 7864, "solving A");

  assert.strictEqual(solveB(example), 4);
  assert.strictEqual(solveB(inputFile), 1695, "solving B");
}

main();

function solveA(input: string): number {
  let nums = input.split(/\s+/).map(Number);
  let seen: string[] = [];

  while (!seen.includes(nums.join('|'))) {
    seen.push(nums.join('|'));
    nums = nextNums(nums)
  }

  return seen.length;
}

function solveB(input: string): number {
  let nums = input.split(/\s+/).map(Number);
  let seen: string[] = [];

  while (!seen.includes(nums.join('|'))) {
    seen.push(nums.join('|'));
    nums = nextNums(nums)
  }

  return seen.length - seen.indexOf(nums.join('|'));
}

function nextNums(nums: number[]): number[] {
  const l = Array.from(nums);
  const max = _.max(l)!;

  let ndx = l.indexOf(max);
  l[ndx] = 0;

  for (let i = 0; i < max; i++) {
    ndx = (ndx + 1) % l.length;
    l[ndx] += 1
  }
  return l
}
