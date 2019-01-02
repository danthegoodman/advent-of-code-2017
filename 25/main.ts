import * as assert from "assert";
import { readFileSync } from "fs";

function main() {
  const inputFile = readFileSync(__dirname + '/input.txt', 'utf8').trim();
  const example = `
Begin in state A.
Perform a diagnostic checksum after 6 steps.

In state A:
  If the current value is 0:
    - Write the value 1.
    - Move one slot to the right.
    - Continue with state B.
  If the current value is 1:
    - Write the value 0.
    - Move one slot to the left.
    - Continue with state B.

In state B:
  If the current value is 0:
    - Write the value 1.
    - Move one slot to the left.
    - Continue with state A.
  If the current value is 1:
    - Write the value 1.
    - Move one slot to the right.
    - Continue with state A.
`.trim();

  assert.strictEqual(solveA(example), 3);
  assert.strictEqual(solveA(inputFile), 4287);
}

main();

type StateAction = { write: number, move: number, next: string };
type State = { 0: StateAction, 1: StateAction };

function parseStates(input: string) {
  let rex = new RegExp(`
In state ([A-Z]):
  If the current value is 0:
    - Write the value (0|1).
    - Move one slot to the (left|right).
    - Continue with state ([A-Z]).
  If the current value is 1:
    - Write the value (0|1).
    - Move one slot to the (left|right).
    - Continue with state ([A-Z]).
`.trim(), 'g');

  let result = new Map<string, State>();
  while (true) {
    let match = rex.exec(input);
    if (!match) break;
    let [, stateName, write0, move0, next0, write1, move1, next1] = match;
    result.set(stateName, {
      0: {write: Number(write0), move: move0 === 'left' ? -1 : +1, next: next0},
      1: {write: Number(write1), move: move1 === 'left' ? -1 : +1, next: next1},
    });
  }
  return result;
}

function solveA(input: string): number {
  let states = parseStates(input);
  let limit = Number(input.match(/Perform a diagnostic checksum after (\d+) steps/)![1]);
  let currState = states.get(input.match(/Begin in state ([A-Z])/)![1])!;

  let ones = new Set<number>();
  let index = 0;
  for (let i = 0; i < limit; i++) {
    let v = ones.has(index) ? "1" : "0";
    let s = currState[v as "0" | "1"];

    if (s.write) ones.add(index);
    else ones.delete(index);

    index += s.move;
    currState = states.get(s.next)!;
  }

  return ones.size;
}
