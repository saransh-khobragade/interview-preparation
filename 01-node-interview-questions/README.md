# Node.js Interview Questions

Comprehensive Node.js interview preparation with trending questions and short, crisp examples.

## 📁 Directory Structure

### 1. **Fundamentals** (`1-fundamentals/`)
- **Event Loop**: Phases, microtasks, macrotasks, monitoring
- **Async Patterns**: Callbacks, Promises, async/await, error handling
- **Modules**: CommonJS, require mechanism, caching, circular dependencies

### 2. **Express & APIs** (`2-express-apis/`)
- **Express Basics**: Routing, middleware, HTTP methods, REST principles
- **Authentication**: JWT, sessions, authorization, security patterns

## 🎯 Interview Focus Areas

### **Node.js Core Concepts**
```javascript
// Event loop understanding
console.log('1');
process.nextTick(() => console.log('2'));
Promise.resolve().then(() => console.log('3'));
setTimeout(() => console.log('4'), 0);
console.log('5');
// Output: 1, 5, 2, 3, 4
```

### **Asynchronous Programming**
```javascript
// Async/await vs Promises vs Callbacks
async function fetchData() {
  try {
    const data = await api.getData();
    return data;
  } catch (error) {
    throw error;
  }
}
```

### **Express.js Fundamentals**
```javascript
// Basic Express app with middleware
const express = require('express');
const app = express();

app.use(express.json());
app.get('/api/users', (req, res) => {
  res.json({ users: [] });
});
```

## 🔥 Trending Interview Questions

### **Event Loop (Most Critical)**
1. **Event loop phases?** Timer → Pending → Poll → Check → Close
2. **Microtasks vs Macrotasks?** process.nextTick > Promises > setTimeout
3. **Blocking vs Non-blocking?** How to avoid blocking the event loop
4. **Event loop monitoring?** Detecting and measuring lag

### **Async Programming (High Frequency)**
1. **Callback hell solutions?** Promises, async/await, modular functions
2. **Error handling?** try/catch, .catch(), global handlers
3. **Promise methods?** Promise.all vs Promise.allSettled vs Promise.race
4. **Async patterns?** Sequential vs parallel execution

### **Express.js (Common)**
1. **Middleware types?** Application, router, error-handling, built-in
2. **Authentication strategies?** JWT vs sessions, security best practices
3. **Error handling?** Global error middleware, async error wrapper
4. **REST API design?** HTTP methods, status codes, resource naming

### **Performance & Scalability**
1. **Clustering?** Worker processes, load balancing
2. **Caching strategies?** Memory, Redis, CDN
3. **Database optimization?** Connection pooling, query optimization
4. **Monitoring?** Logging, metrics, health checks

## 📋 Quick Reference Cards

### **Event Loop Phases**
```javascript
// Execution order priority
1. Synchronous code
2. process.nextTick callbacks
3. Promise.resolve().then() callbacks
4. setTimeout/setInterval callbacks
5. setImmediate callbacks
6. I/O callbacks
```

### **Common Middleware Patterns**
```javascript
// Authentication middleware
const auth = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ error: 'No token' });
  // Verify token logic
  next();
};

// Error handling middleware
const errorHandler = (err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message });
};
```

### **Async Error Handling**
```javascript
// Async wrapper utility
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Usage
app.get('/users', asyncHandler(async (req, res) => {
  const users = await User.find();
  res.json(users);
}));
```

## 🚀 How to Use This Guide

### **For Beginners**
1. Master **Event Loop** - Understand phases and execution order
2. Learn **Async Patterns** - Callbacks → Promises → async/await
3. Practice **Express Basics** - Routing, middleware, error handling

### **For Intermediate**
1. Deep dive **Performance** - Clustering, caching, optimization
2. Master **Security** - Authentication, authorization, best practices
3. Study **Database Integration** - ODM/ORM, connection patterns

### **For Senior**
1. **Architecture Patterns** - Microservices, design patterns
2. **Scalability** - Load balancing, horizontal scaling
3. **DevOps Integration** - Docker, monitoring, deployment

## 💡 Interview Tips

### **Demonstrate Understanding**
- Explain event loop phases with examples
- Show async/await vs Promise differences
- Discuss middleware execution order
- Handle edge cases and errors

### **Best Practices**
- Write clean, readable code
- Use proper error handling
- Follow security guidelines
- Consider performance implications

### **Common Gotchas**
- Blocking the event loop
- Unhandled promise rejections
- Memory leaks in long-running processes
- Improper error middleware placement

## 🧪 Practice Exercises

### **Build These Applications**
1. **REST API** - CRUD operations with Express and MongoDB
2. **Authentication System** - JWT-based auth with refresh tokens
3. **Chat Application** - WebSocket integration with Socket.io
4. **File Upload Service** - Multer, validation, storage
5. **Microservice** - API gateway, service communication

### **Debugging Challenges**
1. Fix memory leaks in Express application
2. Optimize slow database queries
3. Implement proper error boundaries
4. Add monitoring and logging
5. Handle graceful shutdowns

## 📚 Essential Topics Covered

### **Core Node.js**
- Event loop and phases
- Asynchronous programming patterns
- Module system (CommonJS/ES6)
- Streams and buffers
- File system operations

### **Express.js**
- Middleware patterns
- Routing and controllers
- Authentication/authorization
- Error handling
- Security best practices

### **Database Integration**
- MongoDB with Mongoose
- SQL with Sequelize/TypeORM
- Connection pooling
- Query optimization
- Transactions

### **Performance & Security**
- Clustering and scaling
- Caching strategies
- Input validation
- Rate limiting
- HTTPS and encryption

### **Testing & Deployment**
- Unit and integration testing
- Docker containerization
- CI/CD pipelines
- Monitoring and logging
- Production best practices

Perfect for Node.js developer interviews from junior to senior level! 🎉 