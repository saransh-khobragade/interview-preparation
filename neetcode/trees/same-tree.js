// Same Tree - LeetCode #100
// https://leetcode.com/problems/same-tree/

/*
Problem: Given the roots of two binary trees p and q, write a function to check if they are the same or not.

Example: [1,2,3] and [1,2,3] -> true
*/

// Optimized Solution - DFS
// Time: O(n), Space: O(h) where h is height of tree
function isSameTree(p, q) {
    if (!p && !q) return true;
    if (!p || !q) return false;
    
    return p.val === q.val && 
           isSameTree(p.left, q.left) && 
           isSameTree(p.right, q.right);
}

// BFS Solution
// Time: O(n), Space: O(w) where w is max width
function isSameTreeBFS(p, q) {
    const queue = [[p, q]];
    
    while (queue.length > 0) {
        const [node1, node2] = queue.shift();
        
        if (!node1 && !node2) continue;
        if (!node1 || !node2) return false;
        if (node1.val !== node2.val) return false;
        
        queue.push([node1.left, node2.left]);
        queue.push([node1.right, node2.right]);
    }
    
    return true;
}

module.exports = { isSameTree, isSameTreeBFS }; 