package day02

import util.readInput
import util.words
import kotlin.test.expect

fun main(args: Array<String>) {
    expect(18) { compute1("5 1 9 5\n7 5 3\n2 4 6 8") }
    expect(54426) { compute1(readInput("02")) }

    expect(9) { compute2("5 9 2 8\n9 4 7 3\n3 8 6 5") }
    expect(333) { compute2(readInput("02")) }
}

fun compute1(input: String): Int {
    return input.lines().sumBy { computeLine1(it) }
}

fun computeLine1(it: String): Int {
    val nums = it.words().map { it.toInt() }
    return nums.max()!! - nums.min()!!
}

fun compute2(input: String): Int {
    return input.lines().sumBy { computeLine2(it) }
}

fun computeLine2(it: String): Int {
    val nums = it.words().map { it.toInt() }

    for (v1 in nums) {
        for (v2 in nums) {
            if (v1 <= v2) continue
            if (v1 % v2 == 0) return v1 / v2
        }
    }

    throw Exception("Did not find two matching inputs")
}

