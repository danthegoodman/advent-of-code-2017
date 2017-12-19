import kotlin.system.exitProcess
import kotlin.test.expect

const val INPUT = 289326

enum class Direction {
    North, West, South, East, UpTier
}

val grid = MutableList(3) { MutableList(3) { 0 } }

fun main(args: Array<String>) {
    var r = grid.size / 2
    var c = grid.size / 2
    var step = 1
    var direction = Direction.UpTier
    var tier = 0
    var dirSteps = 0
    grid[r][c] = 1

    fun fillGrid() {
        while (step < grid.size * grid.size) {
            step += 1

            when (direction) {
                Direction.North -> r -= 1
                Direction.West -> c -= 1
                Direction.South -> r += 1
                Direction.East -> c += 1
                Direction.UpTier -> {
                    direction = Direction.North
                    dirSteps = 0
                    tier += 1
                    c += 1
                }
            }

            dirSteps += 1
            if (dirSteps == tier * 2) {
                direction = Direction.values()[direction.ordinal + 1]
                dirSteps = 0
            }

            grid[r][c] = computeSlot(r, c)
            if (grid[r][c] > INPUT) {
                println(renderGrid())
                expect(295229) { grid[r][c] }
                exitProcess(0)
            }
        }
    }

    fun increaseSize() {
        r += 1
        c += 1
        for (i in 0 until grid.size) {
            grid[i].add(0, 0)
            grid[i].add(0)
        }

        val newSize = grid.size + 2
        grid.add(0, MutableList(newSize) { 0 })
        grid.add(MutableList(newSize) { 0 })
    }

    while (grid.size < 100) {
        fillGrid()
        increaseSize()
    }

    println(renderGrid())
    println("Grid size has increased to 100x100. There is probably a bug")
}

fun renderGrid() = grid.joinToString("\n") { it.joinToString("\t") }

fun computeSlot(r: Int, c: Int): Int {
    val Z = grid.size - 1
    var result = 0
    if (r > 0 && c > 0) result += grid[r - 1][c - 1]
    if (r > 0 && c < Z) result += grid[r - 1][c + 1]
    if (r < Z && c > 0) result += grid[r + 1][c - 1]
    if (r < Z && c < Z) result += grid[r + 1][c + 1]
    if (r > 0) result += grid[r - 1][c]
    if (r < Z) result += grid[r + 1][c]
    if (c > 0) result += grid[r][c - 1]
    if (c < Z) result += grid[r][c + 1]
    return result
}


