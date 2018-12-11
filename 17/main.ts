import * as assert from "assert";
import { readFileSync } from "fs";
import LinkedList = require("linked-list");

function main() {
  const inputFile = readFileSync(__dirname + '/input.txt', 'utf8').trim();
  assert.strictEqual(solveA("3"), 638);
  assert.strictEqual(solveA(inputFile), 1670);

  assert.strictEqual(solveB(inputFile), 2316253);
}

main();

function linkedNode(value: number) {
  let item = new LinkedList.Item();
  item.value = value;
  return item;
}

function solveA(input: string): number {
  let step = Number(input);
  let chain = new LinkedList(linkedNode(0));
  let node = chain.head!;

  for (let i = 1; i < 2018; i++) {
    for (let n = 0; n < step; n++) {
      node = node.next || chain.head!;
    }
    node.append(linkedNode(i));
    node = node.next!;
  }

  let afterFinal = node.next || chain.head!;
  return afterFinal.value;
}

function solveB(input: string): number {
  let step = Number(input);

  //Initial state = 0 (1)
  let afterZero = 1;
  let index = 1;
  let virtualLength = 2;

  for (let i = 2; i < 50000000; i++) {
    if (index + step < virtualLength) {
      index += step + 1;
    } else {
      for (let n = 0; n < step; n++) {
        index += 1;
        if (index >= virtualLength) index = 0;
      }
      if (index === 0) afterZero = i;
      index += 1;
    }
    virtualLength += 1;
  }
  return afterZero;
}
