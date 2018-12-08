import * as assert from "assert";
import { readFileSync } from "fs";

function main() {
  const inputFile = readFileSync(__dirname + '/input.txt', 'utf8').trim();

  assert.strictEqual(solveA("{}"), 1);
  assert.strictEqual(solveA("{{{}}}"), 6);
  assert.strictEqual(solveA("{{},{}}"), 5);
  assert.strictEqual(solveA("{{{},{},{{}}}}"), 16);
  assert.strictEqual(solveA("{<a>,<a>,<a>,<a>}"), 1);
  assert.strictEqual(solveA("{{<ab>},{<ab>},{<ab>},{<ab>}}"), 9);
  assert.strictEqual(solveA("{{<!!>},{<!!>},{<!!>},{<!!>}}"), 9);
  assert.strictEqual(solveA("{{<a!>},{<a!>},{<a!>},{<ab>}}"), 3);
  assert.strictEqual(solveA(inputFile), 10800);

  assert.strictEqual(solveB("<>"), 0);
  assert.strictEqual(solveB("<random characters>"), 17);
  assert.strictEqual(solveB("<<<<>"), 3);
  assert.strictEqual(solveB("<{!>}>"), 2);
  assert.strictEqual(solveB("<!!>"), 0);
  assert.strictEqual(solveB("<!!!>>"), 0);
  assert.strictEqual(solveB("<{o\"i!a,<{i<a>"), 10);
  assert.strictEqual(solveB(inputFile), 4522);
}

main();

function solveA(input: string): number {
  let score = 0;
  let depth = 0;
  let inGarbage = false;
  let inBang = false;

  for (let ch of input) {
    if (inBang) {
      inBang = false;
    } else if (inGarbage) {
      if (ch == '!') {
        inBang = true;
      } else if (ch == '>') {
        inGarbage = false;
      }
    } else {
      if (ch === '{') {
        depth += 1;
        score += depth
      } else if (ch === '}') {
        depth -= 1
      } else if (ch === '<') {
        inGarbage = true
      }
    }
  }
  return score
}

function solveB(input: string): number {
  let countGarbage = 0;
  let inGarbage = false;
  let inBang = false;

  for (let ch of input) {
    if (inBang) {
      inBang = false
    } else if (inGarbage) {
      if (ch === '!') {
        inBang = true
      } else if (ch === '>') {
        inGarbage = false
      } else {
        countGarbage += 1
      }
    } else {
      if (ch === '<') {
        inGarbage = true
      }
    }
  }
  return countGarbage
}
