// Promise Implementation and Advanced Patterns
// Custom Promise implementation and common Promise interview questions

// Method 1: Basic Promise implementation
class MyPromise {
    constructor(executor) {
        this.state = 'pending';
        this.value = undefined;
        this.reason = undefined;
        this.onFulfilledCallbacks = [];
        this.onRejectedCallbacks = [];
        
        const resolve = (value) => {
            if (this.state === 'pending') {
                this.state = 'fulfilled';
                this.value = value;
                this.onFulfilledCallbacks.forEach(callback => callback(value));
            }
        };
        
        const reject = (reason) => {
            if (this.state === 'pending') {
                this.state = 'rejected';
                this.reason = reason;
                this.onRejectedCallbacks.forEach(callback => callback(reason));
            }
        };
        
        try {
            executor(resolve, reject);
        } catch (error) {
            reject(error);
        }
    }
    
    then(onFulfilled, onRejected) {
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
        onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason; };
        
        return new MyPromise((resolve, reject) => {
            const handleFulfilled = (value) => {
                try {
                    const result = onFulfilled(value);
                    if (result instanceof MyPromise) {
                        result.then(resolve, reject);
                    } else {
                        resolve(result);
                    }
                } catch (error) {
                    reject(error);
                }
            };
            
            const handleRejected = (reason) => {
                try {
                    const result = onRejected(reason);
                    if (result instanceof MyPromise) {
                        result.then(resolve, reject);
                    } else {
                        resolve(result);
                    }
                } catch (error) {
                    reject(error);
                }
            };
            
            if (this.state === 'fulfilled') {
                setTimeout(() => handleFulfilled(this.value), 0);
            } else if (this.state === 'rejected') {
                setTimeout(() => handleRejected(this.reason), 0);
            } else {
                this.onFulfilledCallbacks.push(handleFulfilled);
                this.onRejectedCallbacks.push(handleRejected);
            }
        });
    }
    
    catch(onRejected) {
        return this.then(undefined, onRejected);
    }
    
    finally(onFinally) {
        return this.then(
            value => MyPromise.resolve(onFinally()).then(() => value),
            reason => MyPromise.resolve(onFinally()).then(() => { throw reason; })
        );
    }
    
    static resolve(value) {
        if (value instanceof MyPromise) {
            return value;
        }
        return new MyPromise(resolve => resolve(value));
    }
    
    static reject(reason) {
        return new MyPromise((resolve, reject) => reject(reason));
    }
    
    static all(promises) {
        return new MyPromise((resolve, reject) => {
            const results = [];
            let completed = 0;
            
            if (promises.length === 0) {
                resolve(results);
                return;
            }
            
            promises.forEach((promise, index) => {
                MyPromise.resolve(promise).then(
                    value => {
                        results[index] = value;
                        completed++;
                        if (completed === promises.length) {
                            resolve(results);
                        }
                    },
                    reject
                );
            });
        });
    }
    
    static race(promises) {
        return new MyPromise((resolve, reject) => {
            promises.forEach(promise => {
                MyPromise.resolve(promise).then(resolve, reject);
            });
        });
    }
    
    static allSettled(promises) {
        return new MyPromise((resolve) => {
            const results = [];
            let completed = 0;
            
            if (promises.length === 0) {
                resolve(results);
                return;
            }
            
            promises.forEach((promise, index) => {
                MyPromise.resolve(promise).then(
                    value => {
                        results[index] = { status: 'fulfilled', value };
                        completed++;
                        if (completed === promises.length) {
                            resolve(results);
                        }
                    },
                    reason => {
                        results[index] = { status: 'rejected', reason };
                        completed++;
                        if (completed === promises.length) {
                            resolve(results);
                        }
                    }
                );
            });
        });
    }
    
    static any(promises) {
        return new MyPromise((resolve, reject) => {
            const errors = [];
            let rejected = 0;
            
            if (promises.length === 0) {
                reject(new AggregateError([], 'All promises were rejected'));
                return;
            }
            
            promises.forEach(promise => {
                MyPromise.resolve(promise).then(
                    resolve,
                    error => {
                        errors.push(error);
                        rejected++;
                        if (rejected === promises.length) {
                            reject(new AggregateError(errors, 'All promises were rejected'));
                        }
                    }
                );
            });
        });
    }
}

// Method 2: Promise with timeout
function promiseWithTimeout(promise, timeout) {
    return Promise.race([
        promise,
        new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Timeout')), timeout)
        )
    ]);
}

// Method 3: Promise retry mechanism
function promiseRetry(fn, maxRetries = 3, delay = 1000) {
    return new Promise((resolve, reject) => {
        let retries = 0;
        
        function attempt() {
            fn().then(resolve).catch(error => {
                retries++;
                if (retries >= maxRetries) {
                    reject(error);
                } else {
                    setTimeout(attempt, delay * retries);
                }
            });
        }
        
        attempt();
    });
}

// Method 4: Promise queue
class PromiseQueue {
    constructor(concurrency = 1) {
        this.concurrency = concurrency;
        this.running = 0;
        this.queue = [];
    }
    
    add(fn) {
        return new Promise((resolve, reject) => {
            this.queue.push({ fn, resolve, reject });
            this.process();
        });
    }
    
    process() {
        if (this.running >= this.concurrency || this.queue.length === 0) {
            return;
        }
        
        this.running++;
        const { fn, resolve, reject } = this.queue.shift();
        
        Promise.resolve(fn())
            .then(resolve)
            .catch(reject)
            .finally(() => {
                this.running--;
                this.process();
            });
    }
}

// Method 5: Promise memoization
function memoizePromise(fn, ttl = 60000) {
    const cache = new Map();
    
    return function(...args) {
        const key = JSON.stringify(args);
        const cached = cache.get(key);
        
        if (cached && Date.now() - cached.timestamp < ttl) {
            return cached.promise;
        }
        
        const promise = fn.apply(this, args);
        cache.set(key, { promise, timestamp: Date.now() });
        
        return promise;
    };
}

// Method 6: Promise cancellation
function cancellablePromise(promise) {
    let cancelled = false;
    
    const wrappedPromise = new Promise((resolve, reject) => {
        promise.then(
            value => !cancelled && resolve(value),
            error => !cancelled && reject(error)
        );
    });
    
    wrappedPromise.cancel = () => {
        cancelled = true;
    };
    
    return wrappedPromise;
}

// Method 7: Promise with progress
function promiseWithProgress(fn) {
    let progressCallbacks = [];
    
    const promise = new Promise((resolve, reject) => {
        fn(resolve, reject, (progress) => {
            progressCallbacks.forEach(callback => callback(progress));
        });
    });
    
    promise.onProgress = (callback) => {
        progressCallbacks.push(callback);
    };
    
    return promise;
}

// Method 8: Promise pool
class PromisePool {
    constructor(maxConcurrency = 5) {
        this.maxConcurrency = maxConcurrency;
        this.running = 0;
        this.queue = [];
    }
    
    async add(fn) {
        if (this.running >= this.maxConcurrency) {
            await new Promise(resolve => this.queue.push(resolve));
        }
        
        this.running++;
        
        try {
            return await fn();
        } finally {
            this.running--;
            if (this.queue.length > 0) {
                const next = this.queue.shift();
                next();
            }
        }
    }
    
    async addAll(fns) {
        return Promise.all(fns.map(fn => this.add(fn)));
    }
}

// Method 9: Promise with timeout and retry
function promiseWithTimeoutAndRetry(fn, timeout, maxRetries = 3) {
    return promiseRetry(
        () => promiseWithTimeout(fn(), timeout),
        maxRetries,
        1000
    );
}

// Method 10: Promise debouncing
function debouncePromise(fn, delay) {
    let timeoutId;
    let lastPromise;
    
    return function(...args) {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        
        return new Promise((resolve, reject) => {
            timeoutId = setTimeout(() => {
                const promise = fn.apply(this, args);
                lastPromise = promise;
                promise.then(resolve).catch(reject);
            }, delay);
        });
    };
}

// Method 11: Promise throttling
function throttlePromise(fn, delay) {
    let lastCall = 0;
    let lastPromise;
    
    return function(...args) {
        const now = Date.now();
        
        if (now - lastCall >= delay) {
            lastCall = now;
            lastPromise = fn.apply(this, args);
        }
        
        return lastPromise;
    };
}

// Method 12: Promise with circuit breaker
class CircuitBreaker {
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
            const result = await this.fn(...args);
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

// Real-world examples

// Example 1: API call with timeout
const apiCall = promiseWithTimeout(
    fetch('https://api.example.com/data'),
    5000
);

// Example 2: Retry mechanism for unreliable operations
const unreliableOperation = promiseRetry(
    () => fetch('https://unreliable-api.com/data'),
    3,
    1000
);

// Example 3: Promise queue for rate limiting
const queue = new PromiseQueue(2);
const tasks = [
    () => new Promise(resolve => setTimeout(() => resolve('Task 1'), 1000)),
    () => new Promise(resolve => setTimeout(() => resolve('Task 2'), 1000)),
    () => new Promise(resolve => setTimeout(() => resolve('Task 3'), 1000))
];

tasks.forEach(task => queue.add(task));

// Example 4: Memoized API calls
const memoizedFetch = memoizePromise(
    (url) => fetch(url).then(res => res.json()),
    300000 // 5 minutes
);

// Example 5: Cancellable operations
const cancellableFetch = cancellablePromise(
    fetch('https://api.example.com/data')
);

// Later...
// cancellableFetch.cancel();

// Example 6: Progress tracking
const downloadWithProgress = promiseWithProgress((resolve, reject, progress) => {
    // Simulate download with progress
    let percent = 0;
    const interval = setInterval(() => {
        percent += 10;
        progress(percent);
        
        if (percent >= 100) {
            clearInterval(interval);
            resolve('Download complete');
        }
    }, 100);
});

downloadWithProgress.onProgress((percent) => {
    console.log(`Download progress: ${percent}%`);
});

// Example 7: Promise pool for concurrent operations
const pool = new PromisePool(3);
const operations = Array.from({ length: 10 }, (_, i) => 
    () => new Promise(resolve => setTimeout(() => resolve(`Operation ${i}`), 1000))
);

pool.addAll(operations);

// Example 8: Circuit breaker for external services
const circuitBreaker = new CircuitBreaker(
    async (url) => {
        const response = await fetch(url);
        if (!response.ok) throw new Error('API Error');
        return response.json();
    },
    { failureThreshold: 3, timeout: 30000 }
);

// Example 9: Debounced search
const debouncedSearch = debouncePromise(
    async (query) => {
        const response = await fetch(`/api/search?q=${query}`);
        return response.json();
    },
    300
);

// Example 10: Throttled API calls
const throttledAPI = throttlePromise(
    async (endpoint) => {
        const response = await fetch(endpoint);
        return response.json();
    },
    1000
);

// Export for testing
module.exports = {
    MyPromise,
    promiseWithTimeout,
    promiseRetry,
    PromiseQueue,
    memoizePromise,
    cancellablePromise,
    promiseWithProgress,
    PromisePool,
    promiseWithTimeoutAndRetry,
    debouncePromise,
    throttlePromise,
    CircuitBreaker
}; 