import * as assert from "assert";
import { readFileSync } from "fs";
import _ = require("lodash");

function main() {
  const inputFile = readFileSync(__dirname + '/input.txt', 'utf8').trim();
  const example = `
0 <-> 2
1 <-> 1
2 <-> 0, 3, 4
3 <-> 2, 4
4 <-> 2, 3, 6
5 <-> 6
6 <-> 4, 5
`.trim();

  assert.strictEqual(solveA(example), 6);
  assert.strictEqual(solveA(inputFile), 175);

  assert.strictEqual(solveB(example), 2);
  assert.strictEqual(solveB(inputFile), 213);
}

main();

function solveA(input: string): number {
  let connections = input.split('\n').map(line => {
    return line.match(/\d+/g)!.slice(1).map(Number);
  });

  const visited = new Set<number>();
  traverse(0);
  return visited.size;

  function traverse(ndx: number) {
    if (visited.has(ndx)) return;
    visited.add(ndx);
    connections[ndx].forEach(traverse);
  }

}

function solveB(input: string): number {
  let connections = input.split('\n').map(line => {
    return line.match(/\d+/g)!.slice(1).map(Number);
  });

  const unvisited = _.range(0, connections.length);
  const visited = new Set<number>();

  let groups = 0;
  while (unvisited.length) {
    groups += 1;
    visited.clear();
    traverse(unvisited[0]);
    _.remove(unvisited, it => visited.has(it));
  }
  return groups;

  function traverse(ndx: number) {
    if (visited.has(ndx)) return;
    visited.add(ndx);
    connections[ndx].forEach(traverse);
  }
}
