package day01_2

import java.io.File
import kotlin.test.expect

fun main(args: Array<String>) {
    expect(6) { compute("1212") }
    expect(0) { compute("1221") }
    expect(4) { compute("123425") }
    expect(12) { compute("123123") }
    expect(4) { compute("12131415") }

    println(compute(File("input/day01.txt").readText().trim()))
}

private fun compute(input: String): Int {
    val chars = input.toCharArray()
    val step = chars.size / 2
    return chars.withIndex().sumBy {
        val next = (it.index + step) % (chars.size)
        when {
            it.value == chars[next] -> it.value - '0'
            else -> 0
        }
    }
}
