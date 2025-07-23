/*
Retry Promise N Times
---------------------
Given a function that returns a promise, retry it up to n times if it fails.

Approach: Use recursion to retry on failure.
*/

function retry(fn, n) {
    return fn().catch(err => (n > 1 ? retry(fn, n - 1) : Promise.reject(err)));
}

module.exports = retry; 