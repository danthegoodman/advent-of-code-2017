import * as assert from "assert";
import { readFileSync } from "fs";
import _ = require("lodash");

function main() {
  const inputFile = readFileSync(__dirname + '/input.txt', 'utf8').trim();
  const example = `
0: 3
1: 2
4: 4
6: 4
`.trim();

  assert.strictEqual(solveA(example), 24);
  assert.strictEqual(solveA(inputFile), 1844);

  assert.strictEqual(solveB(example), 10);
  assert.strictEqual(solveB(inputFile), 3897604);
}

main();

function parseInput(input: string) {
  return input.split(/\n/).map(ln => {
    let [depth, range] = ln.match(/\d+/g)!.map(Number);
    return {depth, range, state: 0, delta: +1};
  });
}

function solveA(input: string): number {
  let layers = parseInput(input);

  let risk = 0;
  let maxDepth = _.max(layers.map(it => it.depth))!;

  for (let i = 0; i <= maxDepth; i++) {
    let layer = layers.find(it => it.depth === i);
    if (layer && layer.state === 0) {
      risk += layer.depth * layer.range;
    }
    advanceState();
  }
  return risk;

  function advanceState(){
    for(let l of layers){
      if(l.range <= 1) continue;

      if(l.state === 0){
        l.delta = +1;
      } else if(l.state === l.range - 1){
        l.delta = -1;
      }

      l.state += l.delta;
    }
  }
}

function solveB(input: string): number {
  let layers = parseInput(input);
  let layersMap = _.keyBy(layers, it=> it.depth);
  const maxDepth = _.max(Object.keys(layersMap).map(Number))!;

  let iteration = -1;
  let attempts: Array<{iteration:number, depth: number}> = [];

  while(true){
    iteration += 1;
    attempts.push({iteration, depth: 0});

    _.remove(attempts, a=>{
      let l = layersMap[a.depth];
      if(l && l.state === 0){
        return true;
      } else {
        a.depth += 1;
      }
      return false;
    })

    if(attempts[0] && attempts[0].depth > maxDepth) return attempts[0].iteration;

    advanceState();
  }

  function advanceState(){
    for(let l of layers){
      if(l.range <= 1) continue;

      if(l.state === 0){
        l.delta = +1;
      } else if(l.state === l.range - 1){
        l.delta = -1;
      }

      l.state += l.delta;
    }
  }
  return iteration
}
