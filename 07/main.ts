import * as assert from "assert";
import { readFileSync } from "fs";
import _ = require("lodash");

function main() {
  const inputFile = readFileSync(__dirname + '/input.txt', 'utf8').trim();
  let example = `
pbga (66)
xhth (57)
ebii (61)
havc (66)
ktlj (57)
fwft (72) -> ktlj, cntj, xhth
qoyq (66)
padx (45) -> pbga, havc, qoyq
tknk (41) -> ugml, padx, fwft
jptl (61)
ugml (68) -> gyxo, ebii, jptl
gyxo (61)
cntj (57)
`.trim();

  assert.strictEqual(solveA(example), "tknk");
  assert.strictEqual(solveA(inputFile), "gynfwly", "solving A");

  assert.strictEqual(solveB(example), 60);
  assert.strictEqual(solveB(inputFile), 1526, "solving B");
}

main();

function solveA(input: string): string {
  let pairs = input.split('\n').map(it => {
    let names = it.match(/([a-z]+)/g)!;
    return [names[0], names.slice(1)] as [string, string[]];
  });

  let keys = pairs.map(it => it[0]);
  let values = new Set(_.flatten(pairs.map(it => it[1])));
  _.remove(keys, k => values.has(k));

  assert.strictEqual(1, keys.length);
  return keys[0];
}

type Node = { head: string, weight: number, children: string[] };

function solveB(input: string): number {
  let nodes = input.split('\n').map(it => {
    let words = it.replace(/[^\w]+/g, " ").trim().split(' ')
    return {head: words[0], weight: Number(words[1]), children: words.slice(2)}
  });

  let nodesMap = _.keyBy(nodes, it => it.head);

  function totalWeight(node: Node): number {
    return node.weight + _.sumBy(node.children, it => totalWeight(nodesMap[it]));
  }

  nodes = _.sortBy(nodes, totalWeight);
  for (let n of nodes) {
    const children = n.children.map(it => ({name: it, total: totalWeight(nodesMap[it])}));
    const grouped = _.groupBy(children, it => it.total);
    if (Object.keys(grouped).length > 1) {
      const outlier = Object.values(grouped).find(it => it.length === 1)![0];
      const mainWeight = Object.keys(grouped).map(Number).find(it => it !== outlier.total)!;
      return (mainWeight - outlier.total) + nodesMap[outlier.name].weight
    }
  }
  throw new Error("not found");
}
