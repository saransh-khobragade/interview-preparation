// Rotate Image - LeetCode #48
// https://leetcode.com/problems/rotate-image/

/*
Problem: You are given an n x n 2D matrix representing an image, rotate the image by 90 degrees (clockwise).

Example: [[1,2,3],[4,5,6],[7,8,9]] -> [[7,4,1],[8,5,2],[9,6,3]]
*/

// Optimized Solution - Transpose + Reverse
// Time: O(n²), Space: O(1)
function rotate(matrix) {
    const n = matrix.length;
    
    // Transpose the matrix
    for (let i = 0; i < n; i++) {
        for (let j = i; j < n; j++) {
            [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
        }
    }
    
    // Reverse each row
    for (let i = 0; i < n; i++) {
        matrix[i].reverse();
    }
}

// Layer by Layer Solution
// Time: O(n²), Space: O(1)
function rotateLayer(matrix) {
    const n = matrix.length;
    
    for (let layer = 0; layer < Math.floor(n / 2); layer++) {
        for (let i = layer; i < n - 1 - layer; i++) {
            const temp = matrix[layer][i];
            matrix[layer][i] = matrix[n - 1 - i][layer];
            matrix[n - 1 - i][layer] = matrix[n - 1 - layer][n - 1 - i];
            matrix[n - 1 - layer][n - 1 - i] = matrix[i][n - 1 - layer];
            matrix[i][n - 1 - layer] = temp;
        }
    }
}

module.exports = { rotate, rotateLayer }; 