// Longest Consecutive Sequence - LeetCode #128
// https://leetcode.com/problems/longest-consecutive-sequence/

/*
Problem: Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence.

Example: [100,4,200,1,3,2] -> 4 (sequence [1,2,3,4])
*/

// Optimized Solution - Set
// Time: O(n), Space: O(n)
function longestConsecutive(nums) {
    const set = new Set(nums);
    let maxLength = 0;
    
    for (let num of set) {
        // Only start counting if this is the start of a sequence
        if (!set.has(num - 1)) {
            let currentLength = 1;
            let currentNum = num + 1;
            
            while (set.has(currentNum)) {
                currentLength++;
                currentNum++;
            }
            
            maxLength = Math.max(maxLength, currentLength);
        }
    }
    
    return maxLength;
}

module.exports = { longestConsecutive }; 