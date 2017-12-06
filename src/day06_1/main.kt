package day06_1

import java.io.File
import kotlin.test.expect

fun main(args: Array<String>) {
    expect(5) { compute("0 2 7 0") }
    println(compute(File("input/day06.txt").readText().trim()))
}

fun compute(input: String): Int {
    var nums = input.split(Regex("\\s+")).map { it.toInt() }
    val seen = mutableSetOf<List<Int>>()

    while (nums !in seen) {
        seen.add(nums)
        nums = nextNums(nums)
    }

    return seen.size
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