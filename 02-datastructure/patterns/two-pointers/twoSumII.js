/*
Two Sum II - Input Array Is Sorted (Two Pointers)
--------------------------------------------------
Given a sorted array of integers and a target, return the indices (1-based) of the two numbers such that they add up to the target.

Pattern: Two Pointers
We use two pointers from both ends to find the pair.

Example:
Input: numbers = [2,7,11,15], target = 9
Output: [1,2]

Time Complexity: O(n)
Space Complexity: O(1)
*/

function twoSumII(numbers, target) {
    let left = 0, right = numbers.length - 1;
    while (left < right) {
        const sum = numbers[left] + numbers[right];
        if (sum === target) return [left + 1, right + 1];
        if (sum < target) left++;
        else right--;
    }
    return [];
}

module.exports = twoSumII; 