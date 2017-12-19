package day06

import util.readInput
import util.words
import kotlin.test.expect

fun main(args: Array<String>) {
    expect(5) { compute(Mode.Total, "0 2 7 0") }
    expect(7864) { compute(Mode.Total, readInput("06")) }

    expect(4) { compute(Mode.LoopSize, "0 2 7 0") }
    expect(1695) { compute(Mode.LoopSize, readInput("06")) }
}

enum class Mode { LoopSize, Total }

fun compute(mode: Mode, input: String): Int {
    var nums = input.words().map { it.toInt() }
    val seen = mutableListOf<List<Int>>()

    while (nums !in seen) {
        seen.add(nums)
        nums = nextNums(nums)
    }

    return when (mode) {
        Mode.Total -> seen.size
        Mode.LoopSize -> seen.size - seen.indexOf(nums)
    }
}

fun nextNums(nums: List<Int>): List<Int> {
    val l = nums.toMutableList()
    val max = l.max() ?: 0

    var ndx = l.indexOf(max)
    l[ndx] = 0

    (0 until max).forEach {
        ndx = (ndx + 1) % l.size
        l[ndx] += 1
    }
    return l
}