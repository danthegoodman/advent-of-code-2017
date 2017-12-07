package util

import java.io.File

fun readInput(num:String) = File("input/day$num.txt").readText().trim()

fun String.words() = this.split(Regex("\\s+"))
