import * as assert from "assert";
import { readFileSync } from "fs";
import _ = require("lodash");

function main() {
  const inputFile = readFileSync(__dirname + '/input.txt', 'utf8').trim();

  assert.strictEqual(solveA("ne,ne,ne"), 3);
  assert.strictEqual(solveA("ne,ne,sw,sw"), 0);
  assert.strictEqual(solveA("ne,ne,s,s"), 2);
  assert.strictEqual(solveA("se,sw,se,sw,sw"), 3);
  assert.strictEqual(solveA(inputFile), 643);

  assert.strictEqual(solveB("ne,ne,ne"), 3);
  assert.strictEqual(solveB("ne,ne,sw,sw"), 2);
  assert.strictEqual(solveB("ne,ne,s,s"), 2);
  assert.strictEqual(solveB("se,sw,se,sw,sw"), 3);
  assert.strictEqual(solveB(inputFile), 1471);
}

main();

function findDistance(path: string[]) {
  let counts: Record<string, number> = {
    nw: 0, n: 0, ne: 0,
    sw: 0, s: 0, se: 0,
    ..._.countBy(path),
  };

  function cancelOut(a: string, b: string) {
    if (counts[a] && counts[b]) {
      let min = Math.min(counts[a], counts[b]);
      counts[a] -= min;
      counts[b] -= min;
    }
  }

  function reduceTo(a: string, b: string, into: string) {
    if (counts[a] && counts[b]) {
      let min = Math.min(counts[a], counts[b]);
      counts[a] -= min;
      counts[b] -= min;
      counts[into] += min;
      return true;
    }

    return false;
  }

  while (true) {
    cancelOut('n', 's');
    cancelOut('ne', 'sw');
    cancelOut('nw', 'se');

    if (reduceTo('nw', 'ne', 'n')) continue;
    if (reduceTo('n', 'se', 'ne')) continue;
    if (reduceTo('ne', 's', 'se')) continue;
    if (reduceTo('se', 'sw', 's')) continue;
    if (reduceTo('s', 'nw', 'se')) continue;
    if (reduceTo('sw', 'n', 'nw')) continue;

    break;
  }

  return _.sum(Object.values(counts));
}

function solveA(input: string): number {
  let path = input.split(',');
  return findDistance(path);
}

function solveB(input: string): number {
  let path = input.split(',');
  let maxSeen = findDistance(path);
  while(path.length){
    path.pop();
    let dist = findDistance(path);
    maxSeen = Math.max(maxSeen, dist);
  }

  return maxSeen;
}
