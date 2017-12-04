import unittest, strutils, sequtils, sets

proc isValidPassphrase(line: string): bool =
  let words = split(line)
  return toSet(words).len == words.len

proc compute(input: string): int =
  result = 0
  for ln in splitLines(input.strip):
    if isValidPassphrase ln:
      result += 1

check compute("aa bb cc dd ee") == 1
check compute("aa bb cc dd aa") == 0
check compute("aa bb cc dd aaa") == 1
echo compute(readFile "04/input.txt")
