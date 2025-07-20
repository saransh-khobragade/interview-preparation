// Invert Binary Tree - LeetCode #226
// https://leetcode.com/problems/invert-binary-tree/

/*
Problem: Given the root of a binary tree, invert the tree, and return its root.

Example: [4,2,7,1,3,6,9] -> [4,7,2,9,6,3,1]
*/

// Optimized Solution - DFS
// Time: O(n), Space: O(h) where h is height of tree
function invertTree(root) {
    if (!root) return null;
    
    // Swap left and right children
    const temp = root.left;
    root.left = root.right;
    root.right = temp;
    
    // Recursively invert subtrees
    invertTree(root.left);
    invertTree(root.right);
    
    return root;
}

// BFS Solution
// Time: O(n), Space: O(w) where w is max width
function invertTreeBFS(root) {
    if (!root) return null;
    
    const queue = [root];
    
    while (queue.length > 0) {
        const node = queue.shift();
        
        // Swap children
        const temp = node.left;
        node.left = node.right;
        node.right = temp;
        
        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
    }
    
    return root;
}

module.exports = { invertTree, invertTreeBFS }; 