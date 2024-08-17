import React from 'react';
import { useRoutes } from 'react-router-dom';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import './index.css'; 
const App = () => {
  const routes = [
    { path: "/", element: <Login /> },
    { path: "/dashboard", element: <Dashboard/>},
    // Add other routes here
  ];

  return useRoutes(routes);
};

export default App;
