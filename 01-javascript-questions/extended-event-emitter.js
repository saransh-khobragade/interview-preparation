/*
Extended EventEmitter
---------------------
Implements an event emitter with on, off, emit, and once methods.

Approach: Use a Map to store event listeners.
*/

class EventEmitter {
    constructor() {
        this.events = new Map();
    }
    on(event, listener) {
        if (!this.events.has(event)) this.events.set(event, []);
        this.events.get(event).push(listener);
    }
    off(event, listener) {
        if (!this.events.has(event)) return;
        this.events.set(event, this.events.get(event).filter(l => l !== listener));
    }
    emit(event, ...args) {
        if (!this.events.has(event)) return;
        for (const listener of this.events.get(event)) listener(...args);
    }
    once(event, listener) {
        const wrapper = (...args) => {
            this.off(event, wrapper);
            listener(...args);
        };
        this.on(event, wrapper);
    }
}

module.exports = EventEmitter; 