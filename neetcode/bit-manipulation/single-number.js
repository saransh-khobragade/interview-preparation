// Single Number - LeetCode #136
// https://leetcode.com/problems/single-number/

/*
Problem: Given a non-empty array of integers nums, every element appears twice except for one. 
Find that single one.

Example: [2,2,1] -> 1
*/

// Optimized Solution - XOR
// Time: O(n), Space: O(1)
function singleNumber(nums) {
    let result = 0;
    
    for (let num of nums) {
        result ^= num;
    }
    
    return result;
}

// Hash Map Solution
// Time: O(n), Space: O(n)
function singleNumberHash(nums) {
    const count = new Map();
    
    for (let num of nums) {
        count.set(num, (count.get(num) || 0) + 1);
    }
    
    for (let [num, freq] of count) {
        if (freq === 1) {
            return num;
        }
    }
    
    return -1;
}

module.exports = { singleNumber, singleNumberHash }; 