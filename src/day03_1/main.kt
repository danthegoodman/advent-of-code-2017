package day03_1

import kotlin.test.expect

fun main(args: Array<String>) {
    expect(0) { compute(1) }
    expect(3) { compute(12) }
    expect(2) { compute(23) }
    expect(31) { compute(1024) }
    println(compute(289326))
}

fun compute(input: Int): Int {
    if (input <= 1) return 0

    var result = 1
    var steps = 2
    var gettingCloser = false
    var tier = 1
    var round = 0

    while (steps < input) {
        if (round == 4) {
            round = 0
            result += 1
            tier += 1
            gettingCloser = true
        } else if (gettingCloser) {
            result -= 1
        } else {
            result += 1
        }

        if (result == tier) {
            gettingCloser = false
        } else if (result == tier * 2) {
            gettingCloser = true
            round += 1
        }
        steps += 1
    }
    return result
}
