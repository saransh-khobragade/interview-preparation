// EventEmitter Implementation and Patterns
// Custom EventEmitter implementation and common event handling patterns

// Method 1: Basic EventEmitter implementation
class EventEmitter {
    constructor() {
        this.events = {};
    }
    
    on(event, listener) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(listener);
        return this;
    }
    
    off(event, listener) {
        if (!this.events[event]) return this;
        
        this.events[event] = this.events[event].filter(l => l !== listener);
        return this;
    }
    
    emit(event, ...args) {
        if (!this.events[event]) return false;
        
        this.events[event].forEach(listener => {
            try {
                listener.apply(this, args);
            } catch (error) {
                console.error('Error in event listener:', error);
            }
        });
        
        return true;
    }
    
    once(event, listener) {
        const onceWrapper = (...args) => {
            this.off(event, onceWrapper);
            listener.apply(this, args);
        };
        return this.on(event, onceWrapper);
    }
    
    removeAllListeners(event) {
        if (event) {
            delete this.events[event];
        } else {
            this.events = {};
        }
        return this;
    }
    
    listenerCount(event) {
        return this.events[event] ? this.events[event].length : 0;
    }
    
    eventNames() {
        return Object.keys(this.events);
    }
}

// Method 2: Advanced EventEmitter with priority and async support
class AdvancedEventEmitter extends EventEmitter {
    constructor() {
        super();
        this.asyncEvents = new Set();
        this.priorityEvents = new Map();
    }
    
    onAsync(event, listener) {
        this.asyncEvents.add(event);
        return this.on(event, listener);
    }
    
    onPriority(event, listener, priority = 0) {
        if (!this.priorityEvents.has(event)) {
            this.priorityEvents.set(event, []);
        }
        
        this.priorityEvents.get(event).push({ listener, priority });
        this.priorityEvents.get(event).sort((a, b) => b.priority - a.priority);
        
        return this;
    }
    
    async emitAsync(event, ...args) {
        if (!this.events[event]) return false;
        
        const listeners = this.events[event];
        const promises = [];
        
        for (const listener of listeners) {
            try {
                const result = listener.apply(this, args);
                if (result instanceof Promise) {
                    promises.push(result);
                }
            } catch (error) {
                console.error('Error in async event listener:', error);
            }
        }
        
        if (promises.length > 0) {
            await Promise.all(promises);
        }
        
        return true;
    }
    
    emitPriority(event, ...args) {
        if (!this.priorityEvents.has(event)) return false;
        
        const listeners = this.priorityEvents.get(event);
        
        for (const { listener } of listeners) {
            try {
                listener.apply(this, args);
            } catch (error) {
                console.error('Error in priority event listener:', error);
            }
        }
        
        return true;
    }
}

// Method 3: EventEmitter with memory management
class MemorySafeEventEmitter extends EventEmitter {
    constructor(maxListeners = 10) {
        super();
        this.maxListeners = maxListeners;
        this.listenerCounts = new Map();
    }
    
    on(event, listener) {
        const currentCount = this.listenerCount(event);
        
        if (currentCount >= this.maxListeners) {
            console.warn(`Max listeners (${this.maxListeners}) exceeded for event: ${event}`);
        }
        
        return super.on(event, listener);
    }
    
    setMaxListeners(count) {
        this.maxListeners = count;
        return this;
    }
    
    getMaxListeners() {
        return this.maxListeners;
    }
    
    prependListener(event, listener) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].unshift(listener);
        return this;
    }
    
    prependOnceListener(event, listener) {
        const onceWrapper = (...args) => {
            this.off(event, onceWrapper);
            listener.apply(this, args);
        };
        return this.prependListener(event, onceWrapper);
    }
}

// Method 4: EventEmitter with error handling
class ErrorHandlingEventEmitter extends EventEmitter {
    constructor() {
        super();
        this.errorListeners = [];
    }
    
    onError(listener) {
        this.errorListeners.push(listener);
        return this;
    }
    
    emit(event, ...args) {
        try {
            return super.emit(event, ...args);
        } catch (error) {
            this.handleError(error, event, args);
        }
    }
    
    handleError(error, event, args) {
        if (this.errorListeners.length > 0) {
            this.errorListeners.forEach(listener => {
                try {
                    listener(error, event, args);
                } catch (err) {
                    console.error('Error in error handler:', err);
                }
            });
        } else {
            console.error('Unhandled error in event:', event, error);
        }
    }
}

// Method 5: EventEmitter with event history
class EventHistoryEmitter extends EventEmitter {
    constructor(maxHistory = 100) {
        super();
        this.maxHistory = maxHistory;
        this.history = [];
    }
    
    emit(event, ...args) {
        // Record event in history
        this.history.push({
            event,
            args,
            timestamp: Date.now()
        });
        
        // Maintain history size
        if (this.history.length > this.maxHistory) {
            this.history.shift();
        }
        
        return super.emit(event, ...args);
    }
    
    getHistory(event = null) {
        if (event) {
            return this.history.filter(record => record.event === event);
        }
        return [...this.history];
    }
    
    clearHistory() {
        this.history = [];
        return this;
    }
    
    replayHistory(event = null) {
        const eventsToReplay = event ? 
            this.history.filter(record => record.event === event) :
            this.history;
        
        eventsToReplay.forEach(record => {
            super.emit(record.event, ...record.args);
        });
    }
}

// Method 6: EventEmitter with middleware support
class MiddlewareEventEmitter extends EventEmitter {
    constructor() {
        super();
        this.middleware = [];
    }
    
    use(middleware) {
        this.middleware.push(middleware);
        return this;
    }
    
    emit(event, ...args) {
        let currentArgs = args;
        let currentEvent = event;
        
        // Apply middleware
        for (const mw of this.middleware) {
            const result = mw(currentEvent, currentArgs);
            if (result) {
                if (Array.isArray(result)) {
                    [currentEvent, ...currentArgs] = result;
                } else {
                    currentArgs = [result];
                }
            }
        }
        
        return super.emit(currentEvent, ...currentArgs);
    }
}

// Method 7: EventEmitter with event validation
class ValidatingEventEmitter extends EventEmitter {
    constructor() {
        super();
        this.validators = new Map();
    }
    
    addValidator(event, validator) {
        this.validators.set(event, validator);
        return this;
    }
    
    emit(event, ...args) {
        const validator = this.validators.get(event);
        
        if (validator) {
            const isValid = validator(args);
            if (!isValid) {
                throw new Error(`Invalid arguments for event: ${event}`);
            }
        }
        
        return super.emit(event, ...args);
    }
}

// Method 8: EventEmitter with event grouping
class GroupedEventEmitter extends EventEmitter {
    constructor() {
        super();
        this.groups = new Map();
    }
    
    createGroup(name) {
        this.groups.set(name, new Set());
        return this;
    }
    
    addToGroup(groupName, event) {
        if (!this.groups.has(groupName)) {
            this.createGroup(groupName);
        }
        this.groups.get(groupName).add(event);
        return this;
    }
    
    emitGroup(groupName, ...args) {
        const group = this.groups.get(groupName);
        if (!group) return false;
        
        let allEmitted = true;
        group.forEach(event => {
            if (!this.emit(event, ...args)) {
                allEmitted = false;
            }
        });
        
        return allEmitted;
    }
    
    removeGroup(groupName) {
        this.groups.delete(groupName);
        return this;
    }
}

// Method 9: EventEmitter with event queuing
class QueuedEventEmitter extends EventEmitter {
    constructor() {
        super();
        this.queue = [];
        this.processing = false;
    }
    
    emit(event, ...args) {
        this.queue.push({ event, args });
        
        if (!this.processing) {
            this.processQueue();
        }
        
        return true;
    }
    
    async processQueue() {
        this.processing = true;
        
        while (this.queue.length > 0) {
            const { event, args } = this.queue.shift();
            await super.emit(event, ...args);
        }
        
        this.processing = false;
    }
    
    clearQueue() {
        this.queue = [];
        return this;
    }
    
    getQueueLength() {
        return this.queue.length;
    }
}

// Method 10: EventEmitter with event batching
class BatchedEventEmitter extends EventEmitter {
    constructor(batchSize = 10, batchTimeout = 1000) {
        super();
        this.batchSize = batchSize;
        this.batchTimeout = batchTimeout;
        this.batches = new Map();
        this.timers = new Map();
    }
    
    emit(event, ...args) {
        if (!this.batches.has(event)) {
            this.batches.set(event, []);
        }
        
        this.batches.get(event).push(args);
        
        if (this.batches.get(event).length >= this.batchSize) {
            this.flushBatch(event);
        } else {
            this.scheduleBatchFlush(event);
        }
        
        return true;
    }
    
    flushBatch(event) {
        const batch = this.batches.get(event);
        if (!batch || batch.length === 0) return;
        
        super.emit(event, batch);
        this.batches.set(event, []);
        
        if (this.timers.has(event)) {
            clearTimeout(this.timers.get(event));
            this.timers.delete(event);
        }
    }
    
    scheduleBatchFlush(event) {
        if (this.timers.has(event)) return;
        
        const timer = setTimeout(() => {
            this.flushBatch(event);
        }, this.batchTimeout);
        
        this.timers.set(event, timer);
    }
}

// Real-world examples

// Example 1: Basic event emitter usage
const emitter = new EventEmitter();

emitter.on('user:login', (user) => {
    console.log('User logged in:', user.name);
});

emitter.on('user:logout', (user) => {
    console.log('User logged out:', user.name);
});

emitter.emit('user:login', { name: 'John', id: 1 });
emitter.emit('user:logout', { name: 'John', id: 1 });

// Example 2: Advanced event emitter with async support
const advancedEmitter = new AdvancedEventEmitter();

advancedEmitter.onAsync('data:process', async (data) => {
    await new Promise(resolve => setTimeout(resolve, 100));
    console.log('Processed data:', data);
});

advancedEmitter.onPriority('order:process', (order) => {
    console.log('Processing high priority order:', order.id);
}, 10);

advancedEmitter.onPriority('order:process', (order) => {
    console.log('Processing low priority order:', order.id);
}, 1);

// Example 3: Memory safe event emitter
const safeEmitter = new MemorySafeEventEmitter(5);

for (let i = 0; i < 7; i++) {
    safeEmitter.on('test', () => console.log(`Listener ${i}`));
}

// Example 4: Error handling event emitter
const errorEmitter = new ErrorHandlingEventEmitter();

errorEmitter.onError((error, event, args) => {
    console.log('Error occurred:', error.message, 'in event:', event);
});

errorEmitter.on('test', () => {
    throw new Error('Test error');
});

errorEmitter.emit('test');

// Example 5: Event history emitter
const historyEmitter = new EventHistoryEmitter(5);

historyEmitter.on('action', (action) => {
    console.log('Action performed:', action);
});

historyEmitter.emit('action', 'create');
historyEmitter.emit('action', 'update');
historyEmitter.emit('action', 'delete');

console.log('History:', historyEmitter.getHistory('action'));

// Example 6: Middleware event emitter
const middlewareEmitter = new MiddlewareEventEmitter();

middlewareEmitter.use((event, args) => {
    console.log('Middleware: Processing event:', event);
    return [event, ...args];
});

middlewareEmitter.on('test', (data) => {
    console.log('Received:', data);
});

middlewareEmitter.emit('test', 'hello');

// Example 7: Validating event emitter
const validatingEmitter = new ValidatingEventEmitter();

validatingEmitter.addValidator('user:create', (args) => {
    const [user] = args;
    return user && user.name && user.email;
});

validatingEmitter.on('user:create', (user) => {
    console.log('User created:', user);
});

try {
    validatingEmitter.emit('user:create', { name: 'John', email: 'john@example.com' });
    validatingEmitter.emit('user:create', { name: 'John' }); // Will throw error
} catch (error) {
    console.log('Validation error:', error.message);
}

// Example 8: Grouped event emitter
const groupedEmitter = new GroupedEventEmitter();

groupedEmitter.addToGroup('userActions', 'user:login');
groupedEmitter.addToGroup('userActions', 'user:logout');
groupedEmitter.addToGroup('userActions', 'user:update');

groupedEmitter.on('user:login', () => console.log('User logged in'));
groupedEmitter.on('user:logout', () => console.log('User logged out'));
groupedEmitter.on('user:update', () => console.log('User updated'));

groupedEmitter.emitGroup('userActions', { userId: 1 });

// Example 9: Queued event emitter
const queuedEmitter = new QueuedEventEmitter();

queuedEmitter.on('task', async (task) => {
    await new Promise(resolve => setTimeout(resolve, 100));
    console.log('Processed task:', task);
});

queuedEmitter.emit('task', 'task1');
queuedEmitter.emit('task', 'task2');
queuedEmitter.emit('task', 'task3');

// Example 10: Batched event emitter
const batchedEmitter = new BatchedEventEmitter(3, 2000);

batchedEmitter.on('log', (batch) => {
    console.log('Batch processed:', batch);
});

batchedEmitter.emit('log', 'message1');
batchedEmitter.emit('log', 'message2');
batchedEmitter.emit('log', 'message3'); // Will trigger batch flush

// Export for testing
module.exports = {
    EventEmitter,
    AdvancedEventEmitter,
    MemorySafeEventEmitter,
    ErrorHandlingEventEmitter,
    EventHistoryEmitter,
    MiddlewareEventEmitter,
    ValidatingEventEmitter,
    GroupedEventEmitter,
    QueuedEventEmitter,
    BatchedEventEmitter
}; 