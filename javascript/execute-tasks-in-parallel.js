// Execute Tasks in Parallel - Returns results in order

function executeTasksInParallel(tasks) {
    // tasks: array of functions returning promises
    return Promise.all(tasks.map(fn => fn()));
}

// Usage example:
// executeTasksInParallel([
//   () => Promise.resolve(1),
//   () => Promise.resolve(2)
// ]).then(console.log); // [1,2]

module.exports = { executeTasksInParallel }; 