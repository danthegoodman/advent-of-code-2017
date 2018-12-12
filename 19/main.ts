import * as assert from "assert";
import { readFileSync } from "fs";

function main() {
  const inputFile = readFileSync(__dirname + '/input.txt', 'utf8');
  const example =
      "     |         \n" +
      "     |  +--+   \n" +
      "     A  |  C   \n" +
      " F---|----E|--+\n" +
      "     |  |  |  D\n" +
      "     +B-+  +--+";

  assert.strictEqual(solveA(example), "ABCDEF");
  assert.strictEqual(solveA(inputFile), "DWNBGECOMY");

  assert.strictEqual(solveB(example), 38);
  assert.strictEqual(solveB(inputFile), 17228);
}

function solveA(input: string): string {
  return solveCommon(input).seen.join("");
}

function solveB(input: string): number {
  return solveCommon(input).steps;
}

enum Direction { UP, RIGHT, DOWN, LEFT }

function solveCommon(input: string) {
  const grid = input.split('\n').map(it => it.padEnd(200).split(''));
  const seen: string[] = [];
  let row = 0;
  let col = grid[0].indexOf('|');
  let direction = Direction.DOWN;
  let steps = 0;

  while (true) {
    steps += 1;
    if (direction === Direction.UP) row -= 1;
    else if (direction === Direction.DOWN) row += 1;
    else if (direction === Direction.LEFT) col -= 1;
    else if (direction === Direction.RIGHT) col += 1;

    let nextChar = grid[row][col];
    if (nextChar == ' ') break;
    else if (nextChar == '|' || nextChar == '-') {
      //nothing
    } else if (nextChar == '+') {
      if (direction === Direction.LEFT || direction === Direction.RIGHT) {
        if (grid[row - 1][col] !== ' ') direction = Direction.UP;
        else if (grid[row + 1][col] !== ' ') direction = Direction.DOWN;
        else throw new Error("expected vertical movement");
      } else {
        if (grid[row][col - 1] !== ' ') direction = Direction.LEFT;
        else if (grid[row][col + 1] !== ' ') direction = Direction.RIGHT;
        else throw new Error("expected side movement");
      }
    } else {
      seen.push(nextChar)
    }
  }

  return {seen, steps};
}

main();
