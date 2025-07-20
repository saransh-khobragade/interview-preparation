// Data Structures in JavaScript
// Common data structures and their implementations

// Method 1: Linked List
class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }
    
    append(data) {
        const newNode = new Node(data);
        
        if (!this.head) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = newNode;
        }
        this.size++;
    }
    
    prepend(data) {
        const newNode = new Node(data);
        newNode.next = this.head;
        this.head = newNode;
        this.size++;
    }
    
    delete(data) {
        if (!this.head) return;
        
        if (this.head.data === data) {
            this.head = this.head.next;
            this.size--;
            return;
        }
        
        let current = this.head;
        while (current.next) {
            if (current.next.data === data) {
                current.next = current.next.next;
                this.size--;
                return;
            }
            current = current.next;
        }
    }
    
    find(data) {
        let current = this.head;
        while (current) {
            if (current.data === data) {
                return current;
            }
            current = current.next;
        }
        return null;
    }
    
    toArray() {
        const result = [];
        let current = this.head;
        while (current) {
            result.push(current.data);
            current = current.next;
        }
        return result;
    }
    
    reverse() {
        let prev = null;
        let current = this.head;
        let next = null;
        
        while (current) {
            next = current.next;
            current.next = prev;
            prev = current;
            current = next;
        }
        
        this.head = prev;
    }
}

// Method 2: Stack
class Stack {
    constructor() {
        this.items = [];
    }
    
    push(element) {
        this.items.push(element);
    }
    
    pop() {
        if (this.isEmpty()) {
            return 'Underflow';
        }
        return this.items.pop();
    }
    
    peek() {
        if (this.isEmpty()) {
            return 'Stack is empty';
        }
        return this.items[this.items.length - 1];
    }
    
    isEmpty() {
        return this.items.length === 0;
    }
    
    size() {
        return this.items.length;
    }
    
    clear() {
        this.items = [];
    }
    
    toArray() {
        return [...this.items];
    }
}

// Method 3: Queue
class Queue {
    constructor() {
        this.items = [];
    }
    
    enqueue(element) {
        this.items.push(element);
    }
    
    dequeue() {
        if (this.isEmpty()) {
            return 'Underflow';
        }
        return this.items.shift();
    }
    
    front() {
        if (this.isEmpty()) {
            return 'Queue is empty';
        }
        return this.items[0];
    }
    
    isEmpty() {
        return this.items.length === 0;
    }
    
    size() {
        return this.items.length;
    }
    
    clear() {
        this.items = [];
    }
    
    toArray() {
        return [...this.items];
    }
}

// Method 4: Priority Queue
class PriorityQueue {
    constructor() {
        this.items = [];
    }
    
    enqueue(element, priority) {
        const queueElement = { element, priority };
        let added = false;
        
        for (let i = 0; i < this.items.length; i++) {
            if (queueElement.priority < this.items[i].priority) {
                this.items.splice(i, 0, queueElement);
                added = true;
                break;
            }
        }
        
        if (!added) {
            this.items.push(queueElement);
        }
    }
    
    dequeue() {
        if (this.isEmpty()) {
            return 'Underflow';
        }
        return this.items.shift().element;
    }
    
    front() {
        if (this.isEmpty()) {
            return 'Queue is empty';
        }
        return this.items[0].element;
    }
    
    isEmpty() {
        return this.items.length === 0;
    }
    
    size() {
        return this.items.length;
    }
    
    toArray() {
        return this.items.map(item => item.element);
    }
}

// Method 5: Binary Search Tree
class TreeNode {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null;
    }
    
    insert(data) {
        const newNode = new TreeNode(data);
        
        if (!this.root) {
            this.root = newNode;
            return;
        }
        
        this.insertNode(this.root, newNode);
    }
    
    insertNode(node, newNode) {
        if (newNode.data < node.data) {
            if (!node.left) {
                node.left = newNode;
            } else {
                this.insertNode(node.left, newNode);
            }
        } else {
            if (!node.right) {
                node.right = newNode;
            } else {
                this.insertNode(node.right, newNode);
            }
        }
    }
    
    search(data) {
        return this.searchNode(this.root, data);
    }
    
    searchNode(node, data) {
        if (!node) return null;
        
        if (data < node.data) {
            return this.searchNode(node.left, data);
        } else if (data > node.data) {
            return this.searchNode(node.right, data);
        } else {
            return node;
        }
    }
    
    remove(data) {
        this.root = this.removeNode(this.root, data);
    }
    
    removeNode(node, data) {
        if (!node) return null;
        
        if (data < node.data) {
            node.left = this.removeNode(node.left, data);
        } else if (data > node.data) {
            node.right = this.removeNode(node.right, data);
        } else {
            if (!node.left && !node.right) {
                return null;
            } else if (!node.left) {
                return node.right;
            } else if (!node.right) {
                return node.left;
            } else {
                const minNode = this.findMin(node.right);
                node.data = minNode.data;
                node.right = this.removeNode(node.right, minNode.data);
            }
        }
        
        return node;
    }
    
    findMin(node) {
        while (node.left) {
            node = node.left;
        }
        return node;
    }
    
    inOrderTraversal(node = this.root, result = []) {
        if (node) {
            this.inOrderTraversal(node.left, result);
            result.push(node.data);
            this.inOrderTraversal(node.right, result);
        }
        return result;
    }
    
    preOrderTraversal(node = this.root, result = []) {
        if (node) {
            result.push(node.data);
            this.preOrderTraversal(node.left, result);
            this.preOrderTraversal(node.right, result);
        }
        return result;
    }
    
    postOrderTraversal(node = this.root, result = []) {
        if (node) {
            this.postOrderTraversal(node.left, result);
            this.postOrderTraversal(node.right, result);
            result.push(node.data);
        }
        return result;
    }
}

// Method 6: Hash Table
class HashTable {
    constructor(size = 53) {
        this.keyMap = new Array(size);
    }
    
    _hash(key) {
        let total = 0;
        let WEIRD_PRIME = 31;
        
        for (let i = 0; i < Math.min(key.length, 100); i++) {
            let char = key[i];
            let value = char.charCodeAt(0) - 96;
            total = (total * WEIRD_PRIME + value) % this.keyMap.length;
        }
        
        return total;
    }
    
    set(key, value) {
        let index = this._hash(key);
        
        if (!this.keyMap[index]) {
            this.keyMap[index] = [];
        }
        
        this.keyMap[index].push([key, value]);
    }
    
    get(key) {
        let index = this._hash(key);
        
        if (this.keyMap[index]) {
            for (let i = 0; i < this.keyMap[index].length; i++) {
                if (this.keyMap[index][i][0] === key) {
                    return this.keyMap[index][i][1];
                }
            }
        }
        
        return undefined;
    }
    
    keys() {
        let keysArr = [];
        
        for (let i = 0; i < this.keyMap.length; i++) {
            if (this.keyMap[i]) {
                for (let j = 0; j < this.keyMap[i].length; j++) {
                    if (!keysArr.includes(this.keyMap[i][j][0])) {
                        keysArr.push(this.keyMap[i][j][0]);
                    }
                }
            }
        }
        
        return keysArr;
    }
    
    values() {
        let valuesArr = [];
        
        for (let i = 0; i < this.keyMap.length; i++) {
            if (this.keyMap[i]) {
                for (let j = 0; j < this.keyMap[i].length; j++) {
                    if (!valuesArr.includes(this.keyMap[i][j][1])) {
                        valuesArr.push(this.keyMap[i][j][1]);
                    }
                }
            }
        }
        
        return valuesArr;
    }
}

// Method 7: Graph
class Graph {
    constructor() {
        this.adjacencyList = {};
    }
    
    addVertex(vertex) {
        if (!this.adjacencyList[vertex]) {
            this.adjacencyList[vertex] = [];
        }
    }
    
    addEdge(vertex1, vertex2) {
        this.adjacencyList[vertex1].push(vertex2);
        this.adjacencyList[vertex2].push(vertex1);
    }
    
    removeEdge(vertex1, vertex2) {
        this.adjacencyList[vertex1] = this.adjacencyList[vertex1].filter(
            v => v !== vertex2
        );
        this.adjacencyList[vertex2] = this.adjacencyList[vertex2].filter(
            v => v !== vertex1
        );
    }
    
    removeVertex(vertex) {
        while (this.adjacencyList[vertex].length) {
            const adjacentVertex = this.adjacencyList[vertex].pop();
            this.removeEdge(vertex, adjacentVertex);
        }
        delete this.adjacencyList[vertex];
    }
    
    depthFirstSearch(start) {
        const result = [];
        const visited = {};
        const adjacencyList = this.adjacencyList;
        
        (function dfs(vertex) {
            if (!vertex) return null;
            visited[vertex] = true;
            result.push(vertex);
            
            adjacencyList[vertex].forEach(neighbor => {
                if (!visited[neighbor]) {
                    return dfs(neighbor);
                }
            });
        })(start);
        
        return result;
    }
    
    breadthFirstSearch(start) {
        const queue = [start];
        const result = [];
        const visited = {};
        let currentVertex;
        
        visited[start] = true;
        
        while (queue.length) {
            currentVertex = queue.shift();
            result.push(currentVertex);
            
            this.adjacencyList[currentVertex].forEach(neighbor => {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    queue.push(neighbor);
                }
            });
        }
        
        return result;
    }
}

// Method 8: Heap (Min Heap)
class MinHeap {
    constructor() {
        this.values = [];
    }
    
    insert(element) {
        this.values.push(element);
        this.bubbleUp();
    }
    
    bubbleUp() {
        let idx = this.values.length - 1;
        const element = this.values[idx];
        
        while (idx > 0) {
            let parentIdx = Math.floor((idx - 1) / 2);
            let parent = this.values[parentIdx];
            
            if (element >= parent) break;
            
            this.values[parentIdx] = element;
            this.values[idx] = parent;
            idx = parentIdx;
        }
    }
    
    extractMin() {
        const min = this.values[0];
        const end = this.values.pop();
        
        if (this.values.length > 0) {
            this.values[0] = end;
            this.sinkDown();
        }
        
        return min;
    }
    
    sinkDown() {
        let idx = 0;
        const length = this.values.length;
        const element = this.values[0];
        
        while (true) {
            let leftChildIdx = 2 * idx + 1;
            let rightChildIdx = 2 * idx + 2;
            let leftChild, rightChild;
            let swap = null;
            
            if (leftChildIdx < length) {
                leftChild = this.values[leftChildIdx];
                if (leftChild < element) {
                    swap = leftChildIdx;
                }
            }
            
            if (rightChildIdx < length) {
                rightChild = this.values[rightChildIdx];
                if (
                    (swap === null && rightChild < element) ||
                    (swap !== null && rightChild < leftChild)
                ) {
                    swap = rightChildIdx;
                }
            }
            
            if (swap === null) break;
            
            this.values[idx] = this.values[swap];
            this.values[swap] = element;
            idx = swap;
        }
    }
}

// Method 9: Trie (Prefix Tree)
class TrieNode {
    constructor() {
        this.children = {};
        this.isEndOfWord = false;
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }
    
    insert(word) {
        let current = this.root;
        
        for (let char of word) {
            if (!current.children[char]) {
                current.children[char] = new TrieNode();
            }
            current = current.children[char];
        }
        
        current.isEndOfWord = true;
    }
    
    search(word) {
        let current = this.root;
        
        for (let char of word) {
            if (!current.children[char]) {
                return false;
            }
            current = current.children[char];
        }
        
        return current.isEndOfWord;
    }
    
    startsWith(prefix) {
        let current = this.root;
        
        for (let char of prefix) {
            if (!current.children[char]) {
                return false;
            }
            current = current.children[char];
        }
        
        return true;
    }
    
    delete(word) {
        this.deleteRecursive(this.root, word, 0);
    }
    
    deleteRecursive(node, word, index) {
        if (!node) return false;
        
        if (index === word.length) {
            if (!node.isEndOfWord) return false;
            
            node.isEndOfWord = false;
            return Object.keys(node.children).length === 0;
        }
        
        const char = word[index];
        const shouldDelete = this.deleteRecursive(node.children[char], word, index + 1);
        
        if (shouldDelete) {
            delete node.children[char];
            return Object.keys(node.children).length === 0;
        }
        
        return false;
    }
}

// Method 10: Disjoint Set (Union Find)
class DisjointSet {
    constructor(size) {
        this.parent = new Array(size);
        this.rank = new Array(size);
        
        for (let i = 0; i < size; i++) {
            this.parent[i] = i;
            this.rank[i] = 0;
        }
    }
    
    find(x) {
        if (this.parent[x] !== x) {
            this.parent[x] = this.find(this.parent[x]);
        }
        return this.parent[x];
    }
    
    union(x, y) {
        const rootX = this.find(x);
        const rootY = this.find(y);
        
        if (rootX === rootY) return;
        
        if (this.rank[rootX] < this.rank[rootY]) {
            this.parent[rootX] = rootY;
        } else if (this.rank[rootX] > this.rank[rootY]) {
            this.parent[rootY] = rootX;
        } else {
            this.parent[rootY] = rootX;
            this.rank[rootX]++;
        }
    }
    
    connected(x, y) {
        return this.find(x) === this.find(y);
    }
}

// Real-world examples

// Example 1: Linked List usage
const list = new LinkedList();
list.append(1);
list.append(2);
list.append(3);
list.prepend(0);
console.log(list.toArray()); // [0, 1, 2, 3]
list.reverse();
console.log(list.toArray()); // [3, 2, 1, 0]

// Example 2: Stack usage
const stack = new Stack();
stack.push(1);
stack.push(2);
stack.push(3);
console.log(stack.pop()); // 3
console.log(stack.peek()); // 2

// Example 3: Queue usage
const queue = new Queue();
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);
console.log(queue.dequeue()); // 1
console.log(queue.front()); // 2

// Example 4: Priority Queue usage
const pq = new PriorityQueue();
pq.enqueue('Task 1', 3);
pq.enqueue('Task 2', 1);
pq.enqueue('Task 3', 2);
console.log(pq.dequeue()); // Task 2 (highest priority)

// Example 5: Binary Search Tree usage
const bst = new BinarySearchTree();
bst.insert(10);
bst.insert(5);
bst.insert(15);
bst.insert(3);
bst.insert(7);
console.log(bst.inOrderTraversal()); // [3, 5, 7, 10, 15]

// Example 6: Hash Table usage
const ht = new HashTable();
ht.set('name', 'John');
ht.set('age', 30);
ht.set('city', 'New York');
console.log(ht.get('name')); // John
console.log(ht.keys()); // ['name', 'age', 'city']

// Example 7: Graph usage
const graph = new Graph();
graph.addVertex('A');
graph.addVertex('B');
graph.addVertex('C');
graph.addEdge('A', 'B');
graph.addEdge('B', 'C');
console.log(graph.depthFirstSearch('A')); // ['A', 'B', 'C']

// Example 8: Min Heap usage
const heap = new MinHeap();
heap.insert(41);
heap.insert(39);
heap.insert(33);
heap.insert(18);
heap.insert(27);
heap.insert(12);
console.log(heap.extractMin()); // 12

// Example 9: Trie usage
const trie = new Trie();
trie.insert('hello');
trie.insert('world');
console.log(trie.search('hello')); // true
console.log(trie.startsWith('he')); // true

// Example 10: Disjoint Set usage
const ds = new DisjointSet(5);
ds.union(0, 1);
ds.union(2, 3);
ds.union(1, 2);
console.log(ds.connected(0, 3)); // true

// Export for testing
module.exports = {
    Node,
    LinkedList,
    Stack,
    Queue,
    PriorityQueue,
    TreeNode,
    BinarySearchTree,
    HashTable,
    Graph,
    MinHeap,
    TrieNode,
    Trie,
    DisjointSet
}; 