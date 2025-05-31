import { useState, useEffect, useMemo } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import { AuthContext } from './contexts/AuthContext';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import './App.css';

function App() {
  // Initialize from localStorage
  const [token, setToken] = useState<string | null>(
    () => localStorage.getItem('token')
  );

  // Listen for cross-tab storage changes
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'token') {
        setToken(e.newValue);
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  // Called by Login/SignUp pages on successful auth
  const login = (newToken: string) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  // Can be called from any page (e.g. Home) to log out
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  // Memoize context value for performance
  const authValue = useMemo(
    () => ({ token, login, logout }),
    [token]
  );

  return (
    <AuthContext.Provider value={authValue}>
      <Router>
        <Routes>
          {/* If not authenticated, allow Login/SignUp */}
          <Route
            path="/login"
            element={
              !token ? <Login /> : <Navigate to="/" replace />
            }
          />
          <Route
            path="/signup"
            element={
              !token ? <SignUp /> : <Navigate to="/" replace />
            }
          />

          {/* Protected Home route */}
          <Route
            path="/"
            element={
              token ? <Home /> : <Navigate to="/login" replace />
            }
          />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
