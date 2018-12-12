import * as assert from "assert";
import { readFileSync } from "fs";

function main() {
  const inputFile = readFileSync(__dirname + '/input.txt', 'utf8').trim();
  const example1 = `
set a 1
add a 2
mul a a
mod a 5
snd a
set a 0
rcv a
jgz a -1
set a 1
jgz a -2`.trim();

  assert.strictEqual(solveA(example1), 4);
  assert.strictEqual(solveA(inputFile), 3188);

  const example2 = `
snd 1
snd 2
snd p
rcv a
rcv b
rcv c
rcv d`.trim();
  assert.strictEqual(solveB(example2), 3);
  assert.strictEqual(solveB(inputFile), 7112);
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
  let lastPlayedSound = -1;
  let registers: Record<string, number> = {};
  let recovered = false;

  while (!recovered) {
    instrFns[instrPtr]();
    instrPtr += 1;
  }
  return lastPlayedSound;

  function compileInstruction(raw: string) {
    let {name, x, y} = parseInstruction(raw);
    if (name === 'snd') return () => playSound(x);
    if (name === 'set') return () => setRegister(x, y!);
    if (name === 'add') return () => increaseRegister(x, y!);
    if (name === 'mul') return () => multiplyRegister(x, y!);
    if (name === 'mod') return () => moduloRegister(x, y!);
    if (name === 'rcv') return () => recoverSound(x);
    if (name === 'jgz') return () => jumpIfGreaterThanZero(x, y!);
    throw new Error("Invalid Instruction");
  }

  function interpretValue(regOrValue: string | number): number {
    if (typeof regOrValue === "undefined") throw new Error("bad state");
    if (typeof regOrValue === 'number') return regOrValue;
    return registers[regOrValue] || 0;
  }

  function playSound(x: string | number) {
    lastPlayedSound = interpretValue(x);
  }

  function setRegister(x: string | number, y: string | number) {
    if (typeof x !== 'string') throw new Error("bad state");
    registers[x] = interpretValue(y);
  }

  function increaseRegister(x: string | number, y: string | number) {
    if (typeof x !== 'string') throw new Error("bad state");
    registers[x] = interpretValue(x) + interpretValue(y);
  }

  function multiplyRegister(x: string | number, y: string | number) {
    if (typeof x !== 'string') throw new Error("bad state");
    registers[x] = interpretValue(x) * interpretValue(y);
  }

  function moduloRegister(x: string | number, y: string | number) {
    if (typeof x !== 'string') throw new Error("bad state");
    registers[x] = interpretValue(x) % interpretValue(y);
  }

  function recoverSound(x: string | number) {
    let xVal = interpretValue(x);
    if (xVal === 0) return;
    recovered = true;
  }

  function jumpIfGreaterThanZero(x: string | number, y: string | number) {
    let xVal = interpretValue(x);
    if (xVal <= 0) return;

    let yVal = interpretValue(y);
    instrPtr += yVal;
    instrPtr -= 1; //account for this instruction
  }
}

interface State {
  p: number,
  instrPtr: number,
  sendCount: number,
  sent: number[],
  regs: Record<string, number>,
}

function solveB(input: string): number {
  let instrFns = input.split('\n').map(compileInstruction);

  let aState = {
    p: 0,
    instrPtr: 0,
    sendCount: 0,
    sent: [],
    regs: {p: 0},
  };

  let bState = {
    p: 1,
    instrPtr: 0,
    sendCount: 0,
    sent: [],
    regs: {p: 1},
  };

  while (true) {
    let aWas = aState.instrPtr;
    instrFns[aWas](aState);

    let bWas = bState.instrPtr;
    instrFns[bWas](bState);

    if (aWas === aState.instrPtr && bState.instrPtr) break;
  }
  return bState.sendCount;

  function compileInstruction(raw: string) {
    let {name, x, y} = parseInstruction(raw);
    if (name === 'snd') return (s: State) => sendData(s, x);
    if (name === 'rcv') return (s: State) => receiveData(s, x);
    if (name === 'set') return (s: State) => setRegister(s, x, y!);
    if (name === 'add') return (s: State) => increaseRegister(s, x, y!);
    if (name === 'mul') return (s: State) => multiplyRegister(s, x, y!);
    if (name === 'mod') return (s: State) => moduloRegister(s, x, y!);
    if (name === 'jgz') return (s: State) => jumpIfGreaterThanZero(s, x, y!);
    throw new Error("Invalid Instruction");
  }

  function interpretValue(state: State, regOrValue: string | number): number {
    if (typeof regOrValue === "undefined") throw new Error("bad state");
    if (typeof regOrValue === 'number') return regOrValue;
    return state.regs[regOrValue] || 0;
  }

  function sendData(state: State, x: string | number) {
    let val = interpretValue(state, x);
    state.sendCount += 1;
    state.sent.push(val);
    state.instrPtr += 1;
  }

  function receiveData(state: State, x: string | number) {
    if (typeof x !== 'string') throw new Error("bad state");
    let otherState = state.p === 0 ? bState : aState;
    if (otherState.sent.length === 0) {
      return; // do not move instruction ptr. Just wait.
    }
    state.regs[x] = otherState.sent.shift()!;
    state.instrPtr += 1;
  }

  function setRegister(state: State, x: string | number, y: string | number) {
    if (typeof x !== 'string') throw new Error("bad state");
    state.regs[x] = interpretValue(state, y);
    state.instrPtr += 1;
  }

  function increaseRegister(state: State, x: string | number, y: string | number) {
    if (typeof x !== 'string') throw new Error("bad state");
    state.regs[x] = interpretValue(state, x) + interpretValue(state, y);
    state.instrPtr += 1;
  }

  function multiplyRegister(state: State, x: string | number, y: string | number) {
    if (typeof x !== 'string') throw new Error("bad state");
    state.regs[x] = interpretValue(state, x) * interpretValue(state, y);
    state.instrPtr += 1;
  }

  function moduloRegister(state: State, x: string | number, y: string | number) {
    if (typeof x !== 'string') throw new Error("bad state");
    state.regs[x] = interpretValue(state, x) % interpretValue(state, y);
    state.instrPtr += 1;
  }

  function jumpIfGreaterThanZero(state: State, x: string | number, y: string | number) {
    let xVal = interpretValue(state, x);
    let yVal = interpretValue(state, y);
    if (xVal <= 0) {
      state.instrPtr += 1;
    } else {
      state.instrPtr += yVal;
    }
  }

}
