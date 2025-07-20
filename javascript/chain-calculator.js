// Chain Calculator
// This file implements a chainable Calculator class that allows method chaining for arithmetic operations (add, subtract, multiply, divide, power, sqrt, etc.).
// Example: new Calculator(10).add(5).multiply(2).getResult();
// Useful for demonstrating fluent interfaces and chaining in JavaScript.

class Calculator {
    // Initializes the calculator with an optional starting value (default 0)
    constructor(value = 0) {
        this.value = value;
    }
    
    // Adds a number to the current value and returns this for chaining
    add(num) {
        this.value += num;
        return this;
    }
    
    // Subtracts a number from the current value and returns this for chaining
    subtract(num) {
        this.value -= num;
        return this;
    }
    
    // Multiplies the current value by a number and returns this for chaining
    multiply(num) {
        this.value *= num;
        return this;
    }
    
    // Divides the current value by a number and returns this for chaining
    // Throws an error if division by zero is attempted
    divide(num) {
        if (num === 0) throw new Error('Division by zero');
        this.value /= num;
        return this;
    }
    
    // Raises the current value to the power of num and returns this for chaining
    power(num) {
        this.value = Math.pow(this.value, num);
        return this;
    }
    
    // Takes the square root of the current value and returns this for chaining
    sqrt() {
        this.value = Math.sqrt(this.value);
        return this;
    }
    
    // Returns the current value (ends the chain)
    getResult() {
        return this.value;
    }
    
    // Executes a custom function on the current value and returns this for chaining
    execute(fn) {
        this.value = fn(this.value);
        return this;
    }
}

// Usage examples
const calc = new Calculator(10);
const result = calc
    .add(5)
    .multiply(2)
    .subtract(3)
    .divide(4)
    .power(2)
    .getResult();

console.log(result); // 36

// With custom function
const calc2 = new Calculator(5);
const result2 = calc2
    .add(3)
    .execute(x => x * 2)
    .execute(x => Math.floor(x))
    .getResult();

console.log(result2); // 16

module.exports = { Calculator }; 