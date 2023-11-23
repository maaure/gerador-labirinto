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
      (e) => e.startVertex.id === vertex || e.endVertex.id === vertex
    );
  }

  getNeighborsPaths() {
    return this.edges.map((e) => {
      return {
        e,
        neighbor: e.startVertex === this ? e.endVertex : e.startVertex,
      };
    });
  }

  getEdgeTo(v) {
    return (
      v !== this.id &&
      this.edges.filter(
        (e) => e.startVertex.id === v || e.endVertex.id === v
      )[0]
    );
  }
}
