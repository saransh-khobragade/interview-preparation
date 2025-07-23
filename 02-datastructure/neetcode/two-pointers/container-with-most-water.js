// Container With Most Water - LeetCode #11
// https://leetcode.com/problems/container-with-most-water/

/*
Problem: Given n non-negative integers height where each represents a point at coordinate (i, height[i]), 
find two lines that together with the x-axis form a container that would hold the maximum amount of water.

Example: [1,8,6,2,5,4,8,3,7] -> 49
*/

// Optimized Solution - Two Pointers
// Time: O(n), Space: O(1)
function maxArea(height) {
    let left = 0, right = height.length - 1;
    let maxArea = 0;
    
    while (left < right) {
        const width = right - left;
        const h = Math.min(height[left], height[right]);
        maxArea = Math.max(maxArea, width * h);
        
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }
    
    return maxArea;
}

module.exports = { maxArea }; 