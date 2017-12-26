package day10

import util.readInput
import kotlin.test.expect

fun main(args: Array<String>) {
    expect(12) { compute1(5, "3,4,1,5") }
    expect(15990) { compute1(256, readInput("10")) }

    expect("a2582a3a0e66e6e86e3812dcb672a272") { compute2("") }
    expect("33efeb34ea91902bb2f59c9920caa6cd") { compute2("AoC 2017") }
    expect("3efbe78a8d82f29979031a4aa0b16a9d") { compute2("1,2,3") }
    expect("63960835bcdc130f0b66d7ff4f6a5a8e") { compute2("1,2,4") }
    expect("90adb097dd55dea8305c900372258ac6") { compute2(readInput("10")) }
}

fun compute1(len: Int, input: String): Int {
    val start = State(0, 0, (0 until len).toList())
    val out = computeRound(start, input.split(",").map { it.toInt() })
    return out.list[0] * out.list[1]
}

data class State(val pos: Int, val skipSize: Int, val list: List<Int>)

fun computeRound(state: State, input: List<Int>): State {
    var pos = state.pos
    var skipSize = state.skipSize
    var list = state.list

    for (part in input) {
        val newList = list.toMutableList()
        for (i in 0 until part) {
            newList[(pos + i) % list.size] = list[(pos + (part - 1) + list.size - i) % list.size]
        }
        pos = (pos + part + skipSize) % list.size
        list = newList
        skipSize += 1
    }

    return State(pos, skipSize, list)
}

fun compute2(strInput: String): String {
    val input = strInput.toCharArray().map { it.toInt() } + listOf(17, 31, 73, 47, 23)
    val start = State(0, 0, (0 until 256).toList())
    val out = (0 until 64).fold(start) { s, _ -> computeRound(s, input) }

    val dense = out.list.chunked(16).map { it.reduce { a, b -> a xor b } }
    return dense.joinToString("") { it.toString(16).padStart(2, '0') }
}
