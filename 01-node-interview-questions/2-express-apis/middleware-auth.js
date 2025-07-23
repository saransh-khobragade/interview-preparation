/**
 * Middleware and Authentication - Common Interview Examples
 */

console.log('=== MIDDLEWARE AND AUTHENTICATION ===');

// 1. Custom Middleware Creation
console.log('\n1. CUSTOM MIDDLEWARE');

// Basic middleware structure
function createLogger(options = {}) {
  const { format = 'common', skip = () => false } = options;
  
  return function logger(req, res, next) {
    if (skip(req, res)) {
      return next();
    }
    
    const timestamp = new Date().toISOString();
    const method = req.method;
    const url = req.url;
    const userAgent = req.headers['user-agent'] || 'Unknown';
    
    // Log request
    console.log(`[${timestamp}] ${method} ${url} - ${userAgent}`);
    
    // Store start time for response time calculation
    req.startTime = Date.now();
    
    // Override res.end to log response
    const originalEnd = res.end;
    res.end = function(...args) {
      const duration = Date.now() - req.startTime;
      console.log(`[${timestamp}] ${method} ${url} - ${res.statusCode} - ${duration}ms`);
      originalEnd.apply(this, args);
    };
    
    next();
  };
}

// Usage example
const logger = createLogger({ 
  format: 'combined',
  skip: (req) => req.url === '/health'
});

console.log('Logger middleware created');

// 2. Error Handling Middleware
console.log('\n2. ERROR HANDLING MIDDLEWARE');

// Custom error class
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    
    Error.captureStackTrace(this, this.constructor);
  }
}

// Global error handler
function errorHandler(err, req, res, next) {
  let error = { ...err };
  error.message = err.message;
  
  // Log error
  console.error(`Error: ${error.message}`);
  
  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = 'Resource not found';
    error = new AppError(message, 404);
  }
  
  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    error = new AppError(message, 400);
  }
  
  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message);
    error = new AppError(message, 400);
  }
  
  // Send error response
  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
}

// Async error wrapper
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

console.log('Error handling middleware created');

// 3. Authentication Middleware
console.log('\n3. AUTHENTICATION MIDDLEWARE');

// JWT Token verification
function createJWTAuth(secret, options = {}) {
  const { 
    algorithm = 'HS256',
    expiresIn = '1h',
    issuer = 'app',
    audience = 'users'
  } = options;
  
  // Simulate JWT verification (normally use jsonwebtoken library)
  function verifyToken(token) {
    try {
      // In real implementation: jwt.verify(token, secret, options)
      // For simulation, we'll decode a simple base64 token
      const payload = JSON.parse(Buffer.from(token, 'base64').toString());
      
      // Check expiration
      if (payload.exp && Date.now() / 1000 > payload.exp) {
        throw new Error('Token expired');
      }
      
      return payload;
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
  
  return function authenticateJWT(req, res, next) {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        error: 'Access denied. No token provided.' 
      });
    }
    
    const token = authHeader.substring(7);
    
    try {
      const decoded = verifyToken(token);
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ 
        error: 'Invalid token.' 
      });
    }
  };
}

// Session-based authentication
function createSessionAuth(options = {}) {
  const { 
    sessionName = 'sessionId',
    maxAge = 24 * 60 * 60 * 1000, // 24 hours
    secure = false,
    httpOnly = true
  } = options;
  
  // Simple in-memory session store (use Redis in production)
  const sessions = new Map();
  
  return {
    authenticate: function(req, res, next) {
      const sessionId = req.cookies?.[sessionName];
      
      if (!sessionId) {
        return res.status(401).json({ 
          error: 'Authentication required' 
        });
      }
      
      const session = sessions.get(sessionId);
      
      if (!session || Date.now() > session.expires) {
        sessions.delete(sessionId);
        return res.status(401).json({ 
          error: 'Session expired' 
        });
      }
      
      req.user = session.user;
      req.session = session;
      next();
    },
    
    createSession: function(user) {
      const sessionId = require('crypto').randomBytes(32).toString('hex');
      const session = {
        id: sessionId,
        user,
        created: Date.now(),
        expires: Date.now() + maxAge
      };
      
      sessions.set(sessionId, session);
      return sessionId;
    },
    
    destroySession: function(sessionId) {
      return sessions.delete(sessionId);
    }
  };
}

const jwtAuth = createJWTAuth('secret-key');
const sessionAuth = createSessionAuth();

console.log('Authentication middleware created');

// 4. Authorization Middleware
console.log('\n4. AUTHORIZATION MIDDLEWARE');

// Role-based authorization
function authorize(roles = []) {
  return function(req, res, next) {
    if (!req.user) {
      return res.status(401).json({ 
        error: 'Authentication required' 
      });
    }
    
    if (roles.length && !roles.includes(req.user.role)) {
      return res.status(403).json({ 
        error: 'Insufficient permissions' 
      });
    }
    
    next();
  };
}

// Permission-based authorization
function hasPermission(permission) {
  return function(req, res, next) {
    if (!req.user) {
      return res.status(401).json({ 
        error: 'Authentication required' 
      });
    }
    
    const userPermissions = req.user.permissions || [];
    
    if (!userPermissions.includes(permission)) {
      return res.status(403).json({ 
        error: `Permission required: ${permission}` 
      });
    }
    
    next();
  };
}

// Resource ownership authorization
function isOwner(resourceIdParam = 'id') {
  return function(req, res, next) {
    if (!req.user) {
      return res.status(401).json({ 
        error: 'Authentication required' 
      });
    }
    
    const resourceId = req.params[resourceIdParam];
    const userId = req.user.id;
    
    // In real app, check database for ownership
    // For simulation, assume resource belongs to user if IDs match
    if (resourceId !== userId && req.user.role !== 'admin') {
      return res.status(403).json({ 
        error: 'Access denied. Not resource owner.' 
      });
    }
    
    next();
  };
}

console.log('Authorization middleware created');

// 5. Rate Limiting Middleware
console.log('\n5. RATE LIMITING MIDDLEWARE');

function createRateLimit(options = {}) {
  const {
    windowMs = 15 * 60 * 1000, // 15 minutes
    max = 100, // limit each IP to 100 requests per windowMs
    message = 'Too many requests, please try again later.',
    standardHeaders = true, // Return rate limit info in headers
    legacyHeaders = false
  } = options;
  
  const store = new Map();
  
  return function rateLimitMiddleware(req, res, next) {
    const key = req.ip || req.connection.remoteAddress;
    const now = Date.now();
    const windowStart = now - windowMs;
    
    // Get or create record for this IP
    let record = store.get(key) || { count: 0, resetTime: now + windowMs };
    
    // Clean old requests
    if (record.resetTime <= now) {
      record = { count: 0, resetTime: now + windowMs };
    }
    
    // Check if limit exceeded
    if (record.count >= max) {
      const resetTimeSeconds = Math.ceil((record.resetTime - now) / 1000);
      
      if (standardHeaders) {
        res.set({
          'X-RateLimit-Limit': max,
          'X-RateLimit-Remaining': 0,
          'X-RateLimit-Reset': new Date(record.resetTime).toISOString()
        });
      }
      
      return res.status(429).json({
        error: message,
        retryAfter: resetTimeSeconds
      });
    }
    
    // Increment count
    record.count++;
    store.set(key, record);
    
    // Set headers
    if (standardHeaders) {
      res.set({
        'X-RateLimit-Limit': max,
        'X-RateLimit-Remaining': max - record.count,
        'X-RateLimit-Reset': new Date(record.resetTime).toISOString()
      });
    }
    
    next();
  };
}

const rateLimiter = createRateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100
});

console.log('Rate limiting middleware created');

// 6. Input Validation Middleware
console.log('\n6. INPUT VALIDATION MIDDLEWARE');

function createValidator(schema) {
  return function validate(req, res, next) {
    const errors = [];
    
    // Validate body
    if (schema.body) {
      const bodyErrors = validateObject(req.body, schema.body, 'body');
      errors.push(...bodyErrors);
    }
    
    // Validate params
    if (schema.params) {
      const paramErrors = validateObject(req.params, schema.params, 'params');
      errors.push(...paramErrors);
    }
    
    // Validate query
    if (schema.query) {
      const queryErrors = validateObject(req.query, schema.query, 'query');
      errors.push(...queryErrors);
    }
    
    if (errors.length > 0) {
      return res.status(400).json({ 
        error: 'Validation failed',
        details: errors
      });
    }
    
    next();
  };
}

function validateObject(obj, schema, location) {
  const errors = [];
  
  for (const [field, rules] of Object.entries(schema)) {
    const value = obj[field];
    
    // Required check
    if (rules.required && (value === undefined || value === null || value === '')) {
      errors.push({
        field,
        message: `${field} is required`,
        location
      });
      continue;
    }
    
    // Skip validation if field is not present and not required
    if (value === undefined || value === null) continue;
    
    // Type validation
    if (rules.type && typeof value !== rules.type) {
      errors.push({
        field,
        message: `${field} must be of type ${rules.type}`,
        location
      });
    }
    
    // Min length
    if (rules.minLength && value.length < rules.minLength) {
      errors.push({
        field,
        message: `${field} must be at least ${rules.minLength} characters`,
        location
      });
    }
    
    // Max length
    if (rules.maxLength && value.length > rules.maxLength) {
      errors.push({
        field,
        message: `${field} must be no more than ${rules.maxLength} characters`,
        location
      });
    }
    
    // Pattern validation
    if (rules.pattern && !rules.pattern.test(value)) {
      errors.push({
        field,
        message: `${field} format is invalid`,
        location
      });
    }
  }
  
  return errors;
}

// Usage example
const userValidator = createValidator({
  body: {
    email: {
      required: true,
      type: 'string',
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    password: {
      required: true,
      type: 'string',
      minLength: 6
    },
    name: {
      required: true,
      type: 'string',
      minLength: 2,
      maxLength: 50
    }
  }
});

console.log('Validation middleware created');

// 7. CORS Middleware
console.log('\n7. CORS MIDDLEWARE');

function createCORS(options = {}) {
  const {
    origin = '*',
    methods = ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders = ['Content-Type', 'Authorization'],
    credentials = false,
    maxAge = 86400 // 24 hours
  } = options;
  
  return function corsMiddleware(req, res, next) {
    // Set CORS headers
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Methods', methods.join(', '));
    res.header('Access-Control-Allow-Headers', allowedHeaders.join(', '));
    
    if (credentials) {
      res.header('Access-Control-Allow-Credentials', 'true');
    }
    
    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Max-Age', maxAge);
      return res.status(200).end();
    }
    
    next();
  };
}

const cors = createCORS({
  origin: ['http://localhost:3000', 'https://myapp.com'],
  credentials: true
});

console.log('CORS middleware created');

// 8. Security Headers Middleware
console.log('\n8. SECURITY HEADERS MIDDLEWARE');

function securityHeaders(req, res, next) {
  // Prevent XSS attacks
  res.setHeader('X-XSS-Protection', '1; mode=block');
  
  // Prevent MIME type sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff');
  
  // Prevent clickjacking
  res.setHeader('X-Frame-Options', 'DENY');
  
  // HSTS (HTTPS only)
  if (req.secure) {
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  }
  
  // Content Security Policy
  res.setHeader('Content-Security-Policy', "default-src 'self'");
  
  // Referrer Policy
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  next();
}

console.log('Security headers middleware created');

// 9. Middleware Composition and Chaining
console.log('\n9. MIDDLEWARE COMPOSITION');

// Middleware composition utility
function compose(...middlewares) {
  return function composedMiddleware(req, res, next) {
    let index = 0;
    
    function dispatch(i) {
      if (i <= index) return Promise.reject(new Error('next() called multiple times'));
      index = i;
      
      let fn = middlewares[i];
      if (i === middlewares.length) fn = next;
      if (!fn) return Promise.resolve();
      
      try {
        return Promise.resolve(fn(req, res, dispatch.bind(null, i + 1)));
      } catch (err) {
        return Promise.reject(err);
      }
    }
    
    return dispatch(0);
  };
}

// Usage example
const apiMiddleware = compose(
  cors,
  securityHeaders,
  rateLimiter,
  jwtAuth,
  authorize(['user', 'admin'])
);

console.log('Middleware composition utility created');

// 10. Middleware Testing Patterns
console.log('\n10. MIDDLEWARE TESTING PATTERNS');

// Mock request/response objects for testing
function createMockRequest(overrides = {}) {
  return {
    method: 'GET',
    url: '/',
    headers: {},
    params: {},
    query: {},
    body: {},
    cookies: {},
    ip: '127.0.0.1',
    ...overrides
  };
}

function createMockResponse() {
  const res = {
    statusCode: 200,
    headers: {},
    locals: {}
  };
  
  res.status = function(code) {
    res.statusCode = code;
    return res;
  };
  
  res.json = function(data) {
    res.body = data;
    return res;
  };
  
  res.header = function(name, value) {
    res.headers[name] = value;
    return res;
  };
  
  res.setHeader = res.header;
  
  return res;
}

// Test helper
function testMiddleware(middleware, req, res) {
  return new Promise((resolve, reject) => {
    middleware(req, res, (err) => {
      if (err) reject(err);
      else resolve({ req, res });
    });
  });
}

console.log('Testing utilities created');

console.log('\nMiddleware and authentication demonstration completed');

// Export for use in other modules
module.exports = {
  createLogger,
  AppError,
  errorHandler,
  asyncHandler,
  createJWTAuth,
  createSessionAuth,
  authorize,
  hasPermission,
  isOwner,
  createRateLimit,
  createValidator,
  createCORS,
  securityHeaders,
  compose,
  createMockRequest,
  createMockResponse,
  testMiddleware
}; 