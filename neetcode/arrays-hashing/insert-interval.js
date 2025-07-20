// Insert Interval - LeetCode #57
// https://leetcode.com/problems/insert-interval/

/*
Problem: You are given an array of non-overlapping intervals intervals where intervals[i] = [starti, endi] 
represent the start and the end of the ith interval and intervals is sorted in ascending order by starti. 
You are also given an interval newInterval = [start, end] that represents the start and end of another interval.

Example: intervals = [[1,3],[6,9]], newInterval = [2,5] -> [[1,5],[6,9]]
*/

// Optimized Solution - Linear Scan
// Time: O(n), Space: O(n)
function insert(intervals, newInterval) {
    const result = [];
    let i = 0;
    
    // Add all intervals before newInterval
    while (i < intervals.length && intervals[i][1] < newInterval[0]) {
        result.push(intervals[i]);
        i++;
    }
    
    // Merge overlapping intervals
    while (i < intervals.length && intervals[i][0] <= newInterval[1]) {
        newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
        newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
        i++;
    }
    
    result.push(newInterval);
    
    // Add remaining intervals
    while (i < intervals.length) {
        result.push(intervals[i]);
        i++;
    }
    
    return result;
}

module.exports = { insert }; 