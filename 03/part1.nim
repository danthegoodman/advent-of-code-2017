import unittest

proc compute(input: int): int =
  if input <= 1: return 0

  result = 1
  var steps = 2
  var gettingCloser = false
  var tier = 1
  var round = 0

  while steps < input:
    if round == 4:
      round = 0
      result += 1
      tier += 1
      gettingCloser = true
    elif gettingCloser: result -= 1
    else: result += 1

    if result == tier:
      gettingCloser = false
    elif result == tier * 2:
      gettingCloser = true
      round += 1

    steps += 1


check compute(1) == 0
check compute(12) == 3
check compute(23) == 2
check compute(1024) == 31
echo compute(289326)
