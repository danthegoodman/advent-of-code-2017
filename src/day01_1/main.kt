package day01_1

import java.io.File
import kotlin.test.expect

fun main(args: Array<String>) {
    expect(3) { compute("1122") }
    expect(4) { compute("1111") }
    expect(0) { compute("1234") }
    expect(9) { compute("91212129") }

    println(compute(File("input/day01.txt").readText().trim()))
}

private fun compute(input: String): Int {
    val chars = input.toCharArray()
    return chars.withIndex().sumBy {
        val next = (it.index + 1) % (chars.size)
        when {
            it.value == chars[next] -> it.value - '0'
            else -> 0
        }
    }
}
