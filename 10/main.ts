import * as assert from "assert";
import { readFileSync } from "fs";
import _ = require("lodash");

function main() {
  const inputFile = readFileSync(__dirname + '/input.txt', 'utf8').trim();

  assert.strictEqual(solveA("3,4,1,5", 5), 12);
  assert.strictEqual(solveA(inputFile, 256), 15990);

  assert.strictEqual(solveB(""), "a2582a3a0e66e6e86e3812dcb672a272");
  assert.strictEqual(solveB("AoC 2017"), "33efeb34ea91902bb2f59c9920caa6cd");
  assert.strictEqual(solveB("1,2,3"), "3efbe78a8d82f29979031a4aa0b16a9d");
  assert.strictEqual(solveB("1,2,4"), "63960835bcdc130f0b66d7ff4f6a5a8e");
  assert.strictEqual(solveB(inputFile), "90adb097dd55dea8305c900372258ac6");
}

main();

type State = { pos: number, skipSize: number, list: number[] }

function computeRound(state: State, input: number[]): State {
  let pos = state.pos;
  let skipSize = state.skipSize;
  let list = state.list;

  for (let part of input) {
    let newList = Array.from(list);
    for (let i = 0; i < part; i++) {
      newList[(pos + i) % list.length] = list[(pos + (part - 1) + list.length - i) % list.length]
    }
    pos = (pos + part + skipSize) % list.length;
    list = newList;
    skipSize += 1;
  }

  return {pos, skipSize, list};
}

function solveA(input: string, len: number): number {
  const start = {pos: 0, skipSize: 0, list: _.range(0, len)};
  const out = computeRound(start, input.split(",").map(Number));
  return out.list[0] * out.list[1]
}

function solveB(strInput: string): string {
    const input = strInput.split('').map(it=> it.charCodeAt(0)).concat(17, 31, 73, 47, 23);
    let state = {pos: 0, skipSize: 0, list: _.range(0, 256)};
    for(let i = 0; i < 64; i++){
      state = computeRound(state, input);
    }

    const dense = _.chunk(state.list, 16).map(it=> it.reduce((a,b)=> a ^ b));
    return dense.map(it=> it.toString(16).padStart(2, '0')).join('');
}
