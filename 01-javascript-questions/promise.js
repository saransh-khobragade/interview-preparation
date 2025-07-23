/*
Promise Example
----------------
Demonstrates how to create and use a Promise for asynchronous operations.
*/

function asyncTask() {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve('done'), 100);
    });
}

module.exports = asyncTask; 