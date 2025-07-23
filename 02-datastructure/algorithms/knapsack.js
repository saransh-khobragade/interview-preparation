/*
0/1 Knapsack Problem Algorithm
------------------------------
Solves the 0/1 Knapsack problem using dynamic programming. Finds the maximum value that can be put in a knapsack of a given capacity.

Time Complexity: O(nW) where n is number of items and W is capacity
Space Complexity: O(nW)
*/

function knapsack(weights, values, capacity) {
    const n = weights.length;
    const dp = Array(n + 1).fill().map(() => Array(capacity + 1).fill(0));
    for (let i = 1; i <= n; i++) {
        for (let w = 0; w <= capacity; w++) {
            if (weights[i - 1] <= w) {
                dp[i][w] = Math.max(
                    dp[i - 1][w],
                    dp[i - 1][w - weights[i - 1]] + values[i - 1]
                );
            } else {
                dp[i][w] = dp[i - 1][w];
            }
        }
    }
    return dp[n][capacity];
}

module.exports = knapsack; 