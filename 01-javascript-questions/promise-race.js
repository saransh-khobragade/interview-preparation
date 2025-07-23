/*
Custom Promise.race Implementation
----------------------------------
Given an array of promises, return a new promise that resolves or rejects as soon as any promise resolves or rejects.

Approach: Resolve or reject on the first settled promise.
*/

function promiseRace(promises) {
    return new Promise((resolve, reject) => {
        promises.forEach(p => Promise.resolve(p).then(resolve, reject));
    });
}

module.exports = promiseRace; 