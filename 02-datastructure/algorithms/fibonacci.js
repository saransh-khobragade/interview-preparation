/*
Fibonacci Sequence (with Memoization)
-------------------------------------
Computes the nth Fibonacci number using memoization to optimize recursive calls. The Fibonacci sequence is a series where each number is the sum of the two preceding ones.

Time Complexity: O(n)
Space Complexity: O(n)
*/

function fibonacci(n, memo = {}) {
    if (n in memo) return memo[n];
    if (n <= 1) return n;
    memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
    return memo[n];
}

module.exports = fibonacci; 