import unittest, strutils, sequtils, sets, algorithm

proc isValidPassphrase(line: string): bool =
  let words = map(split(line)) do(w:string)->string:
    var ws = @w
    sort(ws, system.cmp)
    return join(ws, "")
  return toSet(words).len == words.len

proc compute(input: string): int =
  result = 0
  for ln in splitLines(input.strip):
    if isValidPassphrase ln:
      result += 1

check compute("abcde fghij") == 1
check compute("abcde xyz ecdab") == 0
check compute("a ab abc abd abf abj") == 1
check compute("iiii oiii ooii oooi oooo") == 1
check compute("oiii ioii iioi iiio") == 0
echo compute(readFile "04/input.txt")
