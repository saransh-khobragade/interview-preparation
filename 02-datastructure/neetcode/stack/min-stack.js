// Min Stack - LeetCode #155
// https://leetcode.com/problems/min-stack/

/*
Problem: Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.

Example: push(3), push(5), push(2), getMin() -> 2, pop(), getMin() -> 3
*/

// Optimized Solution - Two Stacks
// Time: O(1) for all operations, Space: O(n)
class MinStack {
    constructor() {
        this.stack = [];
        this.minStack = [];
    }
    
    push(val) {
        this.stack.push(val);
        
        if (this.minStack.length === 0 || val <= this.minStack[this.minStack.length - 1]) {
            this.minStack.push(val);
        }
    }
    
    pop() {
        if (this.stack.length === 0) return;
        
        const val = this.stack.pop();
        
        if (val === this.minStack[this.minStack.length - 1]) {
            this.minStack.pop();
        }
    }
    
    top() {
        return this.stack[this.stack.length - 1];
    }
    
    getMin() {
        return this.minStack[this.minStack.length - 1];
    }
}

module.exports = { MinStack }; 