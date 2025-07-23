// Search in Rotated Sorted Array - LeetCode #33
// https://leetcode.com/problems/search-in-rotated-sorted-array/

/*
Problem: There is an integer array nums sorted in ascending order (with distinct values). Prior to being passed 
to your function, nums is possibly rotated at an unknown pivot index k (1 <= k < nums.length).

Example: [4,5,6,7,0,1,2], target = 0 -> 4
*/

// Optimized Solution - Binary Search
// Time: O(log n), Space: O(1)
function search(nums, target) {
    let left = 0, right = nums.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (nums[mid] === target) return mid;
        
        // Check if left half is sorted
        if (nums[left] <= nums[mid]) {
            if (nums[left] <= target && target < nums[mid]) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        } else {
            // Right half is sorted
            if (nums[mid] < target && target <= nums[right]) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }
    
    return -1;
}

module.exports = { search }; 