// Number of Islands - LeetCode #200
// https://leetcode.com/problems/number-of-islands/

/*
Problem: Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), 
return the number of islands.

Example: 
[
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
] -> 3
*/

// Optimized Solution - DFS
// Time: O(m*n), Space: O(m*n) - worst case recursion stack
function numIslands(grid) {
    if (!grid || grid.length === 0) return 0;
    
    const m = grid.length;
    const n = grid[0].length;
    let count = 0;
    
    function dfs(i, j) {
        if (i < 0 || i >= m || j < 0 || j >= n || grid[i][j] === '0') {
            return;
        }
        
        grid[i][j] = '0'; // Mark as visited
        
        // Explore all 4 directions
        dfs(i + 1, j);
        dfs(i - 1, j);
        dfs(i, j + 1);
        dfs(i, j - 1);
    }
    
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === '1') {
                count++;
                dfs(i, j);
            }
        }
    }
    
    return count;
}

// BFS Solution
// Time: O(m*n), Space: O(min(m,n))
function numIslandsBFS(grid) {
    if (!grid || grid.length === 0) return 0;
    
    const m = grid.length;
    const n = grid[0].length;
    let count = 0;
    
    function bfs(i, j) {
        const queue = [[i, j]];
        const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];
        
        while (queue.length > 0) {
            const [row, col] = queue.shift();
            
            for (let [dr, dc] of directions) {
                const newRow = row + dr;
                const newCol = col + dc;
                
                if (newRow >= 0 && newRow < m && newCol >= 0 && newCol < n && grid[newRow][newCol] === '1') {
                    grid[newRow][newCol] = '0';
                    queue.push([newRow, newCol]);
                }
            }
        }
    }
    
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === '1') {
                count++;
                grid[i][j] = '0';
                bfs(i, j);
            }
        }
    }
    
    return count;
}

module.exports = { numIslands, numIslandsBFS }; 