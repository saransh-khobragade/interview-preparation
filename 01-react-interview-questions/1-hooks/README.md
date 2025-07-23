# React Hooks

Essential React hooks with common interview examples and patterns.

## Files
- `useState-examples.jsx` - State management patterns
- `useEffect-examples.jsx` - Side effects and lifecycle
- `custom-hooks.jsx` - Reusable custom hook patterns

## Quick Reference

### useState Patterns
```jsx
// Basic state
const [count, setCount] = useState(0);

// Object state (spread pattern)
const [user, setUser] = useState({ name: '', email: '' });
setUser(prev => ({ ...prev, name: 'John' }));

// Array state
const [items, setItems] = useState([]);
setItems(prev => [...prev, newItem]);
```

### useEffect Patterns
```jsx
// Mount/unmount
useEffect(() => {
  console.log('mounted');
  return () => console.log('unmounted');
}, []);

// Dependency array
useEffect(() => {
  fetchData();
}, [userId]); // Runs when userId changes

// Cleanup (timers, listeners)
useEffect(() => {
  const timer = setInterval(() => {}, 1000);
  return () => clearInterval(timer);
}, []);
```

### Custom Hooks
```jsx
// Local storage sync
const [value, setValue] = useLocalStorage('key', defaultValue);

// Data fetching
const { data, loading, error } = useFetch('/api/endpoint');

// Toggle state
const [isOpen, toggle] = useToggle(false);

// Debounced value
const debouncedValue = useDebounce(searchTerm, 500);
```

## Common Interview Questions

### **useState**
1. **Q: How to update object state?**
   ```jsx
   // ❌ Wrong - mutates state
   user.name = 'John';
   setUser(user);
   
   // ✅ Correct - spread operator
   setUser(prev => ({ ...prev, name: 'John' }));
   ```

2. **Q: Why use functional updates?**
   ```jsx
   // ❌ Closure issue
   setCount(count + 1);
   
   // ✅ Always get latest state
   setCount(prev => prev + 1);
   ```

### **useEffect**
1. **Q: What's the difference between dependency arrays?**
   ```jsx
   useEffect(() => {}); // Every render
   useEffect(() => {}, []); // Once on mount
   useEffect(() => {}, [value]); // When value changes
   ```

2. **Q: How to cleanup effects?**
   ```jsx
   useEffect(() => {
     const subscription = subscribe();
     return () => subscription.unsubscribe(); // Cleanup
   }, []);
   ```

### **Custom Hooks**
1. **Q: When to create custom hooks?**
   - Reusable stateful logic
   - Multiple components need same logic
   - Complex state management

2. **Q: Custom hook rules?**
   - Must start with "use"
   - Can call other hooks
   - Return values/functions for component use

## Best Practices

✅ **useState**
- Use functional updates for dependent state changes
- Separate concerns (multiple useState vs single object)
- Initialize with functions for expensive computations

✅ **useEffect** 
- Always include dependencies in array
- Cleanup side effects (timers, subscriptions)
- Separate effects by concern

✅ **Custom Hooks**
- Single responsibility principle
- Return consistent interface
- Handle edge cases and errors

## Performance Tips

- Use `useCallback` for memoizing functions
- Use `useMemo` for expensive calculations
- Consider `useReducer` for complex state logic
- Avoid creating objects/arrays in render 