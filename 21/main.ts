import * as assert from "assert";
import { readFileSync } from "fs";
import _ = require("lodash");

function main() {
  const inputFile = readFileSync(__dirname + '/input.txt', 'utf8').trim();
  const example = `
../.# => ##./#../...
.#./..#/### => #..#/..../..../#..#
`.trim();

  assert.strictEqual(solveA(example, 2), 12);
  assert.strictEqual(solveA(inputFile, 5), 197);
  assert.strictEqual(solveA(inputFile, 18), 3081737);
}

main();

function solveA(input: string, limit: number): number {
  let patterns = input.split("\n").map(line => line.split(' => '));

  let patternMap = new Map<string, string>();
  for (let [mainInput, output] of patterns) {
    for (let input of generateInputVariations(mainInput)) {
      patternMap.set(input, output);
    }
  }

  let grid = [
    ['.', '#', '.'],
    ['.', '.', '#'],
    ['#', '#', '#'],
  ];

  for (let i = 0; i < limit; i++) {
    grid = evolveGrid(grid, patternMap);
  }

  let n = 0;
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      if (grid[r][c] === '#') n++;
    }
  }
  return n;
}

function generateInputVariations(origS: string) {
  if (origS.length === 5) {
    let result = [];

    let s = origS;
    for (let f = 0; f < 2; f++) {
      for (let r = 0; r < 4; r++) {
        result.push(s);
        let [a, b, , c, d] = s;
        s = c + a + '/' + d + b;
      }

      //flip
      result.push(s);
      let [a, b, , c, d] = s;
      s = c + d + '/' + a + b;
    }

    return result;
  }

  if (origS.length === 11) {
    let result = [];
    let s = origS;

    for (let f = 0; f < 2; f++) {
      for (let r = 0; r < 4; r++) {
        result.push(s);
        let [a, b, c, , d, e, f, , g, h, i] = s;
        s = g + d + a + '/' + h + e + b + '/' + i + f + c;
      }

      //flip vert
      result.push(s);
      let [a, b, c, , d, e, f, , g, h, i] = s;
      s = g + h + i + '/' + d + e + f + '/' + a + b + c;
    }


    result = _.uniq(result);
    return result;
  }

  throw new Error("!!");
}


function evolveGrid(g: string[][], patternMap: Map<string, string>) {
  let newGrid: string[][] = [];
  let newR = 0;

  if (g.length % 2 === 0) {
    for (let r = 0; r < g.length; r += 2) {
      newGrid.push([], [], []);
      for (let c = 0; c < g.length; c += 2) {
        const str = ""
            + g[r + 0][c + 0] + g[r + 0][c + 1] + '/'
            + g[r + 1][c + 0] + g[r + 1][c + 1];
        let newSubGrid = patternMap.get(str)!.split('/');
        newGrid[newR + 0].push(...newSubGrid[0]);
        newGrid[newR + 1].push(...newSubGrid[1]);
        newGrid[newR + 2].push(...newSubGrid[2]);
      }
      newR += 3;
    }

    return newGrid;
  }

  if (g.length % 3 === 0) {
    for (let r = 0; r < g.length; r += 3) {
      newGrid.push([], [], [], []);
      for (let c = 0; c < g.length; c += 3) {
        const str = ""
            + g[r + 0][c + 0] + g[r + 0][c + 1] + g[r + 0][c + 2] + '/'
            + g[r + 1][c + 0] + g[r + 1][c + 1] + g[r + 1][c + 2] + '/'
            + g[r + 2][c + 0] + g[r + 2][c + 1] + g[r + 2][c + 2];
        let newSubGrid = patternMap.get(str)!.split('/');
        newGrid[newR + 0].push(...newSubGrid[0]);
        newGrid[newR + 1].push(...newSubGrid[1]);
        newGrid[newR + 2].push(...newSubGrid[2]);
        newGrid[newR + 3].push(...newSubGrid[3]);
      }
      newR += 4;
    }
    return newGrid;
  }

  throw new Error("!!!");
}
