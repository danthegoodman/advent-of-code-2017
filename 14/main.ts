import * as assert from "assert";
import { readFileSync } from "fs";
import _ = require("lodash");

function main() {
  const inputFile = readFileSync(__dirname + '/input.txt', 'utf8').trim();

  const exampleHashes = diskHashes("flqrgnkx");
  assert.strictEqual(solveA(exampleHashes), 8108);
  assert.strictEqual(solveB(exampleHashes), 1242);

  const inputHashes = diskHashes(inputFile);
  assert.strictEqual(solveA(inputHashes), 8204);
  assert.strictEqual(solveB(inputHashes), 1089);
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

function knotHash(strInput: string): string {
  const input = strInput.split('').map(it => it.charCodeAt(0)).concat(17, 31, 73, 47, 23);
  let state = {pos: 0, skipSize: 0, list: _.range(0, 256)};
  for (let i = 0; i < 64; i++) {
    state = computeRound(state, input);
  }

  const dense = _.chunk(state.list, 16).map(it => it.reduce((a, b) => a ^ b));
  return dense.map(it => it.toString(16).padStart(2, '0')).join('');
}

function diskHashes(keystr: string): number[][] {
  let result = [];
  process.stdout.write(`Computing hash ${keystr}`);
  for (let i = 0; i < 128; i++) {
    process.stdout.write(".");
    let hashStr = knotHash(keystr + "-" + i);
    result.push(hexToBinary(hashStr));
  }
  process.stdout.write("\n");
  return result;
}

function hexToBinary(hexStr: string): number[] {
  let bits = [];
  for (let i = 0; i < 32; i += 8) {
    let longword = Number.parseInt(hexStr.slice(i, i + 8), 16);
    let binary = longword.toString(2).padStart(32, '0');
    bits.push(...binary.split('').map(Number));
  }
  return bits;
}

function solveA(hashes: number[][]): number {
  return _.sum(hashes.map(h => _.sum(h)));
}

function solveB(hashes: number[][]): number {
  // grows negative so that '1' is the marker
  // for unhandled groups
  let groups = 0;

  for(let r = 0; r < 128; r ++){
    for(let c = 0; c < 128; c++){
      if(hashes[r][c] === 1){
        groups --;
        markAllContiguousFrom(hashes, r, c, groups);
      }
    }
  }

  return Math.abs(groups);
}

function markAllContiguousFrom(hashes: number[][], r: number, c: number, group: number){
  hashes[r][c] = group;

  if(hashes[r][c-1] === 1) markAllContiguousFrom(hashes, r, c-1, group);
  if(hashes[r][c+1] === 1) markAllContiguousFrom(hashes, r, c+1, group);

  if(r > 0 && hashes[r-1][c] === 1) markAllContiguousFrom(hashes, r-1, c, group);
  if(r < 127 && hashes[r+1][c] === 1) markAllContiguousFrom(hashes, r+1, c, group);
}
