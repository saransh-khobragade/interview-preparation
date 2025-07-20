// House Robber - LeetCode #198
// https://leetcode.com/problems/house-robber/

/*
Problem: You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, 
the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected and it will 
automatically contact the police if two adjacent houses were broken into on the same night.

Example: [1,2,3,1] -> 4 (rob houses 1 and 3)
*/

// Optimized Solution - DP
// Time: O(n), Space: O(1)
function rob(nums) {
    if (nums.length === 0) return 0;
    if (nums.length === 1) return nums[0];
    
    let prev1 = 0, prev2 = 0;
    
    for (let num of nums) {
        const temp = prev1;
        prev1 = Math.max(prev2 + num, prev1);
        prev2 = temp;
    }
    
    return prev1;
}

// DP Array Solution
// Time: O(n), Space: O(n)
function robDP(nums) {
    if (nums.length === 0) return 0;
    if (nums.length === 1) return nums[0];
    
    const dp = new Array(nums.length);
    dp[0] = nums[0];
    dp[1] = Math.max(nums[0], nums[1]);
    
    for (let i = 2; i < nums.length; i++) {
        dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i]);
    }
    
    return dp[nums.length - 1];
}

module.exports = { rob, robDP }; 