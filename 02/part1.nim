import unittest, strutils, sequtils

proc computeLine(nums: seq[int]): int =
  return nums.max - nums.min

proc compute(input: string): int =
  result = 0
  for ln in splitLines(input.strip):
    var nums = map(toSeq splitWhitespace ln) do (a:string)->int: a.parseInt
    result += computeLine(nums)

check compute("5 1 9 5\n7 5 3\n2 4 6 8") == 18
echo compute(readFile "02/input.txt")
