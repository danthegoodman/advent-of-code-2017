package day04_1

import java.io.File
import java.util.TreeSet
import kotlin.test.expect

fun main(args: Array<String>) {
    expect(1) { compute("aa bb cc dd ee") }
    expect(0) { compute("aa bb cc dd aa") }
    expect(1) { compute("aa bb cc dd aaa") }
    println(compute(File("input/day04.txt").readText().trim()))
}

fun compute(input: String): Int {
    return input.lines().count { isValidPassphrase(it) }
}

fun isValidPassphrase(it: String): Boolean {
    val words = it.split(Regex("\\s"))
    return TreeSet(words).size == words.size
}

