/*
Subarray Sum Equals K (Prefix Sum)
-----------------------------------
Given an array of integers nums and an integer k, return the total number of continuous subarrays whose sum equals to k.

Pattern: Prefix Sum + Hash Map
We use a running sum and a hash map to count the number of times a prefix sum has occurred.

Example:
Input: nums = [1,1,1], k = 2
Output: 2 ([1,1] at positions 0-1 and 1-2)

Time Complexity: O(n)
Space Complexity: O(n)
*/

function subarraySum(nums, k) {
    let count = 0, sum = 0;
    const map = new Map();
    map.set(0, 1);
    for (let num of nums) {
        sum += num;
        if (map.has(sum - k)) count += map.get(sum - k);
        map.set(sum, (map.get(sum) || 0) + 1);
    }
    return count;
}

module.exports = subarraySum; 