# State Management

React state management patterns and solutions for common interview scenarios.

## Files
- `context-api.jsx` - Context API patterns with useContext
- `prop-drilling.jsx` - Prop drilling problem and solutions

## Quick Reference

### Context API Pattern
```jsx
// 1. Create Context
const MyContext = createContext();

// 2. Provider Component
function MyProvider({ children }) {
  const [state, setState] = useState(initialState);
  return (
    <MyContext.Provider value={{ state, setState }}>
      {children}
    </MyContext.Provider>
  );
}

// 3. Custom Hook
function useMyContext() {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error('useMyContext must be used within MyProvider');
  }
  return context;
}

// 4. Consumer Component
function MyComponent() {
  const { state, setState } = useMyContext();
  return <div>{state}</div>;
}
```

### useReducer with Context
```jsx
const reducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    default:
      return state;
  }
};

function CounterProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  return (
    <CounterContext.Provider value={{ state, dispatch }}>
      {children}
    </CounterContext.Provider>
  );
}
```

## Common Interview Questions

### **Context API**

1. **Q: When to use Context API?**
   - Global state (user auth, theme, language)
   - Avoiding prop drilling
   - When Redux is overkill

2. **Q: Context vs Props?**
   ```jsx
   // ❌ Prop drilling
   <A prop={value}>
     <B prop={value}>
       <C prop={value} />
     </B>
   </A>
   
   // ✅ Context
   <Provider value={value}>
     <A><B><C /></B></A>
   </Provider>
   ```

3. **Q: Multiple contexts?**
   ```jsx
   <ThemeProvider>
     <AuthProvider>
       <UserProvider>
         <App />
       </UserProvider>
     </AuthProvider>
   </ThemeProvider>
   ```

### **Prop Drilling**

1. **Q: What is prop drilling?**
   - Passing props through multiple component levels
   - Components that don't use props but pass them down
   - Makes components tightly coupled

2. **Q: Solutions to prop drilling?**
   - **Context API** - Global state access
   - **Component Composition** - Pass JSX as children
   - **Render Props** - Function as children pattern
   - **State Management Libraries** - Redux, Zustand

### **State Management Patterns**

1. **Q: Local vs Global state?**
   ```jsx
   // Local state
   function Component() {
     const [count, setCount] = useState(0);
     return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
   }
   
   // Global state
   const { count, increment } = useGlobalState();
   ```

2. **Q: When to lift state up?**
   - Multiple siblings need same data
   - Parent needs to coordinate children
   - State becomes shared concern

## Best Practices

### **Context API**
✅ **Do:**
- Split contexts by concern (auth, theme, data)
- Create custom hooks for context consumption
- Use error boundaries with context
- Memoize context values to prevent unnecessary re-renders

❌ **Don't:**
- Put everything in one large context
- Use context for frequently changing values
- Forget error handling in custom hooks

### **State Management**
✅ **Do:**
- Keep state as close to where it's used as possible
- Use useReducer for complex state logic
- Consider performance implications
- Use TypeScript for better context typing

❌ **Don't:**
- Over-engineer simple state needs
- Create unnecessary global state
- Forget to handle loading/error states

## Performance Considerations

### Context Re-rendering
```jsx
// ❌ Creates new object every render
<MyContext.Provider value={{ user, setUser }}>

// ✅ Memoize the value
const contextValue = useMemo(() => ({ user, setUser }), [user]);
<MyContext.Provider value={contextValue}>
```

### Split Contexts
```jsx
// ❌ One large context (causes unnecessary re-renders)
const AppContext = createContext(); // { user, theme, cart, ... }

// ✅ Separate concerns
const UserContext = createContext();
const ThemeContext = createContext();
const CartContext = createContext();
```

## Common Patterns

### Loading States
```jsx
function DataProvider({ children }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Fetch logic...
  
  return (
    <DataContext.Provider value={{ data, loading, error }}>
      {children}
    </DataContext.Provider>
  );
}
```

### Optimistic Updates
```jsx
function useOptimisticUpdate() {
  const [data, setData] = useState([]);
  
  const addItem = async (item) => {
    // Optimistic update
    setData(prev => [...prev, { ...item, id: Date.now() }]);
    
    try {
      const response = await api.addItem(item);
      setData(prev => prev.map(i => i.id === item.id ? response : i));
    } catch (error) {
      // Revert on error
      setData(prev => prev.filter(i => i.id !== item.id));
    }
  };
  
  return { data, addItem };
}
``` 