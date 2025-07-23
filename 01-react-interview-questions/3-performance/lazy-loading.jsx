/**
 * Lazy Loading and Code Splitting - Common Interview Examples
 */

import React, { lazy, Suspense, useState } from 'react';

// 1. Basic Lazy Loading
const LazyComponent = lazy(() => import('./components/HeavyComponent'));
const LazyAbout = lazy(() => import('./pages/About'));
const LazyDashboard = lazy(() => import('./pages/Dashboard'));

function BasicLazyExample() {
  const [showComponent, setShowComponent] = useState(false);
  
  return (
    <div>
      <button onClick={() => setShowComponent(!showComponent)}>
        {showComponent ? 'Hide' : 'Show'} Heavy Component
      </button>
      
      {showComponent && (
        <Suspense fallback={<div>Loading heavy component...</div>}>
          <LazyComponent />
        </Suspense>
      )}
    </div>
  );
}

// 2. Route-based Code Splitting
function AppWithLazyRoutes() {
  const [currentRoute, setCurrentRoute] = useState('home');
  
  const renderRoute = () => {
    switch (currentRoute) {
      case 'about':
        return (
          <Suspense fallback={<div>Loading About page...</div>}>
            <LazyAbout />
          </Suspense>
        );
      case 'dashboard':
        return (
          <Suspense fallback={<div>Loading Dashboard...</div>}>
            <LazyDashboard />
          </Suspense>
        );
      default:
        return <HomePage />;
    }
  };
  
  return (
    <div>
      <nav>
        <button onClick={() => setCurrentRoute('home')}>Home</button>
        <button onClick={() => setCurrentRoute('about')}>About</button>
        <button onClick={() => setCurrentRoute('dashboard')}>Dashboard</button>
      </nav>
      
      <main>
        {renderRoute()}
      </main>
    </div>
  );
}

function HomePage() {
  return <div>Welcome to Home Page!</div>;
}

// 3. Conditional Lazy Loading
function ConditionalLazyLoading() {
  const [userRole, setUserRole] = useState('guest');
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  
  // Only load admin component if user is admin
  const AdminPanel = lazy(() => {
    if (userRole === 'admin') {
      return import('./components/AdminPanel');
    }
    return Promise.resolve({ default: () => <div>Access Denied</div> });
  });
  
  return (
    <div>
      <select value={userRole} onChange={(e) => setUserRole(e.target.value)}>
        <option value="guest">Guest</option>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      
      <button 
        onClick={() => setShowAdminPanel(!showAdminPanel)}
        disabled={userRole !== 'admin'}
      >
        {showAdminPanel ? 'Hide' : 'Show'} Admin Panel
      </button>
      
      {showAdminPanel && (
        <Suspense fallback={<div>Loading admin panel...</div>}>
          <AdminPanel />
        </Suspense>
      )}
    </div>
  );
}

// 4. Component Library Lazy Loading
function ComponentLibraryExample() {
  const [activeTab, setActiveTab] = useState('charts');
  
  // Lazy load heavy chart library only when needed
  const ChartComponent = lazy(() => 
    import('./components/charts/ChartComponent')
  );
  
  // Lazy load heavy table library only when needed
  const DataTable = lazy(() => 
    import('./components/table/DataTable')
  );
  
  // Lazy load heavy editor only when needed
  const RichTextEditor = lazy(() => 
    import('./components/editor/RichTextEditor')
  );
  
  const renderContent = () => {
    switch (activeTab) {
      case 'charts':
        return (
          <Suspense fallback={<div>Loading charts...</div>}>
            <ChartComponent />
          </Suspense>
        );
      case 'table':
        return (
          <Suspense fallback={<div>Loading data table...</div>}>
            <DataTable />
          </Suspense>
        );
      case 'editor':
        return (
          <Suspense fallback={<div>Loading text editor...</div>}>
            <RichTextEditor />
          </Suspense>
        );
      default:
        return <div>Select a tab</div>;
    }
  };
  
  return (
    <div>
      <div>
        <button 
          onClick={() => setActiveTab('charts')}
          className={activeTab === 'charts' ? 'active' : ''}
        >
          Charts
        </button>
        <button 
          onClick={() => setActiveTab('table')}
          className={activeTab === 'table' ? 'active' : ''}
        >
          Data Table
        </button>
        <button 
          onClick={() => setActiveTab('editor')}
          className={activeTab === 'editor' ? 'active' : ''}
        >
          Text Editor
        </button>
      </div>
      
      <div>
        {renderContent()}
      </div>
    </div>
  );
}

// 5. Lazy Loading with Error Boundary
class LazyErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  
  componentDidCatch(error, errorInfo) {
    console.error('Lazy loading error:', error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h3>Failed to load component</h3>
          <p>Error: {this.state.error?.message}</p>
          <button onClick={() => window.location.reload()}>
            Retry
          </button>
        </div>
      );
    }
    
    return this.props.children;
  }
}

function LazyWithErrorBoundary() {
  const [showComponent, setShowComponent] = useState(false);
  
  // This might fail to load
  const PotentiallyFailingComponent = lazy(() => 
    import('./components/PotentiallyFailingComponent')
  );
  
  return (
    <div>
      <button onClick={() => setShowComponent(!showComponent)}>
        {showComponent ? 'Hide' : 'Show'} Component
      </button>
      
      {showComponent && (
        <LazyErrorBoundary>
          <Suspense fallback={<div>Loading...</div>}>
            <PotentiallyFailingComponent />
          </Suspense>
        </LazyErrorBoundary>
      )}
    </div>
  );
}

// 6. Preloading Strategy
function PreloadingExample() {
  const [currentView, setCurrentView] = useState('home');
  
  // Preload components on hover or after initial load
  const preloadDashboard = () => {
    import('./pages/Dashboard');
  };
  
  const preloadProfile = () => {
    import('./pages/Profile');
  };
  
  React.useEffect(() => {
    // Preload dashboard after 2 seconds (when user is likely to navigate)
    const timer = setTimeout(preloadDashboard, 2000);
    return () => clearTimeout(timer);
  }, []);
  
  const LazyDashboard = lazy(() => import('./pages/Dashboard'));
  const LazyProfile = lazy(() => import('./pages/Profile'));
  
  return (
    <div>
      <nav>
        <button onClick={() => setCurrentView('home')}>
          Home
        </button>
        <button 
          onClick={() => setCurrentView('dashboard')}
          onMouseEnter={preloadDashboard} // Preload on hover
        >
          Dashboard
        </button>
        <button 
          onClick={() => setCurrentView('profile')}
          onMouseEnter={preloadProfile} // Preload on hover
        >
          Profile
        </button>
      </nav>
      
      <main>
        {currentView === 'home' && <div>Home Content</div>}
        {currentView === 'dashboard' && (
          <Suspense fallback={<div>Loading Dashboard...</div>}>
            <LazyDashboard />
          </Suspense>
        )}
        {currentView === 'profile' && (
          <Suspense fallback={<div>Loading Profile...</div>}>
            <LazyProfile />
          </Suspense>
        )}
      </main>
    </div>
  );
}

// 7. Dynamic Import with Props
function DynamicImportWithProps() {
  const [componentType, setComponentType] = useState('chart');
  const [componentProps, setComponentProps] = useState({ data: [] });
  
  const loadComponent = async (type, props) => {
    let Component;
    
    switch (type) {
      case 'chart':
        const chartModule = await import('./components/Chart');
        Component = chartModule.default;
        break;
      case 'table':
        const tableModule = await import('./components/Table');
        Component = tableModule.default;
        break;
      default:
        return null;
    }
    
    return <Component {...props} />;
  };
  
  const [DynamicComponent, setDynamicComponent] = useState(null);
  
  React.useEffect(() => {
    loadComponent(componentType, componentProps).then(setDynamicComponent);
  }, [componentType, componentProps]);
  
  return (
    <div>
      <select 
        value={componentType} 
        onChange={(e) => setComponentType(e.target.value)}
      >
        <option value="chart">Chart</option>
        <option value="table">Table</option>
      </select>
      
      <Suspense fallback={<div>Loading component...</div>}>
        {DynamicComponent}
      </Suspense>
    </div>
  );
}

export {
  BasicLazyExample,
  AppWithLazyRoutes,
  ConditionalLazyLoading,
  ComponentLibraryExample,
  LazyWithErrorBoundary,
  PreloadingExample,
  DynamicImportWithProps,
  LazyErrorBoundary
}; 