/**
 * React Performance Optimization - Common Interview Examples
 */

import React, { memo, useMemo, useCallback, useState } from 'react';

// ❌ PROBLEM: Unnecessary Re-renders
function SlowParent() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  
  // This object is recreated on every render
  const user = { name, id: 1 };
  
  // This function is recreated on every render
  const handleClick = () => {
    console.log('Button clicked');
  };
  
  // Expensive calculation runs on every render
  const expensiveValue = calculateExpensiveValue(count);
  
  return (
    <div>
      <input 
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter name"
      />
      <button onClick={() => setCount(count + 1)}>
        Count: {count}
      </button>
      
      {/* These components re-render unnecessarily */}
      <ChildComponent user={user} />
      <ButtonComponent onClick={handleClick} />
      <ExpensiveComponent value={expensiveValue} />
    </div>
  );
}

function ChildComponent({ user }) {
  console.log('ChildComponent rendered');
  return <div>Hello, {user.name}!</div>;
}

function ButtonComponent({ onClick }) {
  console.log('ButtonComponent rendered');
  return <button onClick={onClick}>Click me</button>;
}

function ExpensiveComponent({ value }) {
  console.log('ExpensiveComponent rendered');
  return <div>Expensive value: {value}</div>;
}

function calculateExpensiveValue(input) {
  console.log('Expensive calculation running...');
  let result = 0;
  for (let i = 0; i < 1000000; i++) {
    result += input;
  }
  return result;
}

// ✅ SOLUTION: Optimized with memo, useMemo, useCallback
function OptimizedParent() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  
  // Memoize object to prevent unnecessary re-renders
  const user = useMemo(() => ({ name, id: 1 }), [name]);
  
  // Memoize function to prevent unnecessary re-renders
  const handleClick = useCallback(() => {
    console.log('Button clicked');
  }, []);
  
  // Memoize expensive calculation
  const expensiveValue = useMemo(() => {
    return calculateExpensiveValue(count);
  }, [count]);
  
  return (
    <div>
      <input 
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter name"
      />
      <button onClick={() => setCount(count + 1)}>
        Count: {count}
      </button>
      
      {/* These components only re-render when props actually change */}
      <MemoizedChildComponent user={user} />
      <MemoizedButtonComponent onClick={handleClick} />
      <MemoizedExpensiveComponent value={expensiveValue} />
    </div>
  );
}

// Memoized components
const MemoizedChildComponent = memo(function ChildComponent({ user }) {
  console.log('MemoizedChildComponent rendered');
  return <div>Hello, {user.name}!</div>;
});

const MemoizedButtonComponent = memo(function ButtonComponent({ onClick }) {
  console.log('MemoizedButtonComponent rendered');
  return <button onClick={onClick}>Click me</button>;
});

const MemoizedExpensiveComponent = memo(function ExpensiveComponent({ value }) {
  console.log('MemoizedExpensiveComponent rendered');
  return <div>Expensive value: {value}</div>;
});

// 2. Custom Comparison in memo
const ProductCard = memo(function ProductCard({ product, onAddToCart }) {
  console.log('ProductCard rendered for:', product.name);
  
  return (
    <div>
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <button onClick={() => onAddToCart(product.id)}>
        Add to Cart
      </button>
    </div>
  );
}, (prevProps, nextProps) => {
  // Custom comparison - only re-render if product data changes
  return (
    prevProps.product.id === nextProps.product.id &&
    prevProps.product.name === nextProps.product.name &&
    prevProps.product.price === nextProps.product.price
    // Note: onAddToCart function reference doesn't matter for this component
  );
});

// 3. List Optimization
function ProductList() {
  const [products, setProducts] = useState([
    { id: 1, name: 'Laptop', price: 999 },
    { id: 2, name: 'Phone', price: 599 },
    { id: 3, name: 'Tablet', price: 399 }
  ]);
  const [cartCount, setCartCount] = useState(0);
  
  // Memoize the callback to prevent unnecessary re-renders
  const handleAddToCart = useCallback((productId) => {
    console.log('Adding product to cart:', productId);
    setCartCount(prev => prev + 1);
  }, []);
  
  return (
    <div>
      <h2>Products (Cart: {cartCount})</h2>
      {products.map(product => (
        <ProductCard 
          key={product.id}
          product={product}
          onAddToCart={handleAddToCart}
        />
      ))}
    </div>
  );
}

// 4. Form Optimization
function OptimizedForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });
  
  // Memoize individual field update functions
  const updateFirstName = useCallback((value) => {
    setFormData(prev => ({ ...prev, firstName: value }));
  }, []);
  
  const updateLastName = useCallback((value) => {
    setFormData(prev => ({ ...prev, lastName: value }));
  }, []);
  
  const updateEmail = useCallback((value) => {
    setFormData(prev => ({ ...prev, email: value }));
  }, []);
  
  const updateMessage = useCallback((value) => {
    setFormData(prev => ({ ...prev, message: value }));
  }, []);
  
  // Memoize validation
  const isValid = useMemo(() => {
    return formData.firstName && formData.lastName && formData.email;
  }, [formData.firstName, formData.lastName, formData.email]);
  
  return (
    <form>
      <FormField 
        label="First Name"
        value={formData.firstName}
        onChange={updateFirstName}
      />
      <FormField 
        label="Last Name"
        value={formData.lastName}
        onChange={updateLastName}
      />
      <FormField 
        label="Email"
        value={formData.email}
        onChange={updateEmail}
      />
      <FormField 
        label="Message"
        value={formData.message}
        onChange={updateMessage}
      />
      <button type="submit" disabled={!isValid}>
        Submit
      </button>
    </form>
  );
}

const FormField = memo(function FormField({ label, value, onChange }) {
  console.log(`FormField rendered: ${label}`);
  
  return (
    <div>
      <label>{label}</label>
      <input 
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
});

// 5. Complex State Optimization
function UserDashboard() {
  const [user, setUser] = useState({ name: 'John', email: 'john@example.com' });
  const [preferences, setPreferences] = useState({ theme: 'light', language: 'en' });
  const [notifications, setNotifications] = useState([]);
  
  // Only re-render UserProfile when user data changes
  const memoizedUser = useMemo(() => user, [user]);
  
  // Only re-render UserPreferences when preferences change
  const memoizedPreferences = useMemo(() => preferences, [preferences]);
  
  // Memoize notification count
  const notificationCount = useMemo(() => {
    return notifications.filter(n => !n.read).length;
  }, [notifications]);
  
  const updateUserName = useCallback((name) => {
    setUser(prev => ({ ...prev, name }));
  }, []);
  
  const toggleTheme = useCallback(() => {
    setPreferences(prev => ({ 
      ...prev, 
      theme: prev.theme === 'light' ? 'dark' : 'light' 
    }));
  }, []);
  
  return (
    <div>
      <UserProfile user={memoizedUser} onUpdateName={updateUserName} />
      <UserPreferences preferences={memoizedPreferences} onToggleTheme={toggleTheme} />
      <NotificationBadge count={notificationCount} />
    </div>
  );
}

const UserProfile = memo(function UserProfile({ user, onUpdateName }) {
  console.log('UserProfile rendered');
  return (
    <div>
      <input 
        value={user.name}
        onChange={(e) => onUpdateName(e.target.value)}
      />
      <p>Email: {user.email}</p>
    </div>
  );
});

const UserPreferences = memo(function UserPreferences({ preferences, onToggleTheme }) {
  console.log('UserPreferences rendered');
  return (
    <div>
      <button onClick={onToggleTheme}>
        Theme: {preferences.theme}
      </button>
      <p>Language: {preferences.language}</p>
    </div>
  );
});

const NotificationBadge = memo(function NotificationBadge({ count }) {
  console.log('NotificationBadge rendered');
  return <div>Notifications: {count}</div>;
});

export {
  SlowParent,
  OptimizedParent,
  ProductList,
  OptimizedForm,
  UserDashboard
}; 