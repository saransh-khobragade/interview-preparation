// Best Time to Buy and Sell Stock - LeetCode #121
// https://leetcode.com/problems/best-time-to-buy-and-sell-stock/

/*
Problem: You are given an array prices where prices[i] is the price of a given stock on the ith day.
You want to maximize your profit by choosing a single day to buy one stock and choosing a different day 
in the future to sell that stock. Return the maximum profit you can achieve from this transaction.

Example: [7,1,5,3,6,4] -> 5 (buy at 1, sell at 6)
*/

// Optimized Solution - One Pass
// Time: O(n), Space: O(1)
function maxProfit(prices) {
    let minPrice = Infinity;
    let maxProfit = 0;
    
    for (let price of prices) {
        minPrice = Math.min(minPrice, price);
        maxProfit = Math.max(maxProfit, price - minPrice);
    }
    
    return maxProfit;
}

module.exports = { maxProfit }; 