import * as assert from "assert";
import { readFileSync } from "fs";
import * as _ from 'lodash';

function main() {
  const inputFile = readFileSync(__dirname + '/input.txt', 'utf8').trim();
  assert.strictEqual(solveA("5 1 9 5\n7 5 3\n2 4 6 8"), 18);
  assert.strictEqual(solveA(inputFile), 54426, "solving A");

  assert.strictEqual(solveB("5 9 2 8\n9 4 7 3\n3 8 6 5"), 9);
  assert.strictEqual(solveB(inputFile), 333, "solving B");
}

main();


function solveA(input: string): number {
  let lines = input.split('\n');
  return _.sumBy(lines, it => {
    let nums = it.split(/\s+/).map(Number);
    return _.max(nums)! - _.min(nums)!;
  });
}

function solveB(input: string): number {
  let lines = input.split('\n');
  return _.sumBy(lines, it => {
    let nums = it.split(/\s+/).map(Number);

    for (let v1 of nums) {
      for (let v2 of nums) {
        if (v1 <= v2) continue;
        if (v1 % v2 === 0) return v1 / v2;
      }
    }

    throw new Error("Did not find two matching inputs");
  });
}
