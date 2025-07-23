// Two Sum - LeetCode #1
// https://leetcode.com/problems/two-sum/

/*
Problem Description:
Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
You may assume that each input would have exactly one solution, and you may not use the same element twice.
You can return the answer in any order.

Example 1:
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].

Example 2:
Input: nums = [3,2,4], target = 6
Output: [1,2]

Example 3:
Input: nums = [3,3], target = 6
Output: [0,1]

Constraints:
- 2 <= nums.length <= 10^4
- -10^9 <= nums[i] <= 10^9
- -10^9 <= target <= 10^9
- Only one valid answer exists.
*/

// Solution 1: Brute Force Approach
// Time Complexity: O(n²)
// Space Complexity: O(1)
function twoSumBruteForce(nums, target) {
    const n = nums.length;
    
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            if (nums[i] + nums[j] === target) {
                return [i, j];
            }
        }
    }
    
    return []; // No solution found
}

// Solution 2: Hash Map Approach (Optimal)
// Time Complexity: O(n)
// Space Complexity: O(n)
function twoSum(nums, target) {
    const map = new Map();
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        
        map.set(nums[i], i);
    }
    
    return []; // No solution found
}

// Solution 3: Two Pointers Approach (requires sorted array)
// Time Complexity: O(n log n) due to sorting
// Space Complexity: O(n) to store original indices
function twoSumTwoPointers(nums, target) {
    // Create array with original indices
    const indexedNums = nums.map((num, index) => ({ num, index }));
    
    // Sort by values
    indexedNums.sort((a, b) => a.num - b.num);
    
    let left = 0;
    let right = indexedNums.length - 1;
    
    while (left < right) {
        const sum = indexedNums[left].num + indexedNums[right].num;
        
        if (sum === target) {
            return [indexedNums[left].index, indexedNums[right].index];
        } else if (sum < target) {
            left++;
        } else {
            right--;
        }
    }
    
    return []; // No solution found
}

// Solution 4: Using Object instead of Map
// Time Complexity: O(n)
// Space Complexity: O(n)
function twoSumObject(nums, target) {
    const hash = {};
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        
        if (complement in hash) {
            return [hash[complement], i];
        }
        
        hash[nums[i]] = i;
    }
    
    return []; // No solution found
}

// Solution 5: One-pass with early termination
// Time Complexity: O(n)
// Space Complexity: O(n)
function twoSumOptimized(nums, target) {
    const seen = new Map();
    
    for (let i = 0; i < nums.length; i++) {
        const current = nums[i];
        const complement = target - current;
        
        // Check if complement exists before adding current
        if (seen.has(complement)) {
            return [seen.get(complement), i];
        }
        
        seen.set(current, i);
    }
    
    return []; // No solution found
}

// Test Cases
function runTests() {
    console.log("=== Two Sum Test Cases ===\n");
    
    const testCases = [
        {
            nums: [2, 7, 11, 15],
            target: 9,
            expected: [0, 1],
            description: "Basic case"
        },
        {
            nums: [3, 2, 4],
            target: 6,
            expected: [1, 2],
            description: "Target in middle"
        },
        {
            nums: [3, 3],
            target: 6,
            expected: [0, 1],
            description: "Same numbers"
        },
        {
            nums: [1, 5, 8, 10, 13],
            target: 18,
            expected: [2, 4],
            description: "Larger array"
        },
        {
            nums: [-1, -2, -3, -4, -5],
            target: -8,
            expected: [2, 4],
            description: "Negative numbers"
        },
        {
            nums: [0, 4, 3, 0],
            target: 0,
            expected: [0, 3],
            description: "Zero target"
        }
    ];
    
    const solutions = [
        { name: "Brute Force", fn: twoSumBruteForce },
        { name: "Hash Map (Optimal)", fn: twoSum },
        { name: "Two Pointers", fn: twoSumTwoPointers },
        { name: "Object Hash", fn: twoSumObject },
        { name: "Optimized", fn: twoSumOptimized }
    ];
    
    solutions.forEach(solution => {
        console.log(`\n--- ${solution.name} ---`);
        
        testCases.forEach((testCase, index) => {
            const result = solution.fn(testCase.nums, testCase.target);
            const passed = JSON.stringify(result.sort()) === JSON.stringify(testCase.expected.sort());
            
            console.log(`Test ${index + 1} (${testCase.description}): ${passed ? '✅ PASS' : '❌ FAIL'}`);
            console.log(`  Input: nums = [${testCase.nums}], target = ${testCase.target}`);
            console.log(`  Expected: [${testCase.expected}], Got: [${result}]`);
        });
    });
}

// Performance Comparison
function performanceTest() {
    console.log("\n=== Performance Test ===");
    
    // Generate large test case
    const size = 10000;
    const nums = Array.from({ length: size }, (_, i) => i);
    const target = size - 1;
    
    const solutions = [
        { name: "Brute Force", fn: twoSumBruteForce },
        { name: "Hash Map", fn: twoSum },
        { name: "Two Pointers", fn: twoSumTwoPointers },
        { name: "Object Hash", fn: twoSumObject },
        { name: "Optimized", fn: twoSumOptimized }
    ];
    
    solutions.forEach(solution => {
        const start = performance.now();
        const result = solution.fn(nums, target);
        const end = performance.now();
        
        console.log(`${solution.name}: ${(end - start).toFixed(4)}ms`);
    });
}

// Edge Cases
function edgeCases() {
    console.log("\n=== Edge Cases ===");
    
    // Empty array
    console.log("Empty array:", twoSum([], 5)); // []
    
    // Single element
    console.log("Single element:", twoSum([1], 1)); // []
    
    // No solution
    console.log("No solution:", twoSum([1, 2, 3], 10)); // []
    
    // Duplicate elements
    console.log("Duplicates:", twoSum([1, 1, 1, 1], 2)); // [0, 1]
    
    // Large numbers
    console.log("Large numbers:", twoSum([1000000000, -1000000000], 0)); // [0, 1]
}

// Run all tests
if (require.main === module) {
    runTests();
    performanceTest();
    edgeCases();
}

// Export solutions
module.exports = {
    twoSum,
    twoSumBruteForce,
    twoSumTwoPointers,
    twoSumObject,
    twoSumOptimized
}; 