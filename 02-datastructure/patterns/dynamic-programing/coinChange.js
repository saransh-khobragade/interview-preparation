/*
Coin Change (Dynamic Programming)
----------------------------------
Given an array of coins and a total amount, return the fewest number of coins needed to make up that amount. If not possible, return -1.

Pattern: Dynamic Programming
We use a DP array to store the minimum coins needed for each amount up to the target.

Example:
Input: coins = [1,2,5], amount = 11
Output: 3 (11 = 5+5+1)

Time Complexity: O(amount * n)
Space Complexity: O(amount)
*/

function coinChange(coins, amount) {
    const dp = Array(amount + 1).fill(Infinity);
    dp[0] = 0;
    for (let i = 1; i <= amount; i++) {
        for (const coin of coins) {
            if (coin <= i) {
                dp[i] = Math.min(dp[i], dp[i - coin] + 1);
            }
        }
    }
    return dp[amount] === Infinity ? -1 : dp[amount];
}

module.exports = coinChange; 