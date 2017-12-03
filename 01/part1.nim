import unittest

proc compute(input: string): int =
  result = 0
  for n, curr in input.pairs:
    var next = n + 1
    if next == input.len:
      next = 0

    if curr == input[next]:
      result += (int(input[next]) - int('0'))

check compute("1122") == 3
check compute("1111") == 4
check compute("1234") == 0
check compute("91212129") == 9
echo(compute(readFile("01/input.txt")))
