# React Patterns - Interview Guide

## 🎯 **Essential React Patterns**

### **1. Container/Presentational Pattern**

Separates business logic from UI rendering for better maintainability and testing.

```jsx
// ❌ Mixed concerns (harder to test and reuse)
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(setUser)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [userId]);
  
  if (loading) return <div className="spinner">Loading...</div>;
  if (error) return <div className="error">Error: {error.message}</div>;
  
  return (
    <div className="user-profile">
      <img src={user.avatar} alt={user.name} />
      <h1>{user.name}</h1>
      <p>{user.email}</p>
      <p>{user.bio}</p>
    </div>
  );
}

// ✅ Separated concerns
// Container (handles data fetching and state)
function UserProfileContainer({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(setUser)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [userId]);
  
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;
  return <UserProfile user={user} />;
}

// Presentational (pure UI component - easy to test and reuse)
function UserProfile({ user }) {
  return (
    <div className="user-profile">
      <img src={user.avatar} alt={user.name} />
      <h1>{user.name}</h1>
      <p>{user.email}</p>
      <p>{user.bio}</p>
    </div>
  );
}
```

### **2. Custom Hooks Pattern**

Extract and reuse stateful logic across components.

```jsx
// ✅ Custom hook for API calls
function useApi(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const controller = new AbortController();
    
    fetch(url, { signal: controller.signal })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(setData)
      .catch(err => {
        if (err.name !== 'AbortError') setError(err);
      })
      .finally(() => setLoading(false));
    
    return () => controller.abort();
  }, [url]);
  
  return { data, loading, error, refetch: () => window.location.reload() };
}

// ✅ Custom hook for local storage
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });
  
  const setStoredValue = useCallback((value) => {
    try {
      setValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error saving to localStorage:`, error);
    }
  }, [key]);
  
  return [value, setStoredValue];
}

// Usage
function UserSettings() {
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  const { data: settings, loading } = useApi('/api/user/settings');
  
  return (
    <div>
      <select value={theme} onChange={e => setTheme(e.target.value)}>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </div>
  );
}
```

### **3. Render Props Pattern**

Share code between components using a prop whose value is a function.

```jsx
// ✅ Flexible data provider
function DataProvider({ url, children }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [url]);
  
  return children({ data, loading, error });
}

// ✅ Mouse tracker with render prop
function Mouse({ children }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (event) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  return children(position);
}

// Usage
function App() {
  return (
    <div>
      <DataProvider url="/api/users">
        {({ data, loading, error }) => {
          if (loading) return <div>Loading...</div>;
          if (error) return <div>Error: {error.message}</div>;
          return <UserList users={data} />;
        }}
      </DataProvider>
      
      <Mouse>
        {({ x, y }) => (
          <div style={{ position: 'fixed', left: x, top: y, pointerEvents: 'none' }}>
            Mouse at ({x}, {y})
          </div>
        )}
      </Mouse>
    </div>
  );
}
```

### **4. Higher-Order Components (HOC) Pattern**

A function that takes a component and returns a new component with additional props or behavior.

```jsx
// ✅ Authentication HOC
function withAuth(WrappedComponent) {
  return function AuthComponent(props) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }
      
      fetch('/api/auth/verify', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(setUser)
        .catch(() => localStorage.removeItem('token'))
        .finally(() => setLoading(false));
    }, []);
    
    if (loading) return <div>Loading...</div>;
    if (!user) return <LoginForm />;
    
    return <WrappedComponent {...props} user={user} />;
  };
}

// ✅ Loading HOC
function withLoading(WrappedComponent) {
  return function LoadingComponent({ isLoading, ...props }) {
    if (isLoading) return <div className="spinner">Loading...</div>;
    return <WrappedComponent {...props} />;
  };
}

// Usage
const ProtectedDashboard = withAuth(withLoading(Dashboard));

function App() {
  return <ProtectedDashboard isLoading={false} />;
}
```

### **5. Compound Components Pattern**

Create components that work together to form a complete UI while maintaining flexibility.

```jsx
// ✅ Compound component for modal
const Modal = {
  Root: function ModalRoot({ isOpen, onClose, children }) {
    if (!isOpen) return null;
    
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          {children}
        </div>
      </div>
    );
  },
  
  Header: function ModalHeader({ children }) {
    return <div className="modal-header">{children}</div>;
  },
  
  Body: function ModalBody({ children }) {
    return <div className="modal-body">{children}</div>;
  },
  
  Footer: function ModalFooter({ children }) {
    return <div className="modal-footer">{children}</div>;
  }
};

// ✅ Tabs compound component
const TabsContext = createContext();

function Tabs({ defaultTab, children }) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="tabs">{children}</div>
    </TabsContext.Provider>
  );
}

function TabList({ children }) {
  return <div className="tab-list">{children}</div>;
}

function Tab({ id, children }) {
  const { activeTab, setActiveTab } = useContext(TabsContext);
  
  return (
    <button
      className={`tab ${activeTab === id ? 'active' : ''}`}
      onClick={() => setActiveTab(id)}
    >
      {children}
    </button>
  );
}

function TabPanels({ children }) {
  return <div className="tab-panels">{children}</div>;
}

function TabPanel({ id, children }) {
  const { activeTab } = useContext(TabsContext);
  if (activeTab !== id) return null;
  
  return <div className="tab-panel">{children}</div>;
}

// Usage
function App() {
  const [modalOpen, setModalOpen] = useState(false);
  
  return (
    <div>
      <Modal.Root isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <Modal.Header>
          <h2>Confirm Action</h2>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to proceed?</p>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={() => setModalOpen(false)}>Cancel</button>
          <button onClick={() => setModalOpen(false)}>Confirm</button>
        </Modal.Footer>
      </Modal.Root>
      
      <Tabs defaultTab="profile">
        <TabList>
          <Tab id="profile">Profile</Tab>
          <Tab id="settings">Settings</Tab>
          <Tab id="notifications">Notifications</Tab>
        </TabList>
        <TabPanels>
          <TabPanel id="profile">Profile content</TabPanel>
          <TabPanel id="settings">Settings content</TabPanel>
          <TabPanel id="notifications">Notifications content</TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}
```

### **6. State Reducer Pattern**

Manage complex state logic using useReducer for predictable state updates.

```jsx
// ✅ State reducer for form management
const formReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        values: { ...state.values, [action.field]: action.value },
        errors: { ...state.errors, [action.field]: null }
      };
    
    case 'SET_ERROR':
      return {
        ...state,
        errors: { ...state.errors, [action.field]: action.error }
      };
    
    case 'SET_LOADING':
      return { ...state, isLoading: action.isLoading };
    
    case 'RESET':
      return action.initialState;
    
    default:
      return state;
  }
};

function useForm(initialValues = {}) {
  const [state, dispatch] = useReducer(formReducer, {
    values: initialValues,
    errors: {},
    isLoading: false
  });
  
  const setField = useCallback((field, value) => {
    dispatch({ type: 'SET_FIELD', field, value });
  }, []);
  
  const setError = useCallback((field, error) => {
    dispatch({ type: 'SET_ERROR', field, error });
  }, []);
  
  const setLoading = useCallback((isLoading) => {
    dispatch({ type: 'SET_LOADING', isLoading });
  }, []);
  
  const reset = useCallback(() => {
    dispatch({ type: 'RESET', initialState: { values: initialValues, errors: {}, isLoading: false } });
  }, [initialValues]);
  
  return { ...state, setField, setError, setLoading, reset };
}

// Usage
function ContactForm() {
  const { values, errors, isLoading, setField, setError, setLoading, reset } = useForm({
    name: '',
    email: '',
    message: ''
  });
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      });
      reset();
    } catch (error) {
      setError('general', 'Failed to send message');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        value={values.name}
        onChange={e => setField('name', e.target.value)}
        placeholder="Name"
      />
      {errors.name && <span className="error">{errors.name}</span>}
      
      <input
        type="email"
        value={values.email}
        onChange={e => setField('email', e.target.value)}
        placeholder="Email"
      />
      {errors.email && <span className="error">{errors.email}</span>}
      
      <textarea
        value={values.message}
        onChange={e => setField('message', e.target.value)}
        placeholder="Message"
      />
      {errors.message && <span className="error">{errors.message}</span>}
      
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Sending...' : 'Send Message'}
      </button>
      
      {errors.general && <div className="error">{errors.general}</div>}
    </form>
  );
}
```

## 🎯 **Interview Questions on Patterns**

### **Q: When would you use a HOC vs a custom hook?**

**Answer:**
- **Custom Hooks:** When you need to share stateful logic between components
- **HOCs:** When you need to enhance components with additional props or wrap them with common functionality
- **Custom Hooks are preferred** in modern React for logic reuse
- **HOCs are better** for cross-cutting concerns like authentication, error boundaries

### **Q: Explain the difference between render props and children as a function.**

**Answer:**
```jsx
// Render prop
<DataProvider render={({ data }) => <div>{data}</div>} />

// Children as function (more common)
<DataProvider>
  {({ data }) => <div>{data}</div>}
</DataProvider>

// Both achieve the same goal, children as function is more idiomatic
```

### **Q: How do you prevent unnecessary re-renders in compound components?**

**Answer:**
```jsx
// ✅ Memoize context value
function Tabs({ defaultTab, children }) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  
  const contextValue = useMemo(() => ({
    activeTab,
    setActiveTab
  }), [activeTab]);
  
  return (
    <TabsContext.Provider value={contextValue}>
      <div className="tabs">{children}</div>
    </TabsContext.Provider>
  );
}
``` 