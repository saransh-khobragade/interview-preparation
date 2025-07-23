/*
Least Common Multiple (LCM) Algorithm
-------------------------------------
Finds the least common multiple of two integers using the GCD.

Time Complexity: O(log(min(a, b)))
Space Complexity: O(1)
*/

function lcm(a, b) {
    function gcd(a, b) {
        while (b !== 0) {
            const temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    }
    return (a * b) / gcd(a, b);
}

module.exports = lcm; 