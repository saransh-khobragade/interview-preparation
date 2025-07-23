# React Performance Patterns

## ⚡ **Performance Optimization Patterns**

### **1. Memoization Patterns**

#### **React.memo for Component Memoization**

```jsx
// ❌ Re-renders on every parent update
function ExpensiveComponent({ data, onClick }) {
  console.log('ExpensiveComponent rendered');
  
  return (
    <div>
      {data.map(item => (
        <ComplexItem key={item.id} item={item} onClick={onClick} />
      ))}
    </div>
  );
}

// ✅ Only re-renders when props change
const ExpensiveComponent = React.memo(function ExpensiveComponent({ data, onClick }) {
  console.log('ExpensiveComponent rendered');
  
  return (
    <div>
      {data.map(item => (
        <ComplexItem key={item.id} item={item} onClick={onClick} />
      ))}
    </div>
  );
});

// ✅ Custom comparison for complex props
const ExpensiveComponent = React.memo(
  function ExpensiveComponent({ data, user, settings }) {
    return (
      <div>
        <UserProfile user={user} />
        <DataList data={data} settings={settings} />
      </div>
    );
  },
  (prevProps, nextProps) => {
    // Custom equality check
    return (
      prevProps.data.length === nextProps.data.length &&
      prevProps.user.id === nextProps.user.id &&
      prevProps.settings.theme === nextProps.settings.theme
    );
  }
);
```

#### **useMemo for Expensive Calculations**

```jsx
// ❌ Expensive calculation on every render
function DataAnalytics({ data }) {
  const statistics = data.reduce((acc, item) => {
    // Expensive calculation
    return {
      total: acc.total + item.value,
      average: calculateComplexAverage(acc.values, item.value),
      trends: analyzeComplexTrends([...acc.trends, item])
    };
  }, { total: 0, average: 0, trends: [] });
  
  return <StatisticsDisplay stats={statistics} />;
}

// ✅ Memoize expensive calculations
function DataAnalytics({ data, filters }) {
  const filteredData = useMemo(() => {
    return data.filter(item => {
      return filters.category === 'all' || item.category === filters.category;
    });
  }, [data, filters.category]);
  
  const statistics = useMemo(() => {
    return filteredData.reduce((acc, item) => {
      return {
        total: acc.total + item.value,
        average: calculateComplexAverage(acc.values, item.value),
        trends: analyzeComplexTrends([...acc.trends, item])
      };
    }, { total: 0, average: 0, trends: [] });
  }, [filteredData]);
  
  return <StatisticsDisplay stats={statistics} />;
}
```

#### **useCallback for Function Memoization**

```jsx
// ❌ New function created on every render
function TodoList({ todos }) {
  const handleToggle = (id) => {
    updateTodo(id, { completed: !todos.find(t => t.id === id).completed });
  };
  
  const handleDelete = (id) => {
    deleteTodo(id);
  };
  
  return (
    <div>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={handleToggle} // New function every render
          onDelete={handleDelete} // New function every render
        />
      ))}
    </div>
  );
}

// ✅ Memoized functions
function TodoList({ todos }) {
  const handleToggle = useCallback((id) => {
    updateTodo(id, { completed: !todos.find(t => t.id === id).completed });
  }, [todos]);
  
  const handleDelete = useCallback((id) => {
    deleteTodo(id);
  }, []); // No dependencies if deleteTodo is stable
  
  return (
    <div>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}
```

### **2. List Virtualization**

Handle large lists efficiently by only rendering visible items.

```jsx
// ❌ Rendering all 10,000 items
function LargeList({ items }) {
  return (
    <div style={{ height: '400px', overflow: 'auto' }}>
      {items.map((item, index) => (
        <div key={item.id} style={{ height: '50px', padding: '10px' }}>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  );
}

// ✅ Virtual scrolling with react-window
import { FixedSizeList as List } from 'react-window';

function VirtualizedList({ items }) {
  const Row = ({ index, style }) => (
    <div style={style}>
      <div style={{ height: '50px', padding: '10px' }}>
        <h3>{items[index].title}</h3>
        <p>{items[index].description}</p>
      </div>
    </div>
  );
  
  return (
    <List
      height={400}
      itemCount={items.length}
      itemSize={50}
      width="100%"
    >
      {Row}
    </List>
  );
}

// ✅ Custom virtualization for dynamic heights
function CustomVirtualList({ items }) {
  const [scrollTop, setScrollTop] = useState(0);
  const [containerHeight, setContainerHeight] = useState(400);
  const itemHeight = 50;
  
  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(
    startIndex + Math.ceil(containerHeight / itemHeight) + 1,
    items.length
  );
  
  const visibleItems = items.slice(startIndex, endIndex);
  
  return (
    <div
      style={{ height: containerHeight, overflow: 'auto' }}
      onScroll={(e) => setScrollTop(e.target.scrollTop)}
    >
      <div style={{ height: items.length * itemHeight, position: 'relative' }}>
        {visibleItems.map((item, index) => (
          <div
            key={item.id}
            style={{
              position: 'absolute',
              top: (startIndex + index) * itemHeight,
              width: '100%',
              height: itemHeight
            }}
          >
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### **3. Code Splitting and Lazy Loading**

```jsx
// ❌ Everything bundled together
import Dashboard from './Dashboard';
import Settings from './Settings';
import Profile from './Profile';
import Analytics from './Analytics';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  
  return (
    <div>
      {currentView === 'dashboard' && <Dashboard />}
      {currentView === 'settings' && <Settings />}
      {currentView === 'profile' && <Profile />}
      {currentView === 'analytics' && <Analytics />}
    </div>
  );
}

// ✅ Lazy loading with Suspense
import { lazy, Suspense } from 'react';

const Dashboard = lazy(() => import('./Dashboard'));
const Settings = lazy(() => import('./Settings'));
const Profile = lazy(() => import('./Profile'));
const Analytics = lazy(() => import('./Analytics'));

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  
  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'settings':
        return <Settings />;
      case 'profile':
        return <Profile />;
      case 'analytics':
        return <Analytics />;
      default:
        return <Dashboard />;
    }
  };
  
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        {renderView()}
      </Suspense>
    </div>
  );
}

// ✅ Route-based code splitting
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Settings = lazy(() => import('./pages/Settings'));
const Profile = lazy(() => import('./pages/Profile'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
```

### **4. Image Optimization Patterns**

```jsx
// ❌ Loading all images immediately
function Gallery({ images }) {
  return (
    <div className="gallery">
      {images.map(image => (
        <img key={image.id} src={image.url} alt={image.alt} />
      ))}
    </div>
  );
}

// ✅ Lazy loading images
function LazyImage({ src, alt, placeholder }) {
  const [loaded, setLoaded] = useState(false);
  const [inView, setInView] = useState(false);
  const imgRef = useRef();
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (imgRef.current) {
      observer.observe(imgRef.current);
    }
    
    return () => observer.disconnect();
  }, []);
  
  return (
    <div ref={imgRef} className="lazy-image-container">
      {inView && (
        <>
          {!loaded && placeholder && (
            <img src={placeholder} alt="" className="placeholder" />
          )}
          <img
            src={src}
            alt={alt}
            onLoad={() => setLoaded(true)}
            style={{ opacity: loaded ? 1 : 0 }}
            className="main-image"
          />
        </>
      )}
    </div>
  );
}

// ✅ Progressive image loading
function ProgressiveImage({ src, placeholder, alt }) {
  const [imageSrc, setImageSrc] = useState(placeholder);
  const [imageRef, setImageRef] = useState();
  
  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImageSrc(src);
    };
  }, [src]);
  
  return (
    <img
      ref={setImageRef}
      src={imageSrc}
      alt={alt}
      className={`progressive-image ${imageSrc === src ? 'loaded' : 'loading'}`}
    />
  );
}
```

### **5. State Optimization Patterns**

#### **State Splitting**

```jsx
// ❌ Monolithic state causing unnecessary re-renders
function UserDashboard() {
  const [state, setState] = useState({
    user: null,
    posts: [],
    friends: [],
    notifications: [],
    ui: {
      activeTab: 'posts',
      sidebarOpen: false,
      darkMode: false
    }
  });
  
  const updateUser = (user) => {
    setState(prev => ({ ...prev, user })); // Re-renders everything
  };
  
  const toggleSidebar = () => {
    setState(prev => ({
      ...prev,
      ui: { ...prev.ui, sidebarOpen: !prev.ui.sidebarOpen }
    })); // Re-renders everything
  };
}

// ✅ Split state to minimize re-renders
function UserDashboard() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [friends, setFriends] = useState([]);
  const [notifications, setNotifications] = useState([]);
  
  // UI state separate from data state
  const [activeTab, setActiveTab] = useState('posts');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  
  return (
    <div>
      <Sidebar isOpen={sidebarOpen} onToggle={setSidebarOpen} />
      <MainContent 
        user={user}
        posts={posts}
        friends={friends}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
    </div>
  );
}
```

#### **Context Optimization**

```jsx
// ❌ Single context causing unnecessary re-renders
const AppContext = createContext();

function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('light');
  const [notifications, setNotifications] = useState([]);
  
  const value = {
    user, setUser,
    theme, setTheme,
    notifications, setNotifications
  };
  
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

// ✅ Split contexts by concern
const UserContext = createContext();
const ThemeContext = createContext();
const NotificationContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  
  const value = useMemo(() => ({ user, setUser }), [user]);
  
  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  const value = useMemo(() => ({ theme, setTheme }), [theme]);
  
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// ✅ Combine providers at app level
function App() {
  return (
    <UserProvider>
      <ThemeProvider>
        <NotificationProvider>
          <Dashboard />
        </NotificationProvider>
      </ThemeProvider>
    </UserProvider>
  );
}
```

### **6. Bundle Optimization**

#### **Tree Shaking**

```jsx
// ❌ Importing entire library
import _ from 'lodash';
import * as dateUtils from 'date-fns';

function UserProfile({ user }) {
  const formattedDate = dateUtils.format(user.createdAt, 'yyyy-MM-dd');
  const userName = _.capitalize(user.name);
  
  return <div>{userName} - {formattedDate}</div>;
}

// ✅ Import only what you need
import { format } from 'date-fns';
import { capitalize } from 'lodash';

function UserProfile({ user }) {
  const formattedDate = format(user.createdAt, 'yyyy-MM-dd');
  const userName = capitalize(user.name);
  
  return <div>{userName} - {formattedDate}</div>;
}

// ✅ Or create utility functions
function formatDate(date) {
  return new Intl.DateTimeFormat('en-US').format(date);
}

function capitalizeFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
```

## 🎯 **Performance Interview Questions**

### **Q: When should you use React.memo vs useMemo vs useCallback?**

**Answer:**
- **React.memo:** Prevent component re-renders when props haven't changed
- **useMemo:** Cache expensive calculations between re-renders
- **useCallback:** Prevent child re-renders by stabilizing function references

### **Q: What is the difference between lazy loading and code splitting?**

**Answer:**
- **Lazy loading:** Loading components only when needed (React.lazy)
- **Code splitting:** Breaking bundle into smaller chunks that load on demand
- **Lazy loading is a form of code splitting** at the component level

### **Q: How do you identify performance bottlenecks in React?**

**Answer:**
1. **React DevTools Profiler:** Identify slow components
2. **Chrome DevTools Performance tab:** Analyze rendering performance
3. **Bundle analyzers:** Check bundle size and dependencies
4. **Lighthouse:** Overall performance metrics
5. **Custom metrics:** Measure specific user interactions

### **Q: What are the trade-offs of memoization?**

**Answer:**
- **Benefits:** Prevents unnecessary calculations and re-renders
- **Costs:** Memory usage for cached values, comparison overhead
- **Rule of thumb:** Only memoize when you have a proven performance problem 