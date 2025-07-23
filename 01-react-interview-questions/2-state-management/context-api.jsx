/**
 * Context API - Common Interview Examples
 */

import React, { createContext, useContext, useReducer, useState } from 'react';

// 1. Basic Theme Context
const ThemeContext = createContext();

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

function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

// Theme consumer component
function ThemedButton() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button 
      onClick={toggleTheme}
      style={{ 
        background: theme === 'light' ? '#fff' : '#333',
        color: theme === 'light' ? '#333' : '#fff'
      }}
    >
      Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
    </button>
  );
}

// 2. User Authentication Context
const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const login = async (credentials) => {
    setLoading(true);
    try {
      // Simulate API call
      const response = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify(credentials)
      });
      const userData = await response.json();
      setUser(userData);
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const logout = () => {
    setUser(null);
  };
  
  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

// Auth consumer components
function LoginButton() {
  const { user, login, logout, loading } = useAuth();
  
  if (loading) return <div>Loading...</div>;
  
  if (user) {
    return (
      <div>
        <span>Welcome, {user.name}!</span>
        <button onClick={logout}>Logout</button>
      </div>
    );
  }
  
  return (
    <button onClick={() => login({ email: 'user@example.com', password: 'password' })}>
      Login
    </button>
  );
}

// 3. Shopping Cart Context with useReducer
const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id 
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }]
      };
      
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };
      
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };
      
    case 'CLEAR_CART':
      return {
        ...state,
        items: []
      };
      
    default:
      return state;
  }
};

function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });
  
  const addItem = (product) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  };
  
  const removeItem = (productId) => {
    dispatch({ type: 'REMOVE_ITEM', payload: productId });
  };
  
  const updateQuantity = (productId, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } });
  };
  
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };
  
  const getTotalItems = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  };
  
  const getTotalPrice = () => {
    return state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };
  
  return (
    <CartContext.Provider value={{
      items: state.items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      getTotalItems,
      getTotalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
}

function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}

// Cart consumer components
function ProductCard({ product }) {
  const { addItem } = useCart();
  
  return (
    <div>
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <button onClick={() => addItem(product)}>
        Add to Cart
      </button>
    </div>
  );
}

function CartSummary() {
  const { items, getTotalItems, getTotalPrice, clearCart } = useCart();
  
  return (
    <div>
      <h3>Cart Summary</h3>
      <p>Items: {getTotalItems()}</p>
      <p>Total: ${getTotalPrice().toFixed(2)}</p>
      <button onClick={clearCart}>Clear Cart</button>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.name} - Qty: {item.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
}

// 4. Multiple Contexts Example
function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <div>
            <ThemedButton />
            <LoginButton />
            <ProductCard product={{ id: 1, name: 'Laptop', price: 999 }} />
            <CartSummary />
          </div>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export { 
  ThemeProvider, 
  useTheme, 
  AuthProvider, 
  useAuth, 
  CartProvider, 
  useCart,
  ThemedButton,
  LoginButton,
  ProductCard,
  CartSummary,
  App
}; 