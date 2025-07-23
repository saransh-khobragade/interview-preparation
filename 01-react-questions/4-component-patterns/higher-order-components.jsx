/**
 * Higher Order Components (HOC) - Common Interview Examples
 */

import React, { useState, useEffect } from 'react';

// 1. Basic HOC - withLoading
function withLoading(WrappedComponent) {
  return function WithLoadingComponent(props) {
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
      // Simulate loading
      const timer = setTimeout(() => setIsLoading(false), 2000);
      return () => clearTimeout(timer);
    }, []);
    
    if (isLoading) {
      return <div>Loading...</div>;
    }
    
    return <WrappedComponent {...props} />;
  };
}

// Usage
function UserProfile({ user }) {
  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}

const UserProfileWithLoading = withLoading(UserProfile);

// 2. Authentication HOC - withAuth
function withAuth(WrappedComponent) {
  return function WithAuthComponent(props) {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    
    useEffect(() => {
      // Check authentication status
      const checkAuth = async () => {
        try {
          const response = await fetch('/api/auth/me');
          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
            setIsAuthenticated(true);
          }
        } catch (error) {
          setIsAuthenticated(false);
        }
      };
      
      checkAuth();
    }, []);
    
    if (!isAuthenticated) {
      return (
        <div>
          <h2>Access Denied</h2>
          <p>Please log in to access this page.</p>
        </div>
      );
    }
    
    return <WrappedComponent {...props} user={user} />;
  };
}

// Usage
function Dashboard({ user }) {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {user?.name}!</p>
    </div>
  );
}

const ProtectedDashboard = withAuth(Dashboard);

// 3. Data Fetching HOC - withData
function withData(url) {
  return function(WrappedComponent) {
    return function WithDataComponent(props) {
      const [data, setData] = useState(null);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);
      
      useEffect(() => {
        const fetchData = async () => {
          try {
            setLoading(true);
            const response = await fetch(url);
            if (!response.ok) throw new Error('Failed to fetch');
            const result = await response.json();
            setData(result);
          } catch (err) {
            setError(err.message);
          } finally {
            setLoading(false);
          }
        };
        
        fetchData();
      }, [url]);
      
      if (loading) return <div>Loading data...</div>;
      if (error) return <div>Error: {error}</div>;
      
      return <WrappedComponent {...props} data={data} />;
    };
  };
}

// Usage
function UserList({ data }) {
  return (
    <ul>
      {data?.map(user => (
        <li key={user.id}>{user.name} - {user.email}</li>
      ))}
    </ul>
  );
}

const UserListWithData = withData('/api/users')(UserList);

// 4. Error Boundary HOC - withErrorBoundary
function withErrorBoundary(WrappedComponent) {
  return class WithErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false, error: null };
    }
    
    static getDerivedStateFromError(error) {
      return { hasError: true, error };
    }
    
    componentDidCatch(error, errorInfo) {
      console.error('Error caught by HOC:', error, errorInfo);
    }
    
    render() {
      if (this.state.hasError) {
        return (
          <div>
            <h2>Something went wrong!</h2>
            <p>{this.state.error?.message}</p>
            <button onClick={() => this.setState({ hasError: false, error: null })}>
              Try Again
            </button>
          </div>
        );
      }
      
      return <WrappedComponent {...this.props} />;
    }
  };
}

// Usage
function RiskyComponent() {
  const [shouldThrow, setShouldThrow] = useState(false);
  
  if (shouldThrow) {
    throw new Error('Something went wrong!');
  }
  
  return (
    <div>
      <p>This component might throw an error</p>
      <button onClick={() => setShouldThrow(true)}>
        Throw Error
      </button>
    </div>
  );
}

const SafeRiskyComponent = withErrorBoundary(RiskyComponent);

// 5. Theme HOC - withTheme
const ThemeContext = React.createContext();

function withTheme(WrappedComponent) {
  return function WithThemeComponent(props) {
    const theme = React.useContext(ThemeContext);
    
    if (!theme) {
      throw new Error('withTheme must be used within a ThemeProvider');
    }
    
    return <WrappedComponent {...props} theme={theme} />;
  };
}

// Usage
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function ThemedButton({ theme, children }) {
  return (
    <button 
      style={{
        background: theme.theme === 'light' ? '#fff' : '#333',
        color: theme.theme === 'light' ? '#333' : '#fff',
        border: `1px solid ${theme.theme === 'light' ? '#ccc' : '#666'}`
      }}
      onClick={theme.toggleTheme}
    >
      {children}
    </button>
  );
}

const ThemedButtonWithTheme = withTheme(ThemedButton);

// 6. Logging HOC - withLogging
function withLogging(WrappedComponent) {
  return function WithLoggingComponent(props) {
    const componentName = WrappedComponent.displayName || WrappedComponent.name;
    
    useEffect(() => {
      console.log(`${componentName} mounted`);
      return () => console.log(`${componentName} unmounted`);
    }, [componentName]);
    
    useEffect(() => {
      console.log(`${componentName} updated with props:`, props);
    });
    
    return <WrappedComponent {...props} />;
  };
}

// Usage
function SimpleComponent({ message }) {
  return <div>{message}</div>;
}

const LoggedComponent = withLogging(SimpleComponent);

// 7. Multiple HOCs Composition
function compose(...hocs) {
  return function(WrappedComponent) {
    return hocs.reduceRight((acc, hoc) => hoc(acc), WrappedComponent);
  };
}

// Usage - combining multiple HOCs
const EnhancedComponent = compose(
  withLoading,
  withAuth,
  withErrorBoundary,
  withLogging
)(Dashboard);

// Alternative composition syntax
const EnhancedUserProfile = withLoading(
  withAuth(
    withErrorBoundary(
      withLogging(UserProfile)
    )
  )
);

// 8. HOC with Configuration
function withRetry(maxRetries = 3) {
  return function(WrappedComponent) {
    return function WithRetryComponent(props) {
      const [retryCount, setRetryCount] = useState(0);
      const [hasError, setHasError] = useState(false);
      
      const retry = () => {
        if (retryCount < maxRetries) {
          setRetryCount(prev => prev + 1);
          setHasError(false);
        }
      };
      
      const handleError = () => {
        setHasError(true);
      };
      
      if (hasError) {
        return (
          <div>
            <p>Error occurred (Attempt {retryCount + 1} of {maxRetries + 1})</p>
            {retryCount < maxRetries ? (
              <button onClick={retry}>Retry</button>
            ) : (
              <p>Max retries exceeded</p>
            )}
          </div>
        );
      }
      
      return (
        <WrappedComponent 
          {...props} 
          onError={handleError}
          retryCount={retryCount}
        />
      );
    };
  };
}

// Usage
const ComponentWithRetry = withRetry(5)(RiskyComponent);

// 9. Demo App
function HOCDemoApp() {
  return (
    <ThemeProvider>
      <div style={{ padding: '20px' }}>
        <h1>HOC Examples</h1>
        
        <section>
          <h2>Loading HOC</h2>
          <UserProfileWithLoading user={{ name: 'John Doe', email: 'john@example.com' }} />
        </section>
        
        <section>
          <h2>Auth HOC</h2>
          <ProtectedDashboard />
        </section>
        
        <section>
          <h2>Data Fetching HOC</h2>
          <UserListWithData />
        </section>
        
        <section>
          <h2>Error Boundary HOC</h2>
          <SafeRiskyComponent />
        </section>
        
        <section>
          <h2>Theme HOC</h2>
          <ThemedButtonWithTheme>Toggle Theme</ThemedButtonWithTheme>
        </section>
        
        <section>
          <h2>Logging HOC</h2>
          <LoggedComponent message="Hello from logged component!" />
        </section>
        
        <section>
          <h2>Composed HOCs</h2>
          <EnhancedComponent />
        </section>
      </div>
    </ThemeProvider>
  );
}

export {
  withLoading,
  withAuth,
  withData,
  withErrorBoundary,
  withTheme,
  withLogging,
  withRetry,
  compose,
  HOCDemoApp,
  ThemeProvider
}; 