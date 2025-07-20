// Debouncing - A technique to limit the rate at which a function can fire
// Useful for search inputs, window resize, scroll events, etc.

// Method 1: Basic debounce
function debounce(func, delay) {
    let timeoutId;
    
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

// Method 2: Debounce with immediate option
function debounceWithImmediate(func, delay, immediate = false) {
    let timeoutId;
    
    return function(...args) {
        const callNow = immediate && !timeoutId;
        
        clearTimeout(timeoutId);
        
        timeoutId = setTimeout(() => {
            timeoutId = null;
            if (!immediate) {
                func.apply(this, args);
            }
        }, delay);
        
        if (callNow) {
            func.apply(this, args);
        }
    };
}

// Method 3: Debounce with leading and trailing options
function debounceAdvanced(func, delay, options = {}) {
    let timeoutId;
    let lastCallTime = 0;
    let lastInvokeTime = 0;
    
    const { leading = false, trailing = true, maxWait } = options;
    
    function invokeFunc(time) {
        const args = lastArgs;
        const thisArg = lastThis;
        
        lastArgs = lastThis = undefined;
        lastInvokeTime = time;
        result = func.apply(thisArg, args);
        return result;
    }
    
    function startTimer(pendingFunc, wait) {
        return setTimeout(pendingFunc, wait);
    }
    
    function cancelTimer(id) {
        clearTimeout(id);
    }
    
    function leadingEdge(time) {
        lastInvokeTime = time;
        timeoutId = startTimer(timerExpired, delay);
        return leading ? invokeFunc(time) : result;
    }
    
    function remainingWait(time) {
        const timeSinceLastCall = time - lastCallTime;
        const timeSinceLastInvoke = time - lastInvokeTime;
        const timeWaiting = delay - timeSinceLastCall;
        
        return maxWait !== undefined
            ? Math.min(timeWaiting, maxWait - timeSinceLastInvoke)
            : timeWaiting;
    }
    
    function shouldInvoke(time) {
        const timeSinceLastCall = time - lastCallTime;
        const timeSinceLastInvoke = time - lastInvokeTime;
        
        return (lastCallTime === 0) || (timeSinceLastCall >= delay) ||
               (timeSinceLastCall < 0) || (maxWait !== undefined && timeSinceLastInvoke >= maxWait);
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
        return result;
    }
    
    function cancel() {
        if (timeoutId !== undefined) {
            cancelTimer(timeoutId);
        }
        lastInvokeTime = 0;
        lastArgs = lastCallTime = lastThis = timeoutId = undefined;
    }
    
    function flush() {
        return timeoutId === undefined ? result : trailingEdge(Date.now());
    }
    
    function pending() {
        return timeoutId !== undefined;
    }
    
    function debounced(...args) {
        const time = Date.now();
        const isInvoking = shouldInvoke(time);
        
        lastArgs = args;
        lastThis = this;
        lastCallTime = time;
        
        if (isInvoking) {
            if (timeoutId === undefined) {
                return leadingEdge(lastCallTime);
            }
            if (maxWait !== undefined) {
                timeoutId = startTimer(timerExpired, delay);
                return invokeFunc(lastCallTime);
            }
        }
        if (timeoutId === undefined) {
            timeoutId = startTimer(timerExpired, delay);
        }
        return result;
    }
    
    debounced.cancel = cancel;
    debounced.flush = flush;
    debounced.pending = pending;
    
    return debounced;
}

// Method 4: Debounce with return value handling
function debounceWithReturn(func, delay) {
    let timeoutId;
    let lastResult;
    
    return function(...args) {
        return new Promise((resolve) => {
            clearTimeout(timeoutId);
            
            timeoutId = setTimeout(() => {
                lastResult = func.apply(this, args);
                resolve(lastResult);
            }, delay);
        });
    };
}

// Method 5: Debounce with multiple function support
function createDebouncer(delay) {
    const timeouts = new Map();
    
    return function debounce(func, key = func.toString()) {
        return function(...args) {
            if (timeouts.has(key)) {
                clearTimeout(timeouts.get(key));
            }
            
            const timeoutId = setTimeout(() => {
                func.apply(this, args);
                timeouts.delete(key);
            }, delay);
            
            timeouts.set(key, timeoutId);
        };
    };
}

// Method 6: Debounce with event handling
function debounceEvent(func, delay) {
    let timeoutId;
    
    return function(event) {
        event.persist(); // For React synthetic events
        
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func(event);
        }, delay);
    };
}

// Method 7: Debounce with context preservation
function debounceWithContext(func, delay, context = null) {
    let timeoutId;
    
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(context || this, args);
        }, delay);
    };
}

// Method 8: Debounce with queue management
function debounceWithQueue(func, delay, maxQueueSize = 10) {
    let timeoutId;
    let queue = [];
    
    return function(...args) {
        if (queue.length >= maxQueueSize) {
            queue.shift(); // Remove oldest item
        }
        
        queue.push(args);
        
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            const currentQueue = [...queue];
            queue = [];
            func.apply(this, currentQueue);
        }, delay);
    };
}

// Method 9: Debounce with different strategies
function createDebounceStrategy(strategy = 'trailing') {
    return function debounce(func, delay) {
        let timeoutId;
        let lastCallTime = 0;
        
        switch (strategy) {
            case 'leading':
                return function(...args) {
                    const now = Date.now();
                    if (now - lastCallTime >= delay) {
                        func.apply(this, args);
                        lastCallTime = now;
                    }
                };
                
            case 'both':
                return function(...args) {
                    const now = Date.now();
                    const shouldCallNow = now - lastCallTime >= delay;
                    
                    clearTimeout(timeoutId);
                    
                    if (shouldCallNow) {
                        func.apply(this, args);
                        lastCallTime = now;
                    } else {
                        timeoutId = setTimeout(() => {
                            func.apply(this, args);
                            lastCallTime = Date.now();
                        }, delay - (now - lastCallTime));
                    }
                };
                
            default: // trailing
                return function(...args) {
                    clearTimeout(timeoutId);
                    timeoutId = setTimeout(() => {
                        func.apply(this, args);
                    }, delay);
                };
        }
    };
}

// Method 10: Debounce with TypeScript-like type checking
function debounceWithTypes(func, delay) {
    if (typeof func !== 'function') {
        throw new TypeError('Expected a function');
    }
    
    if (typeof delay !== 'number' || delay < 0) {
        throw new TypeError('Expected a positive number for delay');
    }
    
    let timeoutId;
    
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

// Real-world examples

// Example 1: Search input debouncing
const searchInput = document.createElement('input');
searchInput.type = 'text';
searchInput.placeholder = 'Search...';

const performSearch = debounce((query) => {
    console.log('Searching for:', query);
    // API call would go here
}, 300);

searchInput.addEventListener('input', (e) => {
    performSearch(e.target.value);
});

// Example 2: Window resize debouncing
const handleResize = debounce(() => {
    console.log('Window resized to:', window.innerWidth, 'x', window.innerHeight);
}, 250);

window.addEventListener('resize', handleResize);

// Example 3: Scroll event debouncing
const handleScroll = debounce(() => {
    console.log('Scrolled to:', window.scrollY);
}, 100);

window.addEventListener('scroll', handleScroll);

// Example 4: API call debouncing
const apiCall = debounceWithReturn(async (userId) => {
    const response = await fetch(`/api/users/${userId}`);
    return response.json();
}, 500);

// Example 5: Form submission debouncing
const submitForm = debounceWithImmediate((formData) => {
    console.log('Submitting form:', formData);
}, 1000, true);

// Example 6: Multiple function debouncing
const debouncer = createDebouncer(300);
const debouncedFunc1 = debouncer(() => console.log('Function 1'));
const debouncedFunc2 = debouncer(() => console.log('Function 2'));

// Example 7: Different debounce strategies
const leadingDebounce = createDebounceStrategy('leading');
const bothDebounce = createDebounceStrategy('both');

const leadingHandler = leadingDebounce(() => console.log('Leading call'), 1000);
const bothHandler = bothDebounce(() => console.log('Both call'), 1000);

// Export for testing
module.exports = {
    debounce,
    debounceWithImmediate,
    debounceAdvanced,
    debounceWithReturn,
    createDebouncer,
    debounceEvent,
    debounceWithContext,
    debounceWithQueue,
    createDebounceStrategy,
    debounceWithTypes
}; 