// Stack implementation in JavaScript
// LIFO data structure with push, pop, peek, isEmpty, size, clear, and toArray methods

class Stack {
    constructor() {
        this.items = [];
    }
    push(element) {
        this.items.push(element);
    }
    pop() {
        if (this.isEmpty()) {
            return 'Underflow';
        }
        return this.items.pop();
    }
    peek() {
        if (this.isEmpty()) {
            return 'Stack is empty';
        }
        return this.items[this.items.length - 1];
    }
    isEmpty() {
        return this.items.length === 0;
    }
    size() {
        return this.items.length;
    }
    clear() {
        this.items = [];
    }
    toArray() {
        return [...this.items];
    }
}

module.exports = Stack; 