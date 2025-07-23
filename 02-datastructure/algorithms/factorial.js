/*
Factorial Algorithm
-------------------
Computes the factorial of a non-negative integer n recursively. The factorial of n (n!) is the product of all positive integers less than or equal to n.

Time Complexity: O(n)
Space Complexity: O(n) (due to recursion stack)
*/

function factorial(n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

module.exports = factorial; 