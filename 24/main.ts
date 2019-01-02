import * as assert from "assert";
import { readFileSync } from "fs";

function main() {
  const inputFile = readFileSync(__dirname + '/input.txt', 'utf8').trim();
  const example =
      "0/2\n" +
      "2/2\n" +
      "2/3\n" +
      "3/4\n" +
      "3/5\n" +
      "0/1\n" +
      "10/1\n" +
      "9/10".trim();

  assert.strictEqual(solveA(example), 31);
  assert.strictEqual(solveA(inputFile), 1868);

  assert.strictEqual(solveB(example), 19);
  assert.strictEqual(solveB(inputFile), 1841);
}

main();

function solveA(input: string): number {
  let parts = input.split('\n').map(it => it.split('/').map(Number) as [number, number]);
  return findStrongestFrom(0, parts);
}

function findStrongestFrom(start: number, remaining: ReadonlyArray<[number, number]>): number {
  let found = remaining.filter(it => it[0] === start || it[1] === start);
  let best = 0;
  for (let p of found) {
    let otherSide = p[0] === start ? p[1] : p[0];
    let substrongest = findStrongestFrom(otherSide, remaining.filter(it => it !== p));
    let bestForThisPart = p[0] + p[1] + substrongest;
    if (bestForThisPart > best) {
      best = bestForThisPart;
    }
  }
  return best;
}

function solveB(input: string): number {
  let parts = input.split('\n').map(it => it.split('/').map(Number) as [number, number]);
  let [,bestStrength] = findLongestFrom(0, parts);
  return bestStrength;
}


function findLongestFrom(start: number, remaining: ReadonlyArray<[number, number]>): [number,number] {
  let found = remaining.filter(it => it[0] === start || it[1] === start);
  let bestLength = 0;
  let bestStrength = 0;
  for (let p of found) {
    let otherSide = p[0] === start ? p[1] : p[0];
    let [subLength, subStrength] = findLongestFrom(otherSide, remaining.filter(it => it !== p));

    let length = 1 + subLength;
    let strength = p[0] + p[1] + subStrength;

    if(length > bestLength){
      bestLength = length;
      bestStrength = subStrength + p[0] + p[1];
    } else if(length === bestLength){
      if(strength > bestStrength){
        bestStrength = strength;
      }
    }
  }

  return [bestLength, bestStrength];
}
