/**
 * Async Patterns - Common Interview Examples
 */

const fs = require('fs').promises;
const util = require('util');

console.log('=== ASYNC PATTERNS ===');

// 1. Callback Pattern
console.log('\n1. CALLBACK PATTERN');

function readFileCallback(filename, callback) {
  require('fs').readFile(filename, 'utf8', (err, data) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, data);
  });
}

// Usage
readFileCallback(__filename, (err, data) => {
  if (err) {
    console.error('Callback error:', err.message);
  } else {
    console.log('Callback success: File read');
  }
});

// 2. Promise Pattern
console.log('\n2. PROMISE PATTERN');

function readFilePromise(filename) {
  return new Promise((resolve, reject) => {
    require('fs').readFile(filename, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

// Usage
readFilePromise(__filename)
  .then(data => console.log('Promise success: File read'))
  .catch(err => console.error('Promise error:', err.message));

// 3. Async/Await Pattern
console.log('\n3. ASYNC/AWAIT PATTERN');

async function readFileAsync(filename) {
  try {
    const data = await fs.readFile(filename, 'utf8');
    return data;
  } catch (error) {
    throw error;
  }
}

// Usage
(async () => {
  try {
    const data = await readFileAsync(__filename);
    console.log('Async/await success: File read');
  } catch (error) {
    console.error('Async/await error:', error.message);
  }
})();

// 4. Promisify Pattern
console.log('\n4. PROMISIFY PATTERN');

const readFilePromisified = util.promisify(require('fs').readFile);

// Usage
readFilePromisified(__filename, 'utf8')
  .then(data => console.log('Promisify success: File read'))
  .catch(err => console.error('Promisify error:', err.message));

// 5. Error Handling Patterns
console.log('\n5. ERROR HANDLING PATTERNS');

// ❌ Callback Hell
function callbackHell() {
  require('fs').readFile('file1.txt', (err1, data1) => {
    if (err1) throw err1;
    require('fs').readFile('file2.txt', (err2, data2) => {
      if (err2) throw err2;
      require('fs').readFile('file3.txt', (err3, data3) => {
        if (err3) throw err3;
        console.log('All files read');
      });
    });
  });
}

// ✅ Promise Chain
function promiseChain() {
  return readFilePromise('file1.txt')
    .then(data1 => readFilePromise('file2.txt'))
    .then(data2 => readFilePromise('file3.txt'))
    .then(data3 => console.log('Promise chain: All files read'))
    .catch(err => console.log('Promise chain error handled'));
}

// ✅ Async/Await
async function asyncAwaitPattern() {
  try {
    const data1 = await readFileAsync('file1.txt');
    const data2 = await readFileAsync('file2.txt');
    const data3 = await readFileAsync('file3.txt');
    console.log('Async/await: All files read');
  } catch (error) {
    console.log('Async/await error handled');
  }
}

// Execute patterns
promiseChain();
asyncAwaitPattern();

// 6. Parallel vs Sequential Execution
console.log('\n6. PARALLEL VS SEQUENTIAL');

// Sequential execution
async function sequentialExecution() {
  console.time('Sequential');
  try {
    await new Promise(resolve => setTimeout(resolve, 100));
    await new Promise(resolve => setTimeout(resolve, 100));
    await new Promise(resolve => setTimeout(resolve, 100));
    console.timeEnd('Sequential');
  } catch (error) {
    console.error('Sequential error:', error);
  }
}

// Parallel execution
async function parallelExecution() {
  console.time('Parallel');
  try {
    await Promise.all([
      new Promise(resolve => setTimeout(resolve, 100)),
      new Promise(resolve => setTimeout(resolve, 100)),
      new Promise(resolve => setTimeout(resolve, 100))
    ]);
    console.timeEnd('Parallel');
  } catch (error) {
    console.error('Parallel error:', error);
  }
}

// Execute both
sequentialExecution();
parallelExecution();

// 7. Promise.all vs Promise.allSettled vs Promise.race
console.log('\n7. PROMISE METHODS');

const promises = [
  Promise.resolve('Success 1'),
  Promise.reject('Error 2'),
  Promise.resolve('Success 3')
];

// Promise.all - Fails fast
Promise.all(promises.map(p => p.catch(e => e)))
  .then(results => console.log('Promise.all results:', results))
  .catch(error => console.log('Promise.all error:', error));

// Promise.allSettled - Waits for all
Promise.allSettled(promises)
  .then(results => {
    console.log('Promise.allSettled results:');
    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        console.log(`  ${index}: Success - ${result.value}`);
      } else {
        console.log(`  ${index}: Error - ${result.reason}`);
      }
    });
  });

// Promise.race - First to complete
Promise.race([
  new Promise(resolve => setTimeout(() => resolve('Fast'), 100)),
  new Promise(resolve => setTimeout(() => resolve('Slow'), 200))
])
  .then(result => console.log('Promise.race result:', result));

// 8. Custom Promise Implementation
console.log('\n8. CUSTOM PROMISE');

class SimplePromise {
  constructor(executor) {
    this.state = 'pending';
    this.value = undefined;
    this.handlers = [];
    
    const resolve = (value) => {
      if (this.state === 'pending') {
        this.state = 'fulfilled';
        this.value = value;
        this.handlers.forEach(handler => handler.onFulfilled(value));
      }
    };
    
    const reject = (reason) => {
      if (this.state === 'pending') {
        this.state = 'rejected';
        this.value = reason;
        this.handlers.forEach(handler => handler.onRejected(reason));
      }
    };
    
    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }
  
  then(onFulfilled, onRejected) {
    return new SimplePromise((resolve, reject) => {
      const handler = {
        onFulfilled: (value) => {
          try {
            const result = onFulfilled ? onFulfilled(value) : value;
            resolve(result);
          } catch (error) {
            reject(error);
          }
        },
        onRejected: (reason) => {
          try {
            const result = onRejected ? onRejected(reason) : reason;
            reject(result);
          } catch (error) {
            reject(error);
          }
        }
      };
      
      if (this.state === 'fulfilled') {
        handler.onFulfilled(this.value);
      } else if (this.state === 'rejected') {
        handler.onRejected(this.value);
      } else {
        this.handlers.push(handler);
      }
    });
  }
  
  catch(onRejected) {
    return this.then(null, onRejected);
  }
}

// Usage
new SimplePromise((resolve, reject) => {
  setTimeout(() => resolve('Custom Promise Success'), 100);
})
  .then(result => console.log('Custom Promise result:', result))
  .catch(error => console.error('Custom Promise error:', error));

// 9. Async Error Handling Best Practices
console.log('\n9. ERROR HANDLING BEST PRACTICES');

// Global error handlers
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error.message);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Graceful error handling
async function safeAsyncOperation() {
  try {
    // Risky operation
    await new Promise((resolve, reject) => {
      // Simulate random success/failure
      setTimeout(() => {
        Math.random() > 0.5 ? resolve('Success') : reject(new Error('Random failure'));
      }, 100);
    });
    console.log('Safe operation completed');
  } catch (error) {
    console.error('Safe operation failed:', error.message);
    // Log error, notify monitoring system, etc.
  }
}

safeAsyncOperation();

// 10. Async/Await with Try-Catch Wrapper
console.log('\n10. ASYNC WRAPPER UTILITY');

function asyncHandler(fn) {
  return async (...args) => {
    try {
      return await fn(...args);
    } catch (error) {
      console.error('Async handler caught error:', error.message);
      throw error;
    }
  };
}

const safeFileRead = asyncHandler(async (filename) => {
  const data = await fs.readFile(filename, 'utf8');
  return data;
});

// Usage
safeFileRead(__filename)
  .then(() => console.log('Wrapped async success'))
  .catch(() => console.log('Wrapped async error handled'));

// Clean up
setTimeout(() => {
  console.log('\nDemo completed');
}, 2000); 