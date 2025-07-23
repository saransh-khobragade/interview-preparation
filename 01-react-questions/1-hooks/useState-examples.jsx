/**
 * useState Hook - Common Interview Examples
 */

import React, { useState } from 'react';

// 1. Basic Counter
function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(prev => prev - 1)}>Decrement</button>
    </div>
  );
}

// 2. Object State
function UserProfile() {
  const [user, setUser] = useState({ name: '', email: '', age: 0 });
  
  const updateName = (name) => {
    setUser(prev => ({ ...prev, name })); // Spread operator to maintain other properties
  };
  
  return (
    <div>
      <input 
        placeholder="Name" 
        onChange={(e) => updateName(e.target.value)} 
      />
      <p>User: {user.name}</p>
    </div>
  );
}

// 3. Array State
function TodoList() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  
  const addTodo = () => {
    setTodos(prev => [...prev, { id: Date.now(), text: input }]);
    setInput('');
  };
  
  const removeTodo = (id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };
  
  return (
    <div>
      <input 
        value={input} 
        onChange={(e) => setInput(e.target.value)} 
      />
      <button onClick={addTodo}>Add</button>
      {todos.map(todo => (
        <div key={todo.id}>
          {todo.text} 
          <button onClick={() => removeTodo(todo.id)}>Remove</button>
        </div>
      ))}
    </div>
  );
}

// 4. Toggle State
function ToggleVisibility() {
  const [isVisible, setIsVisible] = useState(false);
  
  return (
    <div>
      <button onClick={() => setIsVisible(!isVisible)}>
        {isVisible ? 'Hide' : 'Show'}
      </button>
      {isVisible && <p>Now you see me!</p>}
    </div>
  );
}

// 5. Multiple State Variables
function FormInputs() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleSubmit = () => {
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 2000);
  };
  
  return (
    <div>
      <input 
        placeholder="First Name" 
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)} 
      />
      <input 
        placeholder="Last Name" 
        value={lastName}
        onChange={(e) => setLastName(e.target.value)} 
      />
      <button onClick={handleSubmit}>Submit</button>
      {isSubmitted && <p>Form submitted successfully!</p>}
    </div>
  );
}

export { Counter, UserProfile, TodoList, ToggleVisibility, FormInputs }; 