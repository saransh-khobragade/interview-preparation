# JavaScript Interview Questions & Patterns Collection

A comprehensive, modern collection of JavaScript interview questions, patterns, and implementations. Each file is short, crisp, and well-commented for fast learning and interview prep.

---

## 📁 File Reference & Topics

### Core JavaScript & Patterns (`01-javascript-questions/`)

| File | Description |
|------|-------------|
| [curry.js](01-javascript-questions/curry.js) | Function currying: transforms a function with multiple arguments into a sequence of functions each taking a single argument. |
| [currying.js](01-javascript-questions/currying.js) | Another currying implementation. |
| [curry.js](01-javascript-questions/curry.js) | Function currying example. |
| [debounce.js](01-javascript-questions/debounce.js) | Debounce: limits how often a function can fire. |
| [debounce-leading-trailing.js](01-javascript-questions/debounce-leading-trailing.js) | Debounce with leading/trailing options. |
| [basic-debouncing.js](01-javascript-questions/basic-debouncing.js) | Basic debounce implementation. |
| [throttle.js](01-javascript-questions/throttle.js) | Throttle: ensures a function is only called at most once every interval. |
| [basic-throttling.js](01-javascript-questions/basic-throttling.js) | Basic throttle implementation. |
| [promise.js](01-javascript-questions/promise.js) | Promise creation and usage example. |
| [promise-all.js](01-javascript-questions/promise-all.js) | Custom Promise.all implementation. |
| [promise-all-settled.js](01-javascript-questions/promise-all-settled.js) | Custom Promise.allSettled implementation. |
| [promise-any.js](01-javascript-questions/promise-any.js) | Custom Promise.any implementation. |
| [promise-race.js](01-javascript-questions/promise-race.js) | Custom Promise.race implementation. |
| [promises-in-sequence.js](01-javascript-questions/promises-in-sequence.js) | Execute an array of promise-returning functions in sequence. |
| [retry-promises-n-times.js](01-javascript-questions/retry-promises-n-times.js) | Retry a promise-returning function up to n times. |
| [cancelable-promise.js](01-javascript-questions/cancelable-promise.js) | Cancelable promise implementation. |
| [execute-tasks-in-parallel.js](01-javascript-questions/execute-tasks-in-parallel.js) | Run async tasks in parallel with concurrency limit. |
| [map-limit.js](01-javascript-questions/map-limit.js) | Async map with concurrency limit. |
| [flatten-array.js](01-javascript-questions/flatten-array.js) | Flatten a nested array recursively. |
| [deep-clone-object.js](01-javascript-questions/deep-clone-object.js) | Deep clone an object (recursively copies nested objects/arrays). |
| [object-flattening.js](01-javascript-questions/object-flattening.js) | Flatten a nested object to dot notation keys. |
| [json-stringify-vs-deep-copy.js](01-javascript-questions/json-stringify-vs-deep-copy.js) | Compare JSON deep copy vs reference copy. |
| [sorting-array.js](01-javascript-questions/sorting-array.js) | Sort an array of numbers. |
| [array-polyfills.js](01-javascript-questions/array-polyfills.js) | Polyfills for map, filter, reduce, forEach, find, some, every. |
| [pipe-and-compose.js](01-javascript-questions/pipe-and-compose.js) | Pipe and compose: function composition utilities. |
| [chain-calculator.js](01-javascript-questions/chain-calculator.js) | Chainable calculator: supports method chaining for arithmetic. |
| [typeahead-lru.js](01-javascript-questions/typeahead-lru.js) | LRU cache for typeahead/autocomplete. |
| [call-apply-bind.js](01-javascript-questions/call-apply-bind.js) | Examples of call, apply, and bind. |
| [prototype-inheritance.js](01-javascript-questions/prototype-inheritance.js) | Prototype inheritance example. |
| [prototype.js](01-javascript-questions/prototype.js) | Prototype chain and inheritance. |
| [closure.js](01-javascript-questions/closure.js) | Closure: function remembers its lexical scope. |
| [functional-programming.js](01-javascript-questions/functional-programming.js) | Pure functions, higher-order functions, immutability, composition. |
| [event-emitter.js](01-javascript-questions/event-emitter.js) | EventEmitter: on, off, emit, once. |
| [extended-event-emitter.js](01-javascript-questions/extended-event-emitter.js) | EventEmitter with extended features. |
| [react-dom-rendering-process.js](01-javascript-questions/react-dom-rendering-process.js) | Explains React's DOM rendering process. |
| [document-comparison.js](01-javascript-questions/document-comparison.js) | Shallow and deep object comparison. |

### Async & Utility Patterns

| File | Description |
|------|-------------|
| [async-await.js](01-javascript-questions/async-await.js) | Async/await usage example. |
| [pipe-and-compose.js](01-javascript-questions/pipe-and-compose.js) | Function composition (pipe, compose). |
| [retry-promises-n-times.js](01-javascript-questions/retry-promises-n-times.js) | Retry a promise-returning function. |
| [execute-tasks-in-parallel.js](01-javascript-questions/execute-tasks-in-parallel.js) | Parallel async execution with concurrency limit. |

### Data Structures (`02-datastructure/`)

| File | Description |
|------|-------------|
| [LinkedList.js](02-datastructure/LinkedList.js) | Singly linked list: append, prepend, delete, find, reverse. |
| [Stack.js](02-datastructure/Stack.js) | Stack (LIFO): push, pop, peek, isEmpty, size. |
| [Queue.js](02-datastructure/Queue.js) | Queue (FIFO): enqueue, dequeue, front, isEmpty, size. |
| [PriorityQueue.js](02-datastructure/PriorityQueue.js) | Priority queue: enqueue with priority, dequeue. |
| [BinarySearchTree.js](02-datastructure/BinarySearchTree.js) | Binary search tree: insert, search, remove, traversals. |
| [HashTable.js](02-datastructure/HashTable.js) | Hash table: set, get, keys, values. |
| [Graph.js](02-datastructure/Graph.js) | Graph: addVertex, addEdge, DFS, BFS. |
| [MinHeap.js](02-datastructure/MinHeap.js) | Min heap: insert, extractMin. |
| [Trie.js](02-datastructure/Trie.js) | Trie (prefix tree): insert, search, startsWith, delete. |
| [DisjointSet.js](02-datastructure/DisjointSet.js) | Disjoint set (union-find): find, union, connected. |

### Algorithms (`02-datastructure/algorithms/`)

- **Sorting:** [bubbleSort.js](02-datastructure/algorithms/bubbleSort.js), [selectionSort.js](02-datastructure/algorithms/selectionSort.js), [insertionSort.js](02-datastructure/algorithms/insertionSort.js), [mergeSort.js](02-datastructure/algorithms/mergeSort.js), [quickSort.js](02-datastructure/algorithms/quickSort.js)
- **Searching:** [binarySearch.js](02-datastructure/algorithms/binarySearch.js), [linearSearch.js](02-datastructure/algorithms/linearSearch.js)
- **Graph:** [dfs.js](02-datastructure/algorithms/dfs.js), [bfs.js](02-datastructure/algorithms/bfs.js), [dijkstra.js](02-datastructure/algorithms/dijkstra.js)
- **Math:** [fibonacci.js](02-datastructure/algorithms/fibonacci.js), [factorial.js](02-datastructure/algorithms/factorial.js), [gcd.js](02-datastructure/algorithms/gcd.js), [lcm.js](02-datastructure/algorithms/lcm.js), [isPrime.js](02-datastructure/algorithms/isPrime.js), [sieveOfEratosthenes.js](02-datastructure/algorithms/sieveOfEratosthenes.js)
- **Strings:** [isPalindrome.js](02-datastructure/algorithms/isPalindrome.js), [isAnagram.js](02-datastructure/algorithms/isAnagram.js), [getPermutations.js](02-datastructure/algorithms/getPermutations.js), [longestCommonSubsequence.js](02-datastructure/algorithms/longestCommonSubsequence.js)
- **Dynamic Programming:** [knapsack.js](02-datastructure/algorithms/knapsack.js), [coinChange.js](02-datastructure/algorithms/coinChange.js), [climbingStairs.js](02-datastructure/algorithms/climbingStairs.js), [houseRobber.js](02-datastructure/algorithms/houseRobber.js), [twoSum.js](02-datastructure/algorithms/twoSum.js)

Each file contains a short, crisp implementation and a comment block explaining the algorithm and its complexity.

### Patterns (`02-datastructure/patterns/`)

- **Sliding Window:** [longestSubstringWithoutRepeating.js](02-datastructure/patterns/sliding-windows/longestSubstringWithoutRepeating.js) — Find the longest substring without repeating characters.
- **Prefix Sum:** [subarraySumEqualsK.js](02-datastructure/patterns/prefix-sum/subarraySumEqualsK.js) — Count subarrays with sum equal to k.
- **Monotonic Stack:** [dailyTemperatures.js](02-datastructure/patterns/monotonic-stack/dailyTemperatures.js) — Find days until a warmer temperature.
- **Top-K Elements:** [topKFrequentElements.js](02-datastructure/patterns/top-k-elements/topKFrequentElements.js) — Find the k most frequent elements.
- **Dynamic Programming:** [coinChange.js](02-datastructure/patterns/dynamic-programing/coinChange.js) — Minimum coins for change.
- **Binary Search:** [searchInRotatedSortedArray.js](02-datastructure/patterns/binary-search/searchInRotatedSortedArray.js) — Search in rotated sorted array.
- **Fast and Slow Pointers:** [linkedListCycle.js](02-datastructure/patterns/fast-and-slow-pointers/linkedListCycle.js) — Detect cycle in linked list.
- **Two Pointers:** [twoSumII.js](02-datastructure/patterns/two-pointers/twoSumII.js) — Find two numbers that add up to a target in a sorted array.

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