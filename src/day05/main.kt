package day05

import util.readInput
import kotlin.test.expect

fun main(args: Array<String>) {
    expect(5) { compute(Mode.Larger, "0\n3\n0\n1\n-3") }
    expect(343364) { compute(Mode.Larger, readInput("05")) }

    expect(10) { compute(Mode.FlipFlop, "0\n3\n0\n1\n-3") }
    expect(25071947) { compute(Mode.FlipFlop, readInput("05")) }
}

enum class Mode { Larger, FlipFlop }

fun compute(mode: Mode, input: String): Int {
    val codes = input.lines().map { it.toInt() }.toMutableList()

    var index = 0
    var steps = 0

    while (0 <= index && index < codes.size) {
        steps++
        val v = codes[index]
        when (mode) {
            Mode.Larger -> codes[index] += 1
            Mode.FlipFlop -> codes[index] += if (v >= 3) -1 else +1
        }
        index += v
    }
    return steps
}
