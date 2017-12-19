package day01

import util.readInput
import kotlin.test.expect

fun main(args: Array<String>) {
    expect(3) { compute1("1122") }
    expect(4) { compute1("1111") }
    expect(0) { compute1("1234") }
    expect(9) { compute1("91212129") }
    expect(1228) { compute1(readInput("01")) }

    expect(6) { compute2("1212") }
    expect(0) { compute2("1221") }
    expect(4) { compute2("123425") }
    expect(12) { compute2("123123") }
    expect(4) { compute2("12131415") }
    expect(1238) { compute2(readInput("01")) }
}

private fun compute1(input: String): Int {
    val chars = input.toCharArray()
    return chars.withIndex().sumBy {
        val next = (it.index + 1) % (chars.size)
        when {
            it.value == chars[next] -> it.value - '0'
            else -> 0
        }
    }
}

private fun compute2(input: String): Int {
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
