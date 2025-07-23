// Permutations - LeetCode #46
// https://leetcode.com/problems/permutations/

/*
Problem: Given an array nums of distinct integers, return all the possible permutations.

Example: [1,2,3] -> [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
*/

// Optimized Solution - Backtracking
// Time: O(n!), Space: O(n)
function permute(nums) {
    const result = [];
    
    function backtrack(current) {
        if (current.length === nums.length) {
            result.push([...current]);
            return;
        }
        
        for (let i = 0; i < nums.length; i++) {
            if (!current.includes(nums[i])) {
                current.push(nums[i]);
                backtrack(current);
                current.pop();
            }
        }
    }
    
    backtrack([]);
    return result;
}

// Iterative Solution
// Time: O(n!), Space: O(n!)
function permuteIterative(nums) {
    const result = [[]];
    
    for (let num of nums) {
        const size = result.length;
        
        for (let i = 0; i < size; i++) {
            const current = result.shift();
            
            for (let j = 0; j <= current.length; j++) {
                const newPerm = [...current.slice(0, j), num, ...current.slice(j)];
                result.push(newPerm);
            }
        }
    }
    
    return result;
}

module.exports = { permute, permuteIterative }; 