// Binary Search - LeetCode #704
// https://leetcode.com/problems/binary-search/

/*
Problem: Given an array of integers nums which is sorted in ascending order, and an integer target, 
write a function to search target in nums. If target exists, then return its index. Otherwise, return -1.

Example: nums = [-1,0,3,5,9,12], target = 9 -> 4
*/

// Optimized Solution - Binary Search
// Time: O(log n), Space: O(1)
function search(nums, target) {
    let left = 0, right = nums.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (nums[mid] === target) {
            return mid;
        } else if (nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return -1;
}

module.exports = { search }; 