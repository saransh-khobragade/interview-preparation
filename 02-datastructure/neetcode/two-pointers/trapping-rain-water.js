// Trapping Rain Water - LeetCode #42
// https://leetcode.com/problems/trapping-rain-water/

/*
Problem: Given n non-negative integers representing an elevation map where the width of each bar is 1, 
compute how much water it can trap after raining.

Example: [0,1,0,2,1,0,1,3,2,1,2,1] -> 6
*/

// Optimized Solution - Two Pointers
// Time: O(n), Space: O(1)
function trap(height) {
    let left = 0, right = height.length - 1;
    let leftMax = 0, rightMax = 0;
    let water = 0;
    
    while (left < right) {
        if (height[left] < height[right]) {
            if (height[left] >= leftMax) {
                leftMax = height[left];
            } else {
                water += leftMax - height[left];
            }
            left++;
        } else {
            if (height[right] >= rightMax) {
                rightMax = height[right];
            } else {
                water += rightMax - height[right];
            }
            right--;
        }
    }
    
    return water;
}

module.exports = { trap }; 