// Maximum Depth of Binary Tree - LeetCode #104
// https://leetcode.com/problems/maximum-depth-of-binary-tree/

/*
Problem: Given the root of a binary tree, return its maximum depth.

Example: [3,9,20,null,null,15,7] -> 3
*/

// Optimized Solution - DFS
// Time: O(n), Space: O(h) where h is height of tree
function maxDepth(root) {
    if (!root) return 0;
    
    return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
}

// BFS Solution
// Time: O(n), Space: O(w) where w is max width
function maxDepthBFS(root) {
    if (!root) return 0;
    
    const queue = [root];
    let depth = 0;
    
    while (queue.length > 0) {
        const levelSize = queue.length;
        
        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        
        depth++;
    }
    
    return depth;
}

module.exports = { maxDepth, maxDepthBFS }; 