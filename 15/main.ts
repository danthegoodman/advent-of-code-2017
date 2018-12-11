import * as assert from "assert";
import { readFileSync } from "fs";

function main() {
  const inputFile = readFileSync(__dirname + '/input.txt', 'utf8').trim();
  const example =
      "Generator A starts with 65\n" +
      "Generator B starts with 8921".trim();

  assert.strictEqual(solveA(example), 588);
  assert.strictEqual(solveA(inputFile), 594);

  assert.strictEqual(solveB(example), 309);
  assert.strictEqual(solveB(inputFile), 328);
}

main();

function* generatorA(init: number, factor: number) {
  let val = init;
  while (true) {
    val = (val * factor) % 0x7FFFFFFF;
    yield val;
  }
}

function solveA(input: string): number {
  let [aInit, bInit] = input.match(/\d+/g)!.map(Number);
  let genA = generatorA(aInit, 16807);
  let genB = generatorA(bInit, 48271);

  let matchCount = 0;
  for(let i = 0; i < 40_000_000; i++){
    let aVal = genA.next().value & 0xFFFF;
    let bVal = genB.next().value & 0xFFFF;
    if(aVal === bVal) matchCount += 1;
  }

  return matchCount;
}

function* generatorB(init: number, factor: number, multipleOf: number) {
  let val = init;
  while (true) {
    val = (val * factor) % 0x7FFFFFFF;
    if(val % multipleOf === 0) yield val;
  }
}

function solveB(input: string): number {
  let [aInit, bInit] = input.match(/\d+/g)!.map(Number);
  let genA = generatorB(aInit, 16807, 4);
  let genB = generatorB(bInit, 48271, 8);

  let matchCount = 0;
  for(let i = 0; i < 5_000_000; i++){
    let aVal = genA.next().value & 0xFFFF;
    let bVal = genB.next().value & 0xFFFF;
    if(aVal === bVal) matchCount += 1;
  }

  return matchCount;
}
