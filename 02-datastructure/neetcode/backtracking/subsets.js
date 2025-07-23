// Subsets - LeetCode #78
// https://leetcode.com/problems/subsets/

/*
Problem: Given an integer array nums of unique elements, return all possible subsets (the power set).

Example: [1,2,3] -> [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
*/

// Optimized Solution - Backtracking
// Time: O(n * 2^n), Space: O(n)
function subsets(nums) {
    const result = [];
    
    function backtrack(start, current) {
        result.push([...current]);
        
        for (let i = start; i < nums.length; i++) {
            current.push(nums[i]);
            backtrack(i + 1, current);
            current.pop();
        }
    }
    
    backtrack(0, []);
    return result;
}

// Iterative Solution
// Time: O(n * 2^n), Space: O(n * 2^n)
function subsetsIterative(nums) {
    const result = [[]];
    
    for (let num of nums) {
        const size = result.length;
        for (let i = 0; i < size; i++) {
            result.push([...result[i], num]);
        }
    }
    
    return result;
}

module.exports = { subsets, subsetsIterative }; 