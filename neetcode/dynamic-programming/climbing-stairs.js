// Climbing Stairs - LeetCode #70
// https://leetcode.com/problems/climbing-stairs/

/*
Problem: You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. 
In how many distinct ways can you climb to the top?

Example: n = 3 -> 3 (ways: 1+1+1, 1+2, 2+1)
*/

// Optimized Solution - Fibonacci
// Time: O(n), Space: O(1)
function climbStairs(n) {
    if (n <= 2) return n;
    
    let prev1 = 1, prev2 = 2;
    
    for (let i = 3; i <= n; i++) {
        const current = prev1 + prev2;
        prev1 = prev2;
        prev2 = current;
    }
    
    return prev2;
}

// DP Solution
// Time: O(n), Space: O(n)
function climbStairsDP(n) {
    if (n <= 2) return n;
    
    const dp = new Array(n + 1);
    dp[1] = 1;
    dp[2] = 2;
    
    for (let i = 3; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    
    return dp[n];
}

module.exports = { climbStairs, climbStairsDP }; 