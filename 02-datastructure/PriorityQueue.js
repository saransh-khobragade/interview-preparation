// Priority Queue implementation in JavaScript
// Each element has a priority, and the element with the highest priority is served first

class PriorityQueue {
    constructor() {
        this.items = [];
    }
    enqueue(element, priority) {
        const queueElement = { element, priority };
        let added = false;
        for (let i = 0; i < this.items.length; i++) {
            if (queueElement.priority < this.items[i].priority) {
                this.items.splice(i, 0, queueElement);
                added = true;
                break;
            }
        }
        if (!added) {
            this.items.push(queueElement);
        }
    }
    dequeue() {
        if (this.isEmpty()) {
            return 'Underflow';
        }
        return this.items.shift().element;
    }
    front() {
        if (this.isEmpty()) {
            return 'Queue is empty';
        }
        return this.items[0].element;
    }
    isEmpty() {
        return this.items.length === 0;
    }
    size() {
        return this.items.length;
    }
    toArray() {
        return this.items.map(item => item.element);
    }
}

module.exports = PriorityQueue; 