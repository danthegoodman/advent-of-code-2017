package day07

import sun.plugin.dom.exception.InvalidStateException
import util.readInput
import util.words
import kotlin.test.expect

fun main(args: Array<String>) {
    val sample = """
pbga (66)
xhth (57)
ebii (61)
havc (66)
ktlj (57)
fwft (72) -> ktlj, cntj, xhth
qoyq (66)
padx (45) -> pbga, havc, qoyq
tknk (41) -> ugml, padx, fwft
jptl (61)
ugml (68) -> gyxo, ebii, jptl
gyxo (61)
cntj (57)
"""

    expect("tknk") { computeRoot(sample.trim()) }
    expect("gynfwly") { computeRoot(readInput("07")) }

    expect(60) { computeNewWeightForUnbalancedNode(sample.trim()) }
    expect(1526) { computeNewWeightForUnbalancedNode(readInput("07")) }
}

fun computeRoot(input: String): String {
    val nameRex = Regex("([a-z]+)")

    val deps = input.lineSequence().associate { line ->
        val names = nameRex.findAll(line).map { it.value }.toList()
        names[0] to names.drop(1)
    }

    val rootNames = (deps.keys - deps.values.flatten())
    return rootNames.single()
}

data class Node(val weight: Int, val children: List<String>)
data class ChildTotal(val name: String, val total: Int)

fun computeNewWeightForUnbalancedNode(input: String): Int {
    val deps = input.lineSequence().associate { line ->
        val words = line.replace(Regex("[^\\w]+"), " ").trim().words()
        words[0] to Node(words[1].toInt(), words.drop(2))
    }

    fun totalWeight(node: Node): Int {
        return node.weight + node.children.sumBy { totalWeight(deps[it]!!) }
    }

    deps.values.sortedBy { totalWeight(it) }.forEach {
        val grouped = it.children.map { ChildTotal(it, totalWeight(deps[it]!!)) }.groupBy { it.total }
        if (grouped.size > 1) {
            val outlier = grouped.values.single { it.size == 1 }.single()
            val mainWeight = grouped.keys.single { it != outlier.total }
            return (mainWeight - outlier.total) + deps[outlier.name]!!.weight
        }
    }

    throw InvalidStateException("not found")
}
