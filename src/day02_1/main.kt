package day02_1

import java.io.File
import kotlin.test.expect

fun main(args: Array<String>) {
    expect(18) { compute("5 1 9 5\n7 5 3\n2 4 6 8") }
    println(compute(File("input/day02.txt").readText().trim()))
}

fun compute(input: String): Int {
    return input.lines().sumBy { computeLine(it) }
}

fun computeLine(it: String): Int {
    val nums = it.split(Regex("\\s")).map { it.toInt() }
    return nums.max()!! - nums.min()!!
}

