class Dijkstra {
	constructor(graph) {
		this.graph = graph;
		this.visited = [];
	}

	distances(vertexId = 0) {
		const pq = new PriorityQueue();
		const start = this.graph.getVertex(vertexId);
		start.setDistance(0);
		pq.enqueue(start, start.getDistance());

		while (!pq.isEmpty()) {
			const vertex = pq.dequeue();
			vertex.setVisited(true);

			const neighbors = vertex.getNeighbors();

			for (let i = 0; i < neighbors.length; i++) {
				const n = neighbors[i];
				if (!n.isVisited()) {
					const cost = vertex.getDistance() + 1;
					if (cost < n.getDistance()) {
						n.setDistance(cost);
						pq.enqueue(n, cost);
						n.setPrev(vertex);
					}
				}
			}
		}
	}

	path(id) {
		const path = [];
		let current = this.graph.getVertex(id);
		while (current) {
			path.push(current);
			current = current.getPrev();
		}
		return path.reverse();
	}
}
