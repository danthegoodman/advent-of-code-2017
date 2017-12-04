package day04_2

import java.io.File
import java.util.TreeSet
import kotlin.test.expect

fun main(args: Array<String>) {
    expect(1) { compute("abcde fghij") }
    expect(0) { compute("abcde xyz ecdab") }
    expect(1) { compute("a ab abc abd abf abj") }
    expect(1) { compute("iiii oiii ooii oooi oooo") }
    expect(0) { compute("oiii ioii iioi iiio") }
    println(compute(File("input/day04.txt").readText().trim()))
}

fun compute(input: String): Int {
    return input.lines().count { isValidPassphrase(it) }
}

fun isValidPassphrase(it: String): Boolean {
    val words = it.split(Regex("\\s"))
    val sortedWords = words.map { it.toCharArray().apply { sort() }.joinToString() }
    return TreeSet(sortedWords).size == sortedWords.size
}
