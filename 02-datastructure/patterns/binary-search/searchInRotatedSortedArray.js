/*
Search in Rotated Sorted Array (Binary Search)
-----------------------------------------------
Given a rotated sorted array and a target value, return the index if the target is found. If not, return -1.

Pattern: Binary Search
We use a modified binary search to account for the rotation.

Example:
Input: nums = [4,5,6,7,0,1,2], target = 0
Output: 4

Time Complexity: O(log n)
Space Complexity: O(1)
*/

function searchInRotatedSortedArray(nums, target) {
    let left = 0, right = nums.length - 1;
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (nums[mid] === target) return mid;
        if (nums[left] <= nums[mid]) {
            if (target >= nums[left] && target < nums[mid]) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        } else {
            if (target > nums[mid] && target <= nums[right]) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }
    return -1;
}

module.exports = searchInRotatedSortedArray; 