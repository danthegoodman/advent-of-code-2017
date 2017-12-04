import unittest, strutils, sequtils

const INPUT = 289326
type Direction = enum north, west, south, east, uptier
var grid = newSeqWith(3, newSeq[int](3))

proc printGrid() =
  for x in grid:
    echo join(x, "\t")

proc computeSlot(r:int, c: int): int =
  let Z = grid.len - 1
  if r > 0 and c > 0: result += grid[r-1][c-1]
  if r > 0          : result += grid[r-1][c  ]
  if r > 0 and c < Z: result += grid[r-1][c+1]
  if           c > 0: result += grid[r  ][c-1]
  if           c < Z: result += grid[r  ][c+1]
  if r < Z and c > 0: result += grid[r+1][c-1]
  if r < Z          : result += grid[r+1][c  ]
  if r < Z and c < Z: result += grid[r+1][c+1]

var r = grid.len div 2
var c = grid.len div 2
var step = 1
var direction = uptier
var tier = 0
var dirSteps = 0
grid[r][c] = 1

proc fillGrid() =
  while step < grid.len * grid.len:
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

    grid[r][c] = computeSlot(r, c)
    if grid[r][c] > INPUT:
      printGrid()
      echo ""
      echo "ANSWER =========== ", $grid[r][c]
      quit()

proc increaseSize() =
  r += 1
  c += 1
  for i in 0..grid.len-1:
    grid[i].insert(0, 0)
    grid[i].add(0)

  let newSize = grid.len + 2
  grid.insert(newSeq[int](newSize), 0)
  grid.add(newSeq[int](newSize))

while grid.len < 100:
  fillGrid()
  increaseSize()

printGrid()
echo "Grid size has increased to 100x100. There is probably a bug"
quit()
