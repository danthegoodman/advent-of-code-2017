import * as assert from "assert";
import { readFileSync } from "fs";
import * as _ from 'lodash';

function main() {
  const inputFile = Number(readFileSync(__dirname + '/input.txt', 'utf8').trim());
  assert.strictEqual(solveA(1), 0);
  assert.strictEqual(solveA(12), 3);
  assert.strictEqual(solveA(23), 2);
  assert.strictEqual(solveA(1024), 31);
  assert.strictEqual(solveA(inputFile), 419, "solving A");

  assert.strictEqual(solveB(inputFile), 295229, "solving B");
}

function solveA(input: number): number {
  if (input <= 1) return 0;

  let result = 1;
  let steps = 2;
  let gettingCloser = false;
  let tier = 1;
  let round = 0;

  while (steps < input) {
    if (round == 4) {
      round = 0;
      result += 1;
      tier += 1;
      gettingCloser = true
    } else if (gettingCloser) {
      result -= 1
    } else {
      result += 1
    }

    if (result == tier) {
      gettingCloser = false
    } else if (result == tier * 2) {
      gettingCloser = true;
      round += 1
    }
    steps += 1
  }
  return result
}

enum Direction {
  North, West, South, East, UpTier
}

const allDirections = [Direction.North, Direction.West, Direction.South, Direction.East, Direction.UpTier];

function solveB(input: number): number {
  let grid = _.times(3, () => _.times(3, () => 0));
  let r = Math.floor(grid.length / 2);
  let c = Math.floor(grid.length / 2);
  let step = 1;
  let direction = Direction.UpTier;
  let tier = 0;
  let dirSteps = 0;
  grid[r][c] = 1;

  while (grid.length < 100) {
    let filledToInput = fillGrid();
    if (!filledToInput) {
      increaseSize()
    } else {
      return filledToInput;
    }
  }

  console.log(renderGrid());
  throw new Error("Grid size has increased to 100x100. There is probably a bug");


  function fillGrid() {
    while (step < grid.length * grid.length) {
      step += 1;

      if (direction === Direction.North) {
        r -= 1;
      } else if (direction === Direction.West) {
        c -= 1;
      } else if (direction === Direction.South) {
        r += 1;
      } else if (direction === Direction.East) {
        c += 1;
      } else if (direction === Direction.UpTier) {
        direction = Direction.North;
        dirSteps = 0;
        tier += 1;
        c += 1
      }

      dirSteps += 1;
      if (dirSteps == tier * 2) {
        direction = allDirections[direction + 1];
        dirSteps = 0
      }

      grid[r][c] = computeSlot(r, c);
      if (grid[r][c] > input) {
        // console.log(renderGrid())
        return grid[r][c];
      }
    }
    return undefined;
  }

  function increaseSize() {
    r += 1;
    c += 1;
    for (let i = 0; i < grid.length; i++) {
      grid[i].unshift(0);
      grid[i].push(0);
    }

    let newSize = grid.length + 2;
    grid.unshift(_.times(newSize, () => 0));
    grid.push(_.times(newSize, () => 0));
  }

  function renderGrid() {
    return grid.map(it => it.join('\t')).join('\n');
  }

  function computeSlot(r: number, c: number): number {
    const Z = grid.length - 1;
    let result = 0;
    if (r > 0 && c > 0) result += grid[r - 1][c - 1];
    if (r > 0 && c < Z) result += grid[r - 1][c + 1];
    if (r < Z && c > 0) result += grid[r + 1][c - 1];
    if (r < Z && c < Z) result += grid[r + 1][c + 1];
    if (r > 0) result += grid[r - 1][c];
    if (r < Z) result += grid[r + 1][c];
    if (c > 0) result += grid[r][c - 1];
    if (c < Z) result += grid[r][c + 1];
    return result
  }
}

main();
