/*
Sieve of Eratosthenes Algorithm
-------------------------------
Finds all prime numbers up to a given limit n. It marks the multiples of each prime starting from 2.

Time Complexity: O(n log log n)
Space Complexity: O(n)
*/

function sieveOfEratosthenes(n) {
    const isPrime = new Array(n + 1).fill(true);
    isPrime[0] = isPrime[1] = false;
    for (let i = 2; i * i <= n; i++) {
        if (isPrime[i]) {
            for (let j = i * i; j <= n; j += i) {
                isPrime[j] = false;
            }
        }
    }
    const primes = [];
    for (let i = 2; i <= n; i++) {
        if (isPrime[i]) {
            primes.push(i);
        }
    }
    return primes;
}

module.exports = sieveOfEratosthenes; 