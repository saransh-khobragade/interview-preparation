// Product of Array Except Self - LeetCode #238
// https://leetcode.com/problems/product-of-array-except-self/

/*
Problem: Given an integer array nums, return an array answer such that answer[i] is equal to 
the product of all the elements of nums except nums[i].

Example: [1,2,3,4] -> [24,12,8,6]
*/

// Optimized Solution - Two Pass
// Time: O(n), Space: O(1) - output array doesn't count
function productExceptSelf(nums) {
    const n = nums.length;
    const result = new Array(n).fill(1);
    
    // Left pass
    let leftProduct = 1;
    for (let i = 0; i < n; i++) {
        result[i] = leftProduct;
        leftProduct *= nums[i];
    }
    
    // Right pass
    let rightProduct = 1;
    for (let i = n - 1; i >= 0; i--) {
        result[i] *= rightProduct;
        rightProduct *= nums[i];
    }
    
    return result;
}

module.exports = { productExceptSelf }; 