/**
 * Prop Drilling - Problem and Solutions
 */

import React, { createContext, useContext, useState } from 'react';

// ❌ PROBLEM: Prop Drilling Example
function AppWithPropDrilling() {
  const [user, setUser] = useState({ name: 'John', theme: 'dark' });
  
  return (
    <div>
      <Header user={user} setUser={setUser} />
      <Main user={user} setUser={setUser} />
      <Footer user={user} />
    </div>
  );
}

function Header({ user, setUser }) {
  return (
    <header>
      <Navigation user={user} setUser={setUser} />
    </header>
  );
}

function Navigation({ user, setUser }) {
  return (
    <nav>
      <UserMenu user={user} setUser={setUser} />
    </nav>
  );
}

function UserMenu({ user, setUser }) {
  const toggleTheme = () => {
    setUser(prev => ({ 
      ...prev, 
      theme: prev.theme === 'light' ? 'dark' : 'light' 
    }));
  };
  
  return (
    <div>
      <span>Welcome, {user.name}</span>
      <button onClick={toggleTheme}>
        Switch to {user.theme === 'light' ? 'Dark' : 'Light'} Theme
      </button>
    </div>
  );
}

function Main({ user, setUser }) {
  return (
    <main>
      <Content user={user} setUser={setUser} />
    </main>
  );
}

function Content({ user, setUser }) {
  return (
    <div>
      <Profile user={user} setUser={setUser} />
    </div>
  );
}

function Profile({ user, setUser }) {
  const updateName = (name) => {
    setUser(prev => ({ ...prev, name }));
  };
  
  return (
    <div style={{ background: user.theme === 'dark' ? '#333' : '#fff' }}>
      <input 
        value={user.name}
        onChange={(e) => updateName(e.target.value)}
      />
    </div>
  );
}

function Footer({ user }) {
  return (
    <footer style={{ background: user.theme === 'dark' ? '#222' : '#f0f0f0' }}>
      <p>© 2024 - Theme: {user.theme}</p>
    </footer>
  );
}

// ✅ SOLUTION 1: Context API
const UserContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState({ name: 'John', theme: 'dark' });
  
  const updateUser = (updates) => {
    setUser(prev => ({ ...prev, ...updates }));
  };
  
  const toggleTheme = () => {
    setUser(prev => ({ 
      ...prev, 
      theme: prev.theme === 'light' ? 'dark' : 'light' 
    }));
  };
  
  return (
    <UserContext.Provider value={{ user, updateUser, toggleTheme }}>
      {children}
    </UserContext.Provider>
  );
}

function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
}

// Components using Context (no prop drilling)
function AppWithContext() {
  return (
    <UserProvider>
      <div>
        <HeaderWithContext />
        <MainWithContext />
        <FooterWithContext />
      </div>
    </UserProvider>
  );
}

function HeaderWithContext() {
  return (
    <header>
      <NavigationWithContext />
    </header>
  );
}

function NavigationWithContext() {
  return (
    <nav>
      <UserMenuWithContext />
    </nav>
  );
}

function UserMenuWithContext() {
  const { user, toggleTheme } = useUser();
  
  return (
    <div>
      <span>Welcome, {user.name}</span>
      <button onClick={toggleTheme}>
        Switch to {user.theme === 'light' ? 'Dark' : 'Light'} Theme
      </button>
    </div>
  );
}

function MainWithContext() {
  return (
    <main>
      <ContentWithContext />
    </main>
  );
}

function ContentWithContext() {
  return (
    <div>
      <ProfileWithContext />
    </div>
  );
}

function ProfileWithContext() {
  const { user, updateUser } = useUser();
  
  return (
    <div style={{ background: user.theme === 'dark' ? '#333' : '#fff' }}>
      <input 
        value={user.name}
        onChange={(e) => updateUser({ name: e.target.value })}
      />
    </div>
  );
}

function FooterWithContext() {
  const { user } = useUser();
  
  return (
    <footer style={{ background: user.theme === 'dark' ? '#222' : '#f0f0f0' }}>
      <p>© 2024 - Theme: {user.theme}</p>
    </footer>
  );
}

// ✅ SOLUTION 2: Component Composition
function AppWithComposition() {
  const [user, setUser] = useState({ name: 'John', theme: 'dark' });
  
  const toggleTheme = () => {
    setUser(prev => ({ 
      ...prev, 
      theme: prev.theme === 'light' ? 'dark' : 'light' 
    }));
  };
  
  const updateName = (name) => {
    setUser(prev => ({ ...prev, name }));
  };
  
  return (
    <div>
      <HeaderComposition>
        <NavigationComposition>
          <UserMenuComposition 
            user={user} 
            onToggleTheme={toggleTheme} 
          />
        </NavigationComposition>
      </HeaderComposition>
      
      <MainComposition>
        <ContentComposition>
          <ProfileComposition 
            user={user} 
            onUpdateName={updateName} 
          />
        </ContentComposition>
      </MainComposition>
      
      <FooterComposition user={user} />
    </div>
  );
}

function HeaderComposition({ children }) {
  return <header>{children}</header>;
}

function NavigationComposition({ children }) {
  return <nav>{children}</nav>;
}

function UserMenuComposition({ user, onToggleTheme }) {
  return (
    <div>
      <span>Welcome, {user.name}</span>
      <button onClick={onToggleTheme}>
        Switch to {user.theme === 'light' ? 'Dark' : 'Light'} Theme
      </button>
    </div>
  );
}

function MainComposition({ children }) {
  return <main>{children}</main>;
}

function ContentComposition({ children }) {
  return <div>{children}</div>;
}

function ProfileComposition({ user, onUpdateName }) {
  return (
    <div style={{ background: user.theme === 'dark' ? '#333' : '#fff' }}>
      <input 
        value={user.name}
        onChange={(e) => onUpdateName(e.target.value)}
      />
    </div>
  );
}

function FooterComposition({ user }) {
  return (
    <footer style={{ background: user.theme === 'dark' ? '#222' : '#f0f0f0' }}>
      <p>© 2024 - Theme: {user.theme}</p>
    </footer>
  );
}

// ✅ SOLUTION 3: Render Props
function UserData({ children }) {
  const [user, setUser] = useState({ name: 'John', theme: 'dark' });
  
  const toggleTheme = () => {
    setUser(prev => ({ 
      ...prev, 
      theme: prev.theme === 'light' ? 'dark' : 'light' 
    }));
  };
  
  const updateName = (name) => {
    setUser(prev => ({ ...prev, name }));
  };
  
  return children({ user, toggleTheme, updateName });
}

function AppWithRenderProps() {
  return (
    <UserData>
      {({ user, toggleTheme, updateName }) => (
        <div>
          <header>
            <nav>
              <div>
                <span>Welcome, {user.name}</span>
                <button onClick={toggleTheme}>
                  Switch to {user.theme === 'light' ? 'Dark' : 'Light'} Theme
                </button>
              </div>
            </nav>
          </header>
          
          <main>
            <div style={{ background: user.theme === 'dark' ? '#333' : '#fff' }}>
              <input 
                value={user.name}
                onChange={(e) => updateName(e.target.value)}
              />
            </div>
          </main>
          
          <footer style={{ background: user.theme === 'dark' ? '#222' : '#f0f0f0' }}>
            <p>© 2024 - Theme: {user.theme}</p>
          </footer>
        </div>
      )}
    </UserData>
  );
}

export {
  AppWithPropDrilling,
  AppWithContext,
  AppWithComposition,
  AppWithRenderProps,
  UserProvider,
  useUser
}; 