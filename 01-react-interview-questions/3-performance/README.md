# Performance Optimization

React performance optimization techniques and patterns for common interview scenarios.

## Files
- `memo-optimization.jsx` - React.memo, useMemo, useCallback patterns
- `lazy-loading.jsx` - Code splitting and lazy loading strategies

## Quick Reference

### React.memo
```jsx
// Basic memoization
const MyComponent = memo(function MyComponent({ prop }) {
  return <div>{prop}</div>;
});

// Custom comparison
const MyComponent = memo(function MyComponent({ user }) {
  return <div>{user.name}</div>;
}, (prevProps, nextProps) => {
  return prevProps.user.id === nextProps.user.id;
});
```

### useMemo & useCallback
```jsx
function Component({ items, onItemClick }) {
  // Memoize expensive calculations
  const expensiveValue = useMemo(() => {
    return items.reduce((sum, item) => sum + item.value, 0);
  }, [items]);
  
  // Memoize functions to prevent child re-renders
  const handleClick = useCallback((id) => {
    onItemClick(id);
  }, [onItemClick]);
  
  return <ChildComponent onClick={handleClick} total={expensiveValue} />;
}
```

### Lazy Loading
```jsx
// Basic lazy loading
const LazyComponent = lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}

// Route-based code splitting
const LazyPage = lazy(() => import('./pages/Dashboard'));
```

## Common Interview Questions

### **React.memo**

1. **Q: When to use React.memo?**
   - Component receives same props frequently
   - Expensive rendering operations
   - Child component in frequently updating parent

2. **Q: memo vs PureComponent?**
   ```jsx
   // memo (functional components)
   const MyComponent = memo(({ prop }) => <div>{prop}</div>);
   
   // PureComponent (class components)
   class MyComponent extends PureComponent {
     render() { return <div>{this.props.prop}</div>; }
   }
   ```

3. **Q: When memo doesn't help?**
   ```jsx
   // ❌ New object every render
   <MemoComponent user={{ name: 'John' }} />
   
   // ❌ New function every render
   <MemoComponent onClick={() => console.log('click')} />
   ```

### **useMemo & useCallback**

1. **Q: useMemo vs useCallback?**
   ```jsx
   // useMemo - memoize VALUES
   const expensiveValue = useMemo(() => calculate(data), [data]);
   
   // useCallback - memoize FUNCTIONS
   const memoizedFunction = useCallback(() => doSomething(), [dep]);
   ```

2. **Q: When to use useMemo?**
   - Expensive calculations
   - Creating objects/arrays that are props
   - Filtering/sorting large lists

3. **Q: useCallback dependencies?**
   ```jsx
   // ❌ Missing dependency
   const handleClick = useCallback(() => {
     console.log(name); // name should be in deps
   }, []);
   
   // ✅ Correct dependencies
   const handleClick = useCallback(() => {
     console.log(name);
   }, [name]);
   ```

### **Lazy Loading**

1. **Q: Benefits of code splitting?**
   - Smaller initial bundle size
   - Faster page load times
   - Load features only when needed

2. **Q: lazy() vs dynamic import?**
   ```jsx
   // lazy() - for React components
   const LazyComponent = lazy(() => import('./Component'));
   
   // Dynamic import - for any module
   const loadUtils = async () => {
     const utils = await import('./utils');
     return utils.someFunction();
   };
   ```

3. **Q: Error handling with lazy loading?**
   ```jsx
   <ErrorBoundary>
     <Suspense fallback={<Loading />}>
       <LazyComponent />
     </Suspense>
   </ErrorBoundary>
   ```

## Performance Anti-patterns

### **Common Mistakes**

❌ **Inline Objects/Functions**
```jsx
// Creates new object every render
<Component style={{ color: 'red' }} />
<Component onClick={() => doSomething()} />
```

❌ **Unnecessary useMemo/useCallback**
```jsx
// Primitive values don't need memoization
const memoizedString = useMemo(() => 'hello', []);
const memoizedNumber = useMemo(() => 42, []);
```

❌ **Wrong Dependencies**
```jsx
// Missing dependencies
const callback = useCallback(() => {
  doSomething(prop); // prop not in deps
}, []);

// Unnecessary dependencies
const value = useMemo(() => 
  calculateSomething(a), [a, b] // b is not used
);
```

### **Best Practices**

✅ **Optimize Wisely**
```jsx
// Profile first, optimize second
// Don't optimize everything - measure impact
// Use React DevTools Profiler
```

✅ **Component Structure**
```jsx
// Split components logically
// Keep state close to where it's used
// Use composition over prop drilling
```

✅ **List Optimization**
```jsx
// Use stable keys
{items.map(item => 
  <Item key={item.id} data={item} /> // Not index
)}

// Virtualize long lists
// Consider react-window or react-virtualized
```

## Performance Monitoring

### Development Tools
```jsx
// React DevTools Profiler
// - Identify slow components
// - Find unnecessary re-renders
// - Measure commit times

// React Strict Mode
<StrictMode>
  <App />
</StrictMode>
```

### Production Monitoring
```jsx
// Web Vitals
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);
getTTFB(console.log);
```

## Bundle Analysis

### Webpack Bundle Analyzer
```bash
npm install --save-dev webpack-bundle-analyzer
npm run build -- --analyze
```

### Code Splitting Strategies
```jsx
// Route-based splitting
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));

// Feature-based splitting
const AdminPanel = lazy(() => import('./features/admin'));
const UserDashboard = lazy(() => import('./features/dashboard'));

// Library splitting
const Charts = lazy(() => import('./components/Charts'));
const DataTable = lazy(() => import('./components/DataTable'));
``` 