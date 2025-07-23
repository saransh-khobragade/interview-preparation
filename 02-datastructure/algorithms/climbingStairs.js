/*
Climbing Stairs Algorithm
-------------------------
Counts the number of distinct ways to climb to the top of a staircase with n steps, where you can climb 1 or 2 steps at a time. Uses dynamic programming.

Time Complexity: O(n)
Space Complexity: O(1)
*/

function climbingStairs(n) {
    if (n <= 2) return n;
    let prev1 = 1, prev2 = 2;
    for (let i = 3; i <= n; i++) {
        const current = prev1 + prev2;
        prev1 = prev2;
        prev2 = current;
    }
    return prev2;
}

module.exports = climbingStairs; 