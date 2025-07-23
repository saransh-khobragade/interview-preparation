/*
Coin Change Problem Algorithm
-----------------------------
Finds the minimum number of coins needed to make up a given amount using dynamic programming.

Time Complexity: O(amount * n) where n is number of coins
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