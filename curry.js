// Function Currying - A technique of evaluating a function with multiple arguments
// into a sequence of functions with a single argument

// Method 1: Using bind()
function multiply(a, b) {
    return a * b;
}

const multiplyByTwo = multiply.bind(null, 2);
console.log(multiplyByTwo(4)); // 8

// Method 2: Using closure
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

const curriedMultiply = curry(multiply);
console.log(curriedMultiply(2)(3)); // 6
console.log(curriedMultiply(2, 3)); // 6

// Method 3: Advanced curry with placeholder support
function advancedCurry(fn, arity = fn.length) {
    return function curried(...args) {
        const completeArgs = args.slice(0, arity);
        
        if (completeArgs.length === arity && !completeArgs.includes('_')) {
            return fn.apply(this, completeArgs);
        }
        
        return function(...moreArgs) {
            const newArgs = [...args];
            let moreIndex = 0;
            
            for (let i = 0; i < newArgs.length && moreIndex < moreArgs.length; i++) {
                if (newArgs[i] === '_') {
                    newArgs[i] = moreArgs[moreIndex++];
                }
            }
            
            while (moreIndex < moreArgs.length) {
                newArgs.push(moreArgs[moreIndex++]);
            }
            
            return curried.apply(this, newArgs);
        };
    };
}

const advancedCurriedFn = advancedCurry((a, b, c) => a + b + c);
console.log(advancedCurriedFn(1, 2, 3)); // 6
console.log(advancedCurriedFn(1, '_', 3)(2)); // 6
console.log(advancedCurriedFn('_', 2, '_')(1, 3)); // 6

// Real-world example: API call currying
function makeAPIRequest(baseURL, endpoint, params) {
    return `${baseURL}/${endpoint}?${new URLSearchParams(params)}`;
}

const apiRequest = curry(makeAPIRequest);
const githubAPI = apiRequest('https://api.github.com');
const getUser = githubAPI('users');
const getUserWithParams = getUser({ per_page: 10 });

console.log(getUserWithParams); // https://api.github.com/users?per_page=10

// Method 4: Partial application vs Currying
// Partial application: Fix some arguments, return function with remaining args
function partial(fn, ...presetArgs) {
    return function(...laterArgs) {
        return fn.apply(this, [...presetArgs, ...laterArgs]);
    };
}

const add = (a, b, c) => a + b + c;
const addToTen = partial(add, 10);
console.log(addToTen(5, 3)); // 18

// Method 5: Auto-currying with ES6
const autoCurry = (fn, arity = fn.length) => {
    const curried = (...args) => {
        if (args.length >= arity) {
            return fn(...args);
        }
        return (...moreArgs) => curried(...args, ...moreArgs);
    };
    return curried;
};

const sum = autoCurry((a, b, c, d) => a + b + c + d);
console.log(sum(1)(2)(3)(4)); // 10
console.log(sum(1, 2)(3, 4)); // 10

// Method 6: Infinite currying
function infiniteCurry(fn) {
    return function curried(...args) {
        if (args.length === 0) {
            return fn();
        }
        return function(...moreArgs) {
            if (moreArgs.length === 0) {
                return args.reduce((acc, val) => fn(acc, val));
            }
            return curried(...args, ...moreArgs);
        };
    };
}

const addInfinite = infiniteCurry((a, b) => a + b);
console.log(addInfinite(1)(2)(3)(4)()); // 10

// Method 7: Currying with context preservation
function curryWithContext(fn, context = null) {
    return function curried(...args) {
        if (args.length >= fn.length) {
            return fn.apply(context, args);
        }
        return function(...moreArgs) {
            return curried.apply(context, args.concat(moreArgs));
        };
    };
}

// Method 8: Memoized currying
function memoizedCurry(fn) {
    const cache = new Map();
    
    return function curried(...args) {
        const key = JSON.stringify(args);
        
        if (cache.has(key)) {
            return cache.get(key);
        }
        
        if (args.length >= fn.length) {
            const result = fn.apply(this, args);
            cache.set(key, result);
            return result;
        }
        
        const partialFn = function(...moreArgs) {
            return curried.apply(this, args.concat(moreArgs));
        };
        
        cache.set(key, partialFn);
        return partialFn;
    };
}

// Method 9: Currying with validation
function curryWithValidation(fn, validator) {
    return function curried(...args) {
        // Validate arguments
        if (args.length > 0 && !validator(args)) {
            throw new Error('Invalid arguments provided');
        }
        
        if (args.length >= fn.length) {
            return fn.apply(this, args);
        }
        
        return function(...moreArgs) {
            return curried.apply(this, args.concat(moreArgs));
        };
    };
}

const validateNumbers = (args) => args.every(arg => typeof arg === 'number');
const safeAdd = curryWithValidation((a, b) => a + b, validateNumbers);

try {
    console.log(safeAdd(1)(2)); // 3
    console.log(safeAdd(1)('invalid')); // Error
} catch (error) {
    console.log('Validation error:', error.message);
}

// Method 10: Async currying
function asyncCurry(fn) {
    return function curried(...args) {
        if (args.length >= fn.length) {
            return Promise.resolve(fn.apply(this, args));
        }
        
        return function(...moreArgs) {
            return curried.apply(this, args.concat(moreArgs));
        };
    };
}

const asyncMultiply = asyncCurry(async (a, b) => {
    await new Promise(resolve => setTimeout(resolve, 100));
    return a * b;
});

asyncMultiply(2)(3).then(result => console.log('Async result:', result)); // 6

// Export for testing
module.exports = {
    curry,
    advancedCurry,
    autoCurry,
    infiniteCurry,
    curryWithContext,
    memoizedCurry,
    curryWithValidation,
    asyncCurry
}; 