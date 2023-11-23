class Graph {
  constructor(isDirected = false) {
    this.vertexes = {};
    this.isDirected = isDirected;
    this.current = undefined;
    this.currentIndex = 0;
  }

  addVertex(id) {
    if (this.vertexes[id]) {
      throw new Error(`Vertex with ID ${id} already exists.`);
    }

    this.vertexes[id] = new Vertex(id);
  }

  getVertex(id) {
    return this.vertexes[id];
  }

  addEdge(startVertexId, endVertexId, weight) {
    const startVertex = this.getVertex(startVertexId);
    const endVertex = this.getVertex(endVertexId);

    if (this.isConnected(startVertex, endVertex)) return;

    if (!startVertex || !endVertex) {
      throw new Error("Start or end vertex does not exist.");
    }

    const edge = new Edge(startVertex, endVertex, weight);
    startVertex.addEdge(edge);

    if (!this.isDirected) {
      const reverseEdge = new Edge(endVertex, startVertex, weight);
      endVertex.addEdge(reverseEdge);
    }
  }

  getVertexes() {
    return Object.values(this.vertexes);
  }

  isConnected(startVertex, endVertex) {
    return startVertex.isConnectedTo(endVertex);
  }

  next() {
    if (!this.current) {
      this.current = this.vertexes[currentIndex++];
    }

    return this.current;
  }

  printGraph() {
    const vertexes = Object.values(this.vertexes);

    for (const vertex of vertexes) {
      const edges = vertex.getEdges();
      const edgeList = edges
        .map((edge) => {
          return this.isDirected
            ? `${edge.startVertex.id} -> ${edge.endVertex.id} (${edge.weight})`
            : `${edge.startVertex.id} - ${edge.endVertex.id} (${edge.weight})`;
        })
        .join(", ");

      console.log(`Vertex ${vertex.id}: ${edgeList}`);
    }
  }
}
