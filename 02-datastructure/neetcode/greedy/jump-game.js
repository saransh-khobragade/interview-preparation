// Jump Game - LeetCode #55
// https://leetcode.com/problems/jump-game/

/*
Problem: You are given an integer array nums. You are initially positioned at the array's first index, 
and each element in the array represents your maximum jump length at that position. Return true if you can 
reach the last index, or false otherwise.

Example: [2,3,1,1,4] -> true
*/

// Optimized Solution - Greedy
// Time: O(n), Space: O(1)
function canJump(nums) {
    let maxReach = 0;
    
    for (let i = 0; i <= maxReach; i++) {
        maxReach = Math.max(maxReach, i + nums[i]);
        
        if (maxReach >= nums.length - 1) {
            return true;
        }
    }
    
    return false;
}

// DP Solution
// Time: O(n²), Space: O(n)
function canJumpDP(nums) {
    const dp = new Array(nums.length).fill(false);
    dp[0] = true;
    
    for (let i = 0; i < nums.length; i++) {
        if (dp[i]) {
            for (let j = 1; j <= nums[i] && i + j < nums.length; j++) {
                dp[i + j] = true;
            }
        }
    }
    
    return dp[nums.length - 1];
}

module.exports = { canJump, canJumpDP }; 