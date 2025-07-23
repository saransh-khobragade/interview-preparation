/*
Daily Temperatures (Monotonic Stack)
-------------------------------------
Given a list of daily temperatures, return a list such that, for each day, tells you how many days you would have to wait until a warmer temperature. If there is no future day for which this is possible, put 0 instead.

Pattern: Monotonic Stack
We use a stack to keep track of indices with unresolved warmer days.

Example:
Input: temperatures = [73,74,75,71,69,72,76,73]
Output: [1,1,4,2,1,1,0,0]

Time Complexity: O(n)
Space Complexity: O(n)
*/

function dailyTemperatures(T) {
    const res = new Array(T.length).fill(0);
    const stack = [];
    for (let i = 0; i < T.length; i++) {
        while (stack.length && T[i] > T[stack[stack.length - 1]]) {
            const idx = stack.pop();
            res[idx] = i - idx;
        }
        stack.push(i);
    }
    return res;
}

module.exports = dailyTemperatures; 