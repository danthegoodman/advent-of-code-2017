import unittest

proc compute(input: string): int =
  result = 0
  let step = input.len div 2
  for n, curr in input.pairs:
    var next = n + step
    if next >= input.len:
      next = n - step

    if curr == input[next]:
      result += (int(input[next]) - int('0'))

check compute("1212") == 6
check compute("1221") == 0
check compute("123425") == 4
check compute("123123") == 12
check compute("12131415") == 4
echo(compute(readFile("01/input.txt")))
