package day08

import util.readInput
import util.words
import kotlin.test.expect

fun main(args: Array<String>) {
    val sample = """
b inc 5 if a > 1
a inc 1 if b < 5
c dec -10 if a >= 1
c inc -20 if c == 10
"""

    expect(1) { compute(sample.trim()).largestFinal }
    expect(4902) { compute(readInput("08")).largestFinal }

    expect(10) { compute(sample.trim()).largestEver }
    expect(7037) { compute(readInput("08")).largestEver }
}

data class Output (
    val largestFinal: Int,
    val largestEver: Int
)

fun compute(input: String): Output {
    val registers = mutableMapOf<String, Int>()
    var maxEver = 0

    for (l in input.lines()) {
        val words = l.words()

        val currCmpVal = registers.getOrDefault(words[4], 0)
        val cmpVal = words[6].toInt()
        val isMatch = when (words[5]) {
            ">" -> currCmpVal > cmpVal
            ">=" -> currCmpVal >= cmpVal
            "==" -> currCmpVal == cmpVal
            "!=" -> currCmpVal != cmpVal
            "<=" -> currCmpVal <= cmpVal
            "<" -> currCmpVal < cmpVal
            else -> TODO(words[5])
        }

        if (isMatch) {
            val currValue = registers.getOrDefault(words[0], 0)
            val deltaValue = words[2].toInt()
            val newValue = when (words[1]) {
                "inc" -> currValue + deltaValue
                "dec" -> currValue - deltaValue
                else -> TODO(words[1])
            }
            if(newValue > maxEver){
                maxEver = newValue
            }
            registers[words[0]] = newValue
        }
    }

    return Output(
            largestFinal = registers.values.max()!!,
            largestEver = maxEver
    )
}
