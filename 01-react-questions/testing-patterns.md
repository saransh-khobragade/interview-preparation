# React Testing Patterns

## 🧪 **Testing Best Practices & Patterns**

### **1. Component Testing Fundamentals**

#### **Testing User Interactions Over Implementation**

```jsx
// ❌ Testing implementation details
import { render } from '@testing-library/react';
import Counter from './Counter';

test('increments count when button is clicked', () => {
  const { getByTestId } = render(<Counter />);
  const button = getByTestId('increment-button');
  const count = getByTestId('count-display');
  
  expect(count).toHaveTextContent('0');
  
  // Testing internal state
  expect(Counter.state.count).toBe(0); // BAD!
  
  button.click();
  expect(Counter.state.count).toBe(1); // BAD!
});

// ✅ Testing user behavior
import { render, fireEvent, screen } from '@testing-library/react';
import Counter from './Counter';

test('increments count when button is clicked', () => {
  render(<Counter />);
  
  // Test what user sees
  expect(screen.getByText('Count: 0')).toBeInTheDocument();
  
  // Test user interaction
  fireEvent.click(screen.getByRole('button', { name: /increment/i }));
  
  // Test expected outcome
  expect(screen.getByText('Count: 1')).toBeInTheDocument();
});
```

#### **Testing Async Behavior**

```jsx
// Component under test
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
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!user) return <div>User not found</div>;
  
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}

// ✅ Testing async behavior
import { render, screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import UserProfile from './UserProfile';

const server = setupServer(
  rest.get('/api/users/:userId', (req, res, ctx) => {
    return res(
      ctx.json({
        id: '1',
        name: 'John Doe',
        email: 'john@example.com'
      })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('displays user profile after loading', async () => {
  render(<UserProfile userId="1" />);
  
  // Initially shows loading
  expect(screen.getByText('Loading...')).toBeInTheDocument();
  
  // Wait for user data to load
  await waitFor(() => {
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });
  
  expect(screen.getByText('john@example.com')).toBeInTheDocument();
  expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
});

test('displays error when API fails', async () => {
  server.use(
    rest.get('/api/users/:userId', (req, res, ctx) => {
      return res(ctx.status(500), ctx.json({ message: 'Server error' }));
    })
  );
  
  render(<UserProfile userId="1" />);
  
  await waitFor(() => {
    expect(screen.getByText(/error/i)).toBeInTheDocument();
  });
});
```

### **2. Custom Hook Testing**

```jsx
// Custom hook
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  
  const increment = useCallback(() => {
    setCount(c => c + 1);
  }, []);
  
  const decrement = useCallback(() => {
    setCount(c => c - 1);
  }, []);
  
  const reset = useCallback(() => {
    setCount(initialValue);
  }, [initialValue]);
  
  return { count, increment, decrement, reset };
}

// ✅ Testing custom hooks
import { renderHook, act } from '@testing-library/react';
import { useCounter } from './useCounter';

test('should initialize with default value', () => {
  const { result } = renderHook(() => useCounter());
  expect(result.current.count).toBe(0);
});

test('should initialize with provided value', () => {
  const { result } = renderHook(() => useCounter(10));
  expect(result.current.count).toBe(10);
});

test('should increment count', () => {
  const { result } = renderHook(() => useCounter());
  
  act(() => {
    result.current.increment();
  });
  
  expect(result.current.count).toBe(1);
});

test('should reset to initial value', () => {
  const { result } = renderHook(() => useCounter(5));
  
  act(() => {
    result.current.increment();
    result.current.increment();
  });
  
  expect(result.current.count).toBe(7);
  
  act(() => {
    result.current.reset();
  });
  
  expect(result.current.count).toBe(5);
});

test('should update reset value when initial value changes', () => {
  const { result, rerender } = renderHook(
    ({ initialValue }) => useCounter(initialValue),
    { initialProps: { initialValue: 0 } }
  );
  
  act(() => {
    result.current.increment();
  });
  
  expect(result.current.count).toBe(1);
  
  rerender({ initialValue: 10 });
  
  act(() => {
    result.current.reset();
  });
  
  expect(result.current.count).toBe(10);
});
```

### **3. Context Testing**

```jsx
// Context provider
const UserContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const login = async (credentials) => {
    setLoading(true);
    try {
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
  
  const value = {
    user,
    loading,
    login,
    logout
  };
  
  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

// ✅ Testing context
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { UserProvider, UserContext } from './UserContext';

const server = setupServer(
  rest.post('/api/login', (req, res, ctx) => {
    return res(
      ctx.json({
        id: '1',
        name: 'John Doe',
        email: 'john@example.com'
      })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// Test wrapper component
function TestComponent() {
  const { user, login, logout, loading } = useContext(UserContext);
  
  return (
    <div>
      {loading && <div>Loading...</div>}
      {user ? (
        <div>
          <p>Welcome, {user.name}!</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <button onClick={() => login({ email: 'test@example.com', password: 'password' })}>
          Login
        </button>
      )}
    </div>
  );
}

function renderWithProvider(ui) {
  return render(
    <UserProvider>
      {ui}
    </UserProvider>
  );
}

test('should login user successfully', async () => {
  renderWithProvider(<TestComponent />);
  
  // Initially not logged in
  expect(screen.getByText('Login')).toBeInTheDocument();
  
  // Click login
  fireEvent.click(screen.getByText('Login'));
  
  // Shows loading
  expect(screen.getByText('Loading...')).toBeInTheDocument();
  
  // Wait for login to complete
  await waitFor(() => {
    expect(screen.getByText('Welcome, John Doe!')).toBeInTheDocument();
  });
  
  expect(screen.queryByText('Login')).not.toBeInTheDocument();
});

test('should logout user', async () => {
  renderWithProvider(<TestComponent />);
  
  // Login first
  fireEvent.click(screen.getByText('Login'));
  await waitFor(() => {
    expect(screen.getByText('Welcome, John Doe!')).toBeInTheDocument();
  });
  
  // Logout
  fireEvent.click(screen.getByText('Logout'));
  
  expect(screen.getByText('Login')).toBeInTheDocument();
  expect(screen.queryByText('Welcome, John Doe!')).not.toBeInTheDocument();
});
```

### **4. Testing with React Router**

```jsx
// Component using router
import { useNavigate, useParams } from 'react-router-dom';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  
  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then(res => res.json())
      .then(setProduct);
  }, [id]);
  
  const handleEdit = () => {
    navigate(`/products/${id}/edit`);
  };
  
  if (!product) return <div>Loading...</div>;
  
  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <button onClick={handleEdit}>Edit Product</button>
    </div>
  );
}

// ✅ Testing with router
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import ProductDetail from './ProductDetail';

const server = setupServer(
  rest.get('/api/products/:id', (req, res, ctx) => {
    return res(
      ctx.json({
        id: '1',
        name: 'Test Product',
        description: 'Test Description'
      })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const renderWithRouter = (initialEntries = ['/']) => {
  const mockNavigate = jest.fn();
  
  jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
  }));
  
  const utils = render(
    <MemoryRouter initialEntries={initialEntries}>
      <ProductDetail />
    </MemoryRouter>
  );
  
  return { ...utils, mockNavigate };
};

test('should display product details', async () => {
  renderWithRouter(['/products/1']);
  
  await waitFor(() => {
    expect(screen.getByText('Test Product')).toBeInTheDocument();
  });
  
  expect(screen.getByText('Test Description')).toBeInTheDocument();
});

test('should navigate to edit page when edit button is clicked', async () => {
  const { mockNavigate } = renderWithRouter(['/products/1']);
  
  await waitFor(() => {
    expect(screen.getByText('Test Product')).toBeInTheDocument();
  });
  
  fireEvent.click(screen.getByText('Edit Product'));
  
  expect(mockNavigate).toHaveBeenCalledWith('/products/1/edit');
});
```

### **5. Testing Forms**

```jsx
// Form component
function ContactForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  
  const validate = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <span role="alert">{errors.name}</span>}
      </div>
      
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <span role="alert">{errors.email}</span>}
      </div>
      
      <div>
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
        />
        {errors.message && <span role="alert">{errors.message}</span>}
      </div>
      
      <button type="submit">Send Message</button>
    </form>
  );
}

// ✅ Testing forms
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';

test('should submit form with valid data', async () => {
  const mockOnSubmit = jest.fn();
  const user = userEvent.setup();
  
  render(<ContactForm onSubmit={mockOnSubmit} />);
  
  // Fill out form
  await user.type(screen.getByLabelText(/name/i), 'John Doe');
  await user.type(screen.getByLabelText(/email/i), 'john@example.com');
  await user.type(screen.getByLabelText(/message/i), 'Test message');
  
  // Submit form
  await user.click(screen.getByRole('button', { name: /send message/i }));
  
  expect(mockOnSubmit).toHaveBeenCalledWith({
    name: 'John Doe',
    email: 'john@example.com',
    message: 'Test message'
  });
});

test('should show validation errors for empty fields', async () => {
  const mockOnSubmit = jest.fn();
  const user = userEvent.setup();
  
  render(<ContactForm onSubmit={mockOnSubmit} />);
  
  // Submit empty form
  await user.click(screen.getByRole('button', { name: /send message/i }));
  
  expect(screen.getByText('Name is required')).toBeInTheDocument();
  expect(screen.getByText('Email is required')).toBeInTheDocument();
  expect(screen.getByText('Message is required')).toBeInTheDocument();
  expect(mockOnSubmit).not.toHaveBeenCalled();
});

test('should show email validation error', async () => {
  const mockOnSubmit = jest.fn();
  const user = userEvent.setup();
  
  render(<ContactForm onSubmit={mockOnSubmit} />);
  
  // Enter invalid email
  await user.type(screen.getByLabelText(/email/i), 'invalid-email');
  await user.click(screen.getByRole('button', { name: /send message/i }));
  
  expect(screen.getByText('Email is invalid')).toBeInTheDocument();
  expect(mockOnSubmit).not.toHaveBeenCalled();
});

test('should clear error when user starts typing', async () => {
  const mockOnSubmit = jest.fn();
  const user = userEvent.setup();
  
  render(<ContactForm onSubmit={mockOnSubmit} />);
  
  // Submit to show errors
  await user.click(screen.getByRole('button', { name: /send message/i }));
  expect(screen.getByText('Name is required')).toBeInTheDocument();
  
  // Start typing to clear error
  await user.type(screen.getByLabelText(/name/i), 'J');
  expect(screen.queryByText('Name is required')).not.toBeInTheDocument();
});
```

## 🎯 **Testing Interview Questions**

### **Q: What's the difference between unit tests and integration tests in React?**

**Answer:**
- **Unit tests:** Test individual components in isolation with mocked dependencies
- **Integration tests:** Test how multiple components work together
- **Example:** Unit test tests a button component, integration test tests a form with multiple input components

### **Q: How do you test components that use React Router?**

**Answer:**
- Use `MemoryRouter` to wrap components for testing
- Mock `useNavigate` and `useParams` hooks when needed
- Test navigation behavior by checking if correct navigation functions are called

### **Q: When should you use `waitFor` vs `findBy` queries?**

**Answer:**
- **`findBy`:** When you expect an element to appear after an async operation
- **`waitFor`:** When you need to wait for multiple things or complex conditions
- **`findBy` is preferred** when waiting for a single element to appear

### **Q: How do you test custom hooks that use external APIs?**

**Answer:**
- Use `renderHook` from React Testing Library
- Mock API calls with MSW (Mock Service Worker) or jest mocks
- Test different states: loading, success, error
- Use `act` when triggering state updates 