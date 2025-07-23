// Maximum Subarray - LeetCode #53
// https://leetcode.com/problems/maximum-subarray/

/*
Problem: Given an integer array nums, find the subarray with the largest sum, and return its sum.

Example: [-2,1,-3,4,-1,2,1,-5,4] -> 6 (subarray [4,-1,2,1])
*/

// Optimized Solution - Kadane's Algorithm
// Time: O(n), Space: O(1)
function maxSubArray(nums) {
    let maxSum = nums[0];
    let currentSum = nums[0];
    
    for (let i = 1; i < nums.length; i++) {
        currentSum = Math.max(nums[i], currentSum + nums[i]);
        maxSum = Math.max(maxSum, currentSum);
    }
    
    return maxSum;
}

module.exports = { maxSubArray }; 