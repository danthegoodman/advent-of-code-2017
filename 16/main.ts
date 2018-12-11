import * as assert from "assert";
import { readFileSync } from "fs";
import _ = require("lodash");

function main() {
  const inputFile = readFileSync(__dirname + '/input.txt', 'utf8').trim();
  const example = "s1,x3/4,pe/b";

  assert.strictEqual(solveA(example, buildDancers(5)), "baedc");
  assert.strictEqual(solveA(inputFile, buildDancers(16)), 'cgpfhdnambekjiol');

  assert.strictEqual(solveB(inputFile, buildDancers(16)), 'gjmiofcnaehpdlbk');
}

main();

function buildDancers(count: number) {
  let aCode = 'a'.charCodeAt(0);
  return _.times(count, n => String.fromCharCode(aCode + n));
}

function solveA(input: string, dancers: string[]): string {
  let commands = input.split(',');
  for (let c of commands) {
    if (c[0] === 's') spin(c);
    else if (c[0] === 'x') exchange(c);
    else if (c[0] === 'p') partner(c);
  }
  return dancers.join('');

  function spin(command: string) {
    let [, x] = command.match(/s(\d+)/)!.map(Number);
    let takenOff = dancers.splice(dancers.length - x, x);
    dancers.splice(0, 0, ...takenOff);
  }

  function exchange(command: string) {
    let [, a, b] = command.match(/x(\d+)\/(\d+)/)!.map(Number);
    let tmp = dancers[a];
    dancers[a] = dancers[b];
    dancers[b] = tmp;
  }

  function partner(command: string) {
    let [, a, b] = command.match(/p(\w+)\/(\w+)/)!;
    let aNdx = dancers.indexOf(a);
    let bNdx = dancers.indexOf(b);
    let tmp = dancers[aNdx];
    dancers[aNdx] = dancers[bNdx];
    dancers[bNdx] = tmp;
  }
}

function solveB(input: string, dancers: string[]): string {
  let index = 0;
  let seen = new Set<string>();
  const limit = 1_000_000_000;
  while (index < limit) {
    let key = dancers.join('');
    seen.add(key);
    index++;

    let result = solveA(input, dancers);
    if (seen.has(result)) {
      //skip to the end
      index = Math.floor(limit/index) * index;
      seen.clear();
    }
    dancers = result.split('');
  }
  return dancers.join('');
}
