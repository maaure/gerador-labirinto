let g = {};

const resolution = 730;
const dim = 10;
const length = resolution / dim;

function getNeighborsCoordinates(x, y) {
  let coordinates = [
    { x: x, y: y - 1 },
    { x: x + 1, y: y },
    { x: x, y: y + 1 },
    { x: x - 1, y: y },
  ];

  for (let i = 0; i < coordinates.length; i++) {
    const { x, y } = coordinates[i];
    if (x < 0 || x >= length || y < 0 || y >= length) {
      coordinates[i] = undefined;
    }
  }

  return coordinates;
}

function drawGrid() {
  for (let y = 0; y < length; y++) {
    for (let x = 0; x < length; x++) {
      let current = g.getVertex(getIndex(x, y));
      let neighborsIds = getNeighborsCoordinates(x, y).map(
        (n) => n && getIndex(n.x, n.y)
      );

      let walls = [true, true, true, true];

      for (let i = 0; i < 4; i++) {
        let e = current.getEdgeTo(neighborsIds[i]);
        walls[i] = e && e.isWall;
      }

      drawCell(x, y, walls, current);
    }
  }
}

function drawCell(x, y, walls, current) {
  x = x * dim;
  y = y * dim;
  walls[0] && line(x, y, x + dim, y);
  walls[1] && line(x + dim, y, x + dim, y + dim);
  walls[2] && line(x, y + dim, x + dim, y + dim);
  walls[3] && line(x, y, x, y + dim);
  //text(current.id, x + dim / 2, y + dim / 2);
}

function getIndex(x, y) {
  return x + y * length;
}

function coordinates(id) {
  const x = id % length;
  const y = (id - x) / length;
  return {
    x,
    y,
  };
}
let stack = [];

function setup() {
  createCanvas(resolution, resolution);
  g = new Graph();

  for (let i = 0; i < length * length; i++) {
    g.addVertex(i);
  }

  for (let y = 0; y < length; y++) {
    for (let x = 0; x < length; x++) {
      let current = g.getVertex(getIndex(x, y));
      let neighbors = getNeighborsCoordinates(x, y).filter((n) => n);

      neighbors.forEach((n) => {
        let neighborIndex = getIndex(n.x, n.y);
        g.addEdge(current.id, neighborIndex, 1);
      });
    }
  }

  let current = g.getVertex(0);
  current.setVisited(true);
  stack.push(current);

  while (stack.length > 0) {
    current = stack.pop();
    const { x, y } = coordinates(current.id);
    rect(x * dim, y * dim, dim);
    const paths = current
      .getNeighborsPaths()
      .filter((p) => !p.neighbor.visited);
    if (paths.length > 0) {
      stack.push(current);
      const index = int(random(0, paths.length));
      let p = paths[index];
      g.removeWall(current, p.neighbor);
      p.neighbor.setVisited(true);
      stack.push(p.neighbor);
    }
  }

  drawGrid();
}

function draw() {
  background(220);
  drawGrid();
  noLoop();
  /*   if (stack.length > 0) {
    let current = stack.pop();
    const { x, y } = coordinates(current.id);
    rect(x * dim, y * dim, dim);
    const paths = current
      .getNeighborsPaths()
      .filter((p) => !p.neighbor.visited);
    if (paths.length > 0) {
      stack.push(current);
      const index = int(random(0, paths.length));
      let p = paths[index];
      g.removeWall(current, p.neighbor);
      p.neighbor.setVisited(true);
      stack.push(p.neighbor);
    }
  } */
}
