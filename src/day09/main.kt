package day09

import util.readInput
import kotlin.test.expect

fun main(args: Array<String>) {
    expect(1) { compute1("{}") }
    expect(6) { compute1("{{{}}}") }
    expect(5) { compute1("{{},{}}") }
    expect(16) { compute1("{{{},{},{{}}}}") }
    expect(1) { compute1("{<a>,<a>,<a>,<a>}") }
    expect(9) { compute1("{{<ab>},{<ab>},{<ab>},{<ab>}}") }
    expect(9) { compute1("{{<!!>},{<!!>},{<!!>},{<!!>}}") }
    expect(3) { compute1("{{<a!>},{<a!>},{<a!>},{<ab>}}") }
    expect(10800) { compute1(readInput("09")) }

    expect(0) { compute2("<>") }
    expect(17) { compute2("<random characters>") }
    expect(3) { compute2("<<<<>") }
    expect(2) { compute2("<{!>}>") }
    expect(0) { compute2("<!!>") }
    expect(0) { compute2("<!!!>>") }
    expect(10) { compute2("<{o\"i!a,<{i<a>") }
    expect(4522) { compute2(readInput("09")) }
}

fun compute1(input: String): Int {
    var score = 0
    var depth = 0
    var inGarbage = false
    var inBang = false

    input.toCharArray().forEach {
        when {
            inBang -> inBang = false
            inGarbage -> when (it) {
                '!' -> inBang = true
                '>' -> inGarbage = false
            }
            else -> when (it) {
                '{' -> {
                    depth += 1
                    score += depth
                }
                '}' -> depth -= 1
                '<' -> inGarbage = true
            }
        }
    }
    return score
}

fun compute2(input: String): Int {
    var countGarbage = 0
    var inGarbage = false
    var inBang = false

    input.toCharArray().forEach {
        if (inBang) {
            inBang = false
        } else if (inGarbage) {
            when (it) {
                '!' -> inBang = true
                '>' -> inGarbage = false
                else -> countGarbage += 1
            }
        } else {
            when (it) {
                '<' -> inGarbage = true
            }
        }
    }
    return countGarbage
}
