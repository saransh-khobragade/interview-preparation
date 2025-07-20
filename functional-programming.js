// Functional Programming in JavaScript
// Pure functions, immutability, higher-order functions, and functional patterns

// Method 1: Pure Functions
function add(a, b) {
    return a + b;
}

function multiply(a, b) {
    return a * b;
}

function square(x) {
    return x * x;
}

function isEven(num) {
    return num % 2 === 0;
}

function isOdd(num) {
    return num % 2 !== 0;
}

// Method 2: Higher-Order Functions
function map(array, fn) {
    const result = [];
    for (let i = 0; i < array.length; i++) {
        result.push(fn(array[i], i, array));
    }
    return result;
}

function filter(array, predicate) {
    const result = [];
    for (let i = 0; i < array.length; i++) {
        if (predicate(array[i], i, array)) {
            result.push(array[i]);
        }
    }
    return result;
}

function reduce(array, reducer, initialValue) {
    let accumulator = initialValue;
    let startIndex = 0;
    
    if (initialValue === undefined) {
        accumulator = array[0];
        startIndex = 1;
    }
    
    for (let i = startIndex; i < array.length; i++) {
        accumulator = reducer(accumulator, array[i], i, array);
    }
    
    return accumulator;
}

function forEach(array, fn) {
    for (let i = 0; i < array.length; i++) {
        fn(array[i], i, array);
    }
}

// Method 3: Function Composition
function compose(...fns) {
    return function(x) {
        return fns.reduceRight((acc, fn) => fn(acc), x);
    };
}

function pipe(...fns) {
    return function(x) {
        return fns.reduce((acc, fn) => fn(acc), x);
    };
}

// Method 4: Partial Application
function partial(fn, ...presetArgs) {
    return function(...laterArgs) {
        return fn.apply(this, [...presetArgs, ...laterArgs]);
    };
}

function partialRight(fn, ...presetArgs) {
    return function(...earlierArgs) {
        return fn.apply(this, [...earlierArgs, ...presetArgs]);
    };
}

// Method 5: Currying
function curry(fn, arity = fn.length) {
    return function curried(...args) {
        if (args.length >= arity) {
            return fn.apply(this, args);
        }
        return function(...moreArgs) {
            return curried.apply(this, args.concat(moreArgs));
        };
    };
}

function uncurry(fn) {
    return function(...args) {
        let result = fn;
        for (const arg of args) {
            result = result(arg);
        }
        return result;
    };
}

// Method 6: Immutable Data Operations
function immutablePush(array, item) {
    return [...array, item];
}

function immutablePop(array) {
    return array.slice(0, -1);
}

function immutableShift(array) {
    return array.slice(1);
}

function immutableUnshift(array, item) {
    return [item, ...array];
}

function immutableSplice(array, start, deleteCount, ...items) {
    return [
        ...array.slice(0, start),
        ...items,
        ...array.slice(start + deleteCount)
    ];
}

function immutableSort(array, compareFn) {
    return [...array].sort(compareFn);
}

function immutableReverse(array) {
    return [...array].reverse();
}

// Method 7: Object Immutability
function immutableSet(obj, path, value) {
    const keys = Array.isArray(path) ? path : path.split('.');
    const newObj = { ...obj };
    let current = newObj;
    
    for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];
        current[key] = { ...current[key] };
        current = current[key];
    }
    
    current[keys[keys.length - 1]] = value;
    return newObj;
}

function immutableDelete(obj, path) {
    const keys = Array.isArray(path) ? path : path.split('.');
    const newObj = { ...obj };
    let current = newObj;
    
    for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];
        current[key] = { ...current[key] };
        current = current[key];
    }
    
    delete current[keys[keys.length - 1]];
    return newObj;
}

function immutableMerge(obj1, obj2) {
    return { ...obj1, ...obj2 };
}

function immutableUpdate(obj, updater) {
    return { ...obj, ...updater(obj) };
}

// Method 8: Functors and Monads
class Maybe {
    constructor(value) {
        this.value = value;
    }
    
    static of(value) {
        return new Maybe(value);
    }
    
    map(fn) {
        return this.value === null || this.value === undefined
            ? Maybe.of(null)
            : Maybe.of(fn(this.value));
    }
    
    flatMap(fn) {
        return this.value === null || this.value === undefined
            ? Maybe.of(null)
            : fn(this.value);
    }
    
    getOrElse(defaultValue) {
        return this.value === null || this.value === undefined
            ? defaultValue
            : this.value;
    }
}

class Either {
    constructor(left, right) {
        this.left = left;
        this.right = right;
    }
    
    static left(value) {
        return new Either(value, null);
    }
    
    static right(value) {
        return new Either(null, value);
    }
    
    map(fn) {
        return this.right !== null
            ? Either.right(fn(this.right))
            : Either.left(this.left);
    }
    
    flatMap(fn) {
        return this.right !== null
            ? fn(this.right)
            : Either.left(this.left);
    }
    
    fold(leftFn, rightFn) {
        return this.right !== null
            ? rightFn(this.right)
            : leftFn(this.left);
    }
}

// Method 9: Lens (Functional Optics)
function lens(getter, setter) {
    return {
        get: getter,
        set: setter,
        view: (obj) => getter(obj),
        set: (obj, value) => setter(obj, value),
        over: (obj, fn) => setter(obj, fn(getter(obj)))
    };
}

function prop(key) {
    return lens(
        obj => obj[key],
        (obj, value) => ({ ...obj, [key]: value })
    );
}

function composeLens(lens1, lens2) {
    return lens(
        obj => lens2.get(lens1.get(obj)),
        (obj, value) => lens1.set(obj, lens2.set(lens1.get(obj), value))
    );
}

// Method 10: Transducers
function transducer(mapFn) {
    return function(reducer) {
        return function(accumulator, item) {
            return reducer(accumulator, mapFn(item));
        };
    };
}

function filterTransducer(predicate) {
    return function(reducer) {
        return function(accumulator, item) {
            return predicate(item)
                ? reducer(accumulator, item)
                : accumulator;
        };
    };
}

function composeTransducers(...transducers) {
    return function(reducer) {
        return transducers.reduceRight((acc, transducer) => transducer(acc), reducer);
    };
}

// Method 11: Point-Free Programming
const addOne = x => x + 1;
const double = x => x * 2;
const square = x => x * x;

const addOneThenDouble = compose(double, addOne);
const addOneThenDoubleThenSquare = compose(square, double, addOne);

const isEven = x => x % 2 === 0;
const isPositive = x => x > 0;
const isPositiveEven = x => isEven(x) && isPositive(x);

// Method 12: Recursion and Tail Recursion
function factorial(n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

function factorialTail(n, acc = 1) {
    if (n <= 1) return acc;
    return factorialTail(n - 1, n * acc);
}

function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

function fibonacciTail(n, a = 0, b = 1) {
    if (n === 0) return a;
    if (n === 1) return b;
    return fibonacciTail(n - 1, b, a + b);
}

// Method 13: Memoization
function memoize(fn) {
    const cache = new Map();
    
    return function(...args) {
        const key = JSON.stringify(args);
        
        if (cache.has(key)) {
            return cache.get(key);
        }
        
        const result = fn.apply(this, args);
        cache.set(key, result);
        return result;
    };
}

const memoizedFactorial = memoize(factorial);
const memoizedFibonacci = memoize(fibonacci);

// Method 14: Trampolining (for stack overflow prevention)
function trampoline(fn) {
    return function(...args) {
        let result = fn.apply(this, args);
        
        while (typeof result === 'function') {
            result = result();
        }
        
        return result;
    };
}

function factorialTrampoline(n, acc = 1) {
    if (n <= 1) return acc;
    return () => factorialTrampoline(n - 1, n * acc);
}

const safeFactorial = trampoline(factorialTrampoline);

// Method 15: Algebraic Data Types
class Result {
    static success(value) {
        return new Success(value);
    }
    
    static failure(error) {
        return new Failure(error);
    }
    
    static try(fn) {
        try {
            return Result.success(fn());
        } catch (error) {
            return Result.failure(error);
        }
    }
}

class Success extends Result {
    constructor(value) {
        super();
        this.value = value;
    }
    
    map(fn) {
        return Result.success(fn(this.value));
    }
    
    flatMap(fn) {
        return fn(this.value);
    }
    
    fold(successFn, failureFn) {
        return successFn(this.value);
    }
}

class Failure extends Result {
    constructor(error) {
        super();
        this.error = error;
    }
    
    map(fn) {
        return Result.failure(this.error);
    }
    
    flatMap(fn) {
        return Result.failure(this.error);
    }
    
    fold(successFn, failureFn) {
        return failureFn(this.error);
    }
}

// Real-world examples

// Example 1: Pure functions
console.log('Pure functions:');
console.log(add(2, 3)); // 5
console.log(multiply(4, 5)); // 20
console.log(square(6)); // 36
console.log(isEven(4)); // true
console.log(isOdd(7)); // true

// Example 2: Higher-order functions
const numbers = [1, 2, 3, 4, 5];
console.log('Higher-order functions:');
console.log(map(numbers, x => x * 2)); // [2, 4, 6, 8, 10]
console.log(filter(numbers, x => x > 2)); // [3, 4, 5]
console.log(reduce(numbers, (acc, x) => acc + x, 0)); // 15

// Example 3: Function composition
const addOneThenDoubleThenSquare = compose(square, double, addOne);
console.log('Function composition:', addOneThenDoubleThenSquare(3)); // 64

// Example 4: Partial application
const addTen = partial(add, 10);
console.log('Partial application:', addTen(5)); // 15

// Example 5: Currying
const curriedAdd = curry(add);
console.log('Currying:', curriedAdd(2)(3)); // 5

// Example 6: Immutable array operations
const originalArray = [1, 2, 3];
console.log('Immutable operations:');
console.log(immutablePush(originalArray, 4)); // [1, 2, 3, 4]
console.log(immutablePop(originalArray)); // [1, 2]
console.log(originalArray); // [1, 2, 3] (unchanged)

// Example 7: Object immutability
const originalObj = { name: 'John', age: 30 };
console.log('Object immutability:');
console.log(immutableSet(originalObj, 'age', 31)); // { name: 'John', age: 31 }
console.log(immutableMerge(originalObj, { city: 'NYC' })); // { name: 'John', age: 30, city: 'NYC' }

// Example 8: Maybe monad
console.log('Maybe monad:');
const maybeValue = Maybe.of(5);
console.log(maybeValue.map(x => x * 2).getOrElse(0)); // 10

const maybeNull = Maybe.of(null);
console.log(maybeNull.map(x => x * 2).getOrElse(0)); // 0

// Example 9: Either monad
console.log('Either monad:');
const success = Either.right(5);
const failure = Either.left('Error');

console.log(success.map(x => x * 2).fold(
    error => `Error: ${error}`,
    value => `Success: ${value}`
)); // Success: 10

console.log(failure.map(x => x * 2).fold(
    error => `Error: ${error}`,
    value => `Success: ${value}`
)); // Error: Error

// Example 10: Lens
console.log('Lens:');
const user = { name: 'John', address: { city: 'NYC' } };
const nameLens = prop('name');
const addressLens = prop('address');
const cityLens = prop('city');
const addressCityLens = composeLens(addressLens, cityLens);

console.log(nameLens.view(user)); // John
console.log(addressCityLens.view(user)); // NYC

// Example 11: Transducers
console.log('Transducers:');
const numbers2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const transducer = composeTransducers(
    filterTransducer(x => x % 2 === 0),
    transducer(x => x * 2)
);

const result = numbers2.reduce(transducer((acc, x) => [...acc, x]), []);
console.log(result); // [4, 8, 12, 16, 20]

// Example 12: Point-free programming
console.log('Point-free:');
console.log(addOneThenDoubleThenSquare(3)); // 64
console.log(isPositiveEven(4)); // true
console.log(isPositiveEven(-2)); // false

// Example 13: Recursion
console.log('Recursion:');
console.log(factorial(5)); // 120
console.log(factorialTail(5)); // 120
console.log(fibonacci(10)); // 55
console.log(fibonacciTail(10)); // 55

// Example 14: Memoization
console.log('Memoization:');
console.log(memoizedFactorial(5)); // 120
console.log(memoizedFactorial(5)); // 120 (cached)
console.log(memoizedFibonacci(10)); // 55
console.log(memoizedFibonacci(10)); // 55 (cached)

// Example 15: Result type
console.log('Result type:');
const divide = (a, b) => {
    if (b === 0) throw new Error('Division by zero');
    return a / b;
};

const safeDivide = (a, b) => Result.try(() => divide(a, b));

console.log(safeDivide(10, 2).fold(
    error => `Error: ${error.message}`,
    value => `Result: ${value}`
)); // Result: 5

console.log(safeDivide(10, 0).fold(
    error => `Error: ${error.message}`,
    value => `Result: ${value}`
)); // Error: Division by zero

// Export for testing
module.exports = {
    add,
    multiply,
    square,
    isEven,
    isOdd,
    map,
    filter,
    reduce,
    forEach,
    compose,
    pipe,
    partial,
    partialRight,
    curry,
    uncurry,
    immutablePush,
    immutablePop,
    immutableShift,
    immutableUnshift,
    immutableSplice,
    immutableSort,
    immutableReverse,
    immutableSet,
    immutableDelete,
    immutableMerge,
    immutableUpdate,
    Maybe,
    Either,
    lens,
    prop,
    composeLens,
    transducer,
    filterTransducer,
    composeTransducers,
    factorial,
    factorialTail,
    fibonacci,
    fibonacciTail,
    memoize,
    trampoline,
    factorialTrampoline,
    Result,
    Success,
    Failure
}; 