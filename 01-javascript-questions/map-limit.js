/*
Async Map with Concurrency Limit
---------------------------------
Maps over an array with an async function, running at most 'limit' tasks in parallel.

Approach: Use a queue and recursion to manage concurrency.
*/

async function mapLimit(arr, limit, asyncFn) {
    const results = [];
    let i = 0;
    async function next() {
        if (i >= arr.length) return;
        const idx = i++;
        results[idx] = await asyncFn(arr[idx], idx, arr);
        await next();
    }
    await Promise.all(Array(Math.min(limit, arr.length)).fill().map(next));
    return results;
}

module.exports = mapLimit; 