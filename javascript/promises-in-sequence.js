// Promises in Sequence
// This file provides utilities to execute an array of promise-returning functions sequentially, maintaining order and optionally adding delays between executions.
// Includes: async/await, reduce, and delay-based implementations.
// Useful for rate-limiting, ordered API calls, or dependent async flows.

// Executes an array of promise-returning functions sequentially using async/await and for...of.
// Returns an array of results with status and value/error.
async function executePromisesInSequence(promises) {
    const results = [];
    
    for (const promise of promises) {
        try {
            const result = await promise();
            results.push({ status: 'fulfilled', value: result });
        } catch (error) {
            results.push({ status: 'rejected', error: error.message });
        }
    }
    
    return results;
}

// Executes an array of promise-returning functions sequentially using Array.reduce.
// Returns an array of results with status and value/error.
function executePromisesInSequenceReduce(promises) {
    return promises.reduce(async (previousPromise, currentPromise) => {
        const results = await previousPromise;
        
        try {
            const result = await currentPromise();
            results.push({ status: 'fulfilled', value: result });
        } catch (error) {
            results.push({ status: 'rejected', error: error.message });
        }
        
        return results;
    }, Promise.resolve([]));
}

// Executes an array of promise-returning functions sequentially with a delay between each.
// Returns an array of results with status and value/error.
async function executePromisesInSequenceWithDelay(promises, delay = 1000) {
    const results = [];
    
    for (const promise of promises) {
        try {
            const result = await promise();
            results.push({ status: 'fulfilled', value: result });
            
            // Add delay between promises
            if (delay > 0) {
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        } catch (error) {
            results.push({ status: 'rejected', error: error.message });
        }
    }
    
    return results;
}

// Creates a promise-returning function for demonstration/testing.
// Accepts a value, delay, and optional rejection flag.
const createPromise = (value, delay, shouldReject = false) => {
    return () => new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldReject) {
                reject(new Error(`Promise ${value} failed`));
            } else {
                resolve(`Promise ${value} completed`);
            }
        }, delay);
    });
};

const promises = [
    createPromise(1, 1000),
    createPromise(2, 500),
    createPromise(3, 2000, true), // This will reject
    createPromise(4, 300)
];

// Test the implementations (uncomment to run)
// async function test() {
//     console.log('=== Sequential Execution ===');
//     const results1 = await executePromisesInSequence(promises);
//     console.log(results1);
//     
//     console.log('\n=== Sequential with Reduce ===');
//     const results2 = await executePromisesInSequenceReduce(promises);
//     console.log(results2);
//     
//     console.log('\n=== Sequential with Delay ===');
//     const results3 = await executePromisesInSequenceWithDelay(promises, 500);
//     console.log(results3);
// }

// test();

module.exports = { 
    executePromisesInSequence, 
    executePromisesInSequenceReduce, 
    executePromisesInSequenceWithDelay 
}; 