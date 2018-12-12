import * as assert from "assert";
import { readFileSync } from "fs";
import _ = require("lodash");

function main() {
  const inputFile = readFileSync(__dirname + '/input.txt', 'utf8').trim();
  const example =
      "p=< 3,0,0>, v=< 2,0,0>, a=<-1,0,0>\n" +
      "p=< 4,0,0>, v=< 0,0,0>, a=<-2,0,0>";

  assert.strictEqual(solveA(example), 0);
  assert.strictEqual(solveA(inputFile), 144);

  assert.strictEqual(solveB(inputFile), 477);
}

main();

function parsePoints(input: string) {
  return input.split('\n').map((it, ndx) => {
    let parts = it.match(/([0-9-]+)/g)!.map(Number);
    return {
      id: ndx,
      p: {x: parts[0], y: parts[1], z: parts[2]},
      v: {x: parts[3], y: parts[4], z: parts[5]},
      a: {x: parts[6], y: parts[7], z: parts[8]},
    }
  });
}

function originDistance(p: { p: { x: number, y: number, z: number } }) {
  return Math.abs(p.p.x) + Math.abs(p.p.y) + Math.abs(p.p.z);
}


function solveA(input: string): number {
  let points = parsePoints(input);

  for (let i = 0; i < 1000; i++) {
    for (let p of points) {
      p.v.x += p.a.x;
      p.v.y += p.a.y;
      p.v.z += p.a.z;

      p.p.x += p.v.x;
      p.p.y += p.v.y;
      p.p.z += p.v.z;
    }
  }

  let minP = _.minBy(points, originDistance)!;
  return minP.id;
}

function solveB(input: string): number {
  let points = parsePoints(input);

  for (let i = 0; i < 1000; i++) {
    for (let p of points) {
      p.v.x += p.a.x;
      p.v.y += p.a.y;
      p.v.z += p.a.z;

      p.p.x += p.v.x;
      p.p.y += p.v.y;
      p.p.z += p.v.z;
    }
    let toRemove: typeof points = [];

    _.forEach(_.groupBy(points, originDistance), (group) => {
      for (let i = 0; i < group.length; i++) {
        for (let j = i + 1; j < group.length; j++) {
          if (_.isEqual(group[i].p, group[j].p)) {
            toRemove.push(group[i], group[j]);
          }
        }
      }
    });

    _.pullAll(points, toRemove);
  }

  return points.length;
}
