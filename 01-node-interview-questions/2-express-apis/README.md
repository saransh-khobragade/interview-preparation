# Express.js and APIs

Express.js fundamentals and API development patterns for Node.js interviews.

## Files
- `express-basics.js` - Express fundamentals, routing, HTTP methods
- `middleware-auth.js` - Custom middleware, authentication, authorization

## Quick Reference

### Basic Express App
```javascript
const express = require('express');
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Hello World!' });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

### Middleware Pattern
```javascript
// Custom middleware
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next(); // Important: call next()
};

// Error handling middleware (4 parameters)
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
};

// Usage
app.use(logger);
app.use(errorHandler); // Must be last
```

### Authentication Middleware
```javascript
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.sendStatus(401);
  
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};
```

## Common Interview Questions

### **Express Fundamentals**

1. **Q: What is Express.js?**
   - Fast, minimalist web framework for Node.js
   - Built on top of Node.js HTTP module
   - Provides robust set of features for web and mobile applications

2. **Q: Express vs Node.js HTTP module?**
   ```javascript
   // Node.js HTTP
   const http = require('http');
   const server = http.createServer((req, res) => {
     if (req.url === '/' && req.method === 'GET') {
       res.writeHead(200, { 'Content-Type': 'application/json' });
       res.end(JSON.stringify({ message: 'Hello' }));
     }
   });
   
   // Express
   const express = require('express');
   const app = express();
   app.get('/', (req, res) => {
     res.json({ message: 'Hello' });
   });
   ```

3. **Q: Express middleware?**
   - Functions that have access to req, res, and next
   - Execute in sequence during request-response cycle
   - Can modify req/res objects or end the cycle

### **HTTP Methods and REST**

1. **Q: HTTP methods in REST?**
   ```javascript
   // CRUD operations
   app.get('/users', getAllUsers);        // Read all
   app.get('/users/:id', getUser);        // Read one
   app.post('/users', createUser);        // Create
   app.put('/users/:id', updateUser);     // Update (replace)
   app.patch('/users/:id', patchUser);    // Update (partial)
   app.delete('/users/:id', deleteUser);  // Delete
   ```

2. **Q: Idempotent vs Safe methods?**
   ```javascript
   // Safe methods (no side effects)
   GET /users     // ✅ Safe, Idempotent
   HEAD /users    // ✅ Safe, Idempotent
   
   // Idempotent methods (same result when repeated)
   PUT /users/1   // ✅ Idempotent (not safe)
   DELETE /users/1 // ✅ Idempotent (not safe)
   
   // Neither safe nor idempotent
   POST /users    // ❌ Creates new resource each time
   ```

3. **Q: Status codes?**
   ```javascript
   res.status(200).json(data);        // OK
   res.status(201).json(created);     // Created
   res.status(204).send();            // No Content
   res.status(400).json({ error });   // Bad Request
   res.status(401).json({ error });   // Unauthorized
   res.status(403).json({ error });   // Forbidden
   res.status(404).json({ error });   // Not Found
   res.status(500).json({ error });   // Internal Server Error
   ```

### **Middleware**

1. **Q: Types of middleware?**
   ```javascript
   // Application-level
   app.use((req, res, next) => { next(); });
   
   // Router-level
   const router = express.Router();
   router.use('/users', userMiddleware);
   
   // Error-handling (4 parameters)
   app.use((err, req, res, next) => { /* handle error */ });
   
   // Built-in
   app.use(express.json());
   app.use(express.static('public'));
   
   // Third-party
   app.use(cors());
   app.use(helmet());
   ```

2. **Q: Middleware execution order?**
   ```javascript
   app.use(middleware1);     // Executes first
   app.use('/api', middleware2); // Only for /api routes
   app.get('/users', middleware3, handler); // Route-specific
   app.use(errorHandler);    // Error middleware (last)
   ```

3. **Q: Custom middleware example?**
   ```javascript
   const requestLogger = (req, res, next) => {
     const start = Date.now();
     
     // Override res.end to calculate duration
     const originalEnd = res.end;
     res.end = function(...args) {
       const duration = Date.now() - start;
       console.log(`${req.method} ${req.url} - ${res.statusCode} - ${duration}ms`);
       originalEnd.apply(this, args);
     };
     
     next();
   };
   ```

### **Authentication & Authorization**

1. **Q: JWT vs Session-based auth?**
   ```javascript
   // JWT (Stateless)
   const token = jwt.sign({ userId: 1 }, 'secret', { expiresIn: '1h' });
   res.json({ token });
   
   // Session (Stateful)
   req.session.userId = user.id;
   res.json({ message: 'Logged in' });
   ```

2. **Q: Role-based authorization?**
   ```javascript
   const authorize = (roles) => {
     return (req, res, next) => {
       if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
       if (!roles.includes(req.user.role)) {
         return res.status(403).json({ error: 'Forbidden' });
       }
       next();
     };
   };
   
   app.get('/admin', authenticate, authorize(['admin']), handler);
   ```

3. **Q: Securing APIs?**
   ```javascript
   // Rate limiting
   const rateLimit = require('express-rate-limit');
   const limiter = rateLimit({
     windowMs: 15 * 60 * 1000, // 15 minutes
     max: 100 // limit each IP to 100 requests per windowMs
   });
   
   // Security headers
   const helmet = require('helmet');
   app.use(helmet());
   
   // Input validation
   const { body, validationResult } = require('express-validator');
   app.post('/users', [
     body('email').isEmail(),
     body('password').isLength({ min: 6 })
   ], handler);
   ```

## Best Practices

### **Project Structure**
```
project/
├── app.js              # App entry point
├── routes/             # Route definitions
│   ├── users.js
│   └── auth.js
├── middleware/         # Custom middleware
│   ├── auth.js
│   └── validation.js
├── controllers/        # Route handlers
│   └── userController.js
├── models/            # Data models
│   └── User.js
└── utils/             # Utility functions
    └── helpers.js
```

### **Error Handling**
✅ **Do:**
- Use async error handling middleware
- Implement global error handler
- Return consistent error responses
- Log errors appropriately

```javascript
// Async wrapper
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Usage
app.get('/users', asyncHandler(async (req, res) => {
  const users = await User.find();
  res.json(users);
}));

// Global error handler
app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  res.status(statusCode).json({
    success: false,
    error: err.message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});
```

### **Security**
✅ **Do:**
- Use HTTPS in production
- Implement proper authentication
- Validate and sanitize input
- Use security headers (helmet)
- Implement rate limiting
- Handle CORS properly

❌ **Don't:**
- Store sensitive data in JWT payload
- Use default session settings
- Trust user input without validation
- Expose error details in production
- Use weak encryption algorithms

### **Performance**
✅ **Do:**
- Use gzip compression
- Implement caching strategies
- Use connection pooling
- Optimize database queries
- Use CDN for static assets

```javascript
// Compression
const compression = require('compression');
app.use(compression());

// Caching
const cache = require('memory-cache');
const cacheMiddleware = (duration) => {
  return (req, res, next) => {
    const key = req.originalUrl || req.url;
    const cached = cache.get(key);
    
    if (cached) {
      return res.json(cached);
    }
    
    res.sendResponse = res.json;
    res.json = (body) => {
      cache.put(key, body, duration * 1000);
      res.sendResponse(body);
    };
    
    next();
  };
};
```

## Common Patterns

### **API Response Format**
```javascript
// Success response
{
  "success": true,
  "data": {},
  "message": "Operation successful"
}

// Error response
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE"
}

// Paginated response
{
  "success": true,
  "data": [],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "pages": 10
  }
}
```

### **Request Validation**
```javascript
const Joi = require('joi');

const validateUser = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    name: Joi.string().min(2).max(50).required()
  });
  
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      error: error.details[0].message
    });
  }
  
  next();
};
```

### **Database Integration**
```javascript
// MongoDB with Mongoose
const User = require('../models/User');

const getUsers = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const users = await User.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('-password');
    
    res.json({
      success: true,
      data: users
    });
  } catch (error) {
    next(error);
  }
};
``` 