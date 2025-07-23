/*
Custom Promise.all Implementation
---------------------------------
Given an array of promises, return a new promise that resolves when all have resolved, or rejects if any reject.

Approach: Track results and resolve when all are done.
*/

function promiseAll(promises) {
    return new Promise((resolve, reject) => {
        const results = [];
        let completed = 0;
        promises.forEach((p, i) => {
            Promise.resolve(p).then(val => {
                results[i] = val;
                if (++completed === promises.length) resolve(results);
            }, reject);
        });
    });
}

module.exports = promiseAll; 