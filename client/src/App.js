import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthContext } from './context/AuthContext';
import { useAuth } from './hooks/auth.hooks';
import { useRoutes } from './routes';

function App() {
  const { token, email, login, logout, userId } = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)
  return (
    <AuthContext.Provider value={{ token, email, login, logout, userId, isAuthenticated }}>
      <Router>
        <div className="app">
          {routes}
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
