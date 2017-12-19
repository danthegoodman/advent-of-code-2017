package day04

import util.readInput
import util.words
import java.io.File
import kotlin.test.expect

fun main(args: Array<String>) {
    expect(1) { compute1("aa bb cc dd ee") }
    expect(0) { compute1("aa bb cc dd aa") }
    expect(1) { compute1("aa bb cc dd aaa") }
    expect(466) { compute1(File("input/day04.txt").readText().trim()) }

    expect(1) { compute2("abcde fghij") }
    expect(0) { compute2("abcde xyz ecdab") }
    expect(1) { compute2("a ab abc abd abf abj") }
    expect(1) { compute2("iiii oiii ooii oooi oooo") }
    expect(0) { compute2("oiii ioii iioi iiio") }
    expect(251) { compute2(readInput("04")) }
}

fun compute1(input: String): Int {
    return input.lines().count {
        val words = it.words()
        words.toSet().size == words.size
    }
}

fun compute2(input: String): Int {
    return input.lines().count {
        val words = it.words()
        val sortedWords = words.map { it.toCharArray().apply { sort() }.joinToString() }
        sortedWords.toSet().size == sortedWords.size
    }
}


