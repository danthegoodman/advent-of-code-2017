package day05_1

import java.io.File
import kotlin.test.expect

fun main(args: Array<String>) {
    expect(5) { compute("0\n3\n0\n1\n-3") }
    println(compute(File("input/day05.txt").readText().trim()))
}

fun compute(input: String): Int {
    val codes = input.lines().map { it.toInt() }.toMutableList()

    var index = 0
    var steps = 0

    while (0 <= index && index < codes.size) {
        steps++
        val v = codes[index]
        codes[index] += 1
        index += v
    }
    return steps
}
