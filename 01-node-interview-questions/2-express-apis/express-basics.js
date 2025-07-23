/**
 * Express.js Basics - Common Interview Examples
 */

// Note: This is a simulation since we can't actually run Express in this environment
console.log('=== EXPRESS.JS BASICS ===');

// 1. Basic Express App Structure
console.log('\n1. BASIC EXPRESS APP');

const expressAppSimulation = {
  // Basic app setup
  setup: `
    const express = require('express');
    const app = express();
    const PORT = process.env.PORT || 3000;
    
    // Middleware
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    
    // Routes
    app.get('/', (req, res) => {
      res.json({ message: 'Hello World!' });
    });
    
    app.listen(PORT, () => {
      console.log(\`Server running on port \${PORT}\`);
    });
  `,
  
  // Route examples
  routes: {
    basic: 'app.get("/", (req, res) => res.send("Hello"))',
    withParams: 'app.get("/users/:id", (req, res) => { const id = req.params.id; })',
    withQuery: 'app.get("/search", (req, res) => { const query = req.query.q; })',
    withBody: 'app.post("/users", (req, res) => { const data = req.body; })'
  }
};

console.log('Express app structure example provided');

// 2. HTTP Methods Simulation
console.log('\n2. HTTP METHODS');

const httpMethods = {
  GET: {
    purpose: 'Retrieve data',
    example: 'app.get("/users", (req, res) => res.json(users))',
    safe: true,
    idempotent: true
  },
  POST: {
    purpose: 'Create new resource',
    example: 'app.post("/users", (req, res) => { /* create user */ })',
    safe: false,
    idempotent: false
  },
  PUT: {
    purpose: 'Update/replace resource',
    example: 'app.put("/users/:id", (req, res) => { /* update user */ })',
    safe: false,
    idempotent: true
  },
  PATCH: {
    purpose: 'Partial update',
    example: 'app.patch("/users/:id", (req, res) => { /* partial update */ })',
    safe: false,
    idempotent: false
  },
  DELETE: {
    purpose: 'Delete resource',
    example: 'app.delete("/users/:id", (req, res) => { /* delete user */ })',
    safe: false,
    idempotent: true
  }
};

Object.entries(httpMethods).forEach(([method, info]) => {
  console.log(`${method}: ${info.purpose} (Safe: ${info.safe}, Idempotent: ${info.idempotent})`);
});

// 3. Middleware Concepts
console.log('\n3. MIDDLEWARE CONCEPTS');

// Middleware function simulation
function createMiddleware(name) {
  return function middleware(req, res, next) {
    console.log(`${name} middleware executed`);
    // Add properties to req/res
    req.customProperty = `Added by ${name}`;
    // Call next() to continue to next middleware
    next();
  };
}

// Middleware types
const middlewareTypes = {
  applicationLevel: `
    // Applied to all routes
    app.use((req, res, next) => {
      console.log('Time:', Date.now());
      next();
    });
  `,
  
  routerLevel: `
    // Applied to specific router
    const router = express.Router();
    router.use((req, res, next) => {
      console.log('Router middleware');
      next();
    });
  `,
  
  errorHandling: `
    // Error handling middleware (4 parameters)
    app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).send('Something broke!');
    });
  `,
  
  builtin: `
    // Built-in middleware
    app.use(express.json()); // Parse JSON
    app.use(express.static('public')); // Serve static files
  `,
  
  thirdParty: `
    // Third-party middleware
    const cors = require('cors');
    const helmet = require('helmet');
    app.use(cors());
    app.use(helmet());
  `
};

console.log('Middleware types:', Object.keys(middlewareTypes));

// 4. Request and Response Objects
console.log('\n4. REQUEST AND RESPONSE OBJECTS');

const requestObjectProps = {
  params: 'Route parameters (/users/:id)',
  query: 'Query string parameters (?name=john)',
  body: 'Request body (POST/PUT data)',
  headers: 'HTTP headers',
  method: 'HTTP method (GET, POST, etc.)',
  url: 'Request URL',
  path: 'URL path',
  cookies: 'Request cookies',
  ip: 'Client IP address',
  protocol: 'Request protocol (http/https)'
};

const responseObjectMethods = {
  'res.send()': 'Send response',
  'res.json()': 'Send JSON response',
  'res.status()': 'Set status code',
  'res.redirect()': 'Redirect request',
  'res.cookie()': 'Set cookie',
  'res.render()': 'Render template',
  'res.download()': 'Download file',
  'res.end()': 'End response'
};

console.log('Request properties:', Object.keys(requestObjectProps));
console.log('Response methods:', Object.keys(responseObjectMethods));

// 5. Route Parameters and Query Strings
console.log('\n5. ROUTE PARAMETERS AND QUERY STRINGS');

function simulateRouteHandling() {
  // Simulate different route patterns
  const routePatterns = {
    basic: '/users',
    withParam: '/users/:id',
    multipleParams: '/users/:userId/posts/:postId',
    optionalParam: '/posts/:id?',
    wildcardParam: '/files/*',
    regexParam: '/products/:id(\\d+)' // Only numbers
  };
  
  // Simulate request parsing
  const simulatedRequest = {
    url: '/users/123/posts/456?sort=date&limit=10',
    params: { userId: '123', postId: '456' },
    query: { sort: 'date', limit: '10' },
    body: { title: 'New Post', content: 'Post content' }
  };
  
  console.log('Route patterns:', routePatterns);
  console.log('Parsed request:', simulatedRequest);
}

simulateRouteHandling();

// 6. Error Handling Patterns
console.log('\n6. ERROR HANDLING PATTERNS');

const errorHandlingPatterns = {
  syncError: `
    app.get('/sync-error', (req, res) => {
      try {
        // Synchronous operation that might throw
        const result = riskyOperation();
        res.json(result);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });
  `,
  
  asyncError: `
    app.get('/async-error', async (req, res, next) => {
      try {
        const result = await asyncOperation();
        res.json(result);
      } catch (error) {
        next(error); // Pass error to error handling middleware
      }
    });
  `,
  
  asyncWrapper: `
    const asyncHandler = (fn) => (req, res, next) => {
      Promise.resolve(fn(req, res, next)).catch(next);
    };
    
    app.get('/wrapped', asyncHandler(async (req, res) => {
      const result = await asyncOperation();
      res.json(result);
    }));
  `,
  
  globalErrorHandler: `
    app.use((err, req, res, next) => {
      console.error(err.stack);
      
      if (err.name === 'ValidationError') {
        return res.status(400).json({ error: 'Validation failed' });
      }
      
      if (err.name === 'UnauthorizedError') {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      
      res.status(500).json({ error: 'Internal server error' });
    });
  `
};

console.log('Error handling patterns demonstrated');

// 7. REST API Design Patterns
console.log('\n7. REST API DESIGN PATTERNS');

const restApiPatterns = {
  resources: {
    'GET /users': 'Get all users',
    'GET /users/:id': 'Get specific user',
    'POST /users': 'Create new user',
    'PUT /users/:id': 'Update user (replace)',
    'PATCH /users/:id': 'Update user (partial)',
    'DELETE /users/:id': 'Delete user'
  },
  
  nested: {
    'GET /users/:id/posts': 'Get user posts',
    'POST /users/:id/posts': 'Create post for user',
    'GET /users/:id/posts/:postId': 'Get specific user post'
  },
  
  statusCodes: {
    200: 'OK - Successful GET, PUT, PATCH',
    201: 'Created - Successful POST',
    204: 'No Content - Successful DELETE',
    400: 'Bad Request - Invalid request',
    401: 'Unauthorized - Authentication required',
    403: 'Forbidden - Access denied',
    404: 'Not Found - Resource not found',
    500: 'Internal Server Error - Server error'
  }
};

console.log('REST API patterns defined');

// 8. Validation and Sanitization
console.log('\n8. VALIDATION AND SANITIZATION');

// Simulated validation middleware
function createValidator(schema) {
  return function validator(req, res, next) {
    const errors = [];
    
    // Simulate validation logic
    if (schema.email && !req.body.email?.includes('@')) {
      errors.push('Invalid email format');
    }
    
    if (schema.password && req.body.password?.length < 6) {
      errors.push('Password must be at least 6 characters');
    }
    
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }
    
    next();
  };
}

const validationExamples = {
  expressValidator: `
    const { body, validationResult } = require('express-validator');
    
    app.post('/users', [
      body('email').isEmail(),
      body('password').isLength({ min: 6 })
    ], (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      // Process valid data
    });
  `,
  
  joi: `
    const Joi = require('joi');
    
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required()
    });
    
    const validate = (req, res, next) => {
      const { error } = schema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
      next();
    };
  `
};

console.log('Validation examples provided');

// 9. Authentication and Authorization
console.log('\n9. AUTHENTICATION AND AUTHORIZATION');

const authPatterns = {
  basicAuth: `
    app.use((req, res, next) => {
      const auth = req.headers.authorization;
      if (!auth || !auth.startsWith('Basic ')) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      
      const credentials = Buffer.from(auth.slice(6), 'base64').toString();
      const [username, password] = credentials.split(':');
      
      // Verify credentials
      if (isValidUser(username, password)) {
        req.user = { username };
        next();
      } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    });
  `,
  
  jwtAuth: `
    const jwt = require('jsonwebtoken');
    
    const authenticateToken = (req, res, next) => {
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1];
      
      if (!token) {
        return res.sendStatus(401);
      }
      
      jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
      });
    };
    
    app.get('/protected', authenticateToken, (req, res) => {
      res.json({ message: 'Protected route', user: req.user });
    });
  `,
  
  roleBasedAuth: `
    const authorize = (roles) => {
      return (req, res, next) => {
        if (!req.user) {
          return res.status(401).json({ error: 'Unauthorized' });
        }
        
        if (!roles.includes(req.user.role)) {
          return res.status(403).json({ error: 'Forbidden' });
        }
        
        next();
      };
    };
    
    app.get('/admin', authenticateToken, authorize(['admin']), (req, res) => {
      res.json({ message: 'Admin only' });
    });
  `
};

console.log('Authentication patterns demonstrated');

// 10. Express Best Practices
console.log('\n10. EXPRESS BEST PRACTICES');

const bestPractices = {
  security: [
    'Use helmet for security headers',
    'Implement rate limiting',
    'Validate and sanitize input',
    'Use HTTPS in production',
    'Set secure session configuration'
  ],
  
  performance: [
    'Use gzip compression',
    'Implement caching strategies',
    'Use connection pooling for databases',
    'Optimize middleware order',
    'Use CDN for static assets'
  ],
  
  structure: [
    'Separate routes into modules',
    'Use environment variables',
    'Implement proper logging',
    'Use graceful shutdown',
    'Follow RESTful conventions'
  ],
  
  errorHandling: [
    'Use async error handling middleware',
    'Implement global error handler',
    'Log errors appropriately',
    'Return consistent error responses',
    'Handle unhandled promise rejections'
  ]
};

console.log('Best practices categories:', Object.keys(bestPractices));
console.log('Security practices count:', bestPractices.security.length);
console.log('Performance practices count:', bestPractices.performance.length);

console.log('\nExpress.js basics demonstration completed');

// Export for use in other modules
module.exports = {
  expressAppSimulation,
  httpMethods,
  middlewareTypes,
  requestObjectProps,
  responseObjectMethods,
  errorHandlingPatterns,
  restApiPatterns,
  validationExamples,
  authPatterns,
  bestPractices
}; 