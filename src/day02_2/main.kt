package day02_2

import java.io.File
import kotlin.test.expect

fun main(args: Array<String>) {
    expect(9) { compute("5 9 2 8\n9 4 7 3\n3 8 6 5") }
    println(compute(File("input/day02.txt").readText().trim()))
}

fun compute(input: String): Int {
    return input.lines().sumBy { computeLine(it) }
}

fun computeLine(it: String): Int {
    val nums = it.split(Regex("\\s")).map { it.toInt() }

    for (v1 in nums) {
        for (v2 in nums) {
            if (v1 <= v2) continue
            if (v1 % v2 == 0) return v1 / v2
        }
    }

    throw Exception("Did not find two matching inputs")
}
