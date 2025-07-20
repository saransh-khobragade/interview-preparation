// Testing Patterns and Mock Implementations in JavaScript
// Unit testing, mocking, and test utilities

// Method 1: Simple Test Runner
class TestRunner {
    constructor() {
        this.tests = [];
        this.passed = 0;
        this.failed = 0;
    }
    
    test(name, testFn) {
        this.tests.push({ name, testFn });
    }
    
    expect(actual) {
        return {
            toBe(expected) {
                if (actual !== expected) {
                    throw new Error(`Expected ${actual} to be ${expected}`);
                }
            },
            
            toEqual(expected) {
                if (JSON.stringify(actual) !== JSON.stringify(expected)) {
                    throw new Error(`Expected ${JSON.stringify(actual)} to equal ${JSON.stringify(expected)}`);
                }
            },
            
            toBeTruthy() {
                if (!actual) {
                    throw new Error(`Expected ${actual} to be truthy`);
                }
            },
            
            toBeFalsy() {
                if (actual) {
                    throw new Error(`Expected ${actual} to be falsy`);
                }
            },
            
            toContain(expected) {
                if (!actual.includes(expected)) {
                    throw new Error(`Expected ${actual} to contain ${expected}`);
                }
            },
            
            toHaveLength(expected) {
                if (actual.length !== expected) {
                    throw new Error(`Expected length ${actual.length} to be ${expected}`);
                }
            },
            
            toThrow() {
                try {
                    if (typeof actual === 'function') {
                        actual();
                    }
                    throw new Error('Expected function to throw');
                } catch (error) {
                    if (error.message === 'Expected function to throw') {
                        throw error;
                    }
                    // Function threw as expected
                }
            }
        };
    }
    
    run() {
        console.log('Running tests...\n');
        
        this.tests.forEach(({ name, testFn }) => {
            try {
                testFn();
                console.log(`✅ ${name}`);
                this.passed++;
            } catch (error) {
                console.log(`❌ ${name}`);
                console.log(`   Error: ${error.message}`);
                this.failed++;
            }
        });
        
        console.log(`\nResults: ${this.passed} passed, ${this.failed} failed`);
    }
}

// Method 2: Mock Function
class MockFunction {
    constructor(implementation = null) {
        this.calls = [];
        this.implementation = implementation;
        this.returnValue = undefined;
        this.throwError = null;
    }
    
    call(...args) {
        this.calls.push({
            args,
            timestamp: Date.now()
        });
        
        if (this.throwError) {
            throw this.throwError;
        }
        
        if (this.implementation) {
            return this.implementation(...args);
        }
        
        return this.returnValue;
    }
    
    mockReturnValue(value) {
        this.returnValue = value;
        return this;
    }
    
    mockImplementation(fn) {
        this.implementation = fn;
        return this;
    }
    
    mockRejectedValue(error) {
        this.throwError = error;
        return this;
    }
    
    getCallCount() {
        return this.calls.length;
    }
    
    getCalls() {
        return this.calls;
    }
    
    getLastCall() {
        return this.calls[this.calls.length - 1];
    }
    
    wasCalled() {
        return this.calls.length > 0;
    }
    
    wasCalledWith(...args) {
        return this.calls.some(call => 
            JSON.stringify(call.args) === JSON.stringify(args)
        );
    }
    
    wasCalledTimes(count) {
        return this.calls.length === count;
    }
    
    clearMock() {
        this.calls = [];
        this.implementation = null;
        this.returnValue = undefined;
        this.throwError = null;
    }
}

// Method 3: Spy Function
function spyOn(obj, methodName) {
    const originalMethod = obj[methodName];
    const spy = new MockFunction(originalMethod);
    
    obj[methodName] = function(...args) {
        return spy.call(...args);
    };
    
    // Copy spy methods to the replaced function
    Object.setPrototypeOf(obj[methodName], Object.getPrototypeOf(spy));
    Object.assign(obj[methodName], spy);
    
    return obj[methodName];
}

// Method 4: Mock Object
class MockObject {
    constructor(template = {}) {
        this.methods = new Map();
        this.properties = new Map();
        
        // Set up default mock methods
        Object.keys(template).forEach(key => {
            if (typeof template[key] === 'function') {
                this.mockMethod(key, template[key]);
            } else {
                this.mockProperty(key, template[key]);
            }
        });
    }
    
    mockMethod(name, implementation = null) {
        const mockFn = new MockFunction(implementation);
        this.methods.set(name, mockFn);
        
        Object.defineProperty(this, name, {
            value: (...args) => mockFn.call(...args),
            writable: true,
            configurable: true
        });
        
        return mockFn;
    }
    
    mockProperty(name, value) {
        this.properties.set(name, value);
        
        Object.defineProperty(this, name, {
            get: () => this.properties.get(name),
            set: (newValue) => this.properties.set(name, newValue),
            configurable: true
        });
    }
    
    getMockMethod(name) {
        return this.methods.get(name);
    }
    
    getMockProperty(name) {
        return this.properties.get(name);
    }
    
    reset() {
        this.methods.forEach(mock => mock.clearMock());
        this.properties.clear();
    }
}

// Method 5: Test Doubles
class TestDouble {
    static stub(obj, method, returnValue) {
        const original = obj[method];
        obj[method] = () => returnValue;
        
        return {
            restore: () => {
                obj[method] = original;
            }
        };
    }
    
    static spy(obj, method) {
        return spyOn(obj, method);
    }
    
    static mock(obj, method, implementation) {
        const mockFn = new MockFunction(implementation);
        obj[method] = (...args) => mockFn.call(...args);
        
        // Copy mock methods
        Object.setPrototypeOf(obj[method], Object.getPrototypeOf(mockFn));
        Object.assign(obj[method], mockFn);
        
        return obj[method];
    }
    
    static fake(constructor, methods = {}) {
        const fakeInstance = new MockObject(methods);
        
        // Create a fake constructor
        const FakeClass = function(...args) {
            return fakeInstance;
        };
        
        FakeClass.prototype = constructor.prototype;
        
        return FakeClass;
    }
}

// Method 6: Async Test Utilities
class AsyncTestRunner extends TestRunner {
    async testAsync(name, testFn) {
        this.tests.push({ name, testFn, async: true });
    }
    
    async runAsync() {
        console.log('Running async tests...\n');
        
        for (const { name, testFn, async } of this.tests) {
            try {
                if (async) {
                    await testFn();
                } else {
                    testFn();
                }
                console.log(`✅ ${name}`);
                this.passed++;
            } catch (error) {
                console.log(`❌ ${name}`);
                console.log(`   Error: ${error.message}`);
                this.failed++;
            }
        }
        
        console.log(`\nResults: ${this.passed} passed, ${this.failed} failed`);
    }
    
    async expectAsync(promise) {
        return {
            async toResolve(expectedValue = undefined) {
                try {
                    const result = await promise;
                    if (expectedValue !== undefined && result !== expectedValue) {
                        throw new Error(`Expected ${result} to resolve to ${expectedValue}`);
                    }
                    return result;
                } catch (error) {
                    throw new Error(`Expected promise to resolve but it rejected: ${error.message}`);
                }
            },
            
            async toReject(expectedError = undefined) {
                try {
                    await promise;
                    throw new Error('Expected promise to reject but it resolved');
                } catch (error) {
                    if (expectedError !== undefined && error.message !== expectedError) {
                        throw new Error(`Expected error "${expectedError}" but got "${error.message}"`);
                    }
                    return error;
                }
            }
        };
    }
}

// Method 7: Test Data Builders
class TestDataBuilder {
    constructor(template = {}) {
        this.template = { ...template };
    }
    
    with(overrides = {}) {
        return new TestDataBuilder({ ...this.template, ...overrides });
    }
    
    build() {
        return { ...this.template };
    }
    
    buildMany(count) {
        return Array.from({ length: count }, () => this.build());
    }
}

// Method 8: Test Fixtures
class TestFixtures {
    constructor() {
        this.fixtures = new Map();
    }
    
    define(name, data) {
        this.fixtures.set(name, data);
    }
    
    load(name) {
        if (!this.fixtures.has(name)) {
            throw new Error(`Fixture "${name}" not found`);
        }
        return this.fixtures.get(name);
    }
    
    loadMany(name, count) {
        const fixture = this.load(name);
        return Array.from({ length: count }, () => ({ ...fixture }));
    }
}

// Method 9: Test Hooks
class TestHooks {
    constructor() {
        this.beforeEach = [];
        this.afterEach = [];
        this.beforeAll = [];
        this.afterAll = [];
    }
    
    beforeEach(fn) {
        this.beforeEach.push(fn);
    }
    
    afterEach(fn) {
        this.afterEach.push(fn);
    }
    
    beforeAll(fn) {
        this.beforeAll.push(fn);
    }
    
    afterAll(fn) {
        this.afterAll.push(fn);
    }
    
    async runBeforeEach() {
        for (const fn of this.beforeEach) {
            await fn();
        }
    }
    
    async runAfterEach() {
        for (const fn of this.afterEach) {
            await fn();
        }
    }
    
    async runBeforeAll() {
        for (const fn of this.beforeAll) {
            await fn();
        }
    }
    
    async runAfterAll() {
        for (const fn of this.afterAll) {
            await fn();
        }
    }
}

// Method 10: Test Groups
class TestGroup {
    constructor(name) {
        this.name = name;
        this.tests = [];
        this.hooks = new TestHooks();
    }
    
    test(name, testFn) {
        this.tests.push({ name, testFn });
    }
    
    async testAsync(name, testFn) {
        this.tests.push({ name, testFn, async: true });
    }
    
    beforeEach(fn) {
        this.hooks.beforeEach(fn);
    }
    
    afterEach(fn) {
        this.hooks.afterEach(fn);
    }
    
    beforeAll(fn) {
        this.hooks.beforeAll(fn);
    }
    
    afterAll(fn) {
        this.hooks.afterAll(fn);
    }
    
    async run(runner) {
        console.log(`\n📁 ${this.name}`);
        
        await this.hooks.runBeforeAll();
        
        for (const { name, testFn, async } of this.tests) {
            try {
                await this.hooks.runBeforeEach();
                
                if (async) {
                    await testFn();
                } else {
                    testFn();
                }
                
                await this.hooks.runAfterEach();
                
                console.log(`  ✅ ${name}`);
                runner.passed++;
            } catch (error) {
                await this.hooks.runAfterEach();
                
                console.log(`  ❌ ${name}`);
                console.log(`     Error: ${error.message}`);
                runner.failed++;
            }
        }
        
        await this.hooks.runAfterAll();
    }
}

// Method 11: Test Matchers
class TestMatchers {
    static toBeCloseTo(actual, expected, precision = 2) {
        const tolerance = Math.pow(10, -precision) / 2;
        const difference = Math.abs(actual - expected);
        
        if (difference > tolerance) {
            throw new Error(`Expected ${actual} to be close to ${expected} (within ${tolerance})`);
        }
    }
    
    static toMatch(actual, pattern) {
        if (!pattern.test(actual)) {
            throw new Error(`Expected ${actual} to match pattern ${pattern}`);
        }
    }
    
    static toHaveProperty(actual, property) {
        if (!(property in actual)) {
            throw new Error(`Expected object to have property "${property}"`);
        }
    }
    
    static toBeInstanceOf(actual, constructor) {
        if (!(actual instanceof constructor)) {
            throw new Error(`Expected ${actual} to be instance of ${constructor.name}`);
        }
    }
    
    static toBeGreaterThan(actual, expected) {
        if (actual <= expected) {
            throw new Error(`Expected ${actual} to be greater than ${expected}`);
        }
    }
    
    static toBeLessThan(actual, expected) {
        if (actual >= expected) {
            throw new Error(`Expected ${actual} to be less than ${expected}`);
        }
    }
}

// Method 12: Test Utilities
class TestUtils {
    static wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    static retry(fn, maxAttempts = 3, delay = 100) {
        return async (...args) => {
            let lastError;
            
            for (let attempt = 1; attempt <= maxAttempts; attempt++) {
                try {
                    return await fn(...args);
                } catch (error) {
                    lastError = error;
                    
                    if (attempt < maxAttempts) {
                        await this.wait(delay * attempt);
                    }
                }
            }
            
            throw lastError;
        };
    }
    
    static createMockElement(tagName = 'div', attributes = {}) {
        const element = document.createElement(tagName);
        Object.entries(attributes).forEach(([key, value]) => {
            element.setAttribute(key, value);
        });
        return element;
    }
    
    static createMockEvent(type, options = {}) {
        return new Event(type, options);
    }
    
    static createMockStorage() {
        const storage = {};
        
        return {
            getItem: (key) => storage[key] || null,
            setItem: (key, value) => { storage[key] = value; },
            removeItem: (key) => { delete storage[key]; },
            clear: () => { Object.keys(storage).forEach(key => delete storage[key]); },
            key: (index) => Object.keys(storage)[index] || null,
            get length() { return Object.keys(storage).length; }
        };
    }
}

// Real-world examples

// Example 1: Basic test runner
const runner = new TestRunner();

runner.test('should add two numbers', () => {
    runner.expect(2 + 2).toBe(4);
});

runner.test('should handle arrays', () => {
    const arr = [1, 2, 3];
    runner.expect(arr).toHaveLength(3);
    runner.expect(arr).toContain(2);
});

runner.test('should handle objects', () => {
    const obj = { name: 'John', age: 30 };
    runner.expect(obj).toEqual({ name: 'John', age: 30 });
});

runner.run();

// Example 2: Mock function
const mockFn = new MockFunction();
mockFn.mockReturnValue('mocked result');

console.log(mockFn.call('arg1', 'arg2')); // mocked result
console.log(mockFn.wasCalled()); // true
console.log(mockFn.wasCalledWith('arg1', 'arg2')); // true
console.log(mockFn.getCallCount()); // 1

// Example 3: Spy on object method
const calculator = {
    add: (a, b) => a + b,
    multiply: (a, b) => a * b
};

const spy = spyOn(calculator, 'add');
console.log(calculator.add(2, 3)); // 5
console.log(spy.wasCalledWith(2, 3)); // true

// Example 4: Mock object
const mockAPI = new MockObject({
    fetch: () => Promise.resolve({ data: 'mocked data' }),
    post: () => Promise.resolve({ success: true })
});

mockAPI.mockMethod('get').mockReturnValue('mocked get');
console.log(mockAPI.get()); // mocked get

// Example 5: Test doubles
const userService = {
    getUser: (id) => ({ id, name: 'John' }),
    createUser: (user) => ({ ...user, id: 1 })
};

const stub = TestDouble.stub(userService, 'getUser', { id: 1, name: 'Mocked User' });
console.log(userService.getUser(1)); // { id: 1, name: 'Mocked User' }
stub.restore();

// Example 6: Async test runner
const asyncRunner = new AsyncTestRunner();

asyncRunner.testAsync('should resolve promise', async () => {
    const promise = Promise.resolve('success');
    await asyncRunner.expectAsync(promise).toResolve('success');
});

asyncRunner.testAsync('should reject promise', async () => {
    const promise = Promise.reject(new Error('failure'));
    await asyncRunner.expectAsync(promise).toReject('failure');
});

asyncRunner.runAsync();

// Example 7: Test data builder
const userBuilder = new TestDataBuilder({
    name: 'John Doe',
    email: 'john@example.com',
    age: 30
});

const user = userBuilder.with({ name: 'Jane Doe' }).build();
console.log(user); // { name: 'Jane Doe', email: 'john@example.com', age: 30 }

// Example 8: Test fixtures
const fixtures = new TestFixtures();
fixtures.define('user', { name: 'John', email: 'john@example.com' });
fixtures.define('post', { title: 'Test Post', content: 'Test Content' });

const userFixture = fixtures.load('user');
const posts = fixtures.loadMany('post', 3);

// Example 9: Test groups
const group = new TestGroup('Calculator Tests');
group.beforeEach(() => {
    console.log('Setting up calculator test');
});

group.test('should add numbers', () => {
    runner.expect(2 + 2).toBe(4);
});

group.test('should multiply numbers', () => {
    runner.expect(3 * 4).toBe(12);
});

group.run(runner);

// Example 10: Test matchers
runner.test('should use custom matchers', () => {
    TestMatchers.toBeCloseTo(3.14159, 3.14, 2);
    TestMatchers.toMatch('hello world', /hello/);
    TestMatchers.toHaveProperty({ name: 'John' }, 'name');
    TestMatchers.toBeInstanceOf(new Date(), Date);
    TestMatchers.toBeGreaterThan(5, 3);
    TestMatchers.toBeLessThan(3, 5);
});

// Example 11: Test utilities
const mockStorage = TestUtils.createMockStorage();
mockStorage.setItem('key', 'value');
console.log(mockStorage.getItem('key')); // value

const mockElement = TestUtils.createMockElement('button', { id: 'test', class: 'btn' });
console.log(mockElement.tagName); // BUTTON

// Example 12: Retry utility
const unreliableFunction = async () => {
    if (Math.random() > 0.5) {
        throw new Error('Random failure');
    }
    return 'success';
};

const reliableFunction = TestUtils.retry(unreliableFunction, 3, 100);
reliableFunction().then(result => console.log(result));

// Export for testing
module.exports = {
    TestRunner,
    MockFunction,
    spyOn,
    MockObject,
    TestDouble,
    AsyncTestRunner,
    TestDataBuilder,
    TestFixtures,
    TestHooks,
    TestGroup,
    TestMatchers,
    TestUtils
}; 