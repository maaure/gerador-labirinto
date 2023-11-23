let g = {};

const resolution = 500;
const vertexSize = 50;
const length = resolution / vertexSize;

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

  drawGrid();
}

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

function getIndex(x, y) {
  return x + y * length;
}

function drawGrid() {
  for (let y = 0; y < length; y++) {
    for (let x = 0; x < length; x++) {
      let current = g.getVertex(getIndex(x, y));
      let neighbors = getNeighborsCoordinates(x, y).map(
        (n) => n && g.getVertex(getIndex(n.x, n.y))
      );

      let walls = [true, true, true, true];

      for (let i = 0; i < 4; i++) {
        walls[i] = g.isConnected(current, neighbors[i]);
      }

      drawCell(walls);
    }
  }
}

function drawCell(walls) {}

function draw() {
  background(220);
}
