import unittest, strutils, sequtils

proc computeLine(nums: seq[int]): int =
  for v1 in nums:
    for v2 in nums:
      if v1 <= v2: continue
      if v1 mod v2 == 0:
        return v1 div v2
  raise newException(Exception, "did not find two matching inputs")

proc compute(input: string): int =
  result = 0
  for ln in splitLines(input.strip):
    var nums = map(toSeq splitWhitespace ln) do (a:string)->int: a.parseInt
    result += computeLine(nums)

check compute("5 9 2 8\n9 4 7 3\n3 8 6 5") == 9
echo compute(readFile "02/input.txt")
