// Remove Duplicates from Sorted Array - LeetCode #26
// https://leetcode.com/problems/remove-duplicates-from-sorted-array/

/*
Problem: Given an integer array nums sorted in non-decreasing order, remove the duplicates in-place such that 
each unique element appears only once. The relative order of the elements should be kept the same.

Example: [1,1,2] -> 2, nums = [1,2,_]
*/

// Optimized Solution - Two Pointers
// Time: O(n), Space: O(1)
function removeDuplicates(nums) {
    if (nums.length === 0) return 0;
    
    let writeIndex = 1;
    
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] !== nums[i - 1]) {
            nums[writeIndex] = nums[i];
            writeIndex++;
        }
    }
    
    return writeIndex;
}

// Set Solution (if not in-place required)
// Time: O(n), Space: O(n)
function removeDuplicatesSet(nums) {
    const unique = [...new Set(nums)];
    for (let i = 0; i < unique.length; i++) {
        nums[i] = unique[i];
    }
    return unique.length;
}

module.exports = { removeDuplicates, removeDuplicatesSet }; 