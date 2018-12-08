import * as assert from "assert";
import { readFileSync } from "fs";
import * as _ from 'lodash';

function main() {
  const inputFile = readFileSync(__dirname + '/input.txt', 'utf8').trim();
  assert.strictEqual(solveA("aa bb cc dd ee"), 1);
  assert.strictEqual(solveA("aa bb cc dd aa"), 0);
  assert.strictEqual(solveA("aa bb cc dd aaa"), 1);
  assert.strictEqual(solveA(inputFile), 466, "solving A");

  assert.strictEqual(solveB("abcde fghij"), 1);
  assert.strictEqual(solveB("abcde xyz ecdab"), 0);
  assert.strictEqual(solveB("a ab abc abd abf abj"), 1);
  assert.strictEqual(solveB("iiii oiii ooii oooi oooo"), 1);
  assert.strictEqual(solveB("oiii ioii iioi iiio"), 0);
  assert.strictEqual(solveB(inputFile), 251, "solving B");
}

main();

function solveA(input: string): number {
  let lines = input.split('\n');
  return _.sumBy(lines, it => {
    let words = it.split(/\s+/);
    let allUnique = _.uniq(words).length == words.length;
    return allUnique ? 1 : 0;
  });
}

function solveB(input: string): number {
  let lines = input.split('\n');
  return _.sumBy(lines, it => {
    let words = it.split(/\s+/);
    let sortedWords = words.map(it => _.sortBy(it.split('')).join(''));
    let allUnique = _.uniq(sortedWords).length == sortedWords.length;
    return allUnique ? 1 : 0;
  });
}
