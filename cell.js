class Cell {

  constructor(i, j) {
    this.i = i
    this.j = j
    this.walls = [true, true, true, true]
    this.visited = false
  }

  checkNeighbors() {
    const neighbors = []

    const top = cells[index(this.i, this.j - 1)]
    const right = cells[index(this.i + 1, this.j)]
    const bottom = cells[index(this.i, this.j + 1)]
    const left = cells[index(this.i - 1, this.j)]

    if (top && !top.visited) {
      neighbors.push(top)
    }
    if (right && !right.visited) {
      neighbors.push(right)
    }
    if (bottom && !bottom.visited) {
      neighbors.push(bottom)
    }
    if (left && !left.visited) {
      neighbors.push(left)
    }

    if (neighbors.length > 0) {
      const r = floor(random(0, neighbors.length));
      return neighbors[r]
    } else {
      return undefined
    }
  }

  highlight(c = [0, 0, 255, 100]) {
    const x = this.i * w
    const y = this.j * w
    noStroke()
    fill(c)
    rect(x, y, w, w)
  }

  show() {
    const x = this.i * w;
    const y = this.j * w;
    stroke(255);
    if (this.walls[0]) {
      line(x, y, x + w, y);
    }
    if (this.walls[1]) {
      line(x + w, y, x + w, y + w);
    }
    if (this.walls[2]) {
      line(x + w, y + w, x, y + w);
    }
    if (this.walls[3]) {
      line(x, y + w, x, y);
    }

    if (this.visited) {
      noStroke();
      fill(0, 0, 255, 100);
      rect(x, y, w, w);
    }
  }

  print() {
    const x = this.i * w;
    const y = this.j * w;
    stroke(0);
    if (this.walls[0]) {
      line(x, y, x + w, y);
    }
    if (this.walls[1]) {
      line(x + w, y, x + w, y + w);
    }
    if (this.walls[2]) {
      line(x + w, y + w, x, y + w);
    }
    if (this.walls[3]) {
      line(x, y + w, x, y);
    }

    noStroke()
    fill(255)
    rect(x, y, w, w)

  }

}


function index(i, j) {
  if (i < 0 || j < 0 || i > width / w - 1 || j > height / w - 1) {
    return -1;
  }
  return i + j * width / w;
}

function removeWalls(a, b) {
  let x = a.i - b.i;
  if (x === 1) {
    a.walls[3] = false;
    b.walls[1] = false;
  } else if (x === -1) {
    a.walls[1] = false;
    b.walls[3] = false;
  }
  let y = a.j - b.j;
  if (y === 1) {
    a.walls[0] = false;
    b.walls[2] = false;
  } else if (y === -1) {
    a.walls[2] = false;
    b.walls[0] = false;
  }
}