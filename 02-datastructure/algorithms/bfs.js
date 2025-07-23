/*
Breadth First Search (BFS) Algorithm
------------------------------------
BFS is a graph traversal algorithm that explores all neighbors at the present depth prior to moving on to nodes at the next depth level. It uses a queue.

Time Complexity: O(V + E) where V is vertices and E is edges
Space Complexity: O(V)
*/

function bfs(graph, start) {
    const queue = [start];
    const visited = new Set([start]);
    while (queue.length > 0) {
        const vertex = queue.shift();
        console.log(vertex);
        for (const neighbor of graph[vertex] || []) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push(neighbor);
            }
        }
    }
}

module.exports = bfs; 