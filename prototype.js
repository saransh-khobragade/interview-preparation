// Prototype Inheritance and Object-Oriented Patterns in JavaScript
// Understanding prototypes, inheritance, and OOP concepts

// Method 1: Basic prototype inheritance
function Animal(name) {
    this.name = name;
}

Animal.prototype.speak = function() {
    return `${this.name} makes a sound`;
};

Animal.prototype.eat = function(food) {
    return `${this.name} eats ${food}`;
};

function Dog(name, breed) {
    Animal.call(this, name);
    this.breed = breed;
}

// Set up inheritance
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

Dog.prototype.speak = function() {
    return `${this.name} barks`;
};

Dog.prototype.fetch = function() {
    return `${this.name} fetches the ball`;
};

// Method 2: ES6 Class inheritance
class Vehicle {
    constructor(make, model, year) {
        this.make = make;
        this.model = model;
        this.year = year;
    }
    
    getInfo() {
        return `${this.year} ${this.make} ${this.model}`;
    }
    
    start() {
        return `${this.getInfo()} is starting`;
    }
}

class Car extends Vehicle {
    constructor(make, model, year, fuelType) {
        super(make, model, year);
        this.fuelType = fuelType;
    }
    
    start() {
        return `${super.start()} with ${this.fuelType} fuel`;
    }
    
    honk() {
        return `${this.getInfo()} honks`;
    }
}

// Method 3: Prototype chain demonstration
function createPrototypeChain() {
    const obj = {};
    console.log('obj.__proto__ === Object.prototype:', obj.__proto__ === Object.prototype);
    console.log('Object.prototype.__proto__ === null:', Object.prototype.__proto__ === null);
    
    const arr = [];
    console.log('arr.__proto__ === Array.prototype:', arr.__proto__ === Array.prototype);
    console.log('Array.prototype.__proto__ === Object.prototype:', Array.prototype.__proto__ === Object.prototype);
    
    const func = function() {};
    console.log('func.__proto__ === Function.prototype:', func.__proto__ === Function.prototype);
    console.log('Function.prototype.__proto__ === Object.prototype:', Function.prototype.__proto__ === Object.prototype);
}

// Method 4: Object.create for inheritance
const personPrototype = {
    greet() {
        return `Hello, my name is ${this.name}`;
    },
    
    introduce() {
        return `I am ${this.name}, ${this.age} years old`;
    }
};

function createPerson(name, age) {
    return Object.create(personPrototype, {
        name: { value: name, writable: true, enumerable: true },
        age: { value: age, writable: true, enumerable: true }
    });
}

// Method 5: Mixins with prototypes
const speakerMixin = {
    speak(message) {
        return `${this.name} says: ${message}`;
    }
};

const moverMixin = {
    move(direction) {
        return `${this.name} moves ${direction}`;
    }
};

function applyMixins(target, ...mixins) {
    mixins.forEach(mixin => {
        Object.getOwnPropertyNames(mixin).forEach(name => {
            target.prototype[name] = mixin[name];
        });
    });
}

function Robot(name) {
    this.name = name;
}

applyMixins(Robot, speakerMixin, moverMixin);

// Method 6: Prototype-based factory pattern
const userPrototype = {
    getFullName() {
        return `${this.firstName} ${this.lastName}`;
    },
    
    getEmail() {
        return `${this.firstName.toLowerCase()}.${this.lastName.toLowerCase()}@example.com`;
    },
    
    updateProfile(data) {
        Object.assign(this, data);
        return this;
    }
};

function createUser(firstName, lastName, role = 'user') {
    const user = Object.create(userPrototype);
    user.firstName = firstName;
    user.lastName = lastName;
    user.role = role;
    user.createdAt = new Date();
    return user;
}

// Method 7: Prototype with private variables
function createCounter() {
    let count = 0;
    
    const counter = Object.create({
        increment() {
            count++;
            return this.getValue();
        },
        
        decrement() {
            count--;
            return this.getValue();
        },
        
        getValue() {
            return count;
        },
        
        reset() {
            count = 0;
            return this.getValue();
        }
    });
    
    return counter;
}

// Method 8: Prototype with method chaining
function Calculator() {
    this.value = 0;
}

Calculator.prototype.add = function(num) {
    this.value += num;
    return this;
};

Calculator.prototype.subtract = function(num) {
    this.value -= num;
    return this;
};

Calculator.prototype.multiply = function(num) {
    this.value *= num;
    return this;
};

Calculator.prototype.divide = function(num) {
    if (num !== 0) {
        this.value /= num;
    }
    return this;
};

Calculator.prototype.getResult = function() {
    return this.value;
};

Calculator.prototype.clear = function() {
    this.value = 0;
    return this;
};

// Method 9: Prototype with event system
function EventEmitter() {
    this.events = {};
}

EventEmitter.prototype.on = function(event, listener) {
    if (!this.events[event]) {
        this.events[event] = [];
    }
    this.events[event].push(listener);
    return this;
};

EventEmitter.prototype.emit = function(event, ...args) {
    if (this.events[event]) {
        this.events[event].forEach(listener => listener.apply(this, args));
    }
    return this;
};

EventEmitter.prototype.off = function(event, listener) {
    if (this.events[event]) {
        this.events[event] = this.events[event].filter(l => l !== listener);
    }
    return this;
};

// Method 10: Prototype with validation
function ValidatedObject(schema) {
    this.schema = schema;
    this.data = {};
}

ValidatedObject.prototype.set = function(key, value) {
    if (this.schema[key] && typeof value !== this.schema[key]) {
        throw new Error(`Invalid type for ${key}. Expected ${this.schema[key]}, got ${typeof value}`);
    }
    this.data[key] = value;
    return this;
};

ValidatedObject.prototype.get = function(key) {
    return this.data[key];
};

ValidatedObject.prototype.validate = function() {
    const errors = [];
    
    Object.keys(this.schema).forEach(key => {
        if (this.data[key] === undefined) {
            errors.push(`Missing required field: ${key}`);
        } else if (typeof this.data[key] !== this.schema[key]) {
            errors.push(`Invalid type for ${key}`);
        }
    });
    
    return errors;
};

// Method 11: Prototype with caching
function CacheableFunction(fn, ttl = 60000) {
    this.fn = fn;
    this.ttl = ttl;
    this.cache = new Map();
}

CacheableFunction.prototype.call = function(...args) {
    const key = JSON.stringify(args);
    const cached = this.cache.get(key);
    
    if (cached && Date.now() - cached.timestamp < this.ttl) {
        return cached.value;
    }
    
    const result = this.fn.apply(this, args);
    this.cache.set(key, { value: result, timestamp: Date.now() });
    
    return result;
};

CacheableFunction.prototype.clearCache = function() {
    this.cache.clear();
    return this;
};

// Method 12: Prototype with method overriding
function BaseClass() {}

BaseClass.prototype.method = function() {
    return 'Base method';
};

BaseClass.prototype.overridableMethod = function() {
    return 'This can be overridden';
};

function DerivedClass() {}

DerivedClass.prototype = Object.create(BaseClass.prototype);
DerivedClass.prototype.constructor = DerivedClass;

DerivedClass.prototype.method = function() {
    return 'Derived method';
};

// Method 13: Prototype with composition
function compose(...prototypes) {
    return prototypes.reduce((composed, prototype) => {
        Object.getOwnPropertyNames(prototype).forEach(name => {
            composed[name] = prototype[name];
        });
        return composed;
    }, {});
}

const loggerPrototype = {
    log(message) {
        console.log(`[${this.name}] ${message}`);
    }
};

const validatorPrototype = {
    validate(data) {
        return Object.keys(this.rules).every(key => {
            return this.rules[key](data[key]);
        });
    }
};

function createValidatedLogger(name, rules) {
    const prototype = compose(loggerPrototype, validatorPrototype);
    const obj = Object.create(prototype);
    obj.name = name;
    obj.rules = rules;
    return obj;
}

// Method 14: Prototype with method borrowing
function borrowMethods(target, source, ...methods) {
    methods.forEach(method => {
        if (source.prototype[method]) {
            target.prototype[method] = source.prototype[method];
        }
    });
    return target;
}

// Example: Borrow array methods for a custom collection
function Collection() {
    this.items = [];
}

borrowMethods(Collection, Array, 'push', 'pop', 'shift', 'unshift', 'length');

Collection.prototype.get = function(index) {
    return this.items[index];
};

// Method 15: Prototype with method delegation
function delegate(target, source, method) {
    target.prototype[method] = function(...args) {
        return source.prototype[method].apply(this, args);
    };
}

// Real-world examples

// Example 1: Basic inheritance
const dog = new Dog('Buddy', 'Golden Retriever');
console.log(dog.speak()); // Buddy barks
console.log(dog.eat('dog food')); // Buddy eats dog food
console.log(dog.fetch()); // Buddy fetches the ball

// Example 2: ES6 Class inheritance
const car = new Car('Toyota', 'Camry', 2023, 'gasoline');
console.log(car.start()); // 2023 Toyota Camry is starting with gasoline fuel
console.log(car.honk()); // 2023 Toyota Camry honks

// Example 3: Prototype chain
createPrototypeChain();

// Example 4: Object.create inheritance
const person = createPerson('John', 30);
console.log(person.greet()); // Hello, my name is John
console.log(person.introduce()); // I am John, 30 years old

// Example 5: Mixins
const robot = new Robot('R2D2');
console.log(robot.speak('Hello there!')); // R2D2 says: Hello there!
console.log(robot.move('forward')); // R2D2 moves forward

// Example 6: Factory pattern
const user = createUser('Jane', 'Doe', 'admin');
console.log(user.getFullName()); // Jane Doe
console.log(user.getEmail()); // jane.doe@example.com
user.updateProfile({ firstName: 'Janet' });
console.log(user.getFullName()); // Janet Doe

// Example 7: Private variables
const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.decrement()); // 1
console.log(counter.getValue()); // 1

// Example 8: Method chaining
const calc = new Calculator();
const result = calc.add(5).multiply(2).subtract(3).getResult();
console.log(result); // 7

// Example 9: Event system
const emitter = new EventEmitter();
emitter.on('test', (data) => console.log('Event received:', data));
emitter.emit('test', 'hello world');

// Example 10: Validation
const schema = { name: 'string', age: 'number', email: 'string' };
const validatedObj = new ValidatedObject(schema);
validatedObj.set('name', 'John');
validatedObj.set('age', 30);
validatedObj.set('email', 'john@example.com');
console.log(validatedObj.validate()); // []

// Example 11: Caching
const expensiveFunction = new CacheableFunction((n) => {
    console.log('Computing...');
    return n * n;
}, 5000);

console.log(expensiveFunction.call(5)); // Computing..., 25
console.log(expensiveFunction.call(5)); // 25 (cached)

// Example 12: Method overriding
const base = new BaseClass();
const derived = new DerivedClass();
console.log(base.method()); // Base method
console.log(derived.method()); // Derived method
console.log(derived.overridableMethod()); // This can be overridden

// Example 13: Composition
const rules = {
    name: (value) => typeof value === 'string' && value.length > 0,
    age: (value) => typeof value === 'number' && value > 0
};

const logger = createValidatedLogger('App', rules);
logger.log('Starting application');
console.log(logger.validate({ name: 'John', age: 30 })); // true

// Example 14: Method borrowing
const collection = new Collection();
collection.push(1, 2, 3);
console.log(collection.get(0)); // 1
console.log(collection.length); // 3

// Example 15: Method delegation
function CustomArray() {
    this.items = [];
}

delegate(CustomArray, Array, 'push');
delegate(CustomArray, Array, 'pop');

const customArray = new CustomArray();
customArray.push(1, 2, 3);
console.log(customArray.pop()); // 3

// Export for testing
module.exports = {
    Animal,
    Dog,
    Vehicle,
    Car,
    createPerson,
    Robot,
    createUser,
    createCounter,
    Calculator,
    EventEmitter,
    ValidatedObject,
    CacheableFunction,
    BaseClass,
    DerivedClass,
    createValidatedLogger,
    Collection,
    CustomArray
}; 