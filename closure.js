// Closures - A function that has access to variables in its outer scope
// even after the outer function has returned

// Method 1: Basic closure
function outerFunction(x) {
    return function innerFunction(y) {
        return x + y; // x is captured from outer scope
    };
}

const addFive = outerFunction(5);
console.log(addFive(3)); // 8

// Method 2: Closure with multiple variables
function createCounter() {
    let count = 0;
    
    return {
        increment: function() {
            count++;
            return count;
        },
        decrement: function() {
            count--;
            return count;
        },
        getCount: function() {
            return count;
        },
        reset: function() {
            count = 0;
            return count;
        }
    };
}

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.decrement()); // 1
console.log(counter.getCount()); // 1
console.log(counter.reset()); // 0

// Method 3: Closure with private variables
function createBankAccount(initialBalance) {
    let balance = initialBalance;
    
    return {
        deposit: function(amount) {
            if (amount > 0) {
                balance += amount;
                return `Deposited ${amount}. New balance: ${balance}`;
            }
            return 'Invalid amount';
        },
        withdraw: function(amount) {
            if (amount > 0 && amount <= balance) {
                balance -= amount;
                return `Withdrawn ${amount}. New balance: ${balance}`;
            }
            return 'Insufficient funds or invalid amount';
        },
        getBalance: function() {
            return balance;
        }
    };
}

const account = createBankAccount(100);
console.log(account.deposit(50)); // Deposited 50. New balance: 150
console.log(account.withdraw(30)); // Withdrawn 30. New balance: 120
console.log(account.getBalance()); // 120

// Method 4: Closure with function factory
function multiply(x) {
    return function(y) {
        return x * y;
    };
}

const multiplyByTwo = multiply(2);
const multiplyByTen = multiply(10);

console.log(multiplyByTwo(5)); // 10
console.log(multiplyByTen(5)); // 50

// Method 5: Closure with event handlers
function createButtonHandler(buttonId) {
    let clickCount = 0;
    
    return function() {
        clickCount++;
        console.log(`Button ${buttonId} clicked ${clickCount} times`);
    };
}

const button1Handler = createButtonHandler('btn1');
const button2Handler = createButtonHandler('btn2');

// Simulate button clicks
button1Handler(); // Button btn1 clicked 1 times
button1Handler(); // Button btn1 clicked 2 times
button2Handler(); // Button btn2 clicked 1 times

// Method 6: Closure with memoization
function memoize(fn) {
    const cache = {};
    
    return function(...args) {
        const key = JSON.stringify(args);
        
        if (cache[key] !== undefined) {
            console.log('Returning cached result');
            return cache[key];
        }
        
        console.log('Computing new result');
        const result = fn.apply(this, args);
        cache[key] = result;
        return result;
    };
}

const expensiveFunction = memoize(function(n) {
    console.log('Performing expensive calculation...');
    return n * n;
});

console.log(expensiveFunction(5)); // Computing new result, Performing expensive calculation..., 25
console.log(expensiveFunction(5)); // Returning cached result, 25

// Method 7: Closure with partial application
function partial(fn, ...presetArgs) {
    return function(...laterArgs) {
        return fn.apply(this, [...presetArgs, ...laterArgs]);
    };
}

function greet(greeting, name) {
    return `${greeting}, ${name}!`;
}

const sayHello = partial(greet, 'Hello');
const sayGoodbye = partial(greet, 'Goodbye');

console.log(sayHello('John')); // Hello, John!
console.log(sayGoodbye('Jane')); // Goodbye, Jane!

// Method 8: Closure with currying
function curry(fn) {
    return function curried(...args) {
        if (args.length >= fn.length) {
            return fn.apply(this, args);
        }
        return function(...moreArgs) {
            return curried.apply(this, args.concat(moreArgs));
        };
    };
}

const add = curry((a, b, c) => a + b + c);
console.log(add(1)(2)(3)); // 6
console.log(add(1, 2)(3)); // 6

// Method 9: Closure with module pattern
const calculator = (function() {
    let result = 0;
    
    function add(x) {
        result += x;
        return this;
    }
    
    function subtract(x) {
        result -= x;
        return this;
    }
    
    function multiply(x) {
        result *= x;
        return this;
    }
    
    function divide(x) {
        if (x !== 0) {
            result /= x;
        }
        return this;
    }
    
    function getResult() {
        return result;
    }
    
    function reset() {
        result = 0;
        return this;
    }
    
    return {
        add,
        subtract,
        multiply,
        divide,
        getResult,
        reset
    };
})();

console.log(calculator.add(5).multiply(2).subtract(3).getResult()); // 7

// Method 10: Closure with async operations
function createAsyncCounter() {
    let count = 0;
    let isProcessing = false;
    
    return {
        async increment() {
            if (isProcessing) {
                throw new Error('Already processing');
            }
            
            isProcessing = true;
            
            try {
                await new Promise(resolve => setTimeout(resolve, 100));
                count++;
                return count;
            } finally {
                isProcessing = false;
            }
        },
        
        getCount() {
            return count;
        }
    };
}

// Method 11: Closure with generator functions
function createIdGenerator() {
    let id = 0;
    
    return function* generateId() {
        while (true) {
            yield ++id;
        }
    };
}

const idGenerator = createIdGenerator();
const generator = idGenerator();

console.log(generator.next().value); // 1
console.log(generator.next().value); // 2
console.log(generator.next().value); // 3

// Method 12: Closure with error handling
function createSafeFunction(fn) {
    let errorCount = 0;
    const maxErrors = 3;
    
    return function(...args) {
        try {
            const result = fn.apply(this, args);
            errorCount = 0; // Reset error count on success
            return result;
        } catch (error) {
            errorCount++;
            console.log(`Error count: ${errorCount}`);
            
            if (errorCount >= maxErrors) {
                throw new Error('Too many errors, function disabled');
            }
            
            throw error;
        }
    };
}

const safeDivide = createSafeFunction((a, b) => a / b);

try {
    console.log(safeDivide(10, 2)); // 5
    console.log(safeDivide(10, 0)); // Error
    console.log(safeDivide(10, 0)); // Error
    console.log(safeDivide(10, 0)); // Too many errors, function disabled
} catch (error) {
    console.log('Caught error:', error.message);
}

// Method 13: Closure with state management
function createStateManager(initialState = {}) {
    let state = { ...initialState };
    let listeners = [];
    
    function subscribe(listener) {
        listeners.push(listener);
        return function unsubscribe() {
            const index = listeners.indexOf(listener);
            if (index > -1) {
                listeners.splice(index, 1);
            }
        };
    }
    
    function notify() {
        listeners.forEach(listener => listener(state));
    }
    
    return {
        getState() {
            return { ...state };
        },
        
        setState(newState) {
            state = { ...state, ...newState };
            notify();
        },
        
        subscribe
    };
}

const store = createStateManager({ count: 0, name: 'John' });

const unsubscribe = store.subscribe((state) => {
    console.log('State changed:', state);
});

store.setState({ count: 1 }); // State changed: { count: 1, name: 'John' }
store.setState({ name: 'Jane' }); // State changed: { count: 1, name: 'Jane' }

// Method 14: Closure with caching and TTL
function createCache(ttl = 60000) {
    const cache = new Map();
    
    return {
        set(key, value) {
            cache.set(key, {
                value,
                timestamp: Date.now()
            });
        },
        
        get(key) {
            const item = cache.get(key);
            if (!item) return null;
            
            if (Date.now() - item.timestamp > ttl) {
                cache.delete(key);
                return null;
            }
            
            return item.value;
        },
        
        clear() {
            cache.clear();
        },
        
        size() {
            return cache.size;
        }
    };
}

const cache = createCache(5000); // 5 seconds TTL
cache.set('key1', 'value1');
console.log(cache.get('key1')); // value1

// Method 15: Closure with debouncing
function createDebouncer(delay) {
    let timeoutId;
    
    return function(fn) {
        return function(...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                fn.apply(this, args);
            }, delay);
        };
    };
}

const debouncer = createDebouncer(300);
const debouncedSearch = debouncer((query) => {
    console.log('Searching for:', query);
});

// Simulate rapid search input
debouncedSearch('a');
debouncedSearch('ab');
debouncedSearch('abc'); // Only this will execute after 300ms

// Export for testing
module.exports = {
    outerFunction,
    createCounter,
    createBankAccount,
    multiply,
    createButtonHandler,
    memoize,
    partial,
    curry,
    calculator,
    createAsyncCounter,
    createIdGenerator,
    createSafeFunction,
    createStateManager,
    createCache,
    createDebouncer
}; 