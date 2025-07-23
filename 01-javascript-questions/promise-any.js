/*
Custom Promise.any Implementation
---------------------------------
Given an array of promises, return a new promise that resolves as soon as any promise resolves, or rejects if all reject.

Approach: Track rejections and resolve on first fulfillment.
*/

function promiseAny(promises) {
    return new Promise((resolve, reject) => {
        let rejections = 0;
        const errors = [];
        promises.forEach((p, i) => {
            Promise.resolve(p).then(resolve, err => {
                errors[i] = err;
                if (++rejections === promises.length) reject(errors);
            });
        });
    });
}

module.exports = promiseAny; 