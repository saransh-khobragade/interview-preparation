# React Anti-Patterns - What to Avoid

## 🚫 **Common React Anti-Patterns**

### **1. Mutating State Directly**

Never modify state objects or arrays directly as React won't detect the change.

```jsx
// ❌ NEVER mutate state directly
function TodoList() {
  const [todos, setTodos] = useState([]);
  
  const addTodo = (text) => {
    todos.push({ id: Date.now(), text }); // BAD! Mutating array
    setTodos(todos); // Won't trigger re-render
  };
  
  const toggleTodo = (id) => {
    const todo = todos.find(t => t.id === id);
    todo.completed = !todo.completed; // BAD! Mutating object
    setTodos(todos);
  };
  
  const updateUser = (newData) => {
    user.name = newData.name; // BAD! Mutating object
    setUser(user);
  };
}

// ✅ Always create new state
function TodoList() {
  const [todos, setTodos] = useState([]);
  const [user, setUser] = useState({});
  
  const addTodo = (text) => {
    setTodos([...todos, { id: Date.now(), text }]); // Create new array
  };
  
  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id 
        ? { ...todo, completed: !todo.completed } // Create new object
        : todo
    ));
  };
  
  const updateUser = (newData) => {
    setUser({ ...user, ...newData }); // Create new object
  };
}
```

### **2. Using Array Index as Key**

Using array indexes as keys can cause rendering issues when list order changes.

```jsx
// ❌ Using index as key
function UserList({ users }) {
  return (
    <ul>
      {users.map((user, index) => (
        <li key={index}> {/* BAD! Can cause issues */}
          <input type="text" defaultValue={user.name} />
          <button onClick={() => deleteUser(user.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

// ✅ Use stable, unique identifiers
function UserList({ users }) {
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}> {/* GOOD! Stable unique key */}
          <input type="text" defaultValue={user.name} />
          <button onClick={() => deleteUser(user.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

// ✅ If no ID exists, create a stable one
function UserList({ users }) {
  const usersWithKeys = useMemo(() => 
    users.map(user => ({ ...user, key: `${user.name}-${user.email}` })),
    [users]
  );
  
  return (
    <ul>
      {usersWithKeys.map((user) => (
        <li key={user.key}>
          <input type="text" defaultValue={user.name} />
        </li>
      ))}
    </ul>
  );
}
```

### **3. Creating Objects/Functions in Render**

Creating new objects or functions during render causes unnecessary re-renders.

```jsx
// ❌ Creating objects/functions in render
function UserProfile({ user }) {
  return (
    <div>
      {/* BAD! New object created every render */}
      <UserCard 
        style={{ padding: 10, margin: 5 }}
        onClick={() => console.log('clicked')} // BAD! New function every render
      />
      
      {/* BAD! New array created every render */}
      <UserList users={user.friends.filter(f => f.active)} />
    </div>
  );
}

// ✅ Move static values outside component or use useMemo/useCallback
const CARD_STYLE = { padding: 10, margin: 5 };

function UserProfile({ user }) {
  const handleClick = useCallback(() => {
    console.log('clicked');
  }, []);
  
  const activeFriends = useMemo(() => 
    user.friends.filter(f => f.active),
    [user.friends]
  );
  
  return (
    <div>
      <UserCard 
        style={CARD_STYLE} // Static object
        onClick={handleClick} // Memoized function
      />
      <UserList users={activeFriends} /> {/* Memoized array */}
    </div>
  );
}
```

### **4. Overusing useEffect**

Don't use useEffect for computations that can be derived from props/state.

```jsx
// ❌ Unnecessary useEffect for derived state
function UserStats({ users }) {
  const [activeCount, setActiveCount] = useState(0);
  const [averageAge, setAverageAge] = useState(0);
  
  useEffect(() => {
    // BAD! This can be computed directly
    setActiveCount(users.filter(u => u.active).length);
  }, [users]);
  
  useEffect(() => {
    // BAD! This can be computed directly
    const totalAge = users.reduce((sum, u) => sum + u.age, 0);
    setAverageAge(totalAge / users.length);
  }, [users]);
  
  return (
    <div>
      <p>Active users: {activeCount}</p>
      <p>Average age: {averageAge}</p>
    </div>
  );
}

// ✅ Compute derived values directly
function UserStats({ users }) {
  // Compute during render - no useEffect needed
  const activeCount = users.filter(u => u.active).length;
  const averageAge = users.reduce((sum, u) => sum + u.age, 0) / users.length;
  
  // Or use useMemo for expensive calculations
  const expensiveStats = useMemo(() => {
    return users.reduce((stats, user) => {
      // Complex calculation...
      return stats;
    }, {});
  }, [users]);
  
  return (
    <div>
      <p>Active users: {activeCount}</p>
      <p>Average age: {averageAge.toFixed(1)}</p>
    </div>
  );
}
```

### **5. Prop Drilling**

Passing props through multiple component levels unnecessarily.

```jsx
// ❌ Prop drilling - passing user through every level
function App() {
  const [user, setUser] = useState(null);
  
  return <Dashboard user={user} setUser={setUser} />;
}

function Dashboard({ user, setUser }) {
  return (
    <div>
      <Header user={user} />
      <Sidebar user={user} setUser={setUser} />
      <MainContent user={user} />
    </div>
  );
}

function Sidebar({ user, setUser }) {
  return (
    <div>
      <UserMenu user={user} setUser={setUser} />
    </div>
  );
}

function UserMenu({ user, setUser }) {
  return (
    <div>
      <span>{user?.name}</span>
      <button onClick={() => setUser(null)}>Logout</button>
    </div>
  );
}

// ✅ Use Context to avoid prop drilling
const UserContext = createContext();

function App() {
  const [user, setUser] = useState(null);
  
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Dashboard />
    </UserContext.Provider>
  );
}

function Dashboard() {
  return (
    <div>
      <Header />
      <Sidebar />
      <MainContent />
    </div>
  );
}

function UserMenu() {
  const { user, setUser } = useContext(UserContext);
  
  return (
    <div>
      <span>{user?.name}</span>
      <button onClick={() => setUser(null)}>Logout</button>
    </div>
  );
}
```

### **6. Massive Components**

Avoid creating components that are too large and do too much.

```jsx
// ❌ Massive component doing everything
function UserDashboard({ userId }) {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [friends, setFriends] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('posts');
  
  useEffect(() => {
    // Fetch user data
    Promise.all([
      fetch(`/api/users/${userId}`).then(r => r.json()),
      fetch(`/api/users/${userId}/posts`).then(r => r.json()),
      fetch(`/api/users/${userId}/friends`).then(r => r.json()),
      fetch(`/api/users/${userId}/notifications`).then(r => r.json())
    ]).then(([userData, postsData, friendsData, notificationsData]) => {
      setUser(userData);
      setPosts(postsData);
      setFriends(friendsData);
      setNotifications(notificationsData);
      setLoading(false);
    });
  }, [userId]);
  
  const handlePostLike = (postId) => {
    // Handle post like logic...
  };
  
  const handleFriendRequest = (friendId) => {
    // Handle friend request logic...
  };
  
  const handleNotificationRead = (notificationId) => {
    // Handle notification logic...
  };
  
  if (loading) return <div>Loading...</div>;
  
  return (
    <div className="dashboard">
      <header>
        <img src={user.avatar} alt={user.name} />
        <h1>{user.name}</h1>
        <p>{user.bio}</p>
      </header>
      
      <nav>
        <button 
          className={activeTab === 'posts' ? 'active' : ''}
          onClick={() => setActiveTab('posts')}
        >
          Posts
        </button>
        <button 
          className={activeTab === 'friends' ? 'active' : ''}
          onClick={() => setActiveTab('friends')}
        >
          Friends
        </button>
        <button 
          className={activeTab === 'notifications' ? 'active' : ''}
          onClick={() => setActiveTab('notifications')}
        >
          Notifications
        </button>
      </nav>
      
      <main>
        {activeTab === 'posts' && (
          <div>
            {posts.map(post => (
              <div key={post.id}>
                <h3>{post.title}</h3>
                <p>{post.content}</p>
                <button onClick={() => handlePostLike(post.id)}>
                  Like ({post.likes})
                </button>
              </div>
            ))}
          </div>
        )}
        
        {activeTab === 'friends' && (
          <div>
            {friends.map(friend => (
              <div key={friend.id}>
                <img src={friend.avatar} alt={friend.name} />
                <span>{friend.name}</span>
                <button onClick={() => handleFriendRequest(friend.id)}>
                  Add Friend
                </button>
              </div>
            ))}
          </div>
        )}
        
        {activeTab === 'notifications' && (
          <div>
            {notifications.map(notification => (
              <div key={notification.id}>
                <p>{notification.message}</p>
                <button onClick={() => handleNotificationRead(notification.id)}>
                  Mark as Read
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

// ✅ Break into smaller, focused components
function UserDashboard({ userId }) {
  const [activeTab, setActiveTab] = useState('posts');
  
  return (
    <div className="dashboard">
      <UserHeader userId={userId} />
      <DashboardNav activeTab={activeTab} onTabChange={setActiveTab} />
      <DashboardContent userId={userId} activeTab={activeTab} />
    </div>
  );
}

function UserHeader({ userId }) {
  const { data: user, loading } = useApi(`/api/users/${userId}`);
  
  if (loading) return <div>Loading user...</div>;
  
  return (
    <header>
      <img src={user.avatar} alt={user.name} />
      <h1>{user.name}</h1>
      <p>{user.bio}</p>
    </header>
  );
}

function DashboardNav({ activeTab, onTabChange }) {
  const tabs = ['posts', 'friends', 'notifications'];
  
  return (
    <nav>
      {tabs.map(tab => (
        <button
          key={tab}
          className={activeTab === tab ? 'active' : ''}
          onClick={() => onTabChange(tab)}
        >
          {tab.charAt(0).toUpperCase() + tab.slice(1)}
        </button>
      ))}
    </nav>
  );
}

function DashboardContent({ userId, activeTab }) {
  switch (activeTab) {
    case 'posts':
      return <UserPosts userId={userId} />;
    case 'friends':
      return <UserFriends userId={userId} />;
    case 'notifications':
      return <UserNotifications userId={userId} />;
    default:
      return null;
  }
}
```

### **7. Incorrect Dependency Arrays**

Missing or incorrect dependencies in useEffect, useMemo, and useCallback.

```jsx
// ❌ Incorrect dependencies
function UserProfile({ userId, onUpdate }) {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, []); // BAD! Missing userId dependency
  
  const updateUser = useCallback((data) => {
    updateUserAPI(user.id, data).then(onUpdate);
  }, []); // BAD! Missing user and onUpdate dependencies
  
  const userDisplayName = useMemo(() => {
    return `${user?.firstName} ${user?.lastName}`;
  }, [user?.firstName]); // BAD! Missing user?.lastName dependency
}

// ✅ Correct dependencies
function UserProfile({ userId, onUpdate }) {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, [userId]); // Include userId dependency
  
  const updateUser = useCallback((data) => {
    if (user?.id) {
      updateUserAPI(user.id, data).then(onUpdate);
    }
  }, [user?.id, onUpdate]); // Include all dependencies
  
  const userDisplayName = useMemo(() => {
    return `${user?.firstName || ''} ${user?.lastName || ''}`.trim();
  }, [user?.firstName, user?.lastName]); // Include all dependencies
}
```

### **8. Memory Leaks**

Not cleaning up subscriptions, timeouts, or event listeners.

```jsx
// ❌ Memory leaks
function Timer() {
  const [seconds, setSeconds] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);
    // BAD! No cleanup - interval continues after unmount
  }, []);
  
  useEffect(() => {
    const handleResize = () => {
      console.log('Window resized');
    };
    
    window.addEventListener('resize', handleResize);
    // BAD! No cleanup - listener remains after unmount
  }, []);
}

// ✅ Proper cleanup
function Timer() {
  const [seconds, setSeconds] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);
    
    return () => clearInterval(interval); // Cleanup interval
  }, []);
  
  useEffect(() => {
    const handleResize = () => {
      console.log('Window resized');
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize); // Cleanup listener
    };
  }, []);
}

// ✅ Cleanup with AbortController for fetch
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const controller = new AbortController();
    
    fetch(`/api/users/${userId}`, {
      signal: controller.signal
    })
      .then(res => res.json())
      .then(setUser)
      .catch(error => {
        if (error.name !== 'AbortError') {
          console.error('Fetch error:', error);
        }
      });
    
    return () => controller.abort(); // Cleanup fetch request
  }, [userId]);
}
```

## 🎯 **Interview Questions on Anti-Patterns**

### **Q: Why shouldn't you mutate state directly in React?**

**Answer:**
- React uses `Object.is()` comparison to detect state changes
- Mutating the same object/array reference won't trigger re-renders
- Breaks React's reconciliation process
- Can cause bugs where UI doesn't update when it should
- Makes debugging harder (React DevTools won't show state changes)

### **Q: What problems can occur when using array index as key?**

**Answer:**
- **Performance issues:** React can't efficiently diff the virtual DOM
- **State confusion:** Component state might get mixed up when list order changes
- **Form input issues:** Input values might appear in wrong components
- **Animation problems:** CSS transitions/animations might not work correctly

### **Q: How do you identify if a component is too large?**

**Answer:**
- **Lines of code:** > 200 lines usually indicates it's doing too much
- **Multiple responsibilities:** If it handles data fetching, UI rendering, and business logic
- **Hard to test:** If you need to mock many things to test it
- **Frequent changes:** If you modify it for unrelated features
- **Prop drilling:** If you're passing many props through it

### **Q: What's the difference between using useMemo and computing values directly?**

**Answer:**
```jsx
// Direct computation (usually fine)
const total = items.reduce((sum, item) => sum + item.price, 0);

// useMemo (only when expensive)
const expensiveTotal = useMemo(() => {
  return items.reduce((sum, item) => {
    // Some expensive calculation
    return sum + complexCalculation(item);
  }, 0);
}, [items]);
```

Use `useMemo` only for:
- Expensive calculations
- Object/array creation that causes child re-renders
- Breaking reference equality chains 