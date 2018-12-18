import * as assert from "assert";
import { readFileSync } from "fs";

function main() {
  const inputFile = readFileSync(__dirname + '/input.txt', 'utf8').trim();
  const example =
      "..#" + "\n" +
      "#.." + "\n" +
      "...";

  assert.strictEqual(solveA(example, 7), 5);
  assert.strictEqual(solveA(example, 70), 41);
  assert.strictEqual(solveA(example, 10000), 5587);
  assert.strictEqual(solveA(inputFile, 10000), 5450);

  assert.strictEqual(solveB(example, 100), 26);
  assert.strictEqual(solveB(example, 10000000), 2511944);
  assert.strictEqual(solveB(inputFile, 10000000), 2511957);
}

function parseInput(input: string) {
  let infections = new Set<string>();

  let lines = input.split('\n');
  let height = lines.length;
  let width = lines[0].length;
  let rStart = -Math.floor(height / 2);
  let cStart = -Math.floor(width / 2);
  for (let r = 0; r < height; r++) {
    for (let c = 0; c < width; c++) {
      if (lines[r][c] === '#') {
        infections.add(`${rStart + r},${cStart + c}`);
      }
    }
  }

  return infections;
}

type Point = { r: number, c: number };

function turnRight(delta: Point) {
  if (delta.r === -1) {
    delta.r = 0;
    delta.c = +1;
  } else if (delta.c === +1) {
    delta.r = +1;
    delta.c = 0;
  } else if (delta.r === +1) {
    delta.r = 0;
    delta.c = -1;
  } else if (delta.c === -1) {
    delta.r = -1;
    delta.c = 0;
  }
}

function turnLeft(delta: Point) {
  if (delta.r === -1) {
    delta.r = 0;
    delta.c = -1;
  } else if (delta.c === +1) {
    delta.r = -1;
    delta.c = 0;
  } else if (delta.r === +1) {
    delta.r = 0;
    delta.c = +1;
  } else if (delta.c === -1) {
    delta.r = +1;
    delta.c = 0;
  }
}

function turnAround(delta: Point) {
  if (delta.r === -1) {
    delta.r = +1;
  } else if (delta.r === +1) {
    delta.r = -1;
  } else if (delta.c === +1) {
    delta.c = -1;
  } else if (delta.c === -1) {
    delta.c = +1;
  }
}

enum State {
  weakened = 1, infected, flagged
}

function solveA(input: string, limit: number): number {
  let infections = parseInput(input);
  let timesInfected = 0;

  let delta: Point = {r: -1, c: 0};
  let current: Point = {r: 0, c: 0};
  for (let i = 0; i < limit; i++) {
    let p = `${current.r},${current.c}`;
    if (infections.has(p)) {
      turnRight(delta);
      infections.delete(p);
    } else {
      turnLeft(delta);
      infections.add(p);
      timesInfected += 1;
    }
    current.r += delta.r;
    current.c += delta.c;
  }
  return timesInfected;
}

function solveB(input: string, limit: number): number {
  let infections = parseInput(input);
  let stateMap = new Map<string, State>(Array.from(infections, it => [it, State.infected] as [string, State]));
  let timesInfected = 0;

  let delta: Point = {r: -1, c: 0};
  let current: Point = {r: 0, c: 0};
  for (let i = 0; i < limit; i++) {
    let p = `${current.r},${current.c}`;
    let currState = stateMap.get(p);
    if (currState === State.weakened) {
      //do not turn
      stateMap.set(p, State.infected);
      timesInfected += 1;
    } else if (currState === State.infected) {
      turnRight(delta);
      stateMap.set(p, State.flagged);
    } else if (currState === State.flagged) {
      turnAround(delta);
      stateMap.delete(p);
    } else { //clean
      turnLeft(delta);
      stateMap.set(p, State.weakened);
    }
    current.r += delta.r;
    current.c += delta.c;
  }
  return timesInfected;
}

main();
