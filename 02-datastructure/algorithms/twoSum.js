/*
Two Sum Algorithm
------------------
Finds indices of the two numbers in an array that add up to a specific target. Uses a hash map for efficient lookup.

Time Complexity: O(n)
Space Complexity: O(n)
*/

function twoSum(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        map.set(nums[i], i);
    }
    return [];
}

module.exports = twoSum; 