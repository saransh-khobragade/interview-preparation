# JavaScript Interview Questions Collection

A comprehensive collection of JavaScript interview questions, patterns, and implementations covering the most trending topics in modern JavaScript development.

## 📁 Files Overview

### Core JavaScript Concepts

| File | Description | Key Topics |
|------|-------------|------------|
| `curry.js` | Function currying implementations | Currying, partial application, bind, closures |
| `debounce.js` | Debouncing techniques | Event handling, performance optimization |
| `throttle.js` | Throttling implementations | Rate limiting, scroll events, API calls |
| `promise.js` | Promise patterns and implementations | Async programming, Promise.all, error handling |
| `closure.js` | Closure examples and patterns | Lexical scope, private variables, module pattern |
| `event-emitter.js` | Event emitter implementations | Observer pattern, event handling |
| `prototype.js` | Prototype inheritance patterns | OOP, inheritance, ES6 classes |

### Advanced Patterns

| File | Description | Key Topics |
|------|-------------|------------|
| `async-await.js` | Async/await patterns | Modern async programming, error handling |
| `design-patterns.js` | Common design patterns | Singleton, Factory, Observer, Strategy |
| `data-structures.js` | Data structure implementations | Linked lists, trees, graphs, heaps |
| `algorithms.js` | Algorithm implementations | Sorting, searching, dynamic programming |
| `functional-programming.js` | Functional programming concepts | Pure functions, immutability, monads |
| `testing-patterns.js` | Testing utilities and patterns | Mocking, test runners, assertions |

## 🚀 Quick Start

### Running the Examples

```bash
# Run individual files
node curry.js
node debounce.js
node promise.js

# Or run all files to see examples
for file in *.js; do
    echo "=== Running $file ==="
    node "$file"
    echo ""
done
```

### Using in Your Projects

```javascript
// Import specific implementations
const { curry, debounce, throttle } = require('./curry.js');

// Use in your code
const add = curry((a, b) => a + b);
const addFive = add(5);
console.log(addFive(3)); // 8
```

## 📚 Detailed Topics

### 1. Function Currying (`curry.js`)

**What is Currying?**
Currying is a technique of evaluating a function with multiple arguments into a sequence of functions with a single argument.

**Key Implementations:**
- Basic currying with closures
- Advanced currying with placeholder support
- Auto-currying with ES6
- Infinite currying
- Currying with validation

**Example:**
```javascript
const add = curry((a, b, c) => a + b + c);
console.log(add(1)(2)(3)); // 6
console.log(add(1, 2)(3)); // 6
```

### 2. Debouncing (`debounce.js`)

**What is Debouncing?**
Debouncing limits the rate at which a function can fire, useful for search inputs, window resize, scroll events.

**Key Implementations:**
- Basic debounce with timeout
- Debounce with immediate option
- Advanced debounce with leading/trailing
- Debounce with return value handling
- Debounce with multiple function support

**Example:**
```javascript
const debouncedSearch = debounce((query) => {
    console.log('Searching for:', query);
}, 300);

// Only executes after 300ms of no input
debouncedSearch('a');
debouncedSearch('ab');
debouncedSearch('abc');
```

### 3. Throttling (`throttle.js`)

**What is Throttling?**
Throttling limits the execution of a function to a specific time interval.

**Key Implementations:**
- Basic throttle
- Throttle with leading/trailing options
- Throttle with rate limiting
- Throttle with priority queue
- Throttle with memory management

**Example:**
```javascript
const throttledScroll = throttle(() => {
    console.log('Scroll event handled');
}, 100);

// Executes at most once every 100ms
window.addEventListener('scroll', throttledScroll);
```

### 4. Promise Patterns (`promise.js`)

**Advanced Promise Implementations:**
- Custom Promise implementation
- Promise with timeout
- Promise retry mechanism
- Promise queue with concurrency control
- Promise memoization

**Example:**
```javascript
const apiCall = promiseWithTimeout(
    fetch('https://api.example.com/data'),
    5000
);

const retryAPI = promiseRetry(
    () => fetch('https://unreliable-api.com'),
    3,
    1000
);
```

### 5. Closures (`closure.js`)

**Closure Patterns:**
- Basic closure examples
- Module pattern
- Factory functions
- Private variables
- Event handlers with closures

**Example:**
```javascript
function createCounter() {
    let count = 0;
    return {
        increment: () => ++count,
        decrement: () => --count,
        getCount: () => count
    };
}

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
```

### 6. Event Emitter (`event-emitter.js`)

**Event System Implementations:**
- Basic EventEmitter
- Advanced EventEmitter with async support
- EventEmitter with memory management
- EventEmitter with error handling
- EventEmitter with middleware

**Example:**
```javascript
const emitter = new EventEmitter();

emitter.on('user:login', (user) => {
    console.log('User logged in:', user);
});

emitter.emit('user:login', { name: 'John', id: 1 });
```

### 7. Prototype Inheritance (`prototype.js`)

**Inheritance Patterns:**
- Basic prototype inheritance
- ES6 class inheritance
- Object.create for inheritance
- Mixins with prototypes
- Prototype chain demonstration

**Example:**
```javascript
function Animal(name) {
    this.name = name;
}

Animal.prototype.speak = function() {
    return `${this.name} makes a sound`;
};

function Dog(name, breed) {
    Animal.call(this, name);
    this.breed = breed;
}

Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;
```

### 8. Async/Await Patterns (`async-await.js`)

**Modern Async Patterns:**
- Basic async/await
- Async with timeout
- Parallel vs sequential operations
- Async retry mechanism
- Async queue with concurrency control

**Example:**
```javascript
async function fetchUserData(userId) {
    try {
        const response = await fetch(`/api/users/${userId}`);
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}
```

### 9. Design Patterns (`design-patterns.js`)

**Common Design Patterns:**
- Singleton Pattern
- Factory Pattern
- Observer Pattern
- Strategy Pattern
- Command Pattern
- Decorator Pattern

**Example:**
```javascript
// Singleton Pattern
class Singleton {
    constructor() {
        if (Singleton.instance) {
            return Singleton.instance;
        }
        Singleton.instance = this;
    }
}

// Factory Pattern
class VehicleFactory {
    static createVehicle(type, options = {}) {
        switch (type) {
            case 'car': return new Car(options);
            case 'motorcycle': return new Motorcycle(options);
        }
    }
}
```

### 10. Data Structures (`data-structures.js`)

**Data Structure Implementations:**
- Linked List
- Stack
- Queue
- Binary Search Tree
- Hash Table
- Graph
- Heap
- Trie

**Example:**
```javascript
const list = new LinkedList();
list.append(1);
list.append(2);
list.append(3);
console.log(list.toArray()); // [1, 2, 3]

const stack = new Stack();
stack.push(1);
stack.push(2);
console.log(stack.pop()); // 2
```

### 11. Algorithms (`algorithms.js`)

**Algorithm Implementations:**
- Sorting algorithms (Bubble, Selection, Insertion, Merge, Quick)
- Search algorithms (Binary, Linear)
- Graph algorithms (DFS, BFS, Dijkstra)
- Dynamic programming examples
- Mathematical algorithms

**Example:**
```javascript
const arr = [64, 34, 25, 12, 22, 11, 90];
console.log(mergeSort(arr)); // [11, 12, 22, 25, 34, 64, 90]

const sortedArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log(binarySearch(sortedArr, 7)); // 6
```

### 12. Functional Programming (`functional-programming.js`)

**Functional Programming Concepts:**
- Pure functions
- Higher-order functions
- Function composition
- Immutability
- Monads (Maybe, Either)
- Transducers

**Example:**
```javascript
const add = (a, b) => a + b;
const multiply = (a, b) => a * b;
const square = x => x * x;

const addOneThenDoubleThenSquare = compose(square, multiply.bind(null, 2), add.bind(null, 1));
console.log(addOneThenDoubleThenSquare(3)); // 64
```

### 13. Testing Patterns (`testing-patterns.js`)

**Testing Utilities:**
- Simple test runner
- Mock functions
- Spy functions
- Test doubles
- Async test utilities
- Test data builders

**Example:**
```javascript
const runner = new TestRunner();

runner.test('should add two numbers', () => {
    runner.expect(2 + 2).toBe(4);
});

runner.test('should handle arrays', () => {
    const arr = [1, 2, 3];
    runner.expect(arr).toHaveLength(3);
});

runner.run();
```

## 🎯 Interview Tips

### Common Interview Questions

1. **"Implement a debounce function"**
   - See `debounce.js` for multiple implementations
   - Focus on the basic version first, then show advanced features

2. **"What is currying and how would you implement it?"**
   - See `curry.js` for comprehensive examples
   - Explain the concept and show practical use cases

3. **"Implement a Promise from scratch"**
   - See `promise.js` for custom Promise implementation
   - Understand the Promise states and resolution process

4. **"Explain closures with examples"**
   - See `closure.js` for various closure patterns
   - Show practical examples like counters and private variables

5. **"Implement an EventEmitter"**
   - See `event-emitter.js` for complete implementation
   - Understand the observer pattern

### Best Practices

1. **Start Simple**: Begin with basic implementations, then add complexity
2. **Show Multiple Approaches**: Demonstrate different ways to solve the same problem
3. **Explain Trade-offs**: Discuss performance, readability, and maintainability
4. **Use Real Examples**: Show practical use cases, not just theoretical implementations
5. **Handle Edge Cases**: Consider error handling and edge cases in your implementations

## 🔧 Contributing

Feel free to contribute additional patterns, implementations, or improvements:

1. Fork the repository
2. Add your implementation with clear examples
3. Update the README if needed
4. Submit a pull request

## 📖 Additional Resources

- [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [Eloquent JavaScript](https://eloquentjavascript.net/)
- [You Don't Know JS](https://github.com/getify/You-Dont-Know-JS)
- [JavaScript.info](https://javascript.info/)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Happy Coding! 🚀**

This collection is designed to help you master JavaScript concepts commonly asked in technical interviews. Each file contains multiple implementations and real-world examples to deepen your understanding. 