/*
Cancelable Promise
-------------------
Creates a promise that can be canceled, rejecting with a special error if canceled.

Approach: Use a flag and a wrapper to reject if canceled.
*/

function cancelablePromise(executor) {
    let cancel;
    const promise = new Promise((resolve, reject) => {
        cancel = () => reject(new Error('Canceled'));
        executor(resolve, reject);
    });
    promise.cancel = cancel;
    return promise;
}

module.exports = cancelablePromise; 