// Throttling - A technique to limit the execution of a function to a specific time interval
// Useful for scroll events, mouse movements, API calls, etc.

// Method 1: Basic throttle
function throttle(func, delay) {
    let lastCall = 0;
    
    return function(...args) {
        const now = Date.now();
        
        if (now - lastCall >= delay) {
            lastCall = now;
            return func.apply(this, args);
        }
    };
}

// Method 2: Throttle with leading and trailing options
function throttleAdvanced(func, delay, options = {}) {
    let lastCall = 0;
    let timeoutId;
    let lastArgs;
    let lastThis;
    
    const { leading = true, trailing = true } = options;
    
    function invokeFunc(time) {
        lastCall = time;
        const result = func.apply(lastThis, lastArgs);
        lastArgs = lastThis = undefined;
        return result;
    }
    
    function startTimer(pendingFunc, wait) {
        return setTimeout(pendingFunc, wait);
    }
    
    function cancelTimer(id) {
        clearTimeout(id);
    }
    
    function remainingWait(time) {
        return delay - (time - lastCall);
    }
    
    function shouldInvoke(time) {
        return time - lastCall >= delay;
    }
    
    function timerExpired() {
        const time = Date.now();
        if (shouldInvoke(time)) {
            return trailingEdge(time);
        }
        timeoutId = startTimer(timerExpired, remainingWait(time));
    }
    
    function trailingEdge(time) {
        timeoutId = undefined;
        
        if (trailing && lastArgs) {
            return invokeFunc(time);
        }
        lastArgs = lastThis = undefined;
    }
    
    function cancel() {
        if (timeoutId !== undefined) {
            cancelTimer(timeoutId);
        }
        lastCall = 0;
        lastArgs = lastThis = timeoutId = undefined;
    }
    
    function flush() {
        return timeoutId === undefined ? undefined : trailingEdge(Date.now());
    }
    
    function pending() {
        return timeoutId !== undefined;
    }
    
    function throttled(...args) {
        const time = Date.now();
        const isInvoking = shouldInvoke(time);
        
        lastArgs = args;
        lastThis = this;
        
        if (isInvoking) {
            if (timeoutId === undefined) {
                if (leading) {
                    return invokeFunc(time);
                }
                if (trailing) {
                    timeoutId = startTimer(timerExpired, delay);
                }
            }
        } else if (timeoutId === undefined && trailing) {
            timeoutId = startTimer(timerExpired, remainingWait(time));
        }
    }
    
    throttled.cancel = cancel;
    throttled.flush = flush;
    throttled.pending = pending;
    
    return throttled;
}

// Method 3: Throttle with return value handling
function throttleWithReturn(func, delay) {
    let lastCall = 0;
    let lastResult;
    
    return function(...args) {
        const now = Date.now();
        
        if (now - lastCall >= delay) {
            lastCall = now;
            lastResult = func.apply(this, args);
        }
        
        return lastResult;
    };
}

// Method 4: Throttle with async function support
function throttleAsync(func, delay) {
    let lastCall = 0;
    let lastPromise;
    
    return function(...args) {
        const now = Date.now();
        
        if (now - lastCall >= delay) {
            lastCall = now;
            lastPromise = func.apply(this, args);
        }
        
        return lastPromise;
    };
}

// Method 5: Throttle with different strategies
function createThrottleStrategy(strategy = 'leading') {
    return function throttle(func, delay) {
        let lastCall = 0;
        let timeoutId;
        
        switch (strategy) {
            case 'trailing':
                return function(...args) {
                    const now = Date.now();
                    
                    if (now - lastCall >= delay) {
                        lastCall = now;
                        return func.apply(this, args);
                    }
                    
                    clearTimeout(timeoutId);
                    timeoutId = setTimeout(() => {
                        lastCall = Date.now();
                        func.apply(this, args);
                    }, delay - (now - lastCall));
                };
                
            case 'both':
                return function(...args) {
                    const now = Date.now();
                    const shouldCallNow = now - lastCall >= delay;
                    
                    if (shouldCallNow) {
                        lastCall = now;
                        func.apply(this, args);
                    } else {
                        clearTimeout(timeoutId);
                        timeoutId = setTimeout(() => {
                            lastCall = Date.now();
                            func.apply(this, args);
                        }, delay - (now - lastCall));
                    }
                };
                
            default: // leading
                return function(...args) {
                    const now = Date.now();
                    
                    if (now - lastCall >= delay) {
                        lastCall = now;
                        return func.apply(this, args);
                    }
                };
        }
    };
}

// Method 6: Throttle with rate limiting
function throttleWithRateLimit(func, maxCalls, timeWindow) {
    let calls = [];
    
    return function(...args) {
        const now = Date.now();
        
        // Remove calls outside the time window
        calls = calls.filter(time => now - time < timeWindow);
        
        if (calls.length < maxCalls) {
            calls.push(now);
            return func.apply(this, args);
        }
        
        // If we've exceeded the rate limit, schedule the call
        const oldestCall = calls[0];
        const timeToWait = timeWindow - (now - oldestCall);
        
        setTimeout(() => {
            func.apply(this, args);
        }, timeToWait);
    };
}

// Method 7: Throttle with priority queue
function throttleWithPriority(func, delay) {
    let lastCall = 0;
    let queue = [];
    let processing = false;
    
    async function processQueue() {
        if (processing || queue.length === 0) return;
        
        processing = true;
        
        while (queue.length > 0) {
            const now = Date.now();
            
            if (now - lastCall >= delay) {
                const { args, resolve, reject } = queue.shift();
                lastCall = now;
                
                try {
                    const result = await func.apply(this, args);
                    resolve(result);
                } catch (error) {
                    reject(error);
                }
            } else {
                await new Promise(resolve => setTimeout(resolve, delay - (now - lastCall)));
            }
        }
        
        processing = false;
    }
    
    return function(...args) {
        return new Promise((resolve, reject) => {
            queue.push({ args, resolve, reject });
            processQueue();
        });
    };
}

// Method 8: Throttle with context preservation
function throttleWithContext(func, delay, context = null) {
    let lastCall = 0;
    
    return function(...args) {
        const now = Date.now();
        
        if (now - lastCall >= delay) {
            lastCall = now;
            return func.apply(context || this, args);
        }
    };
}

// Method 9: Throttle with event handling
function throttleEvent(func, delay) {
    let lastCall = 0;
    
    return function(event) {
        event.persist(); // For React synthetic events
        
        const now = Date.now();
        
        if (now - lastCall >= delay) {
            lastCall = now;
            func(event);
        }
    };
}

// Method 10: Throttle with TypeScript-like type checking
function throttleWithTypes(func, delay) {
    if (typeof func !== 'function') {
        throw new TypeError('Expected a function');
    }
    
    if (typeof delay !== 'number' || delay < 0) {
        throw new TypeError('Expected a positive number for delay');
    }
    
    let lastCall = 0;
    
    return function(...args) {
        const now = Date.now();
        
        if (now - lastCall >= delay) {
            lastCall = now;
            return func.apply(this, args);
        }
    };
}

// Method 11: Throttle with memory management
function throttleWithMemory(func, delay, maxMemory = 100) {
    let lastCall = 0;
    let memory = new Map();
    
    return function(...args) {
        const now = Date.now();
        const key = JSON.stringify(args);
        
        // Clean up old entries
        if (memory.size >= maxMemory) {
            const firstKey = memory.keys().next().value;
            memory.delete(firstKey);
        }
        
        if (now - lastCall >= delay) {
            lastCall = now;
            const result = func.apply(this, args);
            memory.set(key, { result, timestamp: now });
            return result;
        }
        
        // Return cached result if available
        const cached = memory.get(key);
        if (cached && now - cached.timestamp < delay) {
            return cached.result;
        }
    };
}

// Method 12: Throttle with different time units
function throttleWithTimeUnit(func, amount, unit = 'ms') {
    const multipliers = {
        ms: 1,
        s: 1000,
        m: 60 * 1000,
        h: 60 * 60 * 1000
    };
    
    const delay = amount * (multipliers[unit] || multipliers.ms);
    return throttle(func, delay);
}

// Real-world examples

// Example 1: Scroll event throttling
const handleScroll = throttle(() => {
    console.log('Scroll position:', window.scrollY);
}, 100);

window.addEventListener('scroll', handleScroll);

// Example 2: Mouse movement throttling
const handleMouseMove = throttle((e) => {
    console.log('Mouse position:', e.clientX, e.clientY);
}, 50);

document.addEventListener('mousemove', handleMouseMove);

// Example 3: API call throttling
const apiCall = throttleAsync(async (userId) => {
    const response = await fetch(`/api/users/${userId}`);
    return response.json();
}, 1000);

// Example 4: Rate-limited API calls
const rateLimitedAPI = throttleWithRateLimit(async (endpoint) => {
    const response = await fetch(endpoint);
    return response.json();
}, 10, 60000); // 10 calls per minute

// Example 5: Different throttle strategies
const leadingThrottle = createThrottleStrategy('leading');
const trailingThrottle = createThrottleStrategy('trailing');
const bothThrottle = createThrottleStrategy('both');

const leadingHandler = leadingThrottle(() => console.log('Leading call'), 1000);
const trailingHandler = trailingThrottle(() => console.log('Trailing call'), 1000);
const bothHandler = bothThrottle(() => console.log('Both call'), 1000);

// Example 6: Priority queue throttling
const priorityThrottle = throttleWithPriority(async (data) => {
    console.log('Processing:', data);
    await new Promise(resolve => setTimeout(resolve, 100));
    return `Processed: ${data}`;
}, 500);

// Example 7: Memory-managed throttling
const memoryThrottle = throttleWithMemory((key, value) => {
    console.log('Storing:', key, value);
    return `Stored: ${key}=${value}`;
}, 1000, 50);

// Example 8: Time unit throttling
const secondThrottle = throttleWithTimeUnit(() => {
    console.log('Called once per second');
}, 1, 's');

const minuteThrottle = throttleWithTimeUnit(() => {
    console.log('Called once per minute');
}, 1, 'm');

// Example 9: Event throttling with context
const contextThrottle = throttleWithContext(function() {
    console.log('Context:', this);
}, 1000, { name: 'Custom Context' });

// Example 10: Form submission throttling
const submitForm = throttle((formData) => {
    console.log('Submitting form:', formData);
}, 2000);

// Export for testing
module.exports = {
    throttle,
    throttleAdvanced,
    throttleWithReturn,
    throttleAsync,
    createThrottleStrategy,
    throttleWithRateLimit,
    throttleWithPriority,
    throttleWithContext,
    throttleEvent,
    throttleWithTypes,
    throttleWithMemory,
    throttleWithTimeUnit
}; 