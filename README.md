# JavaScript Interview Questions & Patterns Collection

A comprehensive, modern collection of JavaScript interview questions, patterns, and implementations. Each file is short, crisp, and well-commented for fast learning and interview prep.

---

## 📁 File Reference & Topics

### Core JavaScript & Patterns (`01-javascript-questions/`)

| File | Description |
|------|-------------|
| `curry.js` | Function currying: transforms a function with multiple arguments into a sequence of functions each taking a single argument. |
| `currying.js` | Another currying implementation. |
| `curry.js` | Function currying example. |
| `debounce.js` | Debounce: limits how often a function can fire. |
| `debounce-leading-trailing.js` | Debounce with leading/trailing options. |
| `basic-debouncing.js` | Basic debounce implementation. |
| `throttle.js` | Throttle: ensures a function is only called at most once every interval. |
| `basic-throttling.js` | Basic throttle implementation. |
| `promise.js` | Promise creation and usage example. |
| `promise-all.js` | Custom Promise.all implementation. |
| `promise-all-settled.js` | Custom Promise.allSettled implementation. |
| `promise-any.js` | Custom Promise.any implementation. |
| `promise-race.js` | Custom Promise.race implementation. |
| `promises-in-sequence.js` | Execute an array of promise-returning functions in sequence. |
| `retry-promises-n-times.js` | Retry a promise-returning function up to n times. |
| `cancelable-promise.js` | Cancelable promise implementation. |
| `execute-tasks-in-parallel.js` | Run async tasks in parallel with concurrency limit. |
| `map-limit.js` | Async map with concurrency limit. |
| `flatten-array.js` | Flatten a nested array recursively. |
| `deep-clone-object.js` | Deep clone an object (recursively copies nested objects/arrays). |
| `object-flattening.js` | Flatten a nested object to dot notation keys. |
| `json-stringify-vs-deep-copy.js` | Compare JSON deep copy vs reference copy. |
| `sorting-array.js` | Sort an array of numbers. |
| `array-polyfills.js` | Polyfills for map, filter, reduce, forEach, find, some, every. |
| `pipe-and-compose.js` | Pipe and compose: function composition utilities. |
| `chain-calculator.js` | Chainable calculator: supports method chaining for arithmetic. |
| `typeahead-lru.js` | LRU cache for typeahead/autocomplete. |
| `call-apply-bind.js` | Examples of call, apply, and bind. |
| `prototype-inheritance.js` | Prototype inheritance example. |
| `prototype.js` | Prototype chain and inheritance. |
| `closure.js` | Closure: function remembers its lexical scope. |
| `functional-programming.js` | Pure functions, higher-order functions, immutability, composition. |
| `event-emitter.js` | EventEmitter: on, off, emit, once. |
| `extended-event-emitter.js` | EventEmitter with extended features. |
| `react-dom-rendering-process.js` | Explains React's DOM rendering process. |
| `document-comparison.js` | Shallow and deep object comparison. |

### Async & Utility Patterns

| File | Description |
|------|-------------|
| `async-await.js` | Async/await usage example. |
| `pipe-and-compose.js` | Function composition (pipe, compose). |
| `retry-promises-n-times.js` | Retry a promise-returning function. |
| `execute-tasks-in-parallel.js` | Parallel async execution with concurrency limit. |

### Data Structures (`02-datastructure/`)

| File | Description |
|------|-------------|
| `LinkedList.js` | Singly linked list: append, prepend, delete, find, reverse. |
| `Stack.js` | Stack (LIFO): push, pop, peek, isEmpty, size. |
| `Queue.js` | Queue (FIFO): enqueue, dequeue, front, isEmpty, size. |
| `PriorityQueue.js` | Priority queue: enqueue with priority, dequeue. |
| `BinarySearchTree.js` | Binary search tree: insert, search, remove, traversals. |
| `HashTable.js` | Hash table: set, get, keys, values. |
| `Graph.js` | Graph: addVertex, addEdge, DFS, BFS. |
| `MinHeap.js` | Min heap: insert, extractMin. |
| `Trie.js` | Trie (prefix tree): insert, search, startsWith, delete. |
| `DisjointSet.js` | Disjoint set (union-find): find, union, connected. |

### Algorithms (`02-datastructure/algorithms/`)

- **Sorting:** `bubbleSort.js`, `selectionSort.js`, `insertionSort.js`, `mergeSort.js`, `quickSort.js`
- **Searching:** `binarySearch.js`, `linearSearch.js`
- **Graph:** `dfs.js`, `bfs.js`, `dijkstra.js`
- **Math:** `fibonacci.js`, `factorial.js`, `gcd.js`, `lcm.js`, `isPrime.js`, `sieveOfEratosthenes.js`
- **Strings:** `isPalindrome.js`, `isAnagram.js`, `getPermutations.js`, `longestCommonSubsequence.js`
- **Dynamic Programming:** `knapsack.js`, `coinChange.js`, `climbingStairs.js`, `houseRobber.js`, `twoSum.js`

Each file contains a short, crisp implementation and a comment block explaining the algorithm and its complexity.

### Patterns (`02-datastructure/patterns/`)

- **Sliding Window:** `sliding-windows/longestSubstringWithoutRepeating.js` — Find the longest substring without repeating characters.
- **Prefix Sum:** `prefix-sum/subarraySumEqualsK.js` — Count subarrays with sum equal to k.
- **Monotonic Stack:** `monotonic-stack/dailyTemperatures.js` — Find days until a warmer temperature.
- **Top-K Elements:** `top-k-elements/topKFrequentElements.js` — Find the k most frequent elements.
- **Dynamic Programming:** `dynamic-programing/coinChange.js` — Minimum coins for change.
- **Binary Search:** `binary-search/searchInRotatedSortedArray.js` — Search in rotated sorted array.
- **Fast and Slow Pointers:** `fast-and-slow-pointers/linkedListCycle.js` — Detect cycle in linked list.
- **Two Pointers:** `two-pointers/twoSumII.js` — Find two numbers that add up to a target in a sorted array.

---

## 🚀 Quick Start

```bash
# Run individual files
node 01-javascript-questions/curry.js
node 01-javascript-questions/debounce.js
node 02-datastructure/algorithms/mergeSort.js
```

---

## 🎯 Interview Tips

- Start with the simplest solution, then optimize.
- Explain your approach and trade-offs.
- Use real examples and handle edge cases.
- Practice with these files to master core patterns.

---

**Happy Coding & Interviewing!** 