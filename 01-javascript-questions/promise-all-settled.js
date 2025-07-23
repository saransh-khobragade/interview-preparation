/*
Custom Promise.allSettled Implementation
----------------------------------------
Given an array of promises, return a new promise that resolves when all are settled, with an array of their results (status/value or reason).

Approach: Track each promise's outcome and resolve when all are done.
*/

function promiseAllSettled(promises) {
    return Promise.all(promises.map(p =>
        Promise.resolve(p)
            .then(value => ({ status: 'fulfilled', value }))
            .catch(reason => ({ status: 'rejected', reason }))
    ));
}

module.exports = promiseAllSettled; 