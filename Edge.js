class Edge {
  constructor(startVertex, endVertex, weight = null) {
    this.startVertex = startVertex;
    this.endVertex = endVertex;
    this.weight = weight;
    this.isWall = true;
  }
}