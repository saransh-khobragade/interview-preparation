// Common Algorithms in JavaScript
// Sorting, searching, and other algorithmic patterns

// Method 1: Bubble Sort
function bubbleSort(arr) {
    const n = arr.length;
    const result = [...arr];
    
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (result[j] > result[j + 1]) {
                [result[j], result[j + 1]] = [result[j + 1], result[j]];
            }
        }
    }
    
    return result;
}

// Method 2: Selection Sort
function selectionSort(arr) {
    const result = [...arr];
    const n = result.length;
    
    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        
        for (let j = i + 1; j < n; j++) {
            if (result[j] < result[minIndex]) {
                minIndex = j;
            }
        }
        
        if (minIndex !== i) {
            [result[i], result[minIndex]] = [result[minIndex], result[i]];
        }
    }
    
    return result;
}

// Method 3: Insertion Sort
function insertionSort(arr) {
    const result = [...arr];
    const n = result.length;
    
    for (let i = 1; i < n; i++) {
        let current = result[i];
        let j = i - 1;
        
        while (j >= 0 && result[j] > current) {
            result[j + 1] = result[j];
            j--;
        }
        
        result[j + 1] = current;
    }
    
    return result;
}

// Method 4: Merge Sort
function mergeSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }
    
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));
    
    return merge(left, right);
}

function merge(left, right) {
    const result = [];
    let i = 0, j = 0;
    
    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            result.push(left[i]);
            i++;
        } else {
            result.push(right[j]);
            j++;
        }
    }
    
    while (i < left.length) {
        result.push(left[i]);
        i++;
    }
    
    while (j < right.length) {
        result.push(right[j]);
        j++;
    }
    
    return result;
}

// Method 5: Quick Sort
function quickSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }
    
    const pivot = arr[Math.floor(arr.length / 2)];
    const left = arr.filter(x => x < pivot);
    const middle = arr.filter(x => x === pivot);
    const right = arr.filter(x => x > pivot);
    
    return [...quickSort(left), ...middle, ...quickSort(right)];
}

// Method 6: Binary Search
function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (arr[mid] === target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return -1;
}

// Method 7: Linear Search
function linearSearch(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) {
            return i;
        }
    }
    return -1;
}

// Method 8: Depth First Search (DFS)
function dfs(graph, start, visited = new Set()) {
    visited.add(start);
    console.log(start);
    
    for (const neighbor of graph[start] || []) {
        if (!visited.has(neighbor)) {
            dfs(graph, neighbor, visited);
        }
    }
}

// Method 9: Breadth First Search (BFS)
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

// Method 10: Dijkstra's Algorithm
function dijkstra(graph, start) {
    const distances = {};
    const visited = new Set();
    const queue = [{ vertex: start, distance: 0 }];
    
    // Initialize distances
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

// Method 11: Fibonacci (Memoization)
function fibonacci(n, memo = {}) {
    if (n in memo) return memo[n];
    if (n <= 1) return n;
    
    memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
    return memo[n];
}

// Method 12: Factorial
function factorial(n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

// Method 13: Greatest Common Divisor (GCD)
function gcd(a, b) {
    while (b !== 0) {
        const temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

// Method 14: Least Common Multiple (LCM)
function lcm(a, b) {
    return (a * b) / gcd(a, b);
}

// Method 15: Prime Number Check
function isPrime(n) {
    if (n <= 1) return false;
    if (n <= 3) return true;
    if (n % 2 === 0 || n % 3 === 0) return false;
    
    for (let i = 5; i * i <= n; i += 6) {
        if (n % i === 0 || n % (i + 2) === 0) {
            return false;
        }
    }
    
    return true;
}

// Method 16: Sieve of Eratosthenes
function sieveOfEratosthenes(n) {
    const isPrime = new Array(n + 1).fill(true);
    isPrime[0] = isPrime[1] = false;
    
    for (let i = 2; i * i <= n; i++) {
        if (isPrime[i]) {
            for (let j = i * i; j <= n; j += i) {
                isPrime[j] = false;
            }
        }
    }
    
    const primes = [];
    for (let i = 2; i <= n; i++) {
        if (isPrime[i]) {
            primes.push(i);
        }
    }
    
    return primes;
}

// Method 17: Palindrome Check
function isPalindrome(str) {
    const cleanStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    return cleanStr === cleanStr.split('').reverse().join('');
}

// Method 18: Anagram Check
function isAnagram(str1, str2) {
    const normalize = str => str.toLowerCase().replace(/[^a-z]/g, '').split('').sort().join('');
    return normalize(str1) === normalize(str2);
}

// Method 19: String Permutations
function getPermutations(str) {
    if (str.length <= 1) return [str];
    
    const permutations = [];
    
    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        const remaining = str.slice(0, i) + str.slice(i + 1);
        const subPermutations = getPermutations(remaining);
        
        for (const perm of subPermutations) {
            permutations.push(char + perm);
        }
    }
    
    return permutations;
}

// Method 20: Longest Common Subsequence
function longestCommonSubsequence(str1, str2) {
    const m = str1.length;
    const n = str2.length;
    const dp = Array(m + 1).fill().map(() => Array(n + 1).fill(0));
    
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (str1[i - 1] === str2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    
    // Reconstruct the sequence
    let i = m, j = n;
    const sequence = [];
    
    while (i > 0 && j > 0) {
        if (str1[i - 1] === str2[j - 1]) {
            sequence.unshift(str1[i - 1]);
            i--;
            j--;
        } else if (dp[i - 1][j] > dp[i][j - 1]) {
            i--;
        } else {
            j--;
        }
    }
    
    return sequence.join('');
}

// Method 21: Knapsack Problem (0/1)
function knapsack(weights, values, capacity) {
    const n = weights.length;
    const dp = Array(n + 1).fill().map(() => Array(capacity + 1).fill(0));
    
    for (let i = 1; i <= n; i++) {
        for (let w = 0; w <= capacity; w++) {
            if (weights[i - 1] <= w) {
                dp[i][w] = Math.max(
                    dp[i - 1][w],
                    dp[i - 1][w - weights[i - 1]] + values[i - 1]
                );
            } else {
                dp[i][w] = dp[i - 1][w];
            }
        }
    }
    
    return dp[n][capacity];
}

// Method 22: Coin Change Problem
function coinChange(coins, amount) {
    const dp = Array(amount + 1).fill(Infinity);
    dp[0] = 0;
    
    for (let i = 1; i <= amount; i++) {
        for (const coin of coins) {
            if (coin <= i) {
                dp[i] = Math.min(dp[i], dp[i - coin] + 1);
            }
        }
    }
    
    return dp[amount] === Infinity ? -1 : dp[amount];
}

// Method 23: Climbing Stairs
function climbingStairs(n) {
    if (n <= 2) return n;
    
    let prev1 = 1, prev2 = 2;
    
    for (let i = 3; i <= n; i++) {
        const current = prev1 + prev2;
        prev1 = prev2;
        prev2 = current;
    }
    
    return prev2;
}

// Method 24: House Robber
function houseRobber(nums) {
    if (nums.length === 0) return 0;
    if (nums.length === 1) return nums[0];
    
    let prev1 = 0, prev2 = nums[0];
    
    for (let i = 1; i < nums.length; i++) {
        const current = Math.max(prev2, prev1 + nums[i]);
        prev1 = prev2;
        prev2 = current;
    }
    
    return prev2;
}

// Method 25: Two Sum
function twoSum(nums, target) {
    const map = new Map();
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        
        map.set(nums[i], i);
    }
    
    return [];
}

// Real-world examples

// Example 1: Sorting algorithms comparison
const arr = [64, 34, 25, 12, 22, 11, 90];
console.log('Original:', arr);
console.log('Bubble Sort:', bubbleSort(arr));
console.log('Selection Sort:', selectionSort(arr));
console.log('Insertion Sort:', insertionSort(arr));
console.log('Merge Sort:', mergeSort(arr));
console.log('Quick Sort:', quickSort(arr));

// Example 2: Search algorithms
const sortedArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log('Binary Search for 7:', binarySearch(sortedArr, 7));
console.log('Linear Search for 7:', linearSearch(sortedArr, 7));

// Example 3: Graph traversal
const graph = {
    'A': ['B', 'C'],
    'B': ['A', 'D', 'E'],
    'C': ['A', 'F'],
    'D': ['B'],
    'E': ['B', 'F'],
    'F': ['C', 'E']
};

console.log('DFS starting from A:');
dfs(graph, 'A');

console.log('BFS starting from A:');
bfs(graph, 'A');

// Example 4: Shortest path
const weightedGraph = {
    'A': { 'B': 4, 'C': 2 },
    'B': { 'A': 4, 'C': 1, 'D': 5 },
    'C': { 'A': 2, 'B': 1, 'D': 8, 'E': 10 },
    'D': { 'B': 5, 'C': 8, 'E': 2 },
    'E': { 'C': 10, 'D': 2 }
};

console.log('Shortest distances from A:', dijkstra(weightedGraph, 'A'));

// Example 5: Mathematical algorithms
console.log('Fibonacci(10):', fibonacci(10));
console.log('Factorial(5):', factorial(5));
console.log('GCD(48, 18):', gcd(48, 18));
console.log('LCM(12, 18):', lcm(12, 18));
console.log('Is 17 prime?', isPrime(17));
console.log('Primes up to 20:', sieveOfEratosthenes(20));

// Example 6: String algorithms
console.log('Is "racecar" palindrome?', isPalindrome('racecar'));
console.log('Are "listen" and "silent" anagrams?', isAnagram('listen', 'silent'));
console.log('Permutations of "abc":', getPermutations('abc'));

// Example 7: Dynamic programming
console.log('LCS of "ABCDGH" and "AEDFHR":', longestCommonSubsequence('ABCDGH', 'AEDFHR'));

// Example 8: Optimization problems
const weights = [2, 3, 4, 5];
const values = [3, 4, 5, 6];
const capacity = 5;
console.log('Knapsack max value:', knapsack(weights, values, capacity));

const coins = [1, 2, 5];
const amount = 11;
console.log('Minimum coins needed:', coinChange(coins, amount));

// Example 9: Array problems
const nums = [2, 7, 11, 15];
const target = 9;
console.log('Two sum indices:', twoSum(nums, target));

console.log('Ways to climb 5 stairs:', climbingStairs(5));

const houses = [2, 7, 9, 3, 1];
console.log('Maximum robbery value:', houseRobber(houses));

// Export for testing
module.exports = {
    bubbleSort,
    selectionSort,
    insertionSort,
    mergeSort,
    quickSort,
    binarySearch,
    linearSearch,
    dfs,
    bfs,
    dijkstra,
    fibonacci,
    factorial,
    gcd,
    lcm,
    isPrime,
    sieveOfEratosthenes,
    isPalindrome,
    isAnagram,
    getPermutations,
    longestCommonSubsequence,
    knapsack,
    coinChange,
    climbingStairs,
    houseRobber,
    twoSum
}; 