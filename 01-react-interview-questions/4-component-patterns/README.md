# Component Patterns

React component patterns and design principles for common interview scenarios.

## Files
- `higher-order-components.jsx` - HOC patterns and implementations

## Quick Reference

### Higher Order Components (HOC)
```jsx
// Basic HOC pattern
function withFeature(WrappedComponent) {
  return function WithFeatureComponent(props) {
    // Add logic here
    return <WrappedComponent {...props} extraProp={value} />;
  };
}

// Usage
const EnhancedComponent = withFeature(MyComponent);
```

### Common HOC Patterns
```jsx
// Authentication
const withAuth = (Component) => (props) => {
  const { user } = useAuth();
  if (!user) return <Login />;
  return <Component {...props} user={user} />;
};

// Data fetching
const withData = (url) => (Component) => (props) => {
  const { data, loading, error } = useFetch(url);
  if (loading) return <Loading />;
  if (error) return <Error error={error} />;
  return <Component {...props} data={data} />;
};

// Error boundary
const withErrorBoundary = (Component) => {
  return class extends React.Component {
    state = { hasError: false };
    static getDerivedStateFromError() { return { hasError: true }; }
    render() {
      if (this.state.hasError) return <ErrorFallback />;
      return <Component {...this.props} />;
    }
  };
};
```

## Common Interview Questions

### **Higher Order Components**

1. **Q: What is a Higher Order Component?**
   - Function that takes a component and returns a new component
   - Used for cross-cutting concerns (auth, logging, data fetching)
   - Follows higher-order function concept from functional programming

2. **Q: HOC vs Hooks?**
   ```jsx
   // HOC approach
   const withAuth = (Component) => (props) => {
     const user = getUser();
     return user ? <Component {...props} user={user} /> : <Login />;
   };
   
   // Hooks approach
   function useAuth() {
     const [user, setUser] = useState(null);
     // auth logic
     return user;
   }
   
   function MyComponent() {
     const user = useAuth();
     if (!user) return <Login />;
     return <div>Welcome {user.name}</div>;
   }
   ```

3. **Q: HOC composition?**
   ```jsx
   // Manual composition
   const Enhanced = withA(withB(withC(Component)));
   
   // Using compose utility
   const compose = (...hocs) => (Component) => 
     hocs.reduceRight((acc, hoc) => hoc(acc), Component);
   
   const Enhanced = compose(withA, withB, withC)(Component);
   ```

4. **Q: HOC best practices?**
   - Don't mutate the original component
   - Pass through unrelated props
   - Use displayName for debugging
   - Don't use HOCs in render method

### **Component Patterns**

1. **Q: Render Props vs HOC?**
   ```jsx
   // Render Props
   <DataProvider>
     {({ data, loading }) => (
       loading ? <Loading /> : <Component data={data} />
     )}
   </DataProvider>
   
   // HOC
   const ComponentWithData = withData(Component);
   ```

2. **Q: Compound Components?**
   ```jsx
   // Compound component pattern
   <Select>
     <Select.Option value="1">Option 1</Select.Option>
     <Select.Option value="2">Option 2</Select.Option>
   </Select>
   ```

3. **Q: Props drilling solutions?**
   - Context API
   - Component composition
   - Render props
   - State management libraries

## HOC Implementation Patterns

### **1. Basic HOC**
```jsx
function withLoading(WrappedComponent) {
  return function WithLoadingComponent(props) {
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
      // Simulate loading
      setTimeout(() => setLoading(false), 1000);
    }, []);
    
    if (loading) return <div>Loading...</div>;
    return <WrappedComponent {...props} />;
  };
}
```

### **2. HOC with Parameters**
```jsx
function withRetry(maxRetries = 3) {
  return function(WrappedComponent) {
    return function WithRetryComponent(props) {
      const [retries, setRetries] = useState(0);
      const [error, setError] = useState(null);
      
      const retry = () => {
        if (retries < maxRetries) {
          setRetries(r => r + 1);
          setError(null);
        }
      };
      
      return error ? (
        <div>
          Error occurred. Retry {retries}/{maxRetries}
          <button onClick={retry}>Retry</button>
        </div>
      ) : (
        <WrappedComponent {...props} onError={setError} />
      );
    };
  };
}
```

### **3. HOC with Context**
```jsx
function withTheme(WrappedComponent) {
  return function WithThemeComponent(props) {
    const theme = useContext(ThemeContext);
    return <WrappedComponent {...props} theme={theme} />;
  };
}
```

## Best Practices

### **HOC Development**
✅ **Do:**
- Use forwardRef when wrapping components that need refs
- Copy static methods from wrapped component
- Set displayName for debugging
- Pass through unrelated props

❌ **Don't:**
- Mutate the original component
- Use HOCs inside render method
- Create HOCs in component render

### **Example Best Practices**
```jsx
function withFeature(WrappedComponent) {
  function WithFeatureComponent(props) {
    // Implementation
    return <WrappedComponent {...props} />;
  }
  
  // Copy static methods
  WithFeatureComponent.displayName = 
    `withFeature(${WrappedComponent.displayName || WrappedComponent.name})`;
  
  // Forward refs if needed
  return React.forwardRef((props, ref) => (
    <WithFeatureComponent {...props} forwardedRef={ref} />
  ));
}
```

## Common Use Cases

### **1. Authentication**
```jsx
const withAuth = (Component) => (props) => {
  const { user, loading } = useAuth();
  
  if (loading) return <Spinner />;
  if (!user) return <Redirect to="/login" />;
  
  return <Component {...props} user={user} />;
};
```

### **2. Data Fetching**
```jsx
const withData = (url) => (Component) => (props) => {
  const { data, loading, error } = useFetch(url);
  
  if (loading) return <Loading />;
  if (error) return <Error message={error.message} />;
  
  return <Component {...props} data={data} />;
};
```

### **3. Error Handling**
```jsx
const withErrorBoundary = (Component) => {
  return class extends React.Component {
    state = { hasError: false, error: null };
    
    static getDerivedStateFromError(error) {
      return { hasError: true, error };
    }
    
    render() {
      if (this.state.hasError) {
        return <ErrorFallback error={this.state.error} />;
      }
      return <Component {...this.props} />;
    }
  };
};
```

### **4. Feature Flags**
```jsx
const withFeatureFlag = (flagName) => (Component) => (props) => {
  const { isEnabled } = useFeatureFlag(flagName);
  
  if (!isEnabled) return null;
  return <Component {...props} />;
};
```

## Migration from HOCs to Hooks

### **Before (HOC)**
```jsx
const withAuth = (Component) => (props) => {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    fetchUser().then(setUser);
  }, []);
  
  return user ? <Component {...props} user={user} /> : <Login />;
};

const AuthenticatedComponent = withAuth(MyComponent);
```

### **After (Hooks)**
```jsx
function useAuth() {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    fetchUser().then(setUser);
  }, []);
  
  return user;
}

function MyComponent() {
  const user = useAuth();
  
  if (!user) return <Login />;
  return <div>Welcome {user.name}</div>;
}
```

## When to Use Each Pattern

### **Use HOCs when:**
- Cross-cutting concerns across many components
- Need to enhance components with same logic
- Working with class components
- Library/framework development

### **Use Hooks when:**
- Sharing stateful logic
- Modern React development
- More explicit data flow
- Better TypeScript support 