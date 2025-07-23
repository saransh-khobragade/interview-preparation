/**
 * useEffect Hook - Common Interview Examples
 */

import React, { useState, useEffect } from 'react';

// 1. Component Mount/Unmount
function ComponentLifecycle() {
  useEffect(() => {
    console.log('Component mounted');
    
    // Cleanup function (componentWillUnmount)
    return () => {
      console.log('Component unmounted');
    };
  }, []); // Empty dependency array = only run once
  
  return <div>Check console for lifecycle logs</div>;
}

// 2. Data Fetching
function UserData({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/users/${userId}`);
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUser();
  }, [userId]); // Runs when userId changes
  
  if (loading) return <div>Loading...</div>;
  return <div>User: {user?.name}</div>;
}

// 3. Timer/Interval
function Timer() {
  const [seconds, setSeconds] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);
    
    // Cleanup interval
    return () => clearInterval(interval);
  }, []);
  
  return <div>Timer: {seconds} seconds</div>;
}

// 4. Window Resize Listener
function WindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup listener
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return <div>Size: {windowSize.width} x {windowSize.height}</div>;
}

// 5. Conditional Effect
function ConditionalEffect({ shouldFetch }) {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    if (shouldFetch) {
      console.log('Fetching data...');
      // Simulate API call
      setTimeout(() => {
        setData('Fetched data');
      }, 1000);
    }
  }, [shouldFetch]);
  
  return <div>Data: {data || 'No data'}</div>;
}

// 6. Multiple Effects
function MultipleEffects() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  
  // Effect for count changes
  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]);
  
  // Effect for name changes
  useEffect(() => {
    console.log(`Name changed to: ${name}`);
  }, [name]);
  
  // Effect for component mount only
  useEffect(() => {
    console.log('Component mounted');
  }, []);
  
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>
        Count: {count}
      </button>
      <input 
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter name"
      />
    </div>
  );
}

export { ComponentLifecycle, UserData, Timer, WindowSize, ConditionalEffect, MultipleEffects }; 