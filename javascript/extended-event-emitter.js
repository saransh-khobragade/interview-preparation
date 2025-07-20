// Extended EventEmitter with Priority and Async Support

class ExtendedEventEmitter {
    constructor() {
        this.events = {};
    }
    on(event, listener, priority = 0) {
        if (!this.events[event]) this.events[event] = [];
        this.events[event].push({ listener, priority });
        this.events[event].sort((a, b) => b.priority - a.priority);
    }
    off(event, listener) {
        if (!this.events[event]) return;
        this.events[event] = this.events[event].filter(l => l.listener !== listener);
    }
    async emit(event, ...args) {
        if (!this.events[event]) return;
        for (const { listener } of this.events[event]) {
            await listener(...args);
        }
    }
    once(event, listener, priority = 0) {
        const wrapper = async (...args) => {
            await listener(...args);
            this.off(event, wrapper);
        };
        this.on(event, wrapper, priority);
    }
}

// Usage:
// const emitter = new ExtendedEventEmitter();
// emitter.on('data', async (msg) => { await doSomething(msg); }, 10);
// await emitter.emit('data', 'Hello!');

module.exports = { ExtendedEventEmitter }; 