// Coin Change - LeetCode #322
// https://leetcode.com/problems/coin-change/

/*
Problem: You are given an integer array coins representing coins of different denominations and an integer amount 
representing a total amount of money. Return the fewest number of coins that you need to make up that amount.

Example: coins = [1,2,5], amount = 11 -> 3 (5+5+1)
*/

// Optimized Solution - DP
// Time: O(amount * coins.length), Space: O(amount)
function coinChange(coins, amount) {
    const dp = new Array(amount + 1).fill(Infinity);
    dp[0] = 0;
    
    for (let i = 1; i <= amount; i++) {
        for (let coin of coins) {
            if (coin <= i) {
                dp[i] = Math.min(dp[i], dp[i - coin] + 1);
            }
        }
    }
    
    return dp[amount] === Infinity ? -1 : dp[amount];
}

// BFS Solution
// Time: O(amount * coins.length), Space: O(amount)
function coinChangeBFS(coins, amount) {
    if (amount === 0) return 0;
    
    const queue = [amount];
    const visited = new Set([amount]);
    let steps = 0;
    
    while (queue.length > 0) {
        const size = queue.length;
        
        for (let i = 0; i < size; i++) {
            const current = queue.shift();
            
            for (let coin of coins) {
                const next = current - coin;
                
                if (next === 0) return steps + 1;
                if (next > 0 && !visited.has(next)) {
                    visited.add(next);
                    queue.push(next);
                }
            }
        }
        steps++;
    }
    
    return -1;
}

module.exports = { coinChange, coinChangeBFS }; 