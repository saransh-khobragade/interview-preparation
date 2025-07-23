// Event Emitter
// This file implements a simple EventEmitter class for publish/subscribe (pub/sub) event handling in JavaScript.
// Supports on, off, emit, and once methods for managing event listeners.
// Useful for decoupling code and building event-driven systems.

class EventEmitter {
    constructor() {
        this.events = {};
    }
    on(event, listener) {
        if (!this.events[event]) this.events[event] = [];
        this.events[event].push(listener);
    }
    off(event, listener) {
        if (!this.events[event]) return;
        this.events[event] = this.events[event].filter(l => l !== listener);
    }
    emit(event, ...args) {
        if (!this.events[event]) return;
        for (const listener of this.events[event]) {
            listener(...args);
        }
    }
    once(event, listener) {
        const wrapper = (...args) => {
            listener(...args);
            this.off(event, wrapper);
        };
        this.on(event, wrapper);
    }
}

// Usage example:
// const emitter = new EventEmitter();
// emitter.on('data', (msg) => console.log(msg));
// emitter.emit('data', 'Hello!');

module.exports = { EventEmitter }; 