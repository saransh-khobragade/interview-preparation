# Node.js Fundamentals

Core Node.js concepts essential for interview preparation.

## Files
- `event-loop.js` - Event loop phases, microtasks, macrotasks
- `async-patterns.js` - Callbacks, Promises, async/await patterns
- `modules-require.js` - CommonJS modules, require mechanism

## Quick Reference

### Event Loop Phases
```javascript
// Execution order
console.log('1'); // Synchronous
process.nextTick(() => console.log('2')); // Next tick queue
Promise.resolve().then(() => console.log('3')); // Microtask queue
setTimeout(() => console.log('4'), 0); // Timer queue
setImmediate(() => console.log('5')); // Check queue
console.log('6'); // Synchronous

// Output: 1, 6, 2, 3, 4, 5
```

### Async Patterns
```javascript
// Callback
fs.readFile('file.txt', (err, data) => {
  if (err) throw err;
  console.log(data);
});

// Promise
const readFile = util.promisify(fs.readFile);
readFile('file.txt').then(data => console.log(data));

// Async/Await
async function readFileAsync() {
  const data = await readFile('file.txt');
  console.log(data);
}
```

### Module Patterns
```javascript
// CommonJS Export
module.exports = { method1, method2 };
module.exports.method = () => {};
exports.method = () => {}; // Shorthand

// CommonJS Import
const module = require('./module');
const { method1, method2 } = require('./module');
```

## Common Interview Questions

### **Event Loop**

1. **Q: What is the Node.js event loop?**
   - Single-threaded event loop with multiple phases
   - Handles I/O operations asynchronously
   - Uses libuv for system-level async operations

2. **Q: Event loop phases?**
   ```javascript
   // 1. Timer phase - setTimeout, setInterval
   // 2. Pending callbacks - I/O callbacks
   // 3. Idle, prepare - internal use
   // 4. Poll - fetch new I/O events
   // 5. Check - setImmediate callbacks
   // 6. Close callbacks - socket.close()
   ```

3. **Q: process.nextTick vs setImmediate?**
   ```javascript
   // nextTick has higher priority
   setImmediate(() => console.log('setImmediate'));
   process.nextTick(() => console.log('nextTick'));
   // Output: nextTick, setImmediate
   ```

4. **Q: Microtasks vs Macrotasks?**
   ```javascript
   // Microtasks (higher priority)
   process.nextTick(() => {});
   Promise.resolve().then(() => {});
   
   // Macrotasks (lower priority)
   setTimeout(() => {}, 0);
   setImmediate(() => {});
   ```

### **Async Patterns**

1. **Q: Callback hell solution?**
   ```javascript
   // ❌ Callback hell
   getData((err, data) => {
     processData(data, (err, result) => {
       saveResult(result, (err, saved) => {
         // Nested callbacks
       });
     });
   });
   
   // ✅ Promise chain
   getData()
     .then(processData)
     .then(saveResult)
     .catch(handleError);
   
   // ✅ Async/await
   try {
     const data = await getData();
     const result = await processData(data);
     await saveResult(result);
   } catch (error) {
     handleError(error);
   }
   ```

2. **Q: Promise.all vs Promise.allSettled?**
   ```javascript
   // Promise.all - fails fast
   Promise.all([promise1, promise2]) // Rejects if any rejects
   
   // Promise.allSettled - waits for all
   Promise.allSettled([promise1, promise2]) // Always resolves
   ```

3. **Q: Error handling in async functions?**
   ```javascript
   async function safeAsync() {
     try {
       const result = await riskyOperation();
       return result;
     } catch (error) {
       console.error('Error:', error);
       throw error; // Re-throw or handle
     }
   }
   ```

### **Modules**

1. **Q: CommonJS vs ES Modules?**
   ```javascript
   // CommonJS (Node.js default)
   const module = require('./module');
   module.exports = {};
   
   // ES Modules (newer standard)
   import module from './module.js';
   export default {};
   ```

2. **Q: Module caching?**
   ```javascript
   // Modules are cached after first require
   const mod1 = require('./module'); // Loads and caches
   const mod2 = require('./module'); // Returns cached version
   console.log(mod1 === mod2); // true
   ```

3. **Q: Circular dependencies?**
   ```javascript
   // a.js
   const b = require('./b');
   module.exports = { name: 'a', b };
   
   // b.js
   const a = require('./a'); // May be empty object
   module.exports = { name: 'b', a };
   ```

## Best Practices

### **Event Loop**
✅ **Do:**
- Keep callbacks and async operations short
- Use setImmediate for CPU-intensive tasks
- Monitor event loop lag in production
- Avoid blocking the event loop

❌ **Don't:**
- Use synchronous I/O in production
- Perform heavy computations on main thread
- Ignore unhandled promise rejections
- Block the event loop with long-running operations

### **Async Programming**
✅ **Do:**
- Use async/await for cleaner code
- Handle all promise rejections
- Use Promise.all for parallel operations
- Implement proper error boundaries

❌ **Don't:**
- Mix callback and promise patterns
- Forget to await async functions
- Use nested callbacks (callback hell)
- Ignore error handling

### **Modules**
✅ **Do:**
- Use clear, descriptive module names
- Export only what's necessary
- Handle module loading errors
- Follow consistent export patterns

❌ **Don't:**
- Create circular dependencies
- Export everything globally
- Mutate imported modules
- Rely on module loading order

## Performance Tips

### **Event Loop Optimization**
```javascript
// ❌ Blocking
function heavySync() {
  let result = 0;
  for (let i = 0; i < 10000000; i++) {
    result += i;
  }
  return result;
}

// ✅ Non-blocking
async function heavyAsync() {
  let result = 0;
  for (let i = 0; i < 10000000; i++) {
    result += i;
    if (i % 100000 === 0) {
      await new Promise(resolve => setImmediate(resolve));
    }
  }
  return result;
}
```

### **Memory Management**
```javascript
// Clear timers and intervals
const timer = setTimeout(() => {}, 1000);
clearTimeout(timer);

// Remove event listeners
process.removeListener('uncaughtException', handler);

// Clean up resources
process.on('SIGTERM', () => {
  // Cleanup code
  process.exit(0);
});
```

## Debugging Tools

### **Event Loop Monitoring**
```javascript
// Check event loop lag
const start = process.hrtime.bigint();
setImmediate(() => {
  const lag = Number(process.hrtime.bigint() - start) / 1000000;
  console.log(`Event loop lag: ${lag}ms`);
});
```

### **Module Debugging**
```javascript
// Inspect module cache
console.log(Object.keys(require.cache));

// Clear module cache (testing only)
delete require.cache[require.resolve('./module')];
```

## Common Pitfalls

### **Async Gotchas**
```javascript
// ❌ Forgetting await
async function wrong() {
  const result = asyncOperation(); // Missing await!
  return result; // Returns Promise, not value
}

// ❌ Sequential instead of parallel
async function slow() {
  const a = await operation1(); // Wait
  const b = await operation2(); // Then wait
  return [a, b];
}

// ✅ Parallel execution
async function fast() {
  const [a, b] = await Promise.all([
    operation1(),
    operation2()
  ]);
  return [a, b];
}
```

### **Module Pitfalls**
```javascript
// ❌ Modifying exports after export
module.exports = { value: 1 };
module.exports.value = 2; // This works

// ❌ Reassigning exports
exports = { value: 1 }; // This doesn't work!
module.exports = { value: 1 }; // This works
``` 