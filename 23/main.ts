import * as assert from "assert";
import { readFileSync } from "fs";
import isPrime = require('is-prime');

function main() {
  const inputFile = readFileSync(__dirname + '/input.txt', 'utf8').trim();
  assert.strictEqual(solveA(inputFile), 4225);

  assert.strictEqual(inputSimplifiedInJavascriptForSolvingB(), 905);
}

main();

function parseInstruction(raw: string) {
  let [name, rawX, rawY] = raw.split(' ');

  let nX = Number(rawX);
  let nY = Number(rawY);
  let x = Number.isFinite(nX) ? nX : rawX;

  let y;
  if (rawY) {
    y = Number.isFinite(nY) ? nY : rawY;
  }

  return {name, x, y}
}

function solveA(input: string): number {
  let instrFns = input.split('\n').map(compileInstruction);
  let instrPtr = 0;
  let mulCount = 0;
  let registers: Record<string, number> = {};

  while (true) {
    let f = instrFns[instrPtr];
    if (!f) break;
    f();
  }
  return mulCount;

  function compileInstruction(raw: string) {
    let {name, x, y} = parseInstruction(raw);
    if (name === 'set') return () => setRegister(x, y!);
    if (name === 'sub') return () => decreaseRegister(x, y!);
    if (name === 'mul') return () => multiplyRegister(x, y!);
    if (name === 'jnz') return () => jumpIfNotZero(x, y!);
    throw new Error("Invalid Instruction");
  }

  function interpretValue(regOrValue: string | number): number {
    if (typeof regOrValue === "undefined") throw new Error("bad state");
    if (typeof regOrValue === 'number') return regOrValue;
    return registers[regOrValue] || 0;
  }

  function setRegister(x: string | number, y: string | number) {
    if (typeof x !== 'string') throw new Error("bad state");
    registers[x] = interpretValue(y);
    instrPtr += 1;
  }

  function decreaseRegister(x: string | number, y: string | number) {
    if (typeof x !== 'string') throw new Error("bad state");
    registers[x] = interpretValue(x) - interpretValue(y);
    instrPtr += 1;
  }

  function multiplyRegister(x: string | number, y: string | number) {
    if (typeof x !== 'string') throw new Error("bad state");
    registers[x] = interpretValue(x) * interpretValue(y);
    mulCount += 1;
    instrPtr += 1;
  }

  function jumpIfNotZero(x: string | number, y: string | number) {
    let xVal = interpretValue(x);
    if (xVal == 0) {
      instrPtr += 1;
    } else {
      let yVal = interpretValue(y);
      instrPtr += yVal;
    }
  }
}

// @ts-ignore: Never called, coded for documentation purposes
function inputManuallyWrittenInJavascriptForSolvingB() {
  let a = 1, b = 0, c = 0, d = 0, e = 0, f = 0, g = 0, h = 0;

  b = 67; //set b 67
  c = b; //set c b
  if (a == 0) { //jnz a 2
  } else { //jnz 1 5
    b *= 100; // mul b 100
    b -= -100000; // sub b -100000
    c = b; // set c b
    c -= -17000; // sub c -17000
  }
  do {
    f = 1; // set f 1
    d = 2; // set d 2
    do {
      e = 2; // set e 2
      do {
        g = d; // set g d
        g *= e; // mul g e
        g -= b; // sub g b
        if (g === 0) { // jnz g 2
          f = 0; // set f 0
        }
        e -= -1; // sub e -1
        g = e; // set g e
        g -= b; // sub g b
      } while (g !== 0); // jnz g -8
      d -= -1; // sub d -1
      g = d; // set g d
      g -= b; // sub g b
    } while (g !== 0); // jnz g -13
    if (f === 0) { // jnz f 2
      h -= -1; // sub h -1
    }
    g = b; // set g b
    g -= c;// sub g c
    if (g === 0) {// jnz g 2
      return h; // jnz 1 3
    }
    b -= -17; // sub b -17
  } while (true); // jnz 1 -23
}

function inputSimplifiedInJavascriptForSolvingB() {
  let h = 0;
  let b = (67 * 100) + 100000;
  let c = b + 17000;
  do {
    if (!isPrime(b)) h++;

    if (b === c) {
      return h;
    }
    b -= -17;
  } while (true);
}
