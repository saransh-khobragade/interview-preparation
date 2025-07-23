# React Interview Questions

Comprehensive React interview preparation with trending questions and short, crisp examples.

## 📁 Directory Structure

### 1. **Hooks** (`1-hooks/`)
- **useState Examples**: Counter, object state, array state, toggles
- **useEffect Examples**: Lifecycle, data fetching, timers, event listeners
- **Custom Hooks**: useLocalStorage, useFetch, useToggle, useDebounce

### 2. **State Management** (`2-state-management/`)
- **Context API**: Theme provider, authentication, shopping cart with useReducer
- **Prop Drilling**: Problem demonstration and multiple solutions

### 3. **Performance** (`3-performance/`)
- **Memo Optimization**: React.memo, useMemo, useCallback patterns
- **Lazy Loading**: Code splitting, Suspense, error boundaries

### 4. **Component Patterns** (`4-component-patterns/`)
- **Higher Order Components**: Authentication, data fetching, error handling
- **Component Composition**: Render props, compound components

## 🎯 Interview Focus Areas

### **React Fundamentals**
```jsx
// Component lifecycle, state updates, event handling
function Component() {
  const [state, setState] = useState(initialValue);
  
  useEffect(() => {
    // Side effects, cleanup
  }, [dependencies]);
  
  return <div onClick={handleClick}>{state}</div>;
}
```

### **State Management**
```jsx
// Local vs global state, Context API, prop drilling solutions
const context = useContext(MyContext);
const [state, dispatch] = useReducer(reducer, initialState);
```

### **Performance Optimization**
```jsx
// Memoization, code splitting, bundle optimization
const memoized = useMemo(() => expensiveCalc(), [deps]);
const LazyComponent = lazy(() => import('./Component'));
```

### **Component Patterns**
```jsx
// HOCs, render props, compound components
const EnhancedComponent = withAuth(Component);
<DataProvider>{({ data }) => <Component data={data} />}</DataProvider>
```

## 🔥 Trending Interview Questions

### **Hooks (Most Common)**
1. **useState vs useReducer?** When to use each?
2. **useEffect cleanup?** How to prevent memory leaks?
3. **Custom hooks?** Creating reusable stateful logic
4. **Dependencies array?** Common mistakes and best practices

### **Performance (High Frequency)**
1. **React.memo vs useMemo?** When and how to optimize?
2. **Code splitting?** Implementing lazy loading strategies
3. **Bundle optimization?** Analyzing and reducing bundle size
4. **Re-rendering issues?** Identifying and fixing performance bottlenecks

### **State Management (Senior Level)**
1. **Context API vs Redux?** When to choose each?
2. **Prop drilling solutions?** Multiple approaches and trade-offs
3. **State lifting?** Where to place state in component tree
4. **Global state patterns?** Best practices for large applications

### **Component Patterns (Advanced)**
1. **HOC vs Hooks?** Migration strategies and modern patterns
2. **Render props?** When and how to implement
3. **Compound components?** Building flexible component APIs
4. **Component composition?** Avoiding prop drilling with children

## 📋 Quick Reference Cards

### **useState Patterns**
```jsx
// ❌ Wrong - direct mutation
state.push(item);
setState(state);

// ✅ Correct - immutable updates
setState(prev => [...prev, item]);
setState(prev => ({ ...prev, key: value }));
```

### **useEffect Dependencies**
```jsx
// ❌ Missing dependencies
useEffect(() => {
  fetchData(userId); // userId not in deps
}, []);

// ✅ Complete dependencies
useEffect(() => {
  fetchData(userId);
}, [userId]);
```

### **Performance Optimization**
```jsx
// ❌ New object every render
<Component config={{ theme: 'dark' }} />

// ✅ Memoized object
const config = useMemo(() => ({ theme: 'dark' }), []);
<Component config={config} />
```

### **Context Best Practices**
```jsx
// ❌ One large context
const AppContext = createContext(); // Everything

// ✅ Split by concern
const AuthContext = createContext();
const ThemeContext = createContext();
```

## 🚀 How to Use This Guide

### **For Beginners**
1. Start with **Hooks** - Master useState and useEffect first
2. Practice **State Management** - Understand local vs global state
3. Learn **Basic Patterns** - Component composition and props

### **For Intermediate**
1. Focus on **Performance** - memo, useMemo, useCallback
2. Study **Context API** - When and how to use effectively
3. Practice **Code Splitting** - Lazy loading implementations

### **For Senior**
1. Master **Component Patterns** - HOCs, render props, compound components
2. Deep dive **Performance** - Bundle analysis, optimization strategies
3. Understand **Architecture** - State management, component design

## 💡 Interview Tips

### **Code Quality**
- Write clean, readable code
- Use meaningful variable names
- Add comments for complex logic
- Handle edge cases and errors

### **Problem Solving**
- Ask clarifying questions
- Think out loud while coding
- Consider multiple approaches
- Discuss trade-offs and alternatives

### **Best Practices**
- Follow React patterns and conventions
- Consider performance implications
- Think about maintainability
- Demonstrate testing knowledge

## 🧪 Practice Exercises

### **Build These Components**
1. **Todo App** - useState, useEffect, local storage
2. **User Dashboard** - Context API, authentication
3. **Product List** - Performance optimization, lazy loading
4. **Theme Switcher** - Context, custom hooks
5. **Shopping Cart** - useReducer, complex state management

### **Optimization Challenges**
1. Fix unnecessary re-renders in parent-child components
2. Implement code splitting for a multi-page application
3. Optimize a large list with thousands of items
4. Create a custom hook for API data fetching
5. Build an HOC for authentication logic

## 📚 Additional Resources

- **React Documentation** - Official patterns and best practices
- **React DevTools** - Profiling and debugging
- **Bundle Analyzers** - Understanding bundle composition
- **Performance Monitoring** - Web Vitals and metrics

Perfect for React developer interviews at any level - from junior to senior positions! 🎉 