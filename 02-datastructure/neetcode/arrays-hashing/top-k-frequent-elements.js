// Top K Frequent Elements - LeetCode #347
// https://leetcode.com/problems/top-k-frequent-elements/

/*
Problem: Given an integer array nums and an integer k, return the k most frequent elements.

Example: nums = [1,1,1,2,2,3], k = 2 -> [1,2]
*/

// Optimized Solution - Bucket Sort
// Time: O(n), Space: O(n)
function topKFrequent(nums, k) {
    const count = new Map();
    const bucket = new Array(nums.length + 1).fill().map(() => []);
    
    // Count frequencies
    for (let num of nums) {
        count.set(num, (count.get(num) || 0) + 1);
    }
    
    // Bucket sort by frequency
    for (let [num, freq] of count) {
        bucket[freq].push(num);
    }
    
    // Get top k elements
    const result = [];
    for (let i = bucket.length - 1; i >= 0 && result.length < k; i--) {
        result.push(...bucket[i]);
    }
    
    return result.slice(0, k);
}

module.exports = { topKFrequent }; 