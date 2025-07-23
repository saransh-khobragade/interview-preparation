/*
Dijkstra's Algorithm
---------------------
Dijkstra's Algorithm finds the shortest path from a starting node to all other nodes in a weighted graph with non-negative weights.

Time Complexity: O(V^2) (with simple array), can be improved to O((V+E) log V) with a min-heap
Space Complexity: O(V)
*/

function dijkstra(graph, start) {
    const distances = {};
    const visited = new Set();
    const queue = [{ vertex: start, distance: 0 }];
    for (const vertex in graph) {
        distances[vertex] = vertex === start ? 0 : Infinity;
    }
    while (queue.length > 0) {
        queue.sort((a, b) => a.distance - b.distance);
        const { vertex, distance } = queue.shift();
        if (visited.has(vertex)) continue;
        visited.add(vertex);
        for (const neighbor in graph[vertex]) {
            const newDistance = distance + graph[vertex][neighbor];
            if (newDistance < distances[neighbor]) {
                distances[neighbor] = newDistance;
                queue.push({ vertex: neighbor, distance: newDistance });
            }
        }
    }
    return distances;
}

module.exports = dijkstra; 