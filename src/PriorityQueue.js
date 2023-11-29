class PriorityQueue {
	constructor() {
		this.queue = [];
	}

	enqueue(element, priority) {
		const item = { element, priority };
		let added = false;

		for (let i = 0; i < this.queue.length; i++) {
			if (this.queue[i].priority > priority) {
				this.queue.splice(i, 0, item);
				added = true;
				break;
			}
		}

		if (!added) {
			this.queue.push(item);
		}
	}

	dequeue() {
		if (!this.isEmpty()) {
			return this.queue.shift().element;
		}
		return null;
	}

	front() {
		if (!this.isEmpty()) {
			return this.queue[0].element;
		}
		return null;
	}

	isEmpty() {
		return this.queue.length === 0;
	}

	print() {
		for (const item of this.queue) {
			console.log(`${item.element} - ${item.priority}`);
		}
	}
}
