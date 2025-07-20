// Async/Await Patterns and Advanced Asynchronous Programming
// Modern JavaScript async patterns and best practices

// Method 1: Basic async/await
async function fetchUserData(userId) {
    try {
        const response = await fetch(`https://api.example.com/users/${userId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
}

// Method 2: Async function with timeout
async function fetchWithTimeout(url, timeout = 5000) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    
    try {
        const response = await fetch(url, {
            signal: controller.signal
        });
        clearTimeout(timeoutId);
        return await response.json();
    } catch (error) {
        clearTimeout(timeoutId);
        if (error.name === 'AbortError') {
            throw new Error('Request timed out');
        }
        throw error;
    }
}

// Method 3: Parallel async operations
async function fetchMultipleUsers(userIds) {
    const promises = userIds.map(id => fetchUserData(id));
    const results = await Promise.all(promises);
    return results;
}

// Method 4: Sequential async operations
async function processSequentially(items, processor) {
    const results = [];
    for (const item of items) {
        const result = await processor(item);
        results.push(result);
    }
    return results;
}

// Method 5: Async retry mechanism
async function retryAsync(fn, maxRetries = 3, delay = 1000) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            return await fn();
        } catch (error) {
            if (attempt === maxRetries) {
                throw error;
            }
            console.log(`Attempt ${attempt} failed, retrying in ${delay}ms...`);
            await new Promise(resolve => setTimeout(resolve, delay * attempt));
        }
    }
}

// Method 6: Async queue with concurrency control
class AsyncQueue {
    constructor(concurrency = 1) {
        this.concurrency = concurrency;
        this.running = 0;
        this.queue = [];
    }
    
    async add(fn) {
        return new Promise((resolve, reject) => {
            this.queue.push({ fn, resolve, reject });
            this.process();
        });
    }
    
    async process() {
        if (this.running >= this.concurrency || this.queue.length === 0) {
            return;
        }
        
        this.running++;
        const { fn, resolve, reject } = this.queue.shift();
        
        try {
            const result = await fn();
            resolve(result);
        } catch (error) {
            reject(error);
        } finally {
            this.running--;
            this.process();
        }
    }
    
    async addAll(fns) {
        return Promise.all(fns.map(fn => this.add(fn)));
    }
}

// Method 7: Async generator
async function* asyncGenerator(start, end, delay = 1000) {
    for (let i = start; i <= end; i++) {
        await new Promise(resolve => setTimeout(resolve, delay));
        yield i;
    }
}

// Method 8: Async iterator
class AsyncIterator {
    constructor(items, processor) {
        this.items = items;
        this.processor = processor;
        this.index = 0;
    }
    
    async next() {
        if (this.index >= this.items.length) {
            return { done: true };
        }
        
        const item = this.items[this.index++];
        const result = await this.processor(item);
        
        return { value: result, done: false };
    }
    
    [Symbol.asyncIterator]() {
        return this;
    }
}

// Method 9: Async memoization
function memoizeAsync(fn, ttl = 60000) {
    const cache = new Map();
    
    return async function(...args) {
        const key = JSON.stringify(args);
        const cached = cache.get(key);
        
        if (cached && Date.now() - cached.timestamp < ttl) {
            return cached.value;
        }
        
        const result = await fn.apply(this, args);
        cache.set(key, { value: result, timestamp: Date.now() });
        
        return result;
    };
}

// Method 10: Async debouncing
function debounceAsync(fn, delay) {
    let timeoutId;
    let lastPromise;
    
    return async function(...args) {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        
        return new Promise((resolve, reject) => {
            timeoutId = setTimeout(async () => {
                try {
                    const result = await fn.apply(this, args);
                    resolve(result);
                } catch (error) {
                    reject(error);
                }
            }, delay);
        });
    };
}

// Method 11: Async throttling
function throttleAsync(fn, delay) {
    let lastCall = 0;
    let lastPromise;
    
    return async function(...args) {
        const now = Date.now();
        
        if (now - lastCall >= delay) {
            lastCall = now;
            lastPromise = fn.apply(this, args);
        }
        
        return lastPromise;
    };
}

// Method 12: Async with progress tracking
function createAsyncWithProgress(fn) {
    let progressCallbacks = [];
    
    const asyncFn = async function(...args) {
        const result = await fn.apply(this, args);
        progressCallbacks.forEach(callback => callback(100));
        return result;
    };
    
    asyncFn.onProgress = (callback) => {
        progressCallbacks.push(callback);
    };
    
    return asyncFn;
}

// Method 13: Async with cancellation
function createCancellableAsync(fn) {
    let cancelled = false;
    
    const asyncFn = async function(...args) {
        if (cancelled) {
            throw new Error('Operation cancelled');
        }
        
        const result = await fn.apply(this, args);
        
        if (cancelled) {
            throw new Error('Operation cancelled');
        }
        
        return result;
    };
    
    asyncFn.cancel = () => {
        cancelled = true;
    };
    
    return asyncFn;
}

// Method 14: Async with circuit breaker
class AsyncCircuitBreaker {
    constructor(fn, options = {}) {
        this.fn = fn;
        this.failureThreshold = options.failureThreshold || 5;
        this.timeout = options.timeout || 60000;
        this.failures = 0;
        this.lastFailureTime = 0;
        this.state = 'CLOSED'; // CLOSED, OPEN, HALF_OPEN
    }
    
    async call(...args) {
        if (this.state === 'OPEN') {
            if (Date.now() - this.lastFailureTime >= this.timeout) {
                this.state = 'HALF_OPEN';
            } else {
                throw new Error('Circuit breaker is OPEN');
            }
        }
        
        try {
            const result = await this.fn.apply(this, args);
            this.onSuccess();
            return result;
        } catch (error) {
            this.onFailure();
            throw error;
        }
    }
    
    onSuccess() {
        this.failures = 0;
        this.state = 'CLOSED';
    }
    
    onFailure() {
        this.failures++;
        this.lastFailureTime = Date.now();
        
        if (this.failures >= this.failureThreshold) {
            this.state = 'OPEN';
        }
    }
}

// Method 15: Async with batch processing
class AsyncBatchProcessor {
    constructor(batchSize = 10, batchTimeout = 1000) {
        this.batchSize = batchSize;
        this.batchTimeout = batchTimeout;
        this.batches = new Map();
        this.timers = new Map();
    }
    
    async add(event, data) {
        if (!this.batches.has(event)) {
            this.batches.set(event, []);
        }
        
        this.batches.get(event).push(data);
        
        if (this.batches.get(event).length >= this.batchSize) {
            await this.flushBatch(event);
        } else {
            this.scheduleBatchFlush(event);
        }
    }
    
    async flushBatch(event) {
        const batch = this.batches.get(event);
        if (!batch || batch.length === 0) return;
        
        // Process batch
        console.log(`Processing batch for ${event}:`, batch);
        
        this.batches.set(event, []);
        
        if (this.timers.has(event)) {
            clearTimeout(this.timers.get(event));
            this.timers.delete(event);
        }
    }
    
    scheduleBatchFlush(event) {
        if (this.timers.has(event)) return;
        
        const timer = setTimeout(async () => {
            await this.flushBatch(event);
        }, this.batchTimeout);
        
        this.timers.set(event, timer);
    }
}

// Real-world examples

// Example 1: Basic async/await usage
async function example1() {
    try {
        const userData = await fetchUserData(1);
        console.log('User data:', userData);
    } catch (error) {
        console.error('Failed to fetch user data:', error);
    }
}

// Example 2: Parallel vs Sequential processing
async function example2() {
    const userIds = [1, 2, 3, 4, 5];
    
    // Parallel processing
    console.time('Parallel');
    const parallelResults = await fetchMultipleUsers(userIds);
    console.timeEnd('Parallel');
    
    // Sequential processing
    console.time('Sequential');
    const sequentialResults = await processSequentially(userIds, fetchUserData);
    console.timeEnd('Sequential');
}

// Example 3: Retry mechanism
async function example3() {
    const unreliableFunction = async () => {
        if (Math.random() > 0.5) {
            throw new Error('Random failure');
        }
        return 'Success';
    };
    
    try {
        const result = await retryAsync(unreliableFunction, 3, 1000);
        console.log('Result:', result);
    } catch (error) {
        console.error('All retries failed:', error);
    }
}

// Example 4: Async queue
async function example4() {
    const queue = new AsyncQueue(2);
    
    const tasks = [
        () => new Promise(resolve => setTimeout(() => resolve('Task 1'), 1000)),
        () => new Promise(resolve => setTimeout(() => resolve('Task 2'), 1000)),
        () => new Promise(resolve => setTimeout(() => resolve('Task 3'), 1000)),
        () => new Promise(resolve => setTimeout(() => resolve('Task 4'), 1000))
    ];
    
    const results = await queue.addAll(tasks);
    console.log('Queue results:', results);
}

// Example 5: Async generator
async function example5() {
    for await (const value of asyncGenerator(1, 5, 500)) {
        console.log('Generated value:', value);
    }
}

// Example 6: Async iterator
async function example6() {
    const items = ['a', 'b', 'c', 'd'];
    const processor = async (item) => {
        await new Promise(resolve => setTimeout(resolve, 100));
        return item.toUpperCase();
    };
    
    const iterator = new AsyncIterator(items, processor);
    
    for await (const result of iterator) {
        console.log('Processed:', result);
    }
}

// Example 7: Memoized async function
async function example7() {
    const expensiveAsyncFunction = memoizeAsync(async (n) => {
        console.log('Computing...');
        await new Promise(resolve => setTimeout(resolve, 1000));
        return n * n;
    }, 5000);
    
    console.log(await expensiveAsyncFunction(5)); // Computing..., 25
    console.log(await expensiveAsyncFunction(5)); // 25 (cached)
}

// Example 8: Debounced async function
async function example8() {
    const debouncedSearch = debounceAsync(async (query) => {
        console.log('Searching for:', query);
        await new Promise(resolve => setTimeout(resolve, 500));
        return `Results for: ${query}`;
    }, 300);
    
    debouncedSearch('a');
    debouncedSearch('ab');
    const result = await debouncedSearch('abc'); // Only this will execute
    console.log(result);
}

// Example 9: Throttled async function
async function example9() {
    const throttledAPI = throttleAsync(async (endpoint) => {
        console.log('Calling API:', endpoint);
        await new Promise(resolve => setTimeout(resolve, 100));
        return `Data from ${endpoint}`;
    }, 1000);
    
    throttledAPI('/users');
    throttledAPI('/posts');
    const result = await throttledAPI('/comments'); // Only this will execute
    console.log(result);
}

// Example 10: Progress tracking
async function example10() {
    const downloadWithProgress = createAsyncWithProgress(async () => {
        for (let i = 0; i <= 100; i += 10) {
            await new Promise(resolve => setTimeout(resolve, 100));
            // Simulate progress
        }
        return 'Download complete';
    });
    
    downloadWithProgress.onProgress((percent) => {
        console.log(`Progress: ${percent}%`);
    });
    
    const result = await downloadWithProgress();
    console.log(result);
}

// Example 11: Cancellable async operation
async function example11() {
    const cancellableOperation = createCancellableAsync(async () => {
        await new Promise(resolve => setTimeout(resolve, 5000));
        return 'Operation completed';
    });
    
    const promise = cancellableOperation();
    
    setTimeout(() => {
        cancellableOperation.cancel();
    }, 2000);
    
    try {
        const result = await promise;
        console.log(result);
    } catch (error) {
        console.log('Operation was cancelled');
    }
}

// Example 12: Circuit breaker
async function example12() {
    const unreliableAPI = async () => {
        if (Math.random() > 0.7) {
            throw new Error('API Error');
        }
        return 'API Response';
    };
    
    const circuitBreaker = new AsyncCircuitBreaker(unreliableAPI, {
        failureThreshold: 3,
        timeout: 10000
    });
    
    for (let i = 0; i < 10; i++) {
        try {
            const result = await circuitBreaker.call();
            console.log(`Call ${i + 1}:`, result);
        } catch (error) {
            console.log(`Call ${i + 1}:`, error.message);
        }
    }
}

// Example 13: Batch processing
async function example13() {
    const batchProcessor = new AsyncBatchProcessor(3, 2000);
    
    for (let i = 1; i <= 10; i++) {
        await batchProcessor.add('user_events', { userId: i, event: 'login' });
    }
    
    // Wait for remaining batches to process
    await new Promise(resolve => setTimeout(resolve, 3000));
}

// Example 14: Async with timeout
async function example14() {
    try {
        const data = await fetchWithTimeout('https://api.example.com/data', 3000);
        console.log('Data received:', data);
    } catch (error) {
        console.log('Request failed:', error.message);
    }
}

// Example 15: Complex async workflow
async function example15() {
    const workflow = async () => {
        // Step 1: Fetch user data
        const userData = await fetchUserData(1);
        
        // Step 2: Process in parallel
        const [userPosts, userFriends] = await Promise.all([
            fetchUserData(userData.id + '/posts'),
            fetchUserData(userData.id + '/friends')
        ]);
        
        // Step 3: Sequential processing
        const processedPosts = await processSequentially(userPosts, async (post) => {
            return { ...post, processed: true };
        });
        
        return { userData, processedPosts, userFriends };
    };
    
    try {
        const result = await workflow();
        console.log('Workflow completed:', result);
    } catch (error) {
        console.error('Workflow failed:', error);
    }
}

// Export for testing
module.exports = {
    fetchUserData,
    fetchWithTimeout,
    fetchMultipleUsers,
    processSequentially,
    retryAsync,
    AsyncQueue,
    asyncGenerator,
    AsyncIterator,
    memoizeAsync,
    debounceAsync,
    throttleAsync,
    createAsyncWithProgress,
    createCancellableAsync,
    AsyncCircuitBreaker,
    AsyncBatchProcessor
}; 