// Group Anagrams - LeetCode #49
// https://leetcode.com/problems/group-anagrams/

/*
Problem: Given an array of strings strs, group the anagrams together. You can return the answer in any order.

Example: ["eat","tea","tan","ate","nat","bat"] -> [["bat"],["nat","tan"],["ate","eat","tea"]]
*/

// Optimized Solution - Sort as Key
// Time: O(n * k log k), Space: O(n * k) where k is max string length
function groupAnagrams(strs) {
    const groups = new Map();
    
    for (let str of strs) {
        const sorted = str.split('').sort().join('');
        
        if (!groups.has(sorted)) {
            groups.set(sorted, []);
        }
        groups.get(sorted).push(str);
    }
    
    return Array.from(groups.values());
}

module.exports = { groupAnagrams }; 