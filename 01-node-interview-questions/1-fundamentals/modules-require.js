/**
 * Modules and Require - Common Interview Examples
 */

console.log('=== NODE.JS MODULES ===');

// 1. CommonJS Module Exports
console.log('\n1. COMMONJS EXPORTS');

// math.js module example
const mathModule = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => b !== 0 ? a / b : null
};

// Different export patterns
module.exports = mathModule; // Export entire object
// module.exports.add = (a, b) => a + b; // Export individual functions
// exports.add = (a, b) => a + b; // Using exports shorthand

// 2. Require Patterns
console.log('\n2. REQUIRE PATTERNS');

// Core modules
const fs = require('fs');
const path = require('path');
const url = require('url');

// Local modules
// const math = require('./math'); // Relative path
// const utils = require('../utils/helper'); // Parent directory

// NPM modules
// const express = require('express');
// const lodash = require('lodash');

// Destructuring require
const { join, dirname } = require('path');
const { readFile, writeFile } = require('fs').promises;

console.log('Path join example:', join(__dirname, 'test.txt'));

// 3. Module Caching Demonstration
console.log('\n3. MODULE CACHING');

// Create a module that tracks how many times it's loaded
let loadCount = 0;
const moduleLoader = {
  getLoadCount: () => ++loadCount,
  currentCount: loadCount
};

console.log('First load count:', moduleLoader.getLoadCount());
console.log('Second load count:', moduleLoader.getLoadCount());

// Modules are cached after first require
console.log('Module cache keys:', Object.keys(require.cache).length);

// 4. Module.exports vs exports
console.log('\n4. MODULE.EXPORTS VS EXPORTS');

// ✅ Correct usage
function createExportsExample() {
  const exportsExample = {};
  
  // These are equivalent:
  exportsExample.method1 = () => 'method1';
  // exports.method1 = () => 'method1';
  
  return exportsExample;
}

// ❌ Incorrect - overwrites exports reference
function incorrectExports() {
  let exports = {};
  exports = () => 'This won\'t work';
  return exports;
}

console.log('Correct exports:', createExportsExample());

// 5. Circular Dependencies
console.log('\n5. CIRCULAR DEPENDENCIES');

// a.js depends on b.js, b.js depends on a.js
const circularA = {
  name: 'moduleA',
  getB: () => circularB
};

const circularB = {
  name: 'moduleB',
  getA: () => circularA
};

console.log('Circular dependency A:', circularA.name);
console.log('Circular dependency B:', circularB.getA().name);

// 6. ES6 Modules (import/export) - Simulated
console.log('\n6. ES6 MODULES PATTERN');

// ES6 module pattern simulation
const ES6Module = (() => {
  // Named exports
  const namedExport1 = () => 'Named export 1';
  const namedExport2 = () => 'Named export 2';
  
  // Default export
  const defaultExport = () => 'Default export';
  
  // Export object
  return {
    namedExport1,
    namedExport2,
    default: defaultExport
  };
})();

// Destructuring import simulation
const { namedExport1, namedExport2 } = ES6Module;
const defaultImport = ES6Module.default;

console.log('Named import:', namedExport1());
console.log('Default import:', defaultImport());

// 7. Global vs Local Modules
console.log('\n7. GLOBAL VS LOCAL MODULES');

// Global object demonstration
global.myGlobalVar = 'I am global';

// Module scope variables
const moduleScoped = 'I am module scoped';

function demonstrateScope() {
  console.log('Global variable:', global.myGlobalVar);
  console.log('Module variable:', moduleScoped);
  
  // These are module-scoped, not global
  console.log('__dirname:', __dirname);
  console.log('__filename:', __filename);
  console.log('require is function:', typeof require);
  console.log('module object:', typeof module);
  console.log('exports object:', typeof exports);
}

demonstrateScope();

// 8. Dynamic Require
console.log('\n8. DYNAMIC REQUIRE');

function dynamicRequire(moduleName) {
  try {
    return require(moduleName);
  } catch (error) {
    console.log(`Failed to require ${moduleName}:`, error.message);
    return null;
  }
}

// Load core modules dynamically
const dynamicFS = dynamicRequire('fs');
const dynamicPath = dynamicRequire('path');

console.log('Dynamic fs loaded:', !!dynamicFS);
console.log('Dynamic path loaded:', !!dynamicPath);

// 9. Module Resolution Algorithm
console.log('\n9. MODULE RESOLUTION');

function simulateModuleResolution(moduleName) {
  const steps = [];
  
  if (moduleName.startsWith('./') || moduleName.startsWith('../')) {
    steps.push(`1. Relative path: ${moduleName}`);
    steps.push(`2. Look for ${moduleName}.js`);
    steps.push(`3. Look for ${moduleName}/index.js`);
    steps.push(`4. Look for ${moduleName}/package.json main field`);
  } else if (moduleName.startsWith('/')) {
    steps.push(`1. Absolute path: ${moduleName}`);
  } else {
    steps.push(`1. Core module check: ${moduleName}`);
    steps.push(`2. node_modules in current directory`);
    steps.push(`3. node_modules in parent directories`);
    steps.push(`4. Global node_modules`);
  }
  
  return steps;
}

console.log('Resolution for "./myModule":');
simulateModuleResolution('./myModule').forEach(step => console.log('  ', step));

console.log('Resolution for "express":');
simulateModuleResolution('express').forEach(step => console.log('  ', step));

// 10. Creating and Using Custom Modules
console.log('\n10. CUSTOM MODULE EXAMPLE');

// Logger module simulation
const Logger = (() => {
  const levels = {
    ERROR: 0,
    WARN: 1,
    INFO: 2,
    DEBUG: 3
  };
  
  let currentLevel = levels.INFO;
  
  function log(level, message) {
    if (level <= currentLevel) {
      const timestamp = new Date().toISOString();
      const levelName = Object.keys(levels)[level];
      console.log(`[${timestamp}] ${levelName}: ${message}`);
    }
  }
  
  return {
    setLevel: (level) => currentLevel = level,
    error: (msg) => log(levels.ERROR, msg),
    warn: (msg) => log(levels.WARN, msg),
    info: (msg) => log(levels.INFO, msg),
    debug: (msg) => log(levels.DEBUG, msg),
    levels
  };
})();

// Usage
Logger.info('Logger module loaded');
Logger.warn('This is a warning');
Logger.debug('This debug message won\'t show');

Logger.setLevel(Logger.levels.DEBUG);
Logger.debug('Now debug messages show');

// 11. Module Best Practices
console.log('\n11. MODULE BEST PRACTICES');

// ✅ Good module structure
const GoodModule = (() => {
  // Private variables and functions
  let privateVar = 'private';
  
  function privateFunction() {
    return 'private function';
  }
  
  // Public API
  return {
    // Clear, descriptive names
    publicMethod: () => 'public method',
    
    // Consistent API
    create: (options) => ({ ...options, type: 'created' }),
    update: (item, changes) => ({ ...item, ...changes }),
    delete: (item) => null,
    
    // Error handling
    safeOperation: (data) => {
      try {
        return privateFunction();
      } catch (error) {
        throw new Error(`GoodModule operation failed: ${error.message}`);
      }
    }
  };
})();

console.log('Good module example:', GoodModule.publicMethod());

// 12. Package.json and Module Entry Points
console.log('\n12. PACKAGE.JSON SIMULATION');

const packageJsonSimulation = {
  name: 'my-package',
  version: '1.0.0',
  main: 'index.js',           // CommonJS entry point
  module: 'esm/index.js',     // ES6 module entry point
  browser: 'browser/index.js', // Browser-specific version
  types: 'types/index.d.ts',  // TypeScript definitions
  exports: {
    '.': {
      require: './index.js',
      import: './esm/index.js',
      browser: './browser/index.js'
    },
    './utils': {
      require: './utils/index.js',
      import: './esm/utils/index.js'
    }
  }
};

console.log('Package.json structure:', Object.keys(packageJsonSimulation));

console.log('\nModules and require demonstration completed');

// Export this module for use in other files
module.exports = {
  mathModule,
  Logger,
  GoodModule,
  packageJsonSimulation
}; 