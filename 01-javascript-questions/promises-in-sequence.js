/*
Execute Promises in Sequence
----------------------------
Given an array of functions that return promises, execute them one after another (not in parallel) and collect the results.

Approach: Use async/await with a for...of loop to await each promise in order.
Time Complexity: O(n)
*/

async function executePromisesInSequence(promises) {
    const results = [];
    for (const fn of promises) {
        results.push(await fn());
    }
    return results;
}

module.exports = executePromisesInSequence; 