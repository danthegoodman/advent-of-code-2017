import * as assert from "assert";
import { readFileSync } from "fs";
import _ = require("lodash");

function main() {
  const inputFile = readFileSync(__dirname + '/input.txt', 'utf8').trim();
  let example = `
b inc 5 if a > 1
a inc 1 if b < 5
c dec -10 if a >= 1
c inc -20 if c == 10
`.trim();

  assert.strictEqual(solveA(example), 1);
  assert.strictEqual(solveA(inputFile), 4902, "solving A");

  assert.strictEqual(solveB(example), 10);
  assert.strictEqual(solveB(inputFile), 7037, "solving B");
}

main();

function solveA(input: string): number {
  return solveCommon(input).largestFinal;
}

function solveB(input: string): number {
  return solveCommon(input).largestEver;
}

function solveCommon(input: string) {
  const registers = new Map<string, number>();
  let largestEver = 0;

  for (let l of input.split('\n')) {
    const words = l.split(' ');

    const currCmpVal = registers.get(words[4]) || 0;
    const cmpVal = Number(words[6]);

    let isMatch;
    if (words[5] === ">") isMatch = currCmpVal > cmpVal;
    else if (words[5] === ">=") isMatch = currCmpVal >= cmpVal;
    else if (words[5] === "==") isMatch = currCmpVal == cmpVal;
    else if (words[5] === "!=") isMatch = currCmpVal != cmpVal;
    else if (words[5] === "<=") isMatch = currCmpVal <= cmpVal;
    else if (words[5] === "<") isMatch = currCmpVal < cmpVal;
    else throw new Error(`Invalid operator: ${l}`);

    if (isMatch) {
      let currValue = registers.get(words[0]) || 0;
      let deltaValue = Number(words[2]);
      let newValue;
      if (words[1] === "inc") newValue = currValue + deltaValue;
      else if (words[1] === "dec") newValue = currValue - deltaValue;
      else throw new Error(`Invalid mutation: ${l}`);

      if (newValue > largestEver) {
        largestEver = newValue
      }
      registers.set(words[0], newValue);
    }
  }

  return {
    largestFinal: _.max(Array.from(registers.values()))!,
    largestEver: largestEver,
  }
}
