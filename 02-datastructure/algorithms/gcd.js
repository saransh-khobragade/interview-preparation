/*
Greatest Common Divisor (GCD) Algorithm
---------------------------------------
Finds the greatest common divisor of two integers using the iterative Euclidean algorithm.

Time Complexity: O(log(min(a, b)))
Space Complexity: O(1)
*/

function gcd(a, b) {
    while (b !== 0) {
        const temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

module.exports = gcd; 