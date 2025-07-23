/*
Prime Number Check Algorithm
----------------------------
Checks if a given number is prime. A prime number is only divisible by 1 and itself.

Time Complexity: O(sqrt(n))
Space Complexity: O(1)
*/

function isPrime(n) {
    if (n <= 1) return false;
    if (n <= 3) return true;
    if (n % 2 === 0 || n % 3 === 0) return false;
    for (let i = 5; i * i <= n; i += 6) {
        if (n % i === 0 || n % (i + 2) === 0) {
            return false;
        }
    }
    return true;
}

module.exports = isPrime; 