/**
 * Custom Hooks - Common Interview Examples
 */

import { useState, useEffect, useCallback, useRef } from 'react';

// 1. useLocalStorage - Sync state with localStorage
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });
  
  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error setting localStorage:', error);
    }
  };
  
  return [storedValue, setValue];
}

// 2. useFetch - Data fetching hook
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
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
  
  return { data, loading, error };
}

// 3. useToggle - Toggle boolean state
function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);
  
  const toggle = useCallback(() => setValue(v => !v), []);
  
  return [value, toggle];
}

// 4. useDebounce - Debounce value changes
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  
  return debouncedValue;
}

// 5. usePrevious - Get previous value
function usePrevious(value) {
  const ref = useRef();
  
  useEffect(() => {
    ref.current = value;
  });
  
  return ref.current;
}

// 6. useCounter - Counter with increment/decrement
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  
  const increment = useCallback(() => setCount(c => c + 1), []);
  const decrement = useCallback(() => setCount(c => c - 1), []);
  const reset = useCallback(() => setCount(initialValue), [initialValue]);
  
  return { count, increment, decrement, reset };
}

// Usage Examples
function LocalStorageExample() {
  const [name, setName] = useLocalStorage('name', '');
  
  return (
    <div>
      <input 
        value={name} 
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter name (saved to localStorage)"
      />
      <p>Hello, {name}!</p>
    </div>
  );
}

function FetchExample() {
  const { data, loading, error } = useFetch('/api/users');
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <ul>
      {data?.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

function ToggleExample() {
  const [isVisible, toggleVisible] = useToggle(false);
  
  return (
    <div>
      <button onClick={toggleVisible}>
        {isVisible ? 'Hide' : 'Show'}
      </button>
      {isVisible && <p>Toggle content!</p>}
    </div>
  );
}

function DebounceExample() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  
  useEffect(() => {
    if (debouncedSearchTerm) {
      console.log('Searching for:', debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);
  
  return (
    <input 
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search (debounced)"
    />
  );
}

function CounterExample() {
  const { count, increment, decrement, reset } = useCounter(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

export { 
  useLocalStorage, 
  useFetch, 
  useToggle, 
  useDebounce, 
  usePrevious, 
  useCounter,
  LocalStorageExample,
  FetchExample,
  ToggleExample,
  DebounceExample,
  CounterExample
}; 