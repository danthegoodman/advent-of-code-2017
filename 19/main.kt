package day19

import java.io.File
import kotlin.test.expect

fun main(args: Array<String>) {
    val sample = """>     |         .
                    >     |  +--+   .
                    >     A  |  C   .
                    > F---|----E|--+
                    >     |  |  |  D
                    >     +B-+  +--+""".trimMargin(">")

    expect("ABCDEF") { computeLettersSeen(sample) }
    expect("DWNBGECOMY") { computeLettersSeen(File("input/day19.txt").readText()) }

    expect(38) { computeSteps(sample) }
    expect(17228) { computeSteps(File("input/day19.txt").readText()) }
}

enum class Direction {
    UP, RIGHT, DOWN, LEFT
}

data class Output(
        val seen: List<Char>,
        val steps: Int
)

fun computeLettersSeen(input: String) = compute(input).seen.joinToString("")
fun computeSteps(input: String) = compute(input).steps

fun compute(input: String):Output {
    val grid = input.lines().map { it.padEnd(200).toCharArray() }
    val seen = mutableListOf<Char>()
    var row = 0
    var col = grid[0].indexOf('|')
    var direction = Direction.DOWN
    var steps = 0

    while (true) {
        steps += 1
        when (direction) {
            Direction.UP -> row -= 1
            Direction.DOWN -> row += 1
            Direction.LEFT -> col -= 1
            Direction.RIGHT -> col += 1
        }
        val nextChar = grid[row][col]
        if (nextChar == ' ') break
        else if (nextChar == '|' || nextChar == '-') {
            //nothing
        } else if (nextChar == '+') {
            direction = when (direction) {
                Direction.LEFT, Direction.RIGHT -> when {
                    grid[row - 1][col] != ' ' -> Direction.UP
                    grid[row + 1][col] != ' ' -> Direction.DOWN
                    else -> TODO("expected vertical movement")
                }
                else -> when {
                    grid[row][col - 1] != ' ' -> Direction.LEFT
                    grid[row][col + 1] != ' ' -> Direction.RIGHT
                    else -> TODO("expected side movement")
                }
            }
        } else {
            seen.add(nextChar)
        }
    }
    return Output(seen, steps)
}
