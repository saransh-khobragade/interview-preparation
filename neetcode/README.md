# NeetCode Blind 75 Solutions in JavaScript

A comprehensive collection of solutions to the Blind 75 problems from NeetCode, implemented in JavaScript.

## 📋 Problem Categories

### Arrays & Hashing (14 problems)
- [x] Two Sum
- [x] Valid Parentheses
- [x] Best Time to Buy and Sell Stock
- [x] Valid Palindrome
- [x] Valid Anagram
- [x] Contains Duplicate
- [x] Product of Array Except Self
- [x] Maximum Subarray
- [x] 3Sum
- [x] Merge Intervals
- [x] Insert Interval
- [x] Group Anagrams
- [x] Top K Frequent Elements
- [x] Longest Consecutive Sequence

### Two Pointers (5 problems)
- [x] Valid Palindrome
- [x] 3Sum
- [x] Container With Most Water
- [x] Trapping Rain Water
- [x] Remove Duplicates from Sorted Array

### Sliding Window (6 problems)
- [x] Best Time to Buy and Sell Stock
- [x] Longest Substring Without Repeating Characters
- [x] Longest Repeating Character Replacement
- [x] Permutation in String
- [x] Minimum Window Substring
- [x] Sliding Window Maximum

### Stack (7 problems)
- [x] Valid Parentheses
- [x] Min Stack
- [x] Evaluate Reverse Polish Notation
- [x] Generate Parentheses
- [x] Daily Temperatures
- [x] Car Fleet
- [x] Largest Rectangle in Histogram

### Binary Search (7 problems)
- [x] Binary Search
- [x] Search a 2D Matrix
- [x] Koko Eating Bananas
- [x] Find Minimum in Rotated Sorted Array
- [x] Search in Rotated Sorted Array
- [x] Time Based Key-Value Store
- [x] Median of Two Sorted Arrays

### Linked List (11 problems)
- [x] Reverse Linked List
- [x] Merge Two Sorted Lists
- [x] Reorder List
- [x] Remove Nth Node From End of List
- [x] Copy List with Random Pointer
- [x] Add Two Numbers
- [x] Linked List Cycle
- [x] Find the Duplicate Number
- [x] LRU Cache
- [x] Merge K Sorted Lists
- [x] Reverse Nodes in k-Group

### Trees (15 problems)
- [x] Maximum Depth of Binary Tree
- [x] Same Tree
- [x] Invert/Flip Binary Tree
- [x] Binary Tree Level Order Traversal
- [x] Binary Tree Maximum Path Sum
- [x] Serialize and Deserialize Binary Tree
- [x] Subtree of Another Tree
- [x] Construct Binary Tree from Preorder and Inorder Traversal
- [x] Validate Binary Search Tree
- [x] Kth Smallest Element in a BST
- [x] Lowest Common Ancestor of a BST
- [x] Implement Trie (Prefix Tree)
- [x] Add and Search Word - Data structure design
- [x] Word Search II
- [x] Merge Two Binary Trees

### Tries (3 problems)
- [x] Implement Trie (Prefix Tree)
- [x] Add and Search Word - Data structure design
- [x] Word Search II

### Heap/Priority Queue (7 problems)
- [x] Merge K Sorted Lists
- [x] Top K Frequent Elements
- [x] Find Median from Data Stream
- [x] Kth Largest Element in an Array
- [x] Task Scheduler
- [x] Design Twitter
- [x] Connect Sticks

### Backtracking (9 problems)
- [x] Subsets
- [x] Combinations
- [x] Permutations
- [x] Combination Sum
- [x] Word Search
- [x] Palindrome Partitioning
- [x] Letter Combinations of a Phone Number
- [x] N-Queens
- [x] Generate Parentheses

### Graphs (13 problems)
- [x] Number of Islands
- [x] Clone Graph
- [x] Pacific Atlantic Water Flow
- [x] Course Schedule
- [x] Course Schedule II
- [x] Redundant Connection
- [x] Graph Valid Tree
- [x] Number of Connected Components in an Undirected Graph
- [x] Word Ladder
- [x] Reconstruct Itinerary
- [x] Min Cost to Connect All Points
- [x] Network Delay Time
- [x] Swim in Rising Water

### Advanced Graphs (6 problems)
- [x] Reconstruct Itinerary
- [x] Min Cost to Connect All Points
- [x] Network Delay Time
- [x] Swim in Rising Water
- [x] Alien Dictionary
- [x] Cheapest Flights Within K Stops

### 1-D Dynamic Programming (12 problems)
- [x] Climbing Stairs
- [x] House Robber
- [x] House Robber II
- [x] Longest Palindromic Substring
- [x] Palindromic Substrings
- [x] Decode Ways
- [x] Coin Change
- [x] Maximum Product Subarray
- [x] Word Break
- [x] Combination Sum IV
- [x] House Robber III
- [x] Perfect Squares

### 2-D Dynamic Programming (11 problems)
- [x] Unique Paths
- [x] Longest Common Subsequence
- [x] Best Time to Buy and Sell Stock with Cooldown
- [x] Coin Change 2
- [x] Target Sum
- [x] Interleaving String
- [x] Longest Increasing Path in a Matrix
- [x] Distinct Subsequences
- [x] Edit Distance
- [x] Burst Balloons
- [x] Regular Expression Matching

### Greedy (8 problems)
- [x] Maximum Subarray
- [x] Jump Game
- [x] Jump Game II
- [x] Gas Station
- [x] Hand of Straights
- [x] Merge Triplets to Form Target Triplet
- [x] Partition Labels
- [x] Valid Parenthesis String

### Intervals (4 problems)
- [x] Insert Interval
- [x] Merge Intervals
- [x] Non-overlapping Intervals
- [x] Meeting Rooms

### Math & Geometry (4 problems)
- [x] Rotate Image
- [x] Spiral Matrix
- [x] Set Matrix Zeroes
- [x] Happy Number

### Bit Manipulation (5 problems)
- [x] Single Number
- [x] Number of 1 Bits
- [x] Counting Bits
- [x] Reverse Bits
- [x] Missing Number

## 🚀 How to Use

### Running Solutions
```bash
# Run a specific problem
node arrays-hashing/two-sum.js

# Run all problems in a category
node arrays-hashing/

# Run all problems
for file in **/*.js; do
    echo "=== Running $file ==="
    node "$file"
    echo ""
done
```

### Problem Structure
Each problem file contains:
- Problem description
- Solution with detailed comments
- Time and space complexity analysis
- Test cases
- Alternative approaches

### Example Usage
```javascript
// Import solution
const { twoSum } = require('./arrays-hashing/two-sum.js');

// Use the solution
const nums = [2, 7, 11, 15];
const target = 9;
const result = twoSum(nums, target);
console.log(result); // [0, 1]
```

## 📊 Progress Tracking

- **Total Problems**: 75
- **Completed**: 75/75 (100%)
- **Categories**: 15

## 🎯 Study Tips

1. **Start with Arrays & Hashing** - These are fundamental and appear in many other problems
2. **Practice Two Pointers** - Essential for array manipulation
3. **Master Sliding Window** - Common in string and array problems
4. **Learn Dynamic Programming** - Critical for optimization problems
5. **Understand Graph Algorithms** - Important for complex data structures

## 🔗 Resources

- [NeetCode Website](https://neetcode.io/)
- [LeetCode](https://leetcode.com/)
- [Blind 75 List](https://www.teamblind.com/post/New-Year-Gift---Curated-List-of-Top-75-LeetCode-Questions-to-Save-Your-Time-OaM1orEU)

## 📝 Notes

- All solutions are optimized for readability and learning
- Time and space complexities are provided for each solution
- Multiple approaches are shown where applicable
- Test cases cover edge cases and common scenarios

---

**Happy Coding! 🚀**

This collection is designed to help you master the most important algorithmic problems commonly asked in technical interviews. 