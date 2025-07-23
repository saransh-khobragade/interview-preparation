/*
Execute Tasks in Parallel with Limit
------------------------------------
Given an array of async functions and a concurrency limit, run at most 'limit' tasks at a time.

Approach: Use a queue and recursion to manage concurrency.
*/

async function executeTasksInParallel(tasks, limit) {
    const results = [];
    let i = 0;
    async function next() {
        if (i >= tasks.length) return;
        const idx = i++;
        results[idx] = await tasks[idx]();
        await next();
    }
    await Promise.all(Array(Math.min(limit, tasks.length)).fill().map(next));
    return results;
}

module.exports = executeTasksInParallel; 