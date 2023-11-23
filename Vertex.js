class Vertex {
  constructor(id) {
    this.id = id;
    this.edges = [];
    this.visited = false;
  }

  addEdge(edge) {
    this.edges.push(edge);
  }

  getEdges() {
    return this.edges;
  }

  setVisited(visited) {
    this.visited = visited;
  }

  isConnectedTo(vertex) {
    return this.edges.some(
      (e) => e.startVertex === vertex || e.endVertex === vertex
    );
  }
}
