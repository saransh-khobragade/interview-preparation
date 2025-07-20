// Number of 1 Bits - LeetCode #191
// https://leetcode.com/problems/number-of-1-bits/

/*
Problem: Write a function that takes an unsigned integer and returns the number of '1' bits it has.

Example: 11 (1011) -> 3
*/

// Optimized Solution - Brian Kernighan's Algorithm
// Time: O(log n), Space: O(1)
function hammingWeight(n) {
    let count = 0;
    
    while (n !== 0) {
        n = n & (n - 1); // Remove the least significant 1
        count++;
    }
    
    return count;
}

// Built-in Solution
// Time: O(1), Space: O(1)
function hammingWeightBuiltin(n) {
    return n.toString(2).split('1').length - 1;
}

// Bit Shifting Solution
// Time: O(32), Space: O(1)
function hammingWeightShift(n) {
    let count = 0;
    
    for (let i = 0; i < 32; i++) {
        if ((n & (1 << i)) !== 0) {
            count++;
        }
    }
    
    return count;
}

module.exports = { hammingWeight, hammingWeightBuiltin, hammingWeightShift }; 