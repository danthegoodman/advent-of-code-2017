import unittest, strutils

const INPUT = 289326

type Direction = enum north, west, south, east, uptier
const SIZE = 8
const MAX_STEP = (SIZE+1) * (SIZE+1)
var grid: array[0..SIZE, array[0..SIZE, int]]

proc printGrid() =
  for x in grid:
    for y in x: write(stdout, $y & "\t")
    echo("")

proc computeSlot(r:int, c: int): int =
  const Z = SIZE
  if r > 0 and c > 0: result += grid[r-1][c-1]
  if r > 0          : result += grid[r-1][c  ]
  if r > 0 and c < Z: result += grid[r-1][c+1]
  if           c > 0: result += grid[r  ][c-1]
  if           c < Z: result += grid[r  ][c+1]
  if r < Z and c > 0: result += grid[r+1][c-1]
  if r < Z          : result += grid[r+1][c  ]
  if r < Z and c < Z: result += grid[r+1][c+1]

var r = SIZE div 2
var c = SIZE div 2
var step = 1
var direction = uptier
var tier = 0
var dirSteps = 0
grid[r][c] = 1

while step < MAX_STEP:
  step += 1

  if direction == north:
    r -= 1
  elif direction == west:
    c -= 1
  elif direction == south:
    r += 1
  elif direction == east:
    c += 1
  elif direction == uptier:
    direction = north
    dirSteps = 0
    tier += 1
    c += 1

  dirSteps += 1
  if dirSteps == tier * 2:
    direction = direction.succ
    dirSteps = 0

  let value = computeSlot(r, c)
  grid[r][c] = value
  if value > INPUT:
    echo "ANSWER =========== ", $value
    printGrid()
    quit()

echo "XXX INCREASE SIZE XXX"
printGrid()
