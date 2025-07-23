/*
Async/Await Example
--------------------
Demonstrates how to use async/await to write asynchronous code that looks synchronous.
*/

function fetchData() {
    return new Promise(resolve => setTimeout(() => resolve('data'), 100));
}

async function getData() {
    const result = await fetchData();
    return result;
}

module.exports = getData; 