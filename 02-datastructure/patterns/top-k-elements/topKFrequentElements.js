/*
Top K Frequent Elements (Heap/Hash Map)
----------------------------------------
Given an integer array nums and an integer k, return the k most frequent elements.

Pattern: Heap / Hash Map
We use a hash map to count frequencies and a min-heap to keep the top k elements.

Example:
Input: nums = [1,1,1,2,2,3], k = 2
Output: [1,2]

Time Complexity: O(n log k)
Space Complexity: O(n)
*/

function topKFrequent(nums, k) {
    const freq = new Map();
    for (let num of nums) freq.set(num, (freq.get(num) || 0) + 1);
    return Array.from(freq.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, k)
        .map(x => x[0]);
}

module.exports = topKFrequent; 