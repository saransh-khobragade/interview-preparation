/*
Depth First Search (DFS) Algorithm
----------------------------------
DFS is a graph traversal algorithm that explores as far as possible along each branch before backtracking. It can be implemented recursively or with a stack.

Time Complexity: O(V + E) where V is vertices and E is edges
Space Complexity: O(V)
*/

function dfs(graph, start, visited = new Set()) {
    visited.add(start);
    console.log(start);
    for (const neighbor of graph[start] || []) {
        if (!visited.has(neighbor)) {
            dfs(graph, neighbor, visited);
        }
    }
}

module.exports = dfs; 