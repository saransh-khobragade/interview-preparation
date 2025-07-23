/**
 * Node.js Event Loop - Common Interview Examples
 */

// 1. Basic Event Loop Phases
console.log('=== EVENT LOOP PHASES ===');

console.log('1. Start');

// Timer phase
setTimeout(() => console.log('2. setTimeout'), 0);

// Pending callbacks phase
setImmediate(() => console.log('3. setImmediate'));

// Poll phase
process.nextTick(() => console.log('4. nextTick'));

// Check phase
Promise.resolve().then(() => console.log('5. Promise'));

console.log('6. End');

// Output: 1, 6, 4, 5, 2, 3

// 2. NextTick vs SetImmediate
console.log('\n=== NEXTTICK VS SETIMMEDIATE ===');

setImmediate(() => console.log('setImmediate'));
process.nextTick(() => console.log('nextTick'));

// process.nextTick has higher priority than setImmediate

// 3. Promise vs NextTick Priority
console.log('\n=== PROMISE VS NEXTTICK ===');

Promise.resolve().then(() => console.log('Promise 1'));
process.nextTick(() => console.log('NextTick 1'));
Promise.resolve().then(() => console.log('Promise 2'));
process.nextTick(() => console.log('NextTick 2'));

// Output: NextTick 1, NextTick 2, Promise 1, Promise 2

// 4. Complex Event Loop Example
console.log('\n=== COMPLEX EVENT LOOP ===');

setTimeout(() => console.log('Timer 1'), 0);
setImmediate(() => console.log('Immediate 1'));

Promise.resolve().then(() => {
  console.log('Promise 1');
  process.nextTick(() => console.log('NextTick inside Promise'));
});

process.nextTick(() => {
  console.log('NextTick 1');
  Promise.resolve().then(() => console.log('Promise inside NextTick'));
});

setTimeout(() => console.log('Timer 2'), 0);
setImmediate(() => console.log('Immediate 2'));

console.log('Synchronous');

// 5. File I/O and Event Loop
const fs = require('fs');

console.log('\n=== FILE I/O AND EVENT LOOP ===');

fs.readFile(__filename, () => {
  console.log('File read complete');
  
  setTimeout(() => console.log('Timer inside file read'), 0);
  setImmediate(() => console.log('Immediate inside file read'));
  
  process.nextTick(() => console.log('NextTick inside file read'));
});

// 6. Event Loop Blocking Example
console.log('\n=== BLOCKING VS NON-BLOCKING ===');

// ❌ Blocking - Bad practice
function blockingOperation() {
  const start = Date.now();
  while (Date.now() - start < 1000) {
    // Blocking the event loop for 1 second
  }
  console.log('Blocking operation complete');
}

// ✅ Non-blocking - Good practice
function nonBlockingOperation() {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('Non-blocking operation complete');
      resolve();
    }, 1000);
  });
}

// Usage
console.log('Before blocking');
// blockingOperation(); // Uncomment to see blocking behavior
console.log('After blocking');

console.log('Before non-blocking');
nonBlockingOperation().then(() => {
  console.log('Non-blocking resolved');
});
console.log('After non-blocking');

// 7. Microtask Queue Example
console.log('\n=== MICROTASK QUEUE ===');

setTimeout(() => console.log('Timeout'), 0);

Promise.resolve()
  .then(() => console.log('Promise 1'))
  .then(() => console.log('Promise 2'))
  .then(() => console.log('Promise 3'));

process.nextTick(() => console.log('NextTick 1'));
process.nextTick(() => console.log('NextTick 2'));

// Microtasks (nextTick + Promises) run before macrotasks (setTimeout)

// 8. Event Loop Phases Demonstration
console.log('\n=== EVENT LOOP PHASES DEMO ===');

const phases = {
  timer: () => setTimeout(() => console.log('Timer Phase'), 0),
  pending: () => setImmediate(() => console.log('Check Phase')),
  poll: () => console.log('Poll Phase (main thread)'),
  check: () => setImmediate(() => console.log('Check Phase')),
  close: () => {
    const server = require('http').createServer();
    server.listen(0, () => {
      server.close(() => console.log('Close Phase'));
    });
  }
};

// Execute phases
phases.timer();
phases.pending();
phases.poll();
phases.check();

// 9. Real-world Event Loop Pattern
console.log('\n=== REAL-WORLD PATTERN ===');

class EventLoopDemo {
  constructor() {
    this.tasks = [];
  }
  
  addTask(task) {
    this.tasks.push(task);
  }
  
  // ❌ Blocking execution
  executeBlocking() {
    this.tasks.forEach(task => task());
  }
  
  // ✅ Non-blocking execution
  async executeNonBlocking() {
    for (const task of this.tasks) {
      await new Promise(resolve => {
        setImmediate(() => {
          task();
          resolve();
        });
      });
    }
  }
}

const demo = new EventLoopDemo();
demo.addTask(() => console.log('Task 1'));
demo.addTask(() => console.log('Task 2'));
demo.addTask(() => console.log('Task 3'));

// Execute non-blocking
demo.executeNonBlocking().then(() => {
  console.log('All tasks completed');
});

// 10. Event Loop Monitoring
console.log('\n=== EVENT LOOP MONITORING ===');

// Monitor event loop lag
function monitorEventLoop() {
  const start = process.hrtime.bigint();
  
  setImmediate(() => {
    const lag = Number(process.hrtime.bigint() - start) / 1000000; // Convert to ms
    console.log(`Event loop lag: ${lag.toFixed(2)}ms`);
  });
}

// Run monitoring
setInterval(monitorEventLoop, 1000);

// Clean up after demonstration
setTimeout(() => {
  process.exit(0);
}, 5000); 