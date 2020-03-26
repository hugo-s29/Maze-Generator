const w = 25
const cells = []
let current
const prev = []
/**
 * 1  => generating
 * 0  => done
 * -1 => going back
 **/
let state = 1

function setup() {
  createCanvas(1000, 1000);
  for (let j = 0; j < floor(width / w); j++) {
    for (let i = 0; i < floor(height / w); i++) {
      const cell = new Cell(i, j);
      cells.push(cell);
    }
  }
  current = cells[0]
}

function draw() {
  background(0)
  pixelDensity(6)
  for (const cell of cells) {
    cell.show()
  }
  switch (state) {
    case 1:
      maze(current)
      break
    case -1:
      back()
      break
    case 0:
    default:
      break
  }
  if (count >= floor(width / w) * floor(height / w)) {
    noLoop()
    state = 0
    for (const cell of cells) {
      cell.print()
    }
  }
}

let count = 0

function back() {
  const lastC = prev[prev.length - 1]
  lastC.highlight('purple')
  const n = lastC.checkNeighbors()
  if (n) {
    state = 1
    current = lastC
    count--
  } else {
    prev.pop()
  }
}

function maze(c) {
  c.highlight('green')
  c.visited = true
  const newC = c.checkNeighbors()
  count++
  if (!newC) {
    c.highlight('red')
    state = -1
  } else {
    removeWalls(c, newC)
    current = newC
    prev.push(c)
  }
}