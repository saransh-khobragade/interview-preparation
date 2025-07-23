// Contains Duplicate - LeetCode #217
// https://leetcode.com/problems/contains-duplicate/

/*
Problem: Given an integer array nums, return true if any value appears at least twice in the array, 
and return false if every element is distinct.

Example: [1,2,3,1] -> true
*/

// Optimized Solution - Set
// Time: O(n), Space: O(n)
function containsDuplicate(nums) {
    const seen = new Set();
    
    for (let num of nums) {
        if (seen.has(num)) {
            return true;
        }
        seen.add(num);
    }
    
    return false;
}

module.exports = { containsDuplicate }; 